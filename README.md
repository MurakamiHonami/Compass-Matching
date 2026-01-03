# Compass
## ～ 価値観をベクトルで可視化する、DINKs向けマッチングアプリ ～
<img width="834" height="777" alt="利用画面イメージ" src="https://github.com/user-attachments/assets/bfd5cb2b-7553-41e4-8712-bd3a808ce96b" />

### 1. 概要
DINKsとは、共働きで子どもを持たない選択を含む、個人の自立と対等なパートナーシップを重視するライフスタイルです。<br>
近年、日本では結婚観や家族観の多様化が進む一方で、従来の婚活サービスは「結婚・出産」を前提とした価値観設計が中心となっており、  ライフスタイルや人生方針の違いによるミスマッチが課題となっています。<br>
本サービスでは、DINKsを単なる属性ではなく「人生の方針を共有するパートナーシップ」と捉え、それぞれの価値観をベクトルとして表現し、単純な条件一致ではなく「人生の方向性」に基づいたマッチングを行います。<br>

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
