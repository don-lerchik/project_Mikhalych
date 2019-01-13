
export default (pageIn, pageAll) => `
  <div class="pagination">
    <a class="pagination__item pagination__item--back ${(pageIn === 1) ? `disabled` : ``}">Назад</a>
    ${Array(pageAll).fill(null).map((element, index) => {
    if ((index + 1) === pageIn) {
      return `<a class="pagination__item pagination__item--page pagination__item--active">${index + 1}</a>`
    }
    return `<a class="pagination__item pagination__item--page pagination__item">${index + 1}</a>`
  }).join(``)}
    <a class="pagination__item pagination__item--next ${(pageIn === pageAll) ? ` disabled` : ``}">Вперед</a>
  </div>`.trim();

