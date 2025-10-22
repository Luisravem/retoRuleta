import { GameOutcome } from './gameOutcome/GameOutcome'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Target } from './target/Target'
import appStyles from './app.module.css'



function App() {

const {wheelResult,resultData} = useContext(GlobalContext)



  return (
    <>
      <div className={appStyles.app}>

    {wheelResult ?<GameOutcome data={resultData}></GameOutcome>:<Target></Target>
    
    }
      </div>
    </>
  )
}

export default App
