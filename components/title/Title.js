import styles from '../title/title.module.css'
export default function Title(){
    return(
      <div className={styles.title}>
        <h2 className={styles.title_text}>
           Virtual Cricket Game 2023
        </h2>
      </div>
    )
}