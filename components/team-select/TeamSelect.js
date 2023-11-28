import styles from "../team-select/team-select.module.css";
import { teams } from "../../libs/data";
export default function TeamSelect({team}) {
  return (
    <div className={styles.container}>
        <select className={styles.dropdown}>
        <option value="">Select Team {team}</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  )
}
