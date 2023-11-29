import styles from "../team-select/team-select.module.css";
import { teams } from "../../libs/data";
import { useState } from "react";
export default function TeamSelect({team , opponent , handleTeamSelect}) {

   const[selectedTeam,setSelectedTeam] = useState('');

  const handleSelectChange = (e) => {
   
    handleTeamSelect(e.target.value,team);
  };
  console.log('team and opponent',team,opponent);
  return (
    <div className={styles.container}>
        <select className={styles.dropdown} onChange={handleSelectChange}>
        <option value="">Select Team {team}</option>
        {teams.map((team) => (
          <option key={team} value={team} disabled = {team===opponent}>
            {team}
          </option>
        ))}
      </select>
    </div>
  )
}
