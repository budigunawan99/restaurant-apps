const Loader = {
  init(state) {
    this._state = state;
    this._loader = document.getElementById('overlay');
    this._chooseLoader();
  },

  _chooseLoader() {
    if (this._state) {
      this._loaderOn();
    } else {
      this._loaderOff();
    }
  },

  _loaderOn() {
    this._loader.style.display = 'block';
    document.body.style.overflow = 'hidden';
  },

  _loaderOff() {
    this._loader.style.display = 'none';
    document.body.style.overflow = 'unset';
  },
};

export default Loader;
