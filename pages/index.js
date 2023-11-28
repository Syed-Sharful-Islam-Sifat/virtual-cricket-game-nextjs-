import Link from "next/link";
import Title from "../components/title/Title";

export default function Home() {
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
