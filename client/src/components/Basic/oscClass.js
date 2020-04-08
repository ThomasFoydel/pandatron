export default class oscClass {
  constructor(context) {
    this.context = context;
    this.osc = this.context.createOscillator();
    this.osc.start();
  }
}
