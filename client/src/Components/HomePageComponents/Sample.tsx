import  { useState } from "react";

function Sample() {
    const [name,setName]=useState("");
 function handleclick(){
    alert(name);
    setName("");
 }
  return (
    <div className="text-white">
      <h1>Enter Name</h1>
      <input type="text" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={handleclick}>display</button>
    </div>
  );
}

export default Sample;
