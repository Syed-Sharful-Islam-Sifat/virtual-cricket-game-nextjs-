import { teams } from "../../libs/data"
import styles from '../game-start/gamestart.module.css'
import Title from "../title/Title"
export default function GameStart(){

    return(
     <div className={styles.container}>
       <div className={styles.game}>
          <Title/>
       </div>
     </div>
    )
}