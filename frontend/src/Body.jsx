import React, {useState} from 'react';
import axios from "axios";

function Body() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [showResult, setshowResult] = useState(false);
    const [showFail, setshowFail] = useState(false);
    const [showCharacter, setshowCharacter] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.length < 150) {
            setshowCharacter(true);
            return;
        }
        try{
        const token = localStorage.getItem("token");
        const postResponse = await axios.post("http://127.0.0.1:5000/api/users/", { input: text }, {headers: {Authorization: `Bearer ${token}`}});
        const userId = postResponse.data.id;
        setText('');
        await axios.get(`http://127.0.0.1:5000/api/users/${userId}/script/`);
        const getResponse = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
        setResult(getResponse.data.result);
        setshowResult(true);
        }
        catch{
            setshowFail(true);
        }

        
    };

    const handleClose = () => {
        setshowResult(false);
        setResult('');
    };
    
    const handleFail = () => {
        setshowFail(false);
    }

    const handleClose1 = () => {
        setshowCharacter(false);
    }

    return (
        <div className="body-container">
            <form onSubmit={handleSubmit} className="textbox-container">
                <textarea value={text} name="text" placeholder="Paste text (at least 150 characters)" className='textbox' onChange = {handleChange} maxLength={1000}/>
                <button className='submit-button' type='submit'>Run</button>
                <p className='character-counter'>{text.length}/1000 characters</p>
            </form>
            <div className={showResult === false ? 'result-container' : 'result-container-open'}>
                <div className='inner-container'>
                    <h2 className='result-text'>{result}</h2>
                    <p className='result-paragraph'>likelihood that this text was AI generated</p>
                    <button className='close-button' onClick={handleClose}>OK</button>    
                </div>
            </div>
            <div className={showFail === false ? 'hidden' : 'fixed inset-0 flex justify-center items-center z-1000'}>
                <div className='border-2 rounded-lg w-80 h-40 bg-red-300 flex justify-center flex-col items-center gap-4'>
                    <h2 className='font-mono text-[30px]'>Must be Logged In</h2>
                    <button onClick={handleFail} className='cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md w-20 border-none font-mono text-white py-0.5 px-6'>Ok</button>
                </div>
            </div>
            <div className={showCharacter === false ? 'hidden' : 'fixed inset-0 flex justify-center items-center z-1000'}>
                <div className='border-2 rounded-lg w-80 h-40 bg-red-300 flex justify-center flex-col items-center gap-4'>
                    <h2 className='font-mono text-[20px]'>Text must be 150 characters</h2>
                    <button onClick={handleClose1} className='cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md w-20 border-none font-mono text-white py-0.5 px-6'>Ok</button>
                </div>
            </div>
        </div>
    );
}

export default Body;