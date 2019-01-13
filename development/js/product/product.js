import CardScreen from '../card/card-screen';
import ProductView from './product-view';
import PreloaderView from '../preloader/preloader-view';
import Model from '../model';
import app from '../app';
import { changeViewList } from '../until';
import { initialState, repareState, setPages } from '../data/data';

export default class ProductScreen {
  constructor(state = initialState) {
    this.state = state;
    console.log(this.state.productSkip);
    this.urlString = `http://127.0.0.1:3000/api/product?skip=${this.state.productSkip}&limit=${this.state.productLimit}`
    this.view = new PreloaderView();
    this.model = new class extends Model {
      constructor(urlString) {
        super();
        this.url = urlString;
      }
      get urlRead() {
        return this.url;
      }
    }(this.urlString);
  }
  init() {
    changeViewList(this.view);
    this.model.load().then((data) => {
      this.state = repareState(this.state, data.total);
      this.view = new ProductView(data, this.state);
      changeViewList(this.view);
      data.data.forEach(element => {
        const cardScreen = new CardScreen(element);
        cardScreen.init();
      });
      this.view.backToPage = () => {
        this.state = setPages(this.state, this.state.pageIn - 1);
        app.showProductList(this.state);
      };
      this.view.nextToPage = () => {
        this.state = setPages(this.state, this.state.pageIn + 1);
        app.showProductList(this.state);
      };
      this.view.toPage = (NumberToPage) => {
        this.state = setPages(this.state, NumberToPage);
        app.showProductList(this.state);
      };
    }).catch(window.console.error);
  }
}
