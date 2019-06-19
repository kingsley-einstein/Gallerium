function Route(config) {
  this.constructor(config);
}

Route.prototype = {
  // children: [],
  url: '/',
  renderingContext: null,
  hasDefault: false,
  default: null,
  constructor(config) {
    // this.children = config.children || [];
    this.url = config.url || '/';
    this.renderingContext =
      config.renderingContext || document.getElementById('app');
    this.hasDefault = config.isDefault || false;
    this.default = config.default || '#';
  },
  isActive(loc) {
    return loc.substring(1) === this.url.replace('/', '');
  }
};
