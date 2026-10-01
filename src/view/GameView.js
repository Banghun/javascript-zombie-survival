const EFFECT_LABELS = [
  { statName: 'hp', label: '체력' },
  { statName: 'food', label: '식량' },
  { statName: 'infection', label: '감염도' },
  { statName: 'healCount', label: '치료' },
  { statName: 'rescuePoint', label: '구조 포인트' },
];

const getElementById = (id) => document.getElementById(id);

const showElement = (element) => element.classList.remove('hidden');

const hideElement = (element) => element.classList.add('hidden');

const addPlusSign = (amount) => {
  if (amount > 0) {
    return `+${amount}`;
  }
  return `${amount}`;
};

const createEffectText = (effects) => {
  const effectTexts = [];
  EFFECT_LABELS.forEach((effectLabel) => {
    const amount = effects[effectLabel.statName];
    if (amount) {
      effectTexts.push(`${effectLabel.label} ${addPlusSign(amount)}`);
    }
  });
  return effectTexts.join(', ');
};

const renderChoiceButton = (choiceButton, choice) => {
  const labelElement = choiceButton.querySelector('.choice-label');
  const effectElement = choiceButton.querySelector('.choice-desc');
  labelElement.textContent = choice.label;
  effectElement.textContent = createEffectText(choice.effects);
};

class GameView {
  constructor() {
    this.findStatElements();
    this.findGameScreenElements();
    this.findResultScreenElements();
  }

  findStatElements() {
    this.dayText = getElementById('day');
    this.hpText = getElementById('hp');
    this.foodText = getElementById('food');
    this.infectionText = getElementById('infection');
    this.healCountText = getElementById('heal-attempts');
    this.rescuePointText = getElementById('rescue-points');
    this.remainingCardText = getElementById('deck-remaining');
  }

  findGameScreenElements() {
    this.gameScreen = getElementById('game-screen');
    this.drawArea = getElementById('draw-area');
    this.drawButton = getElementById('btn-draw');
    this.cardArea = getElementById('card-area');
    this.cardIconText = this.cardArea.querySelector('.card-skull');
    this.cardNameText = getElementById('card-name');
    this.cardDescriptionText = getElementById('card-description');
    this.choiceButtonA = getElementById('btn-choice-a');
    this.choiceButtonB = getElementById('btn-choice-b');
    this.loadingIndicator = getElementById('loading');
    this.giveUpButton = getElementById('btn-giveup');
    this.logContainer = getElementById('log');
  }

  findResultScreenElements() {
    this.resultScreen = getElementById('result-screen');
    this.resultEndingText = getElementById('result-ending');
    this.resultDaysText = getElementById('result-days');
    this.resultHpText = getElementById('result-hp');
    this.resultFoodText = getElementById('result-food');
    this.resultInfectionText = getElementById('result-infection');
    this.restartButton = getElementById('btn-restart');
  }

  onDrawClick(handler) {
    this.drawButton.addEventListener('click', handler);
  }

  onChoiceClick(handler) {
    this.choiceButtonA.addEventListener('click', () => handler('A'));
    this.choiceButtonB.addEventListener('click', () => handler('B'));
  }

  onGiveUpClick(handler) {
    this.giveUpButton.addEventListener('click', handler);
  }

  onRestartClick(handler) {
    this.restartButton.addEventListener('click', handler);
  }

  renderStats(stats) {
    this.dayText.textContent = stats.currentDay;
    this.hpText.textContent = stats.hp;
    this.foodText.textContent = stats.food;
    this.infectionText.textContent = stats.infection;
    this.healCountText.textContent = stats.healCount;
    this.rescuePointText.textContent = stats.rescuePoint;
    this.remainingCardText.textContent = stats.remainingCardCount;
  }

  showDrawnCard(card) {
    this.cardIconText.textContent = card.icon;
    this.cardNameText.textContent = card.name;
    this.cardDescriptionText.textContent = card.description;
    renderChoiceButton(this.choiceButtonA, card.choiceA);
    renderChoiceButton(this.choiceButtonB, card.choiceB);
    this.setChoiceButtonsDisabled(false);
    hideElement(this.drawArea);
    showElement(this.cardArea);
  }

  setChoiceButtonsDisabled(isDisabled) {
    this.choiceButtonA.disabled = isDisabled;
    this.choiceButtonB.disabled = isDisabled;
  }

  showLoading() {
    this.setChoiceButtonsDisabled(true);
    showElement(this.loadingIndicator);
  }

  returnToDrawArea() {
    hideElement(this.loadingIndicator);
    hideElement(this.cardArea);
    showElement(this.drawArea);
  }

  appendLog(message) {
    const logLine = document.createElement('p');
    logLine.textContent = message;
    this.logContainer.appendChild(logLine);
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
  }

  clearLogs() {
    this.logContainer.innerHTML = '';
  }

  showGameScreen() {
    hideElement(this.resultScreen);
    showElement(this.gameScreen);
  }

  showResultScreen(finalResult) {
    this.resultEndingText.textContent = finalResult.endingName;
    this.resultDaysText.textContent = finalResult.survivedDays;
    this.resultHpText.textContent = finalResult.hp;
    this.resultFoodText.textContent = finalResult.food;
    this.resultInfectionText.textContent = finalResult.infection;
    hideElement(this.gameScreen);
    showElement(this.resultScreen);
  }
}

export default GameView;
