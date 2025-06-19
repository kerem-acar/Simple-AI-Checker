import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function Login (){
    const [text, setText] = useState("");
    const [text1, setText1] = useState("");
    const [showFail, setshowFail] = useState(false);
    const [showSuccess, setshowSuccess] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleChange1 = (e) => {
        setText1(e.target.value);
    };

    const handleSubmit = async (e) => {
        try{
        e.preventDefault()
        const postResponse = await axios.post("http://127.0.0.1:5000/api/login/", { username: text, password: text1 })
        setText("");
        setText1("");
        setshowSuccess(true);
        }
        catch{
            setshowFail(true);
        }
    };

    const handleFail = () => {
        setshowFail(false);
        setText("");
        setText1("");
    };

    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input value={text} placeholder="Username" onChange={handleChange}></input>
                <input value={text1} placeholder="Password" onChange={handleChange1}></input>
                <button type='submit'>Log In</button>
            </form>
            <div className={showFail === false ? 'loginfail-container' : 'loginfail-container-open'}>
                <div>
                    <h2>Try Again!</h2>
                    <button onClick={handleFail}>Ok</button>
                </div>
            </div>
            <div className={showSuccess === false ? 'loginsuccess-container' : 'loginsuccess-container-open'}>
                <div>
                    <h2>Success!</h2>
                    <button>
                        <Link to="/">Ok</Link>
                    </button>
                </div>
            </div>
        </div>

        
        
        

    );

}

export default Login