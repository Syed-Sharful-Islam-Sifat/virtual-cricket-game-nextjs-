import React, { useEffect, useState } from "react";
import TeamSelect from "../components/team-select/TeamSelect";
import styles from "../styles/game.module.css";
import { players } from "../libs/data";
import { teams } from "../libs/data";
import { useRouter } from "next/router";
import Link from "next/link";
const Game = () => {

  
   const [playersA,setPlayersA] = useState([]);
   const [playersB,setPlayersB] = useState([])
  const[teamA,setTeamA] = useState('');
  const[teamB,setTeamB] = useState('');
  const router = useRouter();

  const handleTeamSelect = (choosenTeam,type)=>{
    console.log('choosenTeam and type on handleTeamSelect',choosenTeam,type)
   if(type==='A'){
    setTeamA(choosenTeam);
    setPlayersA(players[choosenTeam]);
   }else{
    setTeamB(choosenTeam);
    setPlayersB(players[choosenTeam]);
   }
  }

  const handleToss = ()=>{
     router.push({
      pathname:'/play',
      query:{teamA,teamB}
     })
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.team_players}>
        <div className={styles.playerListA}>
            <h4>Players of Team A:</h4>
          {playersA.map((player) => (
            <h4 key={player.id}>{player.name}</h4>
          ))}
        </div>
        <div className={styles.middle}>
          <div className={styles.teamSelect}>
            <h4>Select Two Teams</h4>
            <div className={styles.teamA}>
              <TeamSelect team={"A"} opponent={teamB} handleTeamSelect={handleTeamSelect}/>
            </div>

            <div className={styles.teamB}>
              <TeamSelect team={"B"} opponent={teamA} handleTeamSelect={handleTeamSelect}/>
            </div>
          </div>
          <div className={styles.toss}>
            {teams.includes(teamA)&&teams.includes(teamB)?(
              <div className={styles.toss}>
                <button onClick={handleToss}>
                  toss and play
                </button>
              </div>
            ):null

            }
          </div>
        </div>

        <div className={styles.playerListB}>
            <h4>Players of Team B:</h4>
          {playersB.map((player) => (
            <h4 key={player.id}>{player.name}</h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
