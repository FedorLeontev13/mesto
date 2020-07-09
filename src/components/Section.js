export default class Section {
  constructor({ data, renderer, userId }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._userId = userId;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item, this._userId);
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this._container.append(element);
  }

}
