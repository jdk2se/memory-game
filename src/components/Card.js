import styles from './Card.module.css';

export default function Card({card, handleChoice}) {

  const handleClick = () => {
    handleChoice(card);
  }

  return (
    <div className={styles.card}>
        <div>
            <img src={card.src} className={styles.cardFront} alt="card front" />
            <img src="/img/cover.png" 
                onClick={handleClick}
                className={styles.cardBack}
                 alt="back card"
            />
        </div>
    </div>
  )
}
