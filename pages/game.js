import React from "react";
import TeamSelect from "../components/team-select/TeamSelect";
import styles from "../styles/game.module.css";
import { players } from "../libs/data";

const Game = () => {
  const playersA = players["Bangladesh"];
  const playersB = players["England"];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.team_players}>
        <div className={styles.playerListA}>
            <h4>Players of Team A:</h4>
          {playersA.map((player) => (
            <h4>{player.name}</h4>
          ))}
        </div>
        <div className={styles.middle}>
          <div className={styles.teamSelect}>
            <h4>Select Two Teams</h4>
            <div className={styles.teamA}>
              <TeamSelect team={"A"} />
            </div>

            <div className={styles.teamB}>
              <TeamSelect team={"B"} />
            </div>
          </div>
        </div>

        <div className={styles.playerListB}>
            <h4>Players of Team B:</h4>
          {playersB.map((player) => (
            <h4>{player.name}</h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
