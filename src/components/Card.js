import styles from './Card.module.css';

export default function Card({card, handleChoice, flipped, disabled}) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className={styles.card}>
        <div className={flipped ? styles.flipped : ""}>
            <img src={card.src} className={styles.front} alt="card front" />
            <img src="/img/cover.png" 
                onClick={handleClick}
                className={styles.back}
                alt="back card"
            />
        </div>
    </div>
  )
}
