import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "./Data";

interface UserProps {
  currentUser: User;
}

const UserList: React.FC<UserProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        alert("ユーザーの取得に失敗しました");
        console.error("ユーザー取得失敗", error);
      }
    };
    fetchUsers();
  }, []);

  const others = users.filter((u) => u.name !== currentUser.name);

  return (
    <div className="section user-list">
      <div className="section-head">
        <h2>ユーザー</h2>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "ユーザーを非表示" : "ユーザーを表示"}
        </button>
      </div>

      <div className={`collapsible ${open ? "" : "is-closed"}`}>
        <div className="user-grid">
          {others.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-card-head">
                <img
                  className="user-avatar"
                  src={user.imageUrl}
                  alt={`${user.name}の画像`}
                />
                <div>
                  <p className="user-name">{user.name}</p>
                  <p className="user-meta">Age: {user.age}</p>
                </div>
              </div>

              <div className="user-values">
                <div>
                  <strong>Reasons:</strong> {user.values.reasons}
                </div>
                <div>
                  <strong>Work Life Balance:</strong> {user.values.workLifeBalance}
                </div>
                <div>
                  <strong>Financial Sense:</strong> {user.values.financialSense}
                </div>
                <div>
                  <strong>Vision:</strong> {user.values.vision}
                </div>
                <div>
                  <strong>Distance:</strong> {user.values.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;