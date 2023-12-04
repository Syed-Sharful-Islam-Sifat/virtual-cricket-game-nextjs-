import Link from "next/link";
import Title from "../components/title/Title";
import { useEffect } from "react";
import { useStat } from "../providers/playerStatProvider";
import gameActions from "../libs/actions/gameActions";

export default function Home() {

  const[state,dispatch] = useStat();

  useEffect(()=>{
  dispatch(gameActions.SET_STATE)
  },[])
  return (
    <div className="main-container">
     
      <div className="play">
        <Title/>
        <Link href={"/game"}>
          <button>play</button>
        </Link>
      </div>
    </div>
  );
}
