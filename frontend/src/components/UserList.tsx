import React, {useEffect,useState} from "react";
import axios from "axios"
import { User } from "./Data"

interface UserProps {
    currentUser: User;
}

const UserList: React.FC<UserProps> =( { currentUser })=>{
    const [users,setUsers]=useState<User[]>([]);

    useEffect(()=>{
        const fetchUsers = async () =>{
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/users");
                setUsers(response.data);
            } catch (error) {
                alert("ユーザーの取得に失敗しました")
                console.error("ユーザー取得失敗",error);
            }
        };
        fetchUsers();
    },[]);

    return (
        <div>
            <h2>ユーザー</h2>
            <ul>
                {users.filter(user => user.name!==currentUser.name).map((user) =>(
                    <ul key={user.id}>
                        <p><strong>Name:</strong>{user.name}</p>
                        <img src={user.imageUrl} alt={`${user.name}の画像`} style={{width:"12vw"}} />
                        <p><strong>Age:</strong>{user.age}</p>
                        <p><strong>Reasons:</strong>{user.values.reasons}</p>
                        <p><strong>Priority:</strong>{user.values.workLifeBalance}</p>
                        <p><strong>Financial:</strong>{user.values.financialSense}</p>
                        <p><strong>Vision:</strong>{user.values.vision}</p>
                        <p><strong>Distance:</strong>{user.values.distance}</p>
                    </ul>
                ))}
            </ul>
        </div>
    )
}

export default UserList;