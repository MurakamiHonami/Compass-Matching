import React from "react";
import UserList from "./components/UserList.tsx";
import Matching from "./components/Matching.tsx";
import Login from "./components/Login.tsx";
import { User } from "./components/Data.tsx";
import { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="layout">
      <aside className="sideBanner" aria-label="サイトバナー">
        <div className="sideBanner-overlay">
          <div className="sideBanner-brand">
            <img className="sideBanner-logo" src="/compass.png" alt="Compass ロゴ" />
            <div className="sideBanner-title">Compass</div>
          </div>

          <div className="sideBanner-copy">
            <p className="copy-main">方針でつながる</p>
            <p className="copy-sub">夜の海と星空のように、静かに近づく。</p>
          </div>
        </div>
      </aside>

      <main className="mainPanel">
        <header className="topBar">
          <div className="topBar-left">
            <h1 className="appTitle">Compass</h1>
          </div>

          <div className="topBar-right">
            {user ? (
              <div className="loginState">
                <span>ようこそ、{user.name}さん</span>
                <button onClick={() => setUser(null)}>
                  ログアウト
                </button>
              </div>
            ) : (
              <span className="muted">ログインしてください</span>
            )}
          </div>
        </header>

        <div className="content">
          {!user ? (
            <Login onLoginSuccess={(u) => setUser(u)} />
          ) : (
            <>
              <UserList currentUser={user} />
              <Matching currentUser={user} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;