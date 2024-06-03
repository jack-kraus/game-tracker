"use client";

import { MyButton } from "../components/button";
import { useState } from "react";

function clamp(num : number, min : number, max : number) : number {
  return Math.min(Math.max(num, min), max);
}

export default function Home() {
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(1);

  function handleClick(up : boolean) : () => void {
    const amount = offset * (up ? 1 : -1);
    return () => setCount(clamp(count+amount, 0, 100));
  }

  function handleInput(target : any) {
    console.log(typeof target);
    const toNum = parseInt(target.value);
    const value = isNaN(toNum) ? 1 : clamp(toNum, 0, 10);
    setOffset(value);
    target.value = value;
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <h1>Offset: {offset}</h1>
      <MyButton onClick={handleClick(true)} text={"Add"}/>
      <MyButton onClick={handleClick(false)} text={"Subtract"}/>
      <input type="number" onInput={e => {handleInput(e.target)}}></input>
    </>
  );
}