;
import { createContext, useContext } from "react"
import { useActionDispatcher } from "../hooks/use-action-dispatcher";

export const  StatContext = createContext();

export const useStat = ()=>{
    return useContext(StatContext)
}
export const StatProvider = ({children})=>{
    
    const[state,dispatch] = useActionDispatcher({
      players:[

      ],
      teamA:{
        runs: 0,
        wicketsFallen:0
      },
      teamB:{
        runs:0,
        wicketsFallen:0
      }
    })

    return(
        <StatContext.Provider value = {[state,dispatch]}>
            {children}
        </StatContext.Provider>
    )

}