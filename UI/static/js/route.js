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
  hasChildren: false,
  watchTag: '',
  hasRequiredScript: false,
  requiredScriptUrl: '',
  self: '',
  async constructor(config) {
    // this.children = config.children || [];
    this.url = config.url || '/';
    this.renderingContext =
      config.renderingContext || document.getElementById('app');
    this.hasDefault = config.hasDefault || false;
    this.hasScript = config.hasScript || false;
    this.default = config.default || '#';
    this.hasChildren = config.hasChildren || false;
    this.watchTag = config.watchTag || '';
    this.hasRequiredScript = config.hasRequiredScript || false;
    this.requiredScriptUrl = config.requiredScriptUrl || null;
    this.self = config.self || '';
    // this.id = config.id || null;
    this.watchForChanges();
    this.watchSelf();
  },
  isActive(loc) {
    return new RegExp(loc.substring(1)).test(this.url.replace('/', ''));
  },
  watchForChanges() {
    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((record) => {
        record.addedNodes.forEach((node) => {
          // console.log(node.id);
          if (node.id == this.watchTag) {
            console.log(node.id);
            this.renderingContext = document.getElementById(this.watchTag);
            // this.contextInDOM = true;
          }
        });
      });
    });
    observer.observe(document.getElementById('app'), {
      childList: true
    });
  },
  loadRequiredScript() {
    const requiredScript = document.createElement('script');
    requiredScript.src = this.requiredScriptUrl;
    document.body.append(requiredScript);
  },
  watchSelf() {
    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.id == this.self) {
            if (this.hasRequiredScript) {
              setTimeout(() => {
                this.loadRequiredScript();
              }, 1000);
            }
          }
        });
      });
    });
    observer.observe(document.getElementById(this.watchTag), {
      childList: true
    });
  }
};
