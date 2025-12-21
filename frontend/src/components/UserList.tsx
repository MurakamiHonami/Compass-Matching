import React, {useEffect,useState} from "react";
import axios from "axios"

interface User {
    id: number;
    name: string;
    age:  number;
    interests: string[];
    introduction: string;
}


const UserList: React.FC =()=>{
    const [users,setUsers]=useState<User[]>([]);
    const [userName,setUserName]=useState("")
    const [userAge,setUserAge]=useState(18)
    const [userInterests1,setUserInterests1]=useState("")
    const [userInterests2,setUserInterests2]=useState("")
    const [userIntroduction,setUserIntroduction]=useState("")

    useEffect(()=>{
        const fetchUsers = async () =>{
            const response = await axios.get("http://127.0.0.1:5000/api/users");
            setUsers(response.data);
        };
        fetchUsers();
    },[]);

    const signUp = async ()=>{
        const data = {
            id: users.length+1,
            name: userName,
            age: userAge,
            interests: [userInterests1,userInterests2],
            introduction: userIntroduction,
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/users',{userData: data});
            setUsers(response.data);
        } catch (error) {
            alert(`SignUp error:${error}`);
        }
        setUserName("");
        setUserAge(18);
        setUserInterests1("");
        setUserInterests2("");
        setUserIntroduction("");
    };

    return (
        <div>
            <h2>ユーザー</h2>
            <ul>
                {users.map(user =>(
                    <li key={user.id}>
                        ユーザーID: {user.id}<br/>
                        {user.name}: {user.age}歳<br/>
                        興味: {user.interests.join(", ")}<br/>
                        自己紹介: {user.introduction}
                    </li>
                ))}
            </ul>
            <h2>新規登録</h2>
            <span>名前</span><input type="text" value={userName} onChange={e => setUserName(e.target.value)} /><br/>
            <span>年齢</span><input type="number" value={userAge} onChange={e => setUserAge(Number(e.target.value))} /><br/>
            <span>興味1</span><input type="text" value={userInterests1} onChange={e => setUserInterests1(e.target.value)}/><br/>
            <span>興味2</span><input type="text" value={userInterests2} onChange={e => setUserInterests2(e.target.value)} /><br/>
            <span>自己紹介</span><textarea value={userIntroduction} onChange={e => setUserIntroduction(e.target.value)} /><br/>
            <button onClick={signUp}>登録</button>
        </div>
    )
}

export default UserList;