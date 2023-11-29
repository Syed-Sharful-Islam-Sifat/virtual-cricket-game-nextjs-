import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import { useStat } from "../providers/playerStatProvider";
import gameActions from "../libs/actions/gameActions";
import { players } from "../libs/data";
import styles from "../styles/play.module.css";
const Play = () => {
  const router = useRouter();
  const { teamA, teamB } = router.query;
  const options = ["Bat", "Bowl"];
  const teams = [teamA, teamB];
  const [tossTeam, setTossTeam] = useState("");
  const [decision, setDecision] = useState("");
  const [batTeam, setBatTeam] = useState("");
  const [bowlTeam, setBowlTeam] = useState("");
  const [tossDecision, setTossDecision] = useState("");
  const [playersTeamA, setPlayersTeamA] = useState(players[teamA]);
  const [playersTeamB, setPlayersTeamB] = useState(players[teamB]);
  const [ponitToNextBatsman, setPointToNextBatsman] = useState(2);
  const [currentBowlerIndex, setCurrentBowlerIndex] = useState(10);
  const [overs, setOvers] = useState(0);
  const [bowlCount, setBowlCount] = useState([]);
  const [target, setTarget] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [score, setScore] = useState(null);
  const randomScores = [0, 1, 2, 3, 4, 6, "Wide", "NoBall", "W"];

  const [currentBatsman, setCurrentBatsman] = useState({
    strikeBatsman: {},
    nonStrikeBatsman: {},
    nextBatsman: {},
  });

  const [currentBowler, setCurrentBowler] = useState({
    bolwer: {},
    lastBowler: {},
  });
  const [state, dispatch] = useStat();

  useEffect(() => {
    const teamWinningToss = Math.floor(Math.random() * teams.length);
    console.log("teamWiningToss", teams[teamWinningToss]);
    setTossTeam(teams[teamWinningToss]);
    const decisionIndex = Math.floor(Math.random() * options.length);
    setDecision(options[decisionIndex]);
  }, []);

  useEffect(() => {
    if (tossTeam && decision) {
      setTossDecision(
        `${tossTeam} has won the toss and elected to ${decision} first`
      );
      if (decision === "Bat") {
        setBatTeam(tossTeam);
        setBowlTeam(teamA === tossTeam ? teamB : teamA);
      } else {
        setBowlTeam(tossTeam);
        setBatTeam(teamA === tossTeam ? teamB : teamA);
      }
    }
  }, [tossTeam, decision]);

  useEffect(() => {
    if (batTeam && bowlTeam) {
      dispatch(gameActions.SET_PLAYERS, {
        playersTeamA,
        playersTeamB,
        teamA,
        teamB,
      });

      setCurrentBatsman({
        strikeBatsman: players[batTeam][0],
        nonStrikeBatsman: players[batTeam][1],
        nextBatsman: players[batTeam][ponitToNextBatsman],
      });

      setCurrentBowler({
        bolwer: players[bowlTeam][currentBowlerIndex],
      });
    }
  }, [batTeam, bowlTeam]);

  useEffect(()=>{
    if(bowlCount.length===6){
        setTimeout(()=>{

            setBowlCount([])
            setOvers(overs+1);

        },800)
       
    }
    if(typeof (score)==='number'){

        setCurrentBatsman((prevBatsmanState) => {
            return {
              ...prevBatsmanState,
              strikeBatsman: {
                ...prevBatsmanState.strikeBatsman,
                runs: prevBatsmanState.strikeBatsman.runs + score,
              },
            };
          });

    }
    setScore(null)
  },[score,bowlCount.length])

  const handleBowling = () => {
    const randomIndex = Math.floor(Math.random() * randomScores.length);
    console.log('on handleBowling',randomScores[randomIndex])
    setScore(randomScores[randomIndex]);
    setBowlCount((prevBowlCount) => [...prevBowlCount, randomScores[randomIndex]], () => {
        console.log('Bowl count updated:', bowlCount);
      });
  };

  console.log("state on play.js", state);
  return (
    <div className={styles.playContainer}>
      <div className={styles.batsman}>
        <div className={styles.scoreCard}>
          <h4>Scorecard</h4>
          <div className={styles.scoreDetails}>
            <p className={styles.totalScore}>
              {batTeam}: {totalRuns}/{wickets} overs:{overs}.{bowlCount.length}
            </p>

            <p className={styles.strike}>
              {currentBatsman?.strikeBatsman?.name} :{" "}
              {currentBatsman?.strikeBatsman?.runs}
            </p>
            <p className={styles.strike}>
              {currentBatsman?.nonStrikeBatsman?.name} :{" "}
              {currentBatsman?.nonStrikeBatsman?.runs}
            </p>
          </div>
        </div>

        <div className={styles.batting}>
          <button>Bat</button>
        </div>

        <div className={styles.bolwer}>
          <h4>{currentBowler.bolwer.name}</h4>
          <div className={styles.bowlCount}>
          {bowlCount.map((bowl) => (
              <h5>{bowl}</h5>
          ))}
            </div>
          <div className={styles.bowl}>
            <button onClick={handleBowling}>Bowl</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
