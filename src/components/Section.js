export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  renderItems() {
    this._initialArray.forEach((arrEl) => {
      this._renderer(arrEl);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
};
