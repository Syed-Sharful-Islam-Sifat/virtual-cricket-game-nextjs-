import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import { useStat } from "../providers/playerStatProvider";
import gameActions from "../libs/actions/gameActions";
import { players } from "../libs/data";
import styles from "../styles/play.module.css";
import Link from "next/link";
const Play = () => {
  const router = useRouter();
  const { teamA, teamB } = router.query;
  const matchOver = 2;
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
  const [bowlCount, setBowlCount] = useState(0);
  const [target, setTarget] = useState(null);
  const [totalRuns, setTotalRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [score, setScore] = useState(null);
  const [overStat, setOverStat] = useState([]);
  const [matchResult, setMatchResult] = useState(null);
  const randomScores = [0,1,2,3,4,6, "W"];
  const [batFirstTeam, setBatFirstTeam] = useState("");
  const [batSecondTeam, setBatSecondTeam] = useState("");

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
    dispatch(gameActions.SET_PLAYERS, {
      playersTeamA,
      playersTeamB,
      teamA,
      teamB,
    });
  }, []);
  function teamSwitch() {
    const newBowlTeam = batTeam;
    setBatTeam(bowlTeam);
    setBowlTeam(newBowlTeam);
    setTarget(totalRuns + 1);
    setScore(null);
    setTotalRuns(0);
    setCurrentBowlerIndex(10);
    setTotalRuns(0);
    setOverStat([]);
    setBowlCount(0);
    setOvers(0);
    setWickets(0);
    setPointToNextBatsman(2);
  }
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
        setBatFirstTeam(tossTeam);
        setBatSecondTeam(teamA === tossTeam ? teamB : teamA);
      } else {
        setBowlTeam(tossTeam);
        setBatTeam(teamA === tossTeam ? teamB : teamA);
        setBatFirstTeam(teamA === tossTeam ? teamB : teamA);
        setBatSecondTeam(tossTeam);
      }
    }
  }, [tossTeam, decision]);

  useEffect(() => {
    if (batFirstTeam && batSecondTeam) {
      console.log(
        "batFirstTeam and batSecondTeam",
        batFirstTeam,
        batSecondTeam
      );
      dispatch(gameActions.SET_BATTING_TEAM, { batFirstTeam, batSecondTeam });
    }
  }, [batFirstTeam, batSecondTeam]);
  console.log("state ", state);
  useEffect(() => {
    if (batTeam && bowlTeam) {
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

  useEffect(() => {
    if (bowlCount === 6) {
      setTimeout(() => {
        setOverStat([]);
        setBowlCount(0);
        setOvers(overs + 1);
      }, 800);
    }
    if (typeof score === "number") {
      setCurrentBatsman((prevBatsmanState) => {
        const strike = { ...prevBatsmanState.strikeBatsman };
        if (
          (score % 2 === 1 && bowlCount < 6) ||
          (score % 2 === 0 && bowlCount === 6)
        ) {
          strike.runs = strike.runs + score;
          console.log("score and bowlCount", score, bowlCount);
          return {
            ...prevBatsmanState,
            strikeBatsman: {
              ...prevBatsmanState.nonStrikeBatsman,
            },
            nonStrikeBatsman: {
              ...strike,
            },
          };
        }
        return {
          ...prevBatsmanState,
          strikeBatsman: {
            ...prevBatsmanState.strikeBatsman,
            runs: prevBatsmanState.strikeBatsman.runs + score,
          },
        };
      });
    }
    setScore(null);
  }, [score, bowlCount]);

  useEffect(() => {
    if (wickets > 0 && wickets <= 9) {
      setPointToNextBatsman(ponitToNextBatsman + 1);
    }
  }, [wickets]);

  useEffect(() => {
    if ((overs === matchOver || wickets === 10) && target === null) {
      teamSwitch();
    } else if (overs === matchOver || wickets === 10) {
      if(totalRuns===target-1){
        setMatchResult('Match Drawn')
      }
     else if (totalRuns < target) {
        setMatchResult(
          `${bowlTeam} has won the match by ${(target - 1) - totalRuns} runs`
        );
      }

    }
  }, [overs, wickets]);

  useEffect(() => {
    if (overs > 0) {
      setCurrentBowlerIndex(currentBowlerIndex - 1);
    }
  }, [overs]);
  useEffect(() => {
    if (currentBowlerIndex < 10) {
      setCurrentBowler({
        bolwer: players[bowlTeam][currentBowlerIndex],
      });
    }
  }, [currentBowlerIndex]);

  const handleBowling = () => {
    const randomIndex = Math.floor(Math.random() * randomScores.length);
    console.log("on handleBowling", randomScores[randomIndex]);
    setOverStat((prevOverStat) => [...prevOverStat, randomScores[randomIndex]]);
    if (
      randomScores[randomIndex] === "WD" ||
      randomScores[randomIndex] === "NB"
    ) {
      setTotalRuns(totalRuns + 1);
      dispatch(gameActions.ADD_EXTRA_RUN, { batTeam });
      return;
    }
    setScore(randomScores[randomIndex]);

    if (typeof randomScores[randomIndex] === "number") {
      setTotalRuns(totalRuns + randomScores[randomIndex]);
    }
    if (
      typeof randomScores[randomIndex] === "number" ||
      randomScores[randomIndex] === "W"
    ) {
      setBowlCount(bowlCount + 1);
    }

    if (randomScores[randomIndex] === "W") {
      setWickets(wickets + 1);
      dispatch(gameActions.ADD_WICKETS, {
        bowlerId: currentBowler.bolwer.id,
        batsmanId: currentBatsman.strikeBatsman.id,
        batTeam,
      });
    } else if (typeof randomScores[randomIndex] === "number") {
      dispatch(gameActions.ADD_RUN, {
        batsmanId: currentBatsman.strikeBatsman.id,
        batTeam,
        score: randomScores[randomIndex],
        bowlerId: currentBowler.bolwer.id,
      });
    }
  };

  useEffect(() => {
    if (ponitToNextBatsman > 2) {
      setCurrentBatsman((prevBatsmanState) => {
        //const strike = {...prevBatsmanState.strikeBatsman};
        return {
          ...prevBatsmanState,
          strikeBatsman: {
            ...prevBatsmanState.nonStrikeBatsman,
          },
          nonStrikeBatsman: {
            ...players[batTeam][ponitToNextBatsman],
          },
        };
      });
    }
  }, [ponitToNextBatsman]);

  useEffect(() => {
    if (target < totalRuns && target !== null) {
      setMatchResult(`${batTeam} has won the match by ${10 - wickets} wickets`);
    } else if (target-1 === totalRuns&&overs===matchOver) {
      setMatchResult(`Match Drawn`);
    }
  }, [totalRuns]);

  useEffect(() => {
    if (matchResult) {
      dispatch(gameActions.RESULT_FIXED, { matchResult });
    }
  }, [matchResult]);

  console.log("state on play.js", state);
  return (
    <div className={styles.playContainer}>
      <div className={styles.toss}>
        {tossDecision ? <p>{tossDecision}</p> : null}
      </div>
      <div className={styles.batsman}>
        <div className={styles.scoreCard}>
          <h4>Scorecard</h4>
          <div className={styles.scoreDetails}>
            <p className={styles.totalScore}>
              {batTeam}: {totalRuns}/{wickets} overs:{overs}.{bowlCount}
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
          <div className={styles.target}>
            {target ? <p>Target: {target}</p> : null}
          </div>
          <div className={styles.result}>
            {matchResult ? <p>{matchResult}</p> : null}
          </div>
          <div className={styles.batAndBowl}>
            <div className={styles.batting}>
              <button onClick={handleBowling} disabled={matchResult !== null}>
                Bat
              </button>
            </div>

            <div className={styles.bowl}>
              <button
                onClick={handleBowling}
                disabled={matchResult !== null || bowlCount === 6}
              >
                Bowl
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bowlerContainer}>
          <div className={styles.bowler}>
            <h4>{currentBowler.bolwer.name}</h4>
            <div className={styles.bowlCount}>
              {overStat.map((stat, i) => (
                <p key={i}>{stat}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.summaryLink}>
          {matchResult ? (
            <Link href={"/matchSummary"}>
              <button>Match Summary</button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Play;
