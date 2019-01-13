import AbstractView from '../view';
import {createSection} from '../until';

export default class PreloaderView extends AbstractView {
  render() {
    return createSection(this.template);
  }
  get template() {
    return `\
      <div id="preloader" class="preloader">
        <div class="preloader__loading">
          <div class="preloader__bounceball"></div>
          <div class="preloader__text">Загрузка</div>
        </div>
      </div>`;
  }
}
