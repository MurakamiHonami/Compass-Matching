import React, { useState } from "react";
import { User } from "./Data"
import "../App.css"

interface LoginProps {
    onLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [isRegister, setIsRegister]=useState(false);
    const [userName,setUserName]=useState("");
    const [password, setPassword]=useState("");
    const [userAge,setUserAge]=useState(18);
    const [image,setImage]=useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [reasons,setReasons]=useState("");
    const [financialSense,setFinancialSense]=useState("");
    const [workLifeBalance,setWorkLifeBalance]=useState("");
    const [vision,setVision]=useState("");
    const [distance,setDistance]=useState("");
    
    
    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || e.target.files.length === 0) return;
        const img = e.target.files[0];
        setImage(img)

        const url = URL.createObjectURL(img);
        setPreviewUrl(url);
    }

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();

        //バリデージョン
        if ((isRegister && (!image || !reasons || !financialSense || !workLifeBalance || !vision || !distance)) || !userName || !password) {
            alert("⚠️未入力の項目があります")
            return;
        }

        try {
            const endpoint = isRegister ? "/api/register" : "/api/login";
            const formData = new FormData();
            formData.append("name",userName);
            formData.append("password",password);
            if (isRegister) {
                formData.append("age",String(userAge));
                if (image) formData.append("image",image);
                const valueObj = {
                    reasons: reasons,
                    workLifeBalance: workLifeBalance,
                    financialSense: financialSense,
                    vision: vision,
                    distance: distance
                }
                formData.append("values", JSON.stringify(valueObj));
            }

            const response = await fetch(`http://127.0.0.1:5000${endpoint}`,{
                method: "POST",
                body: formData,
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "リクエストに失敗しました");
            }

            const data = await response.json();

            if (isRegister) {
                alert("登録が完了しました。ログイン画面へ移行します。")
                setIsRegister(false);
            } else {
                onLoginSuccess(data.user);
            }
            setUserName("");
            setUserAge(18);
            setImage(undefined);
            setPreviewUrl(null);
            setReasons("");
            setWorkLifeBalance("");
            setFinancialSense("");
            setVision("");
            setDistance("");
        } catch (error) {
            console.log(`Error:${error}`)
            alert("登録に失敗しました:");
        }
    };
    return(
        <div>
            <h2>{isRegister ? "新規登録" : "ログイン"}</h2>
            <form onSubmit={handleSubmit}>      
                <p>
                    ユーザー名:
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </p>
                <p>
                    パスワード
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </p>
                {isRegister &&
                <div>

                    <p>
                        プロフィール画像:
                        <input
                            type="file"
                            name="image"
                            accept="image/*,.png,.jpg,.jpeg,.gif"
                            onChange={getImage}
                        />
                        {previewUrl && (
                            <div>
                            <p>プレビュー:</p>
                            <img
                                src={previewUrl}
                                alt="プロフィール画像"
                                style={{ width: "50px" }}
                                />
                        </div>
                        )}
                    </p>
                    <p>
                        年齢:
                        <input
                            
                            type="number"
                            value={userAge}
                            onChange={e => setUserAge(Number(e.target.value))}
                            />
                    </p>
                    <p>
                        DINKsを希望する理由
                        <textarea value={reasons} onChange={e => setReasons(e.target.value)}/>
                    </p>
                    <p>
                        仕事と生活の優先度
                        <textarea value={workLifeBalance} onChange={e => setWorkLifeBalance(e.target.value)} />
                    </p>
                    <p>
                        金銭感覚 <small>(自己投資,他者貢献,貯蓄,etc...)</small>
                        <textarea value={financialSense} onChange={e => setFinancialSense(e.target.value)} />
                    </p>
                    <p>
                        将来像 <small>(どこに住みたいか,どんな仕事をしている,時間をどうつかいたい,etc...)</small>
                        <textarea value={vision} onChange={e => setVision(e.target.value)} />
                    </p>
                    <p>
                        好ましい距離感 <small>(共有する時間の長さ,同居/別居,etc...)</small>
                        <textarea value={distance} onChange={e => setDistance(e.target.value)} />
                    </p>
                </div>
                }
                <button type="submit">
                    {isRegister ? "新規登録" : "ログイン"}
                </button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "すでに登録済みの方" : "初めての方"}
            </button>
        </div>
    );
};

export default Login;