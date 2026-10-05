const LOG_MESSAGES = {
  GAME_START: () => '감염 사태 발생. 당신은 이미 물렸다. 살아남아라.',
  CARD_DRAWN: (day, cardName) => `[Day ${day}] '${cardName}' 카드를 뽑았다.`,
  CHOICE_SELECTED: (day, choiceLabel) =>
    `[Day ${day}] '${choiceLabel}'을(를) 선택했다.`,
  STARVATION: (day, hpLoss) =>
    `[Day ${day}] 식량이 없어 굶주렸다. 체력이 ${hpLoss} 감소했다.`,
  GIVE_UP: () => '살아남기를 포기했다...',
  GAME_OVER: (endingName) => `게임 종료: ${endingName}`,
};

export default LOG_MESSAGES;
