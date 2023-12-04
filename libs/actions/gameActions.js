const gameActions = {
    SET_PLAYERS: (payload,state,dispatch)=>{

        const {playersTeamA,playersTeamB,teamA,teamB} = payload;
        console.log('players of team A',playersTeamA);
        console.log('players of team B',playersTeamB)
        console.log('teamA teamB',playersTeamA,playersTeamB)
        const newState = {...state};
        newState.players = [...playersTeamA,...playersTeamB];
        return{
            ...newState
        }
    },
    ADD_EXTRA_RUN: (payload,state,dispatch)=>{

        const {batTeam} = payload;
        const newState = {...state};
        
        console.log('ADD EXTRA RUN',batTeam,newState.batFirstTeam.country,newState.batSecondTeam.country);
        if(batTeam===newState.batFirstTeam.country){
          newState.batFirstTeam.runs = newState.batFirstTeam.runs + 1;
        }else{
          newState.batSecondTeam.runs = newState.batSecondTeam.runs + 1;
        }
        return{
            ...newState
        }
    },
    
    ADD_WICKETS: (payload,state,dispatch)=>{
      const { batsmanId,bowlerId ,batTeam} = payload;
      const batsmanIndex = state.players.findIndex(player => player.id === batsmanId);
      const bowlerIndex = state.players.findIndex(player => player.id === bowlerId);
      
      const updatedBatsman = {
        ...state.players[batsmanIndex],
        ballPlayed:state.players[batsmanIndex]?.ballPlayed + 1,
      };
      
      const newState = {
        ...state,
        players: [
          ...state.players.slice(0, batsmanIndex),
          updatedBatsman,
          ...state.players.slice(batsmanIndex + 1),
        ],
      };
      
      const updatedBowler = {
        ...newState.players[bowlerIndex],
        overs:newState.players[bowlerIndex]?.overs + 1,
        wickets:newState.players[bowlerIndex]?.wickets + 1,
      }
      console.log('ADD_BOWL',updatedBatsman,updatedBowler)

           const finalState = {
            ...newState,
            players: [
              ...newState.players.slice(0, bowlerIndex),
              updatedBowler,
              ...newState.players.slice(bowlerIndex + 1),
          ],
           }

          if(batTeam===finalState.batFirstTeam.country){
             finalState.batFirstTeam.overs =   finalState.batFirstTeam.overs + 1;
             finalState.batFirstTeam.wicketsFallen = finalState.batFirstTeam.wicketsFallen + 1;
          }else{
            finalState.batSecondTeam.overs =   finalState.batSecondTeam.overs + 1;
            finalState.batSecondTeam.wicketsFallen = finalState.batSecondTeam.wicketsFallen + 1;
          }
          
          return{
            ...finalState
          }
  

  

    },
    SET_BATTING_TEAM: (payload,state,dispatch)=>{
        
      const {batFirstTeam,batSecondTeam} = payload;
     
      const newState = {...state};
      newState.batFirstTeam.country = batFirstTeam;
      newState.batSecondTeam.country = batSecondTeam;
      return{
        ...newState
      }
       
    },
    RESULT_FIXED: (payload,state,dispatch)=>{
        
      const {matchResult} = payload;
     
      const newState = {...state};
      newState.matchResult = matchResult;
      return{
        ...newState
      }
       
    },
    ADD_BOWL: (payload,state,dispatch)=>{
        
      const { playerId } = payload;
     
      const playerIndex = state.players.findIndex(player => player.id === playerId);
          
          const updatedPlayer = {
              ...state.players[playerIndex],
              overs:state.players[playerIndex]?.overs + 1,
          };

          console.log('updatedPlayer on ADD_BOWL',updatedPlayer);

          const newState = {
            ...state,
            players: [
                ...state.players.slice(0, playerIndex),
                updatedPlayer,
                ...state.players.slice(playerIndex + 1),
            ],
        };

        return{
          ...newState
        }
       
    },
    
    

    ADD_RUN: (payload,state,dispatch)=>{
      const { batsmanId,bowlerId ,batTeam , score} = payload;
      const batsmanIndex = state.players.findIndex(player => player.id === batsmanId);
      const bowlerIndex = state.players.findIndex(player => player.id === bowlerId);
      
      const updatedBatsman = {
        ...state.players[batsmanIndex],
        runs:state.players[batsmanIndex]?.runs + score,
        ballPlayed:state.players[batsmanIndex]?.ballPlayed + 1,
      };

   

      
      console.log('ADD_RUN',updatedBatsman,updatedBowler)
        

          const newState = {
              ...state,
              players: [
                  ...state.players.slice(0, batsmanIndex),
                  updatedBatsman,
                  ...state.players.slice(batsmanIndex + 1),
              ],
          };

          const updatedBowler = {
            ...newState.players[bowlerIndex],
            overs:newState.players[bowlerIndex]?.overs + 1,
            runGiven:newState.players[bowlerIndex]?.runGiven + score
           }

           const finalState = {
            ...newState,
            players: [
              ...newState.players.slice(0, bowlerIndex),
              updatedBowler,
              ...newState.players.slice(bowlerIndex + 1),
          ],
           }

          if(batTeam===finalState.batFirstTeam.country){
             finalState.batFirstTeam.runs = finalState.batFirstTeam.runs + score;
             finalState.batFirstTeam.overs =   finalState.batFirstTeam.overs + 1;
          }else{
            finalState.batSecondTeam.runs = finalState.batSecondTeam.runs + score;
            finalState.batSecondTeam.overs =   finalState.batSecondTeam.overs + 1;
          }
          
          return{
            ...finalState
          }
  

    
    },

    SET_STATE:(payload,state,dispatch)=>{
     
      return{
    players: [],
    batFirstTeam: {
      runs: 0,
      wicketsFallen: 0,
      overs: 0,
      country: '',
    },
    batSecondTeam: {
      runs: 0,
      wicketsFallen: 0,
      overs: 0,
      country: '',
    },
    matchResult: {},

      }
    
    }

    
}



export default gameActions