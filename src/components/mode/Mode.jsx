
import { useContext,  } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import iconAmigos from "../../assets/iconAmigos.svg";
import iconPareja from "../../assets/iconPareja.svg";
import iconParejas from "../../assets/iconParejasSw.svg";
import modeStyles from "./mode.module.css";

export function Mode() {
const {mode,setMode} = useContext(GlobalContext) 
  
  const handleMode = (event) => {
    
    setMode(`${event.currentTarget.id}`);
  };

 

  return (
    <div className={modeStyles.modeContainer}>
      <div className={mode == "1"? modeStyles.divisionModeActive:modeStyles.divisionMode} onClick={handleMode}
          id="1">
        <span className={modeStyles.span} >
          
          <img src={iconAmigos} alt="icono amigos" /> AMIGOS
        </span>
      </div>
      <div className={mode == "2"? modeStyles.divisionModeActive:modeStyles.divisionMode} onClick={handleMode}
          id="2">
        <span className={modeStyles.span}>
          
          <img src={iconPareja} alt="icono pareja" /> PAREJA
        </span>
      </div>
      <div className={mode == "3" ? modeStyles.divisionModeActive:modeStyles.divisionMode} onClick={handleMode}
          id="3">
        <span className={modeStyles.span}>
          
          <img src={iconParejas} alt="icono parejas" /> ONLINE
        </span>
      </div>
    </div>
  );
}
