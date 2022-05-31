import {useState, useEffect} from 'react';
import Card from './components/Card';

import './App.css';

const cardImages = [
  {src: "/img/helmet-1.png", matched: false},
  {src: "/img/potion-1.png", matched: false},
  {src: "/img/ring-1.png", matched: false},
  {src: "/img/scroll-1.png", matched: false},
  {src: "/img/shield-1.png", matched: false},
  {src: "/img/sword-1.png", matched: false},
];

function App() {
  const [cards, setCards]         = useState([]);
  const [turns, setTurns]         = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled]   = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => (Math.random() - 0.5))
      .map((card) => ({...card, id: Math.random()}))
    ;

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);    
  }

  // start the game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  // compare 2 selected cards
  useEffect(() => {    
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            }
            else {
              return card;
            }
          });
        });
        resetTurn();
      }
      else {
        setTimeout(() => resetTurn(), 1500);
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turn) => turn + 1);
    setDisabled(false);
  }  

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button type='button' onClick={shuffleCards}>New Game</button>
      <div className="grid">
        {cards.map((card) => (
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched
            }
            disabled={disabled}
          />  
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
