const CARD_TYPES = [
  {
    name: '생존자 시체',
    icon: '🧟',
    copies: 4,
    description: '길가에 쓰러진 생존자의 시체. 가방이 불룩하다.',
    choiceA: { label: '시체를 뒤진다', effects: { food: 3, infection: 8 } },
    choiceB: { label: '겉만 살핀다', effects: { food: 1 } },
  },
  {
    name: '부상당한 군인',
    icon: '💊',
    copies: 4,
    description: '다친 군인이 치료제 샘플을 가지고 있다.',
    choiceA: {
      label: '식량과 교환한다',
      effects: { food: -1, infection: -20, healCount: 1 },
    },
    choiceB: { label: '보급품을 뺏는다', effects: { hp: -10, food: 2 } },
  },
  {
    name: '임시 수술',
    icon: '🔪',
    copies: 3,
    description: '감염 부위를 직접 도려낼 수 있을 것 같다.',
    choiceA: {
      label: '수술한다',
      effects: { hp: -25, infection: -25, healCount: 1 },
    },
    choiceB: { label: '붕대만 감는다', effects: { hp: -5, infection: 10 } },
  },
  {
    name: '군용 차량 행렬',
    icon: '🚗',
    copies: 3,
    description: '멀리서 군용 차량 행렬이 지나간다.',
    choiceA: {
      label: '신호를 보낸다',
      effects: { rescuePoint: 1, infection: 8 },
    },
    choiceB: { label: '숨어서 쉰다', effects: { hp: 5 } },
  },
  {
    name: '오염된 웅덩이',
    icon: '💧',
    copies: 3,
    description: '목이 타들어 간다. 눈앞에 탁한 웅덩이가 있다.',
    choiceA: { label: '물을 마신다', effects: { hp: 5, infection: 15 } },
    choiceB: { label: '참고 지나간다', effects: { hp: -10 } },
  },
  {
    name: '구조 트럭',
    icon: '🚛',
    copies: 3,
    description: '구조 트럭이 좀비 떼에 둘러싸여 있다.',
    choiceA: { label: '뚫고 달려간다', effects: { hp: -20, rescuePoint: 1 } },
    choiceB: { label: '안전한 곳에서 쉰다', effects: { hp: 10 } },
  },
];

export default CARD_TYPES;
