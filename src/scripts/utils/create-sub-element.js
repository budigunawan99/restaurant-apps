const CreateSubElement = {
  init({data, element, parent}) {
    this._data = data;
    this._element = element;
    this._parent = parent;

    this._createComponent();
  },

  _createComponent() {
    this._data.forEach((data) => {
      const item = document.createElement(this._element);
      item.list = data;
      this._parent.appendChild(item);
    });
  },
};

export default CreateSubElement;
