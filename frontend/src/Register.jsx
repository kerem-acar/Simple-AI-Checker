import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function Register (){
    const [text, setText] = useState("");
    const [text1, setText1] = useState("");
    const [showWelcome, setshowWelcome] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleChange1 = (e) => {
        setText1(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const postResponse = await axios.post("http://127.0.0.1:5000/api/register/", { username: text, password: text1 })
        setText("");
        setText1("");
        setshowWelcome(true);
    }
    
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input value={text} placeholder="Username" onChange={handleChange}></input>
                <input value={text1} placeholder="Password" onChange={handleChange1}></input>
                <button type='submit'>Register</button>
            </form>
            <div className={showWelcome === false ? 'welcome-container' : 'welcome-container-open'}>
                <div>
                    <h2>Welcome!</h2>
                    <button>
                        <Link to="/">Ok</Link>
                    </button>
                </div>
            </div>
        </div>

        
        
        

    );

}

export default Register