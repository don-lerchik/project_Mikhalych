const productArea = document.querySelector(`.product__area`);

export const changeViewElement = (node) => {
  const productsPage = document.querySelector(`.products_page`);
  productsPage.appendChild(node.element);
}
export const changeViewList = (node) => {
  productArea.innerHTML = ``;
  productArea.appendChild(node.element);
};
export const createElement = (string) => {
  const screen = document.createElement(`div`);
  screen.classList.add(`product`);
  screen.classList.add(`product_horizontal`);
  screen.insertAdjacentHTML(`afterbegin`, string);
  return screen;
};
export const createSection = (string) => {
  const screen = document.createElement(`div`);
  screen.setAttribute(`id`, `products_section`);
  screen.insertAdjacentHTML(`afterbegin`, string);
  return screen;
};
