import React, {useState} from 'react';
import axios from "axios";

function Body() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [showResult, setshowResult] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postResponse = await axios.post("http://127.0.0.1:5000/api/users/", { input: text });
        const userId = postResponse.data.id;
        setText('');
        await axios.get(`http://127.0.0.1:5000/api/users/${userId}/script/`);
        const getResponse = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
        setResult(getResponse.data.result);
        setshowResult(true);

        
    };

    const handleClose = () => {
        setshowResult(false);
        setResult('');
    };
    


    return (
        <div className="body-container">
            <form onSubmit={handleSubmit} className="textbox-container">
                <textarea value={text} name="text" placeholder="Paste text (at least 150 characters)" className='textbox' onChange = {handleChange} maxLength={1000}/>
                <button className='submit-button' type='submit' disabled={text.length < 150}>Run</button>
                <p className='character-counter'>{text.length}/1000 characters</p>
            </form>
            <div className={showResult === false ? 'result-container' : 'result-container-open'}>
                <div className='inner-container'>
                    <h2 className='result-text'>{result}</h2>
                    <p className='result-paragraph'>likelihood that this text was AI generated</p>
                    <button className='close-button' onClick={handleClose}>OK</button>    
                </div>
            </div>
        </div>
    );
}

export default Body;