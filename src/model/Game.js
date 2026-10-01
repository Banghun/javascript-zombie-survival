import RULES from '../constants/rules.js';
import ENDINGS from '../constants/endings.js';
import Player from './Player.js';
import Deck from './Deck.js';

class Game {
  constructor() {
    this.player = new Player();
    this.deck = new Deck();
    this.resetGame();
  }

  resetGame() {
    this.player.resetStats();
    this.deck.refillAndShuffle();
    this.currentDay = RULES.INITIAL_DAY;
    this.lastPlayedDay = 0;
    this.currentCard = null;
    this.endingName = null;
  }

  drawCard() {
    this.currentCard = this.deck.drawCard();
    return this.currentCard;
  }

  getChoiceByKey(choiceKey) {
    if (choiceKey === 'A') {
      return this.currentCard.choiceA;
    }
    return this.currentCard.choiceB;
  }

  // 기아가 발생했는지 반환한다. (컨트롤러가 기아 로그를 남길 때 사용)
  playDay(choiceKey) {
    const choice = this.getChoiceByKey(choiceKey);
    this.player.applyCardEffects(choice.effects);
    // 식량 소비 전에 확인해야 "식량이 원래 0이었는지"를 알 수 있다.
    const isStarving = this.player.hasNoFood();
    this.applyDailyRules(isStarving);
    this.moveToNextDay();
    this.endingName = this.findEndingName();
    return isStarving;
  }

  applyDailyRules(isStarving) {
    this.player.changeStat('food', -RULES.DAILY_FOOD_CONSUMPTION);
    this.player.changeStat('infection', RULES.DAILY_INFECTION_INCREASE);
    if (isStarving) {
      this.player.changeStat('hp', -RULES.STARVATION_HP_LOSS);
    }
  }

  moveToNextDay() {
    this.lastPlayedDay = this.currentDay;
    this.currentDay += 1;
  }

  // 실패와 성공 조건이 동시에 충족되면 실패 엔딩이 우선한다.
  findEndingName() {
    const failureEnding = this.findFailureEnding();
    if (failureEnding !== null) {
      return failureEnding;
    }
    return this.findSuccessEnding();
  }

  findFailureEnding() {
    if (this.player.hp <= 0) {
      return ENDINGS.DEATH;
    }
    if (this.player.infection >= RULES.ZOMBIE_INFECTION) {
      return ENDINGS.ZOMBIE;
    }
    return null;
  }

  findSuccessEnding() {
    if (this.player.healCount >= RULES.CURE_HEAL_COUNT) {
      return ENDINGS.CURE;
    }
    if (this.canBeRescued()) {
      return ENDINGS.RESCUE;
    }
    if (this.currentDay > RULES.SURVIVAL_AFTER_DAY) {
      return ENDINGS.SURVIVAL;
    }
    return null;
  }

  canBeRescued() {
    const hasEnoughPoints = this.player.rescuePoint >= RULES.RESCUE_POINT_GOAL;
    const isAfterRescueDay = this.currentDay > RULES.RESCUE_AFTER_DAY;
    return hasEnoughPoints && isAfterRescueDay;
  }

  giveUp() {
    this.endingName = ENDINGS.GIVE_UP;
  }

  isGameOver() {
    return this.endingName !== null;
  }

  getCurrentStats() {
    return {
      currentDay: this.currentDay,
      hp: this.player.hp,
      food: this.player.food,
      infection: this.player.infection,
      healCount: this.player.healCount,
      rescuePoint: this.player.rescuePoint,
      remainingCardCount: this.deck.getRemainingCount(),
    };
  }

  getFinalResult() {
    return {
      endingName: this.endingName,
      survivedDays: this.lastPlayedDay,
      hp: this.player.hp,
      food: this.player.food,
      infection: this.player.infection,
    };
  }
}

export default Game;
