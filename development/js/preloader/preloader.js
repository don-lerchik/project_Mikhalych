import PreloaderView from "./preloader-view";
import {changeViewList} from '../until';

class PreloaderScreen {
  constructor() {
    this.view = new PreloaderView();
  }
  init() {
    changeViewList(this.view);
  }
}
const preloaderScreen = new PreloaderScreen();
export default preloaderScreen;