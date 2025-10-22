import { Header } from "../header/Header";
import { GameWheel } from "../gameWheel/GameWheel";
import {Intensity} from "../intensity/Intensity.jsx";
import targetStyles from "./target.module.css";



export function Target() {
  return <div className={targetStyles.target}>
    <Header></Header>
   <GameWheel></GameWheel>
  <Intensity></Intensity>
  </div>
}
