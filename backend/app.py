from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv

app=Flask(__name__)
CORS(app)

users = [
    {
        "id":1,
        "name":"田中太郎",
        "age":20,
        "interests":["サッカー","旅行"],
        "introduction":"初めまして！田中太郎と申します^^\n名古屋の大学に通っている大学1年生です。\n趣味はサッカー観戦と旅行です。最近は熱海に行きました!",
    },
    {
        "id":2,
        "name":"佐藤花子",
        "age":23,
        "interests":["料理","アニメ鑑賞"],
        "introduction":"こんにちは!趣味は料理とアニメ鑑賞で、呪術廻戦が大好きです!人見知りな性格です。"
    },
    {
        "id":3,
        "name":"佐々木優子",
        "age":28,
        "interests":["料理","手芸"],
        "introduction":"プロフィールをご覧いただきありがとうございますm(._.)m趣味はお料理と手芸です。最近は編み物にはまっています。"
    },
]

load_dotenv()
client=genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
def get_embedding(other,user):
    result= [
        np.array(e.values) for e in client.models.embed_content(
            model="gemini-embedding-001",
            contents=[other,user],
            #テキストの類似性を評価
            config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
        ).embeddings
    ]

    embedding_matrix=np.array(result)
    similarity_matrix=cosine_similarity(embedding_matrix)
    similarity=similarity_matrix[0,1]
    return similarity
    # if similarity > 0.85:
    #     return True
    # else:
    #     return False


@app.route("/api/users",methods=["GET"])
def get_users():
    return jsonify(users)

@app.route("/api/match",methods=["POST"])
def match_users():
    user_id=request.json["userId"]
    user=next((u for u in users if u["id"] == user_id),None)
    if not user:
        return jsonify({"error":"User not found"}),404
    
    # matches=[u for u in users if u["id"]!=user_id and set(u["interests"])& set(user["interests"])]

    matches=[]
    for u in users:
        if u["id"]!=user_id:
            score=get_embedding(u["introduction"],user["introduction"])
            u["percent"]="★"*(int(score*100)-80)
            matches.append(u)
    return jsonify(matches)

if __name__ == "__main__":
    app.run(debug=True)