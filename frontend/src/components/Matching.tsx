import React, { useState } from "react";
import axios from "axios";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { User } from "./Data";


interface MatchScore {
    values: string;
    score: number;
}

interface MatchUser {
    id: number;
    name: string;
    age: number;
    totalScore: number;
    matchScore: MatchScore[];
    imageUrl?: string;
}

interface UserProps {
    currentUser: User;
}

const Matching: React.FC<UserProps> =({ currentUser })=>{
    const [matches,setMatches]=useState<MatchUser[]>([]);
    const [loading, setLoading]=useState(false);
    
    const handleMatch = async ()=>{
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/match',{
                userId: currentUser.id
            });
            setMatches(response.data);
        } catch (error) {
            alert("マッチングデータの取得に失敗しました")
            console.log(`Error:${error}`);
        } finally {
            setLoading(false)
        }
    };


return (
    <div>
        <h2>価値観の近い相手を探す</h2>
        <button onClick={handleMatch}>
            {loading ? "計算中...": "計算開始"}
        </button>
       <div>
            {matches.map((match)=>(
                <div key={match.id}>
                    <div style={{display:"flex"}}>
                        <img src={match.imageUrl} alt={`${match.name}の画像`} style={{width:"10vw"}} />
                        <div>
                            <h3>{match.name} <small>{match.age}歳</small></h3>
                            <p><strong>総合類似度:</strong>{match.totalScore}%</p>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={match.matchScore}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="values" tick={{fontSize:12}}/>
                                <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Match Score"
                                    dataKey="score"
                                    stroke="#00FFFF"
                                    fill="#FFFF66"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
       </div>
    </div>
)
}

export default Matching;