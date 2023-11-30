import { useState } from "react";
import { useStat } from "../providers/playerStatProvider";
import { useEffect } from "react";
import styles from "../styles/matchSummary.module.css";
import TeamSelect from "../components/team-select/TeamSelect";
import TeamSummary from "../components/teamSummary/TeamSummary";
const MatchSummary = () => {
  const [state, dispatch] = useStat();

  const [batsmanBatFirst, setBatsmanBatFirst] = useState([]);
  const [batsmanBatSecond, setBatsmanBatSecond] = useState([]);
  const [bowlerBatFirst, setBowlerBatFirst] = useState([]);
  const [bowlerBatSecond, setBowlerBatSecond] = useState([]);
  let overPlayedByBatFirst = (state.batFirstTeam.overs / 6)
  let ballPlayedByBatFirst = (overPlayedByBatFirst * 6);
  ballPlayedByBatFirst = state.batFirstTeam.overs - ballPlayedByBatFirst;
  const firstBattingTeam = state.batFirstTeam.country;
  const secondBattingTeam = state.batSecondTeam.country;

  useEffect(() => {
    const batsmanFirst = state.players
      .filter((player) => player.country === firstBattingTeam)
      .sort((a, b) => b.runs - a.runs)
      .slice(0, 3);

    setBatsmanBatFirst(batsmanFirst);

    // Filter and sort bowlers for the first batting team
    const bowlersFirst = state.players
      .filter((player) => player.country === firstBattingTeam)
      .sort((a, b) => b.wickets - a.wickets)
      .slice(0, 3);

    setBowlerBatFirst(bowlersFirst);

    // Similar logic for the second batting team
    const batsmenSecond = state.players
      .filter((player) => player.country === secondBattingTeam)
      .sort((a, b) => b.runs - a.runs)
      .slice(0, 3);

    setBatsmanBatSecond(batsmenSecond);

    const bowlersSecond = state.players
      .filter((player) => player.country === secondBattingTeam)
      .sort((a, b) => b.wickets - a.wickets)
      .slice(0, 3);

    setBowlerBatSecond(bowlersSecond);
  }, []);

  console.log(
    "BatsmanBatFirst BatsmanBatSecond bowlerBatFirst bowlerBatSecond",
    batsmanBatFirst,
    batsmanBatSecond,
    bowlerBatFirst,
    bowlerBatSecond
  );

  return (
    <div className={styles.matchSummaryContainer}>
      <div className={styles.summaryHeadingContainer}>
        <div className={styles.matchSummaryHeading}>
          <h3>Match Summary</h3>
        </div>
      </div>
      <div className={styles.batFirstTeam}>
        <TeamSummary battingTeam={batsmanBatFirst}  bowlingTeam = {bowlerBatSecond} team={state.batFirstTeam}/>
      </div>
      <div className={styles.bowlFirstTeam}>
        <TeamSummary battingTeam={batsmanBatSecond} bowlingTeam={bowlerBatFirst} team={state.batSecondTeam}/>
      </div>

      <div className={styles.resultContainer}>
        <div className={styles.result}>
          <h4>{state.matchResult}</h4>
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;
