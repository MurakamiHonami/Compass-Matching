# Compass
## ～ 価値観をベクトルで可視化するマッチングアプリ ～
<img width="1910" height="893" alt="画面イメージ" src="https://github.com/user-attachments/assets/13ef2a3f-4120-41fc-9f7f-482f029a8629" />

### 1. 概要
ライフスタイルや人生方針の近い相手を探せるマッチングアプリです<br>
本サービスでは、利用者それぞれの価値観をベクトルとして表現し、単純な条件一致ではなく「人生の方向性」に基づいたマッチングを行います。<br>

### 2. コア機能
 - Google Gemini APIの**Embeddings**を活用し、ユーザーが入力した自由記述のテキストを多次元ベクトルに変換。
 - 各項目の類似度を計算し、レーダーチャートで視覚化することで、言葉では説明しにくい「価値観の近さ」を直感的に把握できます。

### 3. 使用技術
 - フロントエンド
    - React/TypeScript
    - Recahrts(データ可視化)
    - Fetch API/Axios
- バックエンド
  - Python/Flask
  - Flask-SQLAlchemy(SQLite)
  - Google Gemini API (Text Embeddings)
  - Scikit-learn (類似度計算)
### 4. 起動方法
 - フロントエンド
   - cd frontend
   - npm install
   - npm start
 - バックエンド
    - .envファイルにAPIキー設定
       - GEMINI_API_KEY=あなたのAPIキー
    - cd backend
    - pip install -r requirements.txt
    - python app.py
### 5. 参考資料
 - https://qiita.com/automation2025/items/06f9a781a1607b23b3a8
 - https://ai.google.dev/gemini-api/docs/embeddings?hl=ja
