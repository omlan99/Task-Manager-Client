import React, { useState } from "react";

const Banner = () => {
const [box, setBox] = useState([]) 
console.log(box)
const addDiv = () =>{
      setBox([...box,box.length])
}
  return (
    <div>
      {
        box.map((element, index)=><div>Box No : {index} </div>)
      }
      <button onClick={addDiv} className="btn">Create DIV</button>
    </div>
  );
};


export default Banner;
