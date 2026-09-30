import CARD_TYPES from '../constants/cards.js';

const createFullDeck = () => {
  const fullDeck = [];
  CARD_TYPES.forEach((cardType) => {
    for (let copy = 0; copy < cardType.copies; copy += 1) {
      fullDeck.push(cardType);
    }
  });
  return fullDeck;
};

// 피셔-예이츠 셔플: 뒤에서부터 앞으로 오면서 무작위로 고른 앞쪽 카드와 자리를 바꾼다
const shuffleCards = (cards) => {
  const shuffledCards = cards.slice();
  for (
    let currentIndex = shuffledCards.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const currentCard = shuffledCards[currentIndex];
    shuffledCards[currentIndex] = shuffledCards[randomIndex];
    shuffledCards[randomIndex] = currentCard;
  }
  return shuffledCards;
};

class Deck {
  constructor() {
    this.refillAndShuffle();
  }

  refillAndShuffle() {
    this.remainingCards = shuffleCards(createFullDeck());
  }

  drawCard() {
    if (this.remainingCards.length === 0) {
      this.refillAndShuffle();
    }
    return this.remainingCards.pop();
  }

  getRemainingCount() {
    return this.remainingCards.length;
  }
}

export default Deck;
