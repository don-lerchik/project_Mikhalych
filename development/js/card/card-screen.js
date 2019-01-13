import CardView from './card-view';
import Model from '../model';
import { changeViewElement } from '../until';

export default class CardScreen {
  constructor(data) {
    this.data = data;
    this.view = new CardView(data);
    this.model = new class extends Model {
      get urlWrite() {
        return `http://127.0.0.1:3000/api/product`;
      }
    }();
  }
  init() {
    changeViewElement(this.view);
    this.view.buyCard = (info) => {
      this.model.send(info).catch(window.console.error);
    };
  }
}
