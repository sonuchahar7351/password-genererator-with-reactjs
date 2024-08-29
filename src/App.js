import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState();
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "1234567890";
    if (charallowed) str += "@#$%&*()?/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberallowed, charallowed, passwordgenerator]);

  const copy = () => {
    window.navigator.clipboard.writeText(password);
  };
  return (
    <>
      <div className="main">
        <div className="hidden">copied</div>
        <div className="input">
          <input type="text" value={password} readOnly onChange={setpassword} />
          <button onClick={copy}>copy</button>
        </div>
        <div className="length">
          <div className="range length">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <p>length:{length}</p>
          </div>
          <div className="number length checkbox">
        
            <input type="checkbox" 
               defaultChecked={numberallowed}
               onChange={()=>{
                 setnumberallowed((prev)=>!prev);
               }}
            />
            <p id="number">number</p>
          </div>
          <div className="char length checkbox">
            <input type="checkbox" 
               defaultChecked={charallowed}
               onChange={()=>{
                setcharallowed((prev)=>!prev);
               }}

            />
            <p id="char">symbols</p>
          </div>
        </div>
          <button onClick={passwordgenerator} id="change">change</button>
      </div>
    </>
  );
}

export default App;
