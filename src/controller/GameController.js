import RULES from '../constants/rules.js';
import LOG_MESSAGES from '../constants/messages.js';

class GameController {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.resultTimerId = null;
  }

  init() {
    this.view.onDrawClick(() => this.handleDrawClick());
    this.view.onChoiceClick((choiceKey) => this.handleChoiceClick(choiceKey));
    this.view.onGiveUpClick(() => this.handleGiveUpClick());
    this.view.onRestartClick(() => this.handleRestartClick());
    this.startNewGame();
  }

  startNewGame() {
    this.game.resetGame();
    this.view.clearLogs();
    this.view.showGameScreen();
    this.view.returnToDrawArea();
    this.renderCurrentStats();
    this.view.appendLog(LOG_MESSAGES.GAME_START());
  }

  handleDrawClick() {
    const drawnCard = this.game.drawCard();
    this.view.showDrawnCard(drawnCard);
    this.renderCurrentStats();
    this.view.appendLog(
      LOG_MESSAGES.CARD_DRAWN(this.game.currentDay, drawnCard.name),
    );
  }

  handleChoiceClick(choiceKey) {
    if (this.isWaitingForResult()) {
      return;
    }
    const choice = this.game.getChoiceByKey(choiceKey);
    this.view.appendLog(
      LOG_MESSAGES.CHOICE_SELECTED(this.game.currentDay, choice.label),
    );
    this.view.showLoading();
    this.resultTimerId = setTimeout(
      () => this.applyChoiceResult(choiceKey),
      RULES.RESULT_DELAY_MS,
    );
  }

  isWaitingForResult() {
    return this.resultTimerId !== null;
  }

  applyChoiceResult(choiceKey) {
    this.resultTimerId = null;
    const playedDay = this.game.currentDay;
    const isStarving = this.game.playDay(choiceKey);
    if (isStarving) {
      this.view.appendLog(
        LOG_MESSAGES.STARVATION(playedDay, RULES.STARVATION_HP_LOSS),
      );
    }
    this.view.returnToDrawArea();
    this.renderCurrentStats();
    if (this.game.isGameOver()) {
      this.finishGame();
    }
  }

  handleGiveUpClick() {
    if (this.game.isGameOver()) {
      return;
    }
    this.cancelResultTimer();
    this.game.giveUp();
    this.view.appendLog(LOG_MESSAGES.GIVE_UP());
    this.finishGame();
  }

  handleRestartClick() {
    this.cancelResultTimer();
    this.startNewGame();
  }

  cancelResultTimer() {
    clearTimeout(this.resultTimerId);
    this.resultTimerId = null;
  }

  finishGame() {
    const finalResult = this.game.getFinalResult();
    this.view.appendLog(LOG_MESSAGES.GAME_OVER(finalResult.endingName));
    this.view.showResultScreen(finalResult);
  }

  renderCurrentStats() {
    this.view.renderStats(this.game.getCurrentStats());
  }
}

export default GameController;
