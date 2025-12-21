import React from "react";
import UserList from "./components/UserList.tsx";
import Matching from "./components/Matching.tsx";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>相性診断アプリ</h1>
      <UserList />
      <Matching />
    </div>
  )
}

export default App;