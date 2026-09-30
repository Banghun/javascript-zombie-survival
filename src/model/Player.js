import RULES from '../constants/rules.js';

class Player {
  constructor() {
    this.resetStats();
  }

  resetStats() {
    this.hp = RULES.INITIAL_HP;
    this.food = RULES.INITIAL_FOOD;
    this.infection = RULES.INITIAL_INFECTION;
    this.healCount = RULES.INITIAL_HEAL_COUNT;
    this.rescuePoint = RULES.INITIAL_RESCUE_POINT;
  }

  changeStat(statName, amount) {
    const changedValue = this[statName] + amount;
    this[statName] = Math.max(RULES.MIN_STAT_VALUE, changedValue);
  }

  // 카드마다 효과가 있는 스탯만 적혀 있어서 없는 스탯은 0으로 처리
  applyCardEffects(effects) {
    this.changeStat('hp', effects.hp || 0);
    this.changeStat('food', effects.food || 0);
    this.changeStat('infection', effects.infection || 0);
    this.changeStat('healCount', effects.healCount || 0);
    this.changeStat('rescuePoint', effects.rescuePoint || 0);
  }

  hasNoFood() {
    return this.food === 0;
  }
}

export default Player;
