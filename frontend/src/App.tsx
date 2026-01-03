import React from "react";
import UserList from "./components/UserList.tsx";
import Matching from "./components/Matching.tsx";
import Login from "./components/Login.tsx";
import { User } from "./components/Data.tsx"
import { useState } from "react";

const App: React.FC = () => {
  const [user, setUser]=useState<User | null>(null)
  return (
    <div className="App">
      {user && (
          <div>
            <p>ようこそ、{user.name}さん</p>
            <button onClick={() => setUser(null)}>ログアウト</button>
          </div>
        )}
      <h1>Compass</h1>
      {!user ? (
        <Login onLoginSuccess={(u) => setUser(u)}/>
      ) : (
        <div>
          <UserList currentUser={user}/>
          <Matching currentUser={user}/>
        </div>
      )
      }
    </div>
  )
}

export default App;