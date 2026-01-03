from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from google import genai
from google.genai import types
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, JSON
import uuid

app=Flask(__name__)
CORS(app)

# データベース設定
base_dir=os.path.dirname(__file__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(base_dir, 'data.sqlite')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
db=SQLAlchemy(app)

# モデル定義
class User(db.Model):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True)
    name=Column(String(50),unique=True,nullable=False)
    password=Column(String(100),nullable=False)
    age=Column(Integer)
    image_url=Column(String(255))
    values_json=Column(JSON)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "imageUrl": self.image_url,
            "values": self.values_json
        }

with app.app_context():
    db.create_all()

load_dotenv()
client=genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
def get_embedding(other,user):
    result= client.models.embed_content(
            model="gemini-embedding-001",
            contents=[other,user],
            #テキストの類似性を評価
            config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
    )

    #プロフィールのベクトルを取り出す
    vec1 = np.array(result.embeddings[0].values).reshape(1, -1)
    vec2 = np.array(result.embeddings[1].values).reshape(1, -1)

    #コサイン類似度を計算
    similarity=cosine_similarity(vec1, vec2)[0][0]
    return similarity


@app.route("/api/users",methods=["GET"])
def get_users():
    users=User.query.all()
    return jsonify([user.to_dict() for user in users])
@app.route("/api/register",methods=["POST"])
def add_user():
    name=request.form.get("name")
    password=request.form.get("password")
    age=request.form.get("age")
    values=json.loads(request.form.get("values","{}"))
    image_file=request.files.get("image")
    
    if not image_file or image_file.filename == '':
             return jsonify({"error": "画像が選択されていません"}), 400
    
    # ユーザー名が使われているか確認
    if User.query.filter_by(name=name).first():
        return jsonify({"error": "このユーザー名は既に使用されています"}), 400
    
    # 画像を保存
    UPLOAD_FOLDER="./uploads"
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    filename = "default.png"
    if image_file and image_file.filename != "":
        filename = f"{uuid.uuid4()}{os.path.splitext(image_file.filename)[1]}"
        image_file.save(os.path.join(UPLOAD_FOLDER, filename))

    new_user=User(
        id=str(uuid.uuid4()),
        name=name,
        password=password,
        age=int(age),
        values_json=values,
        image_url=f"http://localhost:5000/uploads/{filename}"
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "ユーザー登録完了"}),201

@app.route("/api/login",methods=["POST"])
def login():
    name=request.form.get("name")
    password=request.form.get("password")

    # DBからユーザーを検索
    user=User.query.filter_by(name=name, password=password).first()

    if user:
        #セキュリティのためパスワードを除いて返す
        return jsonify({"user": user.to_dict()}),200
    else:
        return jsonify({"error": "ユーザー名またはパスワードが違います"}), 401

@app.route("/api/match",methods=["POST"])
def match_users():
    user_id=request.json.get("userId")
    current_user=db.session.get(User, user_id)
    if not current_user:
        return jsonify({"error":"User not found"}),404
    
    other_users=User.query.filter(User.id != user_id).all()

    if not other_users:
        return jsonify([])

    categories = ["reasons", "workLifeBalance", "financialSense", "vision", "distance"]
    matches=[]

    for other in other_users:
        category_scores=[]
        total_score_sum=0
        for c in categories:
            user_text=current_user.values_json.get(c,"")
            other_text=other.values_json.get(c,"")

            score=get_embedding(user_text,other_text)

            category_scores.append({
                "values": c,
                "score": int(score*100)
            })
            total_score_sum+=score
        avg_score=int((total_score_sum/len(categories))*100)

        match_result=other.to_dict()
        match_result.update({
            "totalScore": avg_score,
            "matchScore": category_scores 
        })
        
        matches.append(match_result)
    
    matches.sort(key=lambda x: x["totalScore"],reverse=True)

    return jsonify(matches)

UPLOAD_FOLDER = "./uploads"
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    # uploadsフォルダから、指定されたファイル名を探して返す
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)