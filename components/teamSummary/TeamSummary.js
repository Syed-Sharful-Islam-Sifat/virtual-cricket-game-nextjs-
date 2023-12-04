import React, { useState } from 'react'
import styles from '../teamSummary/teamSummary.module.css'
import { useStat } from '../../providers/playerStatProvider';
const TeamSummary = ({ battingTeam, bowlingTeam, team }) => {

  const [state, dispatch] = useStat();
  const oversPlayed = Math.floor(team.overs / 6);

  const extraBall = (team.overs) - oversPlayed * 6
  return (


    <div className={styles.scoreContainer}>
      <div className={styles.battingFirst}>
        <div className={styles.teamScores}>
          <div className={styles.teamName}>
            <h4>{team.country}</h4>
          </div>

          <div className={styles.overs}>
            <h4>{oversPlayed}.{extraBall} Over</h4>
          </div>
          <div className={styles.scoreDetails}>
            <h4>{team.runs}/{team.wicketsFallen}</h4>
          </div>
        </div>
        <div className={styles.playerDetails}>
          <div className={styles.batsman}>

            <div className={styles.batsmanScore}>
              <h5>
                {battingTeam[0]?.name}  {battingTeam[0]?.ballPlayed}({battingTeam[0]?.runs})
              </h5>
            </div>

            <div className={styles.batsmanScore}>
              <h5>
                {battingTeam[1]?.name}  {battingTeam[1]?.ballPlayed}({battingTeam[1]?.runs})
              </h5>
            </div>

            <div className={styles.batsmanScore}>
              <h5>
                {battingTeam[2]?.name}  {battingTeam[2]?.ballPlayed}({battingTeam[2]?.runs})
              </h5>
            </div>

          </div>

          <div className={styles.bowler}>

            <div className={styles.bowlerScore}>
              <h5>
                {bowlingTeam[0]?.name}  {bowlingTeam[0]?.runGiven} / {bowlingTeam[0]?.wickets}
              </h5>
            </div>

            <div className={styles.bowlerScore}>
              <h5>
              {bowlingTeam[1]?.name} { bowlingTeam[1]?.runGiven} / {bowlingTeam[1]?.wickets}
              </h5>
            </div>

            <div className={styles.bowlerScore}>
              <h5>
              {bowlingTeam[2]?.name}  { bowlingTeam[2]?.runGiven} / {bowlingTeam[2]?.wickets}
              </h5>
            </div>

          </div>
        </div>
      </div>
    </div>







  )
}

export default TeamSummary