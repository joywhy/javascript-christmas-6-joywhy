import ChristmasController from './controller/ChristmasController.js';
class App {
  #promotion;
  constructor() {
    this.#promotion = new ChristmasController();
  }
  async run() {
    await this.#promotion.promote();
  }
}

export default App;
