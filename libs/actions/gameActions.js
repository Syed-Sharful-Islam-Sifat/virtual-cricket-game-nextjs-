const gameActions = {
    SET_PLAYERS: async(payload,state,dispatch)=>{

        const {playersTeamA,playersTeamB,teamA,teamB} = payload;
        console.log('teamA teamB',playersTeamA,playersTeamB)
        const newState = {...state};
        newState.players = [...playersTeamA,...playersTeamB];
        return{
            players:newState.players
        }
    },

    ADD_MESSAGE: async(payload,state,dispatch)=>{
       return{
         ...state,
         allMessages:[
            ...state.allMessages,
            payload.message
         ]
       }
    },

    
   CREATE_MESSAGE: async(payload,state,dispatch)=>{
    console.log('payload on create message action',payload)
    const res = await fetch(`/api/messages`,{
      method: 'POST',
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
     
    const message = await res.json();
    console.log('message on create message action',message)
    dispatch(messageActions.ADD_MESSAGE,{message})
   } 
}



export default gameActions