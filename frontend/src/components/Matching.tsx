import React, { useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  age: number;
  interests: string[];
  introduction: string;
  percent: number;
}

const Matching: React.FC =()=>{
    const [userId,setUserId]=useState<number>(1);
    const [matches,setMatches]=useState<User[]>([]);

    const handleMatch = async ()=>{
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/match',{userId});
            setMatches(response.data);
        } catch (error) {
            alert(`Matching error:${error}`);
        }
    };


return (
    <div>
        <h2>相性診断</h2>
        <span>ユーザーID入力</span>
        <input
            type="number"
            value={userId}
            onChange={(e)=> setUserId(Number(e.target.value))}
            placeholder="ユーザーID"
            min="1"
        />
        <button onClick={handleMatch}>診断開始</button>
        <h3>診断結果</h3>
        <ul>
            {matches.map(user =>(
                <li key={user.id}>
                    {user.name} ({user.age}歳) - 興味 {user.interests.join("/")}<br/>
                    <strong>相性 {user.percent}</strong>
                </li>
            ))}
        </ul>
    </div>
)
}

export default Matching;