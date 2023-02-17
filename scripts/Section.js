export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderElements();
  }

  renderElements() {}

  addItem(element) {
    this._container.append(element);
  }
}

const section = new Section({ items: [], renderer: () => {} }, ".someSelector");
