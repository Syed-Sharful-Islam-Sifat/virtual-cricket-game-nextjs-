import React, { useState } from 'react'
import styles from '../teamSummary/teamSummary.module.css'
import { useStat } from '../../providers/playerStatProvider';
const TeamSummary = ({team,ball}) => {

    const [state,dispatch] = useStat();
    
  return (
    <div className={styles.batFirstTeam}>
    <table>
      <tr>
        <div className={styles.totalScore}>
           <h4>{state.batFirstTeam.country}</h4>   
            <h4>{state.batFirstTeam.overs} . {ball}</h4>
            <h4>{state.batFirstTeam.runs}/{state.batFirstTeam.wicketsFallen}</h4>
        </div>
      </tr>

      <tr>
        <div className={styles.batsman}>
          <h5>{team[0]?.name}: {team[0]?.runs}</h5>
        </div>
      </tr>

      <tr>
      <div className={styles.batsman}>
          <h5>{team[1]?.name}: {team[1]?.runs}</h5>
        </div>
      </tr>

      <tr>
      <div className={styles.batsman}>
          <h5>{team[2]?.name}: {team[2]?.runs}</h5>
        </div>
      </tr>
    </table>
  </div>

  )
}

export default TeamSummary