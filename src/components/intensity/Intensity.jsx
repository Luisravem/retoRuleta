import chili from "../../assets/chili.png";
import { useContext, useEffect } from "react";
import {GlobalContext} from "../../context/GlobalContext";
import intensityStyles from "./intensity.module.css";


export function Intensity() {

 const {difficulty, setDifficulty} = useContext(GlobalContext) 
  
  const handleActive = (event) => {
    
    setDifficulty(`${event.currentTarget.id}`);
  };

  
  return (
    <section className={intensityStyles.containerIntensity}>
      <div className={intensityStyles.intensityItem}>
        <span>suave</span>
        <div
          className={
            difficulty == "1"
              ? intensityStyles.activeStyles
              : intensityStyles.containerChili
          }
          onClick={handleActive}
          id="1"
          
        >
          <img src={chili} alt="" />
        </div>
      </div>
      <div className={intensityStyles.intensityItem}>
        <span>medio</span>
        <div
          id="2"
          className={
            difficulty == "2"
              ? intensityStyles.activeStyles
              : intensityStyles.containerChili
          }
          onClick={handleActive}
        
          
        >
          <img src={chili} alt="" />
          <img src={chili} alt="" />
        </div>
      </div>
      <div className={intensityStyles.intensityItem}>
        <span>extremo</span>
        <div
          className={
            difficulty == "3"
              ? intensityStyles.activeStyles
              : intensityStyles.containerChili
          }
          onClick={handleActive}
          id="3"
        >
          <img src={chili} alt="" />
          <img src={chili} alt="" />
          <img src={chili} alt="" />
        </div>
      </div>
    </section>
  );
}

//  <div className={intensityStyles.intensity}>
//          <span className={intensityStyles.spanText}>suave</span>
//         <div className={intensityStyles.contentChili}>

//           <img className={intensityStyles.imageChill} src={chili} alt="f" />
//         </div>
//       </div>
//       <div className={intensityStyles.intensity}>
//         <span className={intensityStyles.spanText}>medio</span>
//         <div className={intensityStyles.contentChili}>
//           <img className={intensityStyles.imageChill} src={chili} alt="f" />
//           <img className={intensityStyles.imageChill} src={chili} alt="f" />
//         </div>
//       </div>
//       <div className={intensityStyles.intensity}>
//         <span className={intensityStyles.spanText}>extremo</span>
//         <div className={intensityStyles.contentChili}>
//           <img className={intensityStyles.imageChill} src={chili} alt="f" />
//           <img className={intensityStyles.imageChill} src={chili} alt="f" />
//           <img className={intensityStyles.imageChill} src={chili} alt="f" />
//         </div>
//       </div>
