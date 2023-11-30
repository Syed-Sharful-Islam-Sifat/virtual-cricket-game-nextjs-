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
      batFirstTeam:{
        runs: 0,
        wicketsFallen:0,
        overs:0,
        country:''
      },
      batSecondTeam:{
        runs:0,
        wicketsFallen:0,
        overs:0,
        country:''
      },
      matchResult:{

      }
    })

    return(
        <StatContext.Provider value = {[state,dispatch]}>
            {children}
        </StatContext.Provider>
    )

}