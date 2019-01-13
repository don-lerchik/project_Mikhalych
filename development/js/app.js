import preloaderScreen from './preloader/preloader';
import ProductScreen from './product/product';
import Model from './model';

const ControllerId = {
  PRODUCT: ``,
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class Application {
  constructor() {
    this.model = new class extends Model {
      get urlRead() {
        return `http://127.0.0.1:3000/api/product`;
      }
    }();
  }
  init() {
    this.showPreloader();
    this.model.load()
      .then(() => this.setup())
      .then(() => {
        const {controller, state} = this.getHash();
        this.changeController(controller, state);
      })
      .catch(window.console.error);
  }
  setup() {
    this.routes = {
      [ControllerId.PRODUCT]: ProductScreen,
    };

    window.onhashchange = () => {
      const {controller, state} = this.getHash();
      console.log(controller,state)
      this.changeController(controller, state);
    };
  }
  getHash() {
    const [controller, stateValue] = location.hash.split(`=`);
    return {
      controller: getControllerIdFromHash(controller),
      state: stateValue ?
        JSON.parse(atob(stateValue))
        : ``
    };
  }

  changeController(route = ``, state = ``) {
    const Controller = this.routes[route];
    if (state) {
      return new Controller(state).init();
    }
    return new Controller().init();
  }

  showPreloader() {
    preloaderScreen.init();
  }

  showProductList(state) {
    const encodeState = btoa(JSON.stringify(state));
    location.hash = [ControllerId.PRODUCT, encodeState].join(`=`);
  }
}

const app = new Application();
export default app;
