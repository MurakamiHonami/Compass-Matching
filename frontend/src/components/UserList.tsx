import React, {useEffect,useState} from "react";
import axios from "axios"

interface User {
    id: number;
    name: string;
    age:  number;
    interests: string[];
    introduction: string;
    percent: number;
}

const UserList: React.FC =()=>{
    const [users,setUsers]=useState<User[]>([]);

    useEffect(()=>{
        const fetchUsers = async () =>{
            const response = await axios.get("http://127.0.0.1:5000/api/users");
            setUsers(response.data);
        };
        fetchUsers();
    },[]);

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
        </div>
    )
}

export default UserList;