function Route(config) {
  this.constructor(config);
}

Route.prototype = {
  // children: [],
  url: '/',
  renderingContext: null,
  hasDefault: false,
  hasScript: false,
  default: null,
  constructor(config) {
    // this.children = config.children || [];
    this.url = config.url || '/';
    this.renderingContext =
      config.renderingContext || document.getElementById('app');
    this.hasDefault = config.isDefault || false;
    this.hasScript = config.hasScript || false;
    this.default = config.default || '#';
  },
  isActive(loc) {
    return new RegExp(loc.substring(1)).test(this.url.replace('/', ''));
  }
};
