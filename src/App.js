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

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => (Math.random() - 0.5))
      .map((card) => ({...card, id: Math.random()}))
    ;

    setCards(shuffledCards);
    setTurns(0);
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);    
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
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
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turn) => turn++);
  }  

  return (
    <div className="App">
      <h2>Magic Match</h2>
      turns: {turns}
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
          />  
        ))}
      </div>
    </div>
  );
}

export default App;
