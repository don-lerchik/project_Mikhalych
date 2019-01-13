import AbstractView from '../view';
import {createElement} from '../until';

export default class CardView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }
  render() {
    return createElement(this.template);
  }
  get template() {
    return `\                             
      <span class="product_code">Код: ${this.data.code}</span>
      <div class="product_status_tooltip_container">
        <span class="product_status">Наличие</span>
      </div>                                
      <div className="product_photo">
				<a href="#" className="url--link product__link">
					<img src=${this.imagePrefix(this.data.primaryImageUrl)} alt="" />
				</a>                                    
				</div>
      <div class="product_description">
          <a href="#" class="product__link">${this.data.title}</a>
      </div>
      <div class="product_tags hidden-sm">
          <p>Могут понадобиться:</p>
          ${this.data.assocProducts.split(`;`).map((elem) =>
        `<a href="#" class="url--link">${elem},</a>`).join(``)}
      </div>
      <div class="product_units">
          <div class="unit--wrapper">
              <div class="unit--select unit--select_alt unit--active">
                  <p class="ng-binding">За м. кв.</p>
              </div>
              <div class="unit--select unit--select_default">
                  <p class="ng-binding">За упаковку</p>
              </div>
          </div>
      </div>
      <p class="product_price_club_card">
          <span class="product_price_club_card_text">По карте<br>клуба</span>
          <span class="goldPrice">${this.data.priceGoldAlt.toFixed(1)}</span>
          <span class="rouble__i black__i">
              <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
              </svg>
           </span>
      </p>
      <p class="product_price_default">
          <span class="retailPrice">${this.data.priceRetailAlt.toFixed(1)}</span>
          <span class="rouble__i black__i">
              <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>
              </svg>
           </span>
      </p>
      <div class="product_price_points">
          <p class="ng-binding">Можно купить за 231,75 балла</p>
      </div>
      <div class="list--unit-padd"></div>
      <div class="list--unit-desc">
          <div class="unit--info">
              <div class="unit--desc-i"></div>
              <div class="unit--desc-t">
                  <p>
                      <span class="ng-binding">Продается упаковками:</span>
                      <span class="unit--infoInn">${this.translateCount()}</span>
                  </p>
              </div>
          </div>
      </div>
      <div class="product__wrapper">
          <div class="product_count_wrapper">
              <div class="stepper">
                  <input class="product__count stepper-input" type="text" value="1">
                  <span class="stepper-arrow up"></span>
                  <span class="stepper-arrow down"></span>                                            
              </div>
          </div>
          <span class="btn btn_cart" data-url="/cart/" data-product-id=${this.data.productId}>
              <svg class="ic ic_cart">
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
              </svg>
              <span class="ng-binding">В корзину</span>
          </span>
      </div>`;
  }
  bind() {
    const countProductInput = this.element.querySelector(`.stepper-input`);
    const stepperUp = this.element.querySelector(`.stepper-arrow.up`);
    const stepperDown = this.element.querySelector(`.stepper-arrow.down`);
    const btnCard = this.element.querySelector(`.btn_cart`);
    const unitSelectAlt = this.element.querySelector(`.unit--select_alt`);
    const unitSelectDefault = this.element.querySelector(`.unit--select_default`);
    const goldPrice = this.element.querySelector(`.goldPrice`);
    const retailPrice = this.element.querySelector(`.retailPrice`);
    const unitInfoInn = this.element.querySelector(`.unit--infoInn`);
    this.countProduct = countProductInput.value;

    unitSelectAlt.addEventListener(`click`, () => {
      if (!unitSelectAlt.classList.contains(`unit--active`)) {
        unitSelectAlt.classList.add(`unit--active`);
        unitSelectDefault.classList.remove(`unit--active`);
        goldPrice.textContent = this.data.priceGoldAlt.toFixed(1);
        retailPrice.textContent = this.data.priceRetailAlt.toFixed(1);
      }
    });
    unitSelectDefault.addEventListener(`click`, () => {
      if (!unitSelectDefault.classList.contains(`unit--active`)) {
        unitSelectDefault.classList.add(`unit--active`);
        unitSelectAlt.classList.remove(`unit--active`);
        goldPrice.textContent = this.data.priceGold.toFixed(1);
        retailPrice.textContent = this.data.priceRetail.toFixed(1);
      }
    });


    stepperUp.addEventListener(`click`, () => {
      countProductInput.value++;
      this.countProduct = countProductInput.value;
      unitInfoInn.textContent = this.translateCount(this.countProduct);
    });
    stepperDown.addEventListener(`click`, () => {
      if (countProductInput.value > 1) {
        countProductInput.value--;
        this.countProduct = countProductInput.value;
        unitInfoInn.textContent = this.translateCount(this.countProduct);
      }
    });

    btnCard.addEventListener(`click`, () => {
      return this.buyCard({
        productId: this.data.productId,
        productCount: this.productCount,
      });
    });
  }

  imagePrefix(image) {
    const imageName = image.split(`.`);
    imageName[imageName.length - 2] = imageName[imageName.length - 2] + `_220x220_1`;
    return imageName.join(`.`)
  }
  translateCount(count = 1) {
    const transate = count * this.data.unitRatioAlt;
    return `${count} упак. = ${transate.toFixed(2)} м. кв.`
  }
  buyCard() {

  }
}
