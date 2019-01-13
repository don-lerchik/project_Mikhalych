export const initialState = Object.freeze({
  pageIn: 1,
  pageCount: 0,
  productSkip: 0,
  productLimit: 30,
  productCount: 0
});
export const repareState = (state, count) => {
  const newState = Object.assign({}, state);
  newState.productCount = count;
  newState.pageCount = Math.ceil(newState.productCount / newState.productLimit);
  return newState;

};
export const setPages = (state, numberToPage) => {
  if (numberToPage > state.pageCount) {
    throw new RangeError(`Can't go to this pages`);
  }
  const newState = Object.assign({}, state);
  newState.pageIn = numberToPage;
  newState.productSkip = (numberToPage - 1) * newState.productLimit;
  return newState;
};