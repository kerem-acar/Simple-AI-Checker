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
        const token = postResponse.data.access_token;
        localStorage.setItem("token", token)
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
        <div className='min-h-screen bg-red-100'>
            <h1 className="font-mono text-[60px] text-violet-600 flex justify-center">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col pt-4 items-center gap-4 pointer-events-auto">
                <input className="font-serif text-[20px] w-30 rounded-md border-1 border-gray-600 focus:border-pink-600 pl-2" value={text} placeholder="Username" onChange={handleChange}></input>
                <input className="font-serif text-[20px] w-30 rounded-md border-1 focus:border-red-600 border-gray-600 pl-2" type="password" value={text1} placeholder="Password" onChange={handleChange1}></input>
                <button className="cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md w-20 border-none font-mono" type='submit'>Submit</button>
            </form>
            <div className={showFail === false ? 'hidden' : 'fixed inset-0 flex justify-center items-center z-1000'}>
                <div className='border-2 rounded-lg w-80 h-40 bg-red-300 flex justify-center flex-col items-center gap-4'>
                    <h2 className="font-mono text-[30px] ">Try Again!</h2>
                    <button class="cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md w-20 border-none font-mono text-white py-0.5 px-6" onClick={handleFail}>Ok</button>
                </div>
            </div>
            <div className={showSuccess === false ? 'hidden' : 'fixed inset-0 flex justify-center items-center z-1000'}>
                <div className='border-2 rounded-lg w-80 h-40 bg-red-300 flex justify-center flex-col items-center gap-4'>
                    <h2 className="font-mono text-[30px]">Success!</h2>
                    <button>
                        <Link to="/" className='cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md w-20 border-none font-mono text-white py-0.5 px-6'>Ok</Link>
                    </button>
                </div>
            </div>
        </div>

        
        
        

    );

}

export default Login