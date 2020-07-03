export  class Section {
    constructor ({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    //публичный метод: принимает DOM-элемент и добавляет в контейнер
    addItem(element, initial) {
        if (initial) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }

}
