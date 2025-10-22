import { createContext, useEffect, useState } from "react";
import { cargarRetos } from "../services/retosServices";
export const GlobalContext = createContext();

export function ContextProvider({ children }) {
  const [mode, setMode] = useState(0);

  const [difficulty, setDifficulty] = useState(0);

  const [wheelResult, setWheelRasult] = useState(null);
  const [resultData, setResultData] = useState(null);
console.group(resultData ,"desde globalContext")
  useEffect(() => {
    if(!wheelResult){
      cargarRetos(mode, difficulty).then((data) => {
      
      setResultData(data[Math.floor(Math.random(0) * data.length)]);
    })
    }
  }, [wheelResult,difficulty,mode]);

  return (
    <GlobalContext.Provider
      value={{
        difficulty,
        setDifficulty,
        mode,
        setWheelRasult,
        wheelResult,
        setMode,
        resultData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
