export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach((item) => {
      const card = this._renderer(item);
      this._container.append(card);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
