

export default class Section {
    constructor ({ data, renderer }, cardSelector) {
        this._renderer = renderer;
        this._renderedItems = data;
        this._card = document.querySelector(cardSelector)
    }

    addItem(element) {
        this._card.append(element);
        
    }
    renderItems() {
        this._renderedItems.forEach((item) => {
          this._renderer(item);
        });
      }
}