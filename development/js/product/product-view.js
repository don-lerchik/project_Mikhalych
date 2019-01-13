import AbstractView from '../view';
import footer from '../block/footer';
import {createSection} from '../until';

export default class ProductView extends AbstractView {
  constructor(data, state) {
    super();
    this.data = data;
    this.state = state;
    console.log(this.state.pageIn, this.state.pageCount);
  }
  render() {
    return createSection(this.template);
  }
  get template() {
    return `\
    <div class="products_page pg_${this.state.pageIn}">                      
    </div>
    ${footer(this.state.pageIn, this.state.pageCount)}`;
  }
  bind() {
    const paginationBack = this.element.querySelector(`.pagination__item--back`);
    const paginationNext = this.element.querySelector(`.pagination__item--next`);
    const btnPageToArray = this.element.querySelectorAll(`.pagination__item--page`);

    paginationBack.addEventListener(`click`,() => {
      if (!paginationBack.classList.contains(`disabled`)) {
        this.backToPage();
      }
    });

    paginationNext.addEventListener(`click`,() => {
      if (!paginationNext.classList.contains(`disabled`)) {
        this.nextToPage();
      }
    });

    btnPageToArray.forEach((el) => {
      el.addEventListener(`click`,() => {
        if (!el.classList.contains(`pagination__item--active`)) {
          const NumberToPage = parseInt(el.textContent,10);
          this.toPage(NumberToPage);
        }
      })
    });

  }

  backToPage() {

  }
  nextToPage() {

  }
  toPage() {

  }
}
