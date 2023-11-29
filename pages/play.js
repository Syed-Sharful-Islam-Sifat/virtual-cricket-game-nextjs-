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
  const matchOver = 1
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
  const[overStat,setOverStat] = useState([])
  const [matchResult,setMatchResult] = useState(null);
  const randomScores = [0, 1, 2, 3, 4, 6, "WD", "NB", "W"];

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
  function teamSwitch(){
    const newBowlTeam = batTeam;
    setBatTeam(bowlTeam);
    setBowlTeam(newBowlTeam);
    setTarget(totalRuns+1);
    setScore(null);
    setTotalRuns(0);
    setCurrentBowlerIndex(10);
    setTotalRuns(0);
    setOverStat([]);
    setBowlCount(0);
    setOvers(0);
    setWickets(0)
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
    if(bowlCount===6&&   totalRuns<target){
        setTimeout(()=>{

            setOverStat([]);
            setBowlCount(0)
            setOvers(overs+1);

        },800)
       
    }
    if(typeof (score)==='number'){

      
        setCurrentBatsman((prevBatsmanState) => {
            const strike = {...prevBatsmanState.strikeBatsman};
            if(score%2===1&&bowlCount<6||score%2===0&&bowlCount===6){
              strike.runs = strike.runs+score;
              console.log('score and bowlCount',score,bowlCount)
              return{
                ...prevBatsmanState,
                strikeBatsman:{
                  ...prevBatsmanState.nonStrikeBatsman
                },
                nonStrikeBatsman:{
                  ...strike
                }
              }
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
    setScore(null)
  },[score,bowlCount])
  
  useEffect(()=>{
    if(wickets>0&&wickets<=9){
      setPointToNextBatsman(ponitToNextBatsman+1)
     }
     if((overs===matchOver||wickets===10)&&target===null){
      //  const newBowlTeam = batTeam;
      //  setBatTeam(bowlTeam);
      //  setBowlTeam(newBowlTeam);
      //  setTarget(totalRuns);
      //  setScore(0);
      //  setTotalRuns(0);
      //  setCurrentBowlerIndex(10);
      //  setTotalRuns(0);
      teamSwitch();
     }

     else if(overs===matchOver||wickets===10){
       if(totalRuns<target){
          setMatchResult(`${bowlTeam} has won the match by ${target-totalRuns} runs`);
       }
     }
    if(overs>0){
      setCurrentBowlerIndex(currentBowlerIndex-1);
    }

    if(currentBowlerIndex===6){
      setCurrentBowlerIndex(10);
    }
  },[overs,wickets])
  useEffect(()=>{
    if(currentBowlerIndex<10&&(target!==null&&totalRuns<target)){
      setCurrentBowler({
        bolwer: players[bowlTeam][currentBowlerIndex],
      });
    }
  },[currentBowlerIndex])


     
  const handleBowling = () => {
    const randomIndex = Math.floor(Math.random() * randomScores.length);
    console.log('on handleBowling',randomScores[randomIndex]);
    setOverStat((prevOverStat) => [...prevOverStat, randomScores[randomIndex]], () => {
        console.log('Bowl count updated:', overStat);
      });
    if(randomScores[randomIndex]==='WD'||randomScores[randomIndex]==='NB'){
      setTotalRuns(totalRuns+1);
      return;
    }
    setScore(randomScores[randomIndex]);

      if(typeof randomScores[randomIndex]==='number'){
        setTotalRuns(totalRuns+randomScores[randomIndex])
      }
      if(typeof randomScores[randomIndex]==='number'||randomScores[randomIndex]==='W'){
        setBowlCount(bowlCount+1);
      }

      if(randomScores[randomIndex]==='W'){
        setWickets(wickets+1);
      }
  };



  useEffect(()=>{
    if(ponitToNextBatsman>2){
      setCurrentBatsman((prevBatsmanState) => {
        //const strike = {...prevBatsmanState.strikeBatsman};
          return{
            ...prevBatsmanState,
            strikeBatsman:{
              ...prevBatsmanState.nonStrikeBatsman
            },
            nonStrikeBatsman:{
              ...players[batTeam][ponitToNextBatsman]
            }
          }
      });

    }
  },[ponitToNextBatsman])

  useEffect(()=>{
   if(target<=totalRuns&&target!==null){
    setMatchResult(`${batTeam} has won the match by ${10-wickets} wickets`)
   }   
  },[totalRuns])

  console.log("state on play.js", state);
  return (
    <div className={styles.playContainer}>
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
            {target?(
             <p>Target: {target}</p>
            ):null}
          </div>
          <div className={styles.result}>
            {matchResult?(
             <p>{matchResult}</p>
            ):null}
          </div>
        </div>

        <div className={styles.batting}>
          <button onClick={handleBowling}disabled={matchResult!==null}>Bat</button>
        </div>

        <div className={styles.bolwer}>
          <h4>{currentBowler.bolwer.name}</h4>
          <div className={styles.bowlCount}>
          {overStat.map((stat) => (
              <h5>{stat}</h5>
          ))}
            </div>
          <div className={styles.bowl}>
            <button onClick={handleBowling} disabled={matchResult!==null}>Bowl</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
