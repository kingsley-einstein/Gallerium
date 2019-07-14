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
  parentTag: '',
  hasParentScript: false,
  parentScriptUrl: '',
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
    this.hasParentScript = config.hasParentScript || false;
    this.parentScriptUrl = config.parentScriptUrl || '';
    // this.parentTag = config.parentTag || null;
    // this.id = config.id || null;
    this.watchForChanges();
    this.watchSelf();
    console.log(this.self);
  },
  isActive(loc) {
    return new RegExp(loc.substring(1).split('?')[0]).test(
        this.url.replace('/', '')
    );
  },
  watchForChanges() {
    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((record) => {
        record.addedNodes.forEach((node) => {
          // console.log(node.id);
          // console.log(this.self);
          if (node.id == this.watchTag) {
            // console.log(node.id);
            this.renderingContext = document.getElementById(this.watchTag);
            // this.contextInDOM = true;
          }
        });
      });
    });
    observer.observe(document.getElementById('app'), {
      subtree: true,
      childList: true
    });
  },
  loadRequiredScript() {
    const requiredScript = document.createElement('script');
    requiredScript.src = this.requiredScriptUrl;
    requiredScript.id = 'required';
    document.body.append(requiredScript);
  },
  unloadFormerScript() {
    const formerScript = document.getElementById('required');
    if (formerScript) {
      document.body.removeChild(formerScript);
    }
  },
  loadParentScript() {
    const parentScript = document.createElement('script');
    parentScript.id = this.self + '-#script';
    parentScript.src = this.parentScriptUrl;
    document.body.append(parentScript);
  },
  watchSelf() {
    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.id == this.self) {
            if (this.hasParentScript) {
              if (document.getElementById(this.self + '-#script')) {
                document.body.removeChild(
                    document.getElementById(this.self + '-#script')
                );
              }
              setTimeout(() => {
                this.loadParentScript();
              }, 500);
            }
            if (this.hasRequiredScript) {
              setTimeout(() => {
                this.unloadFormerScript();
                this.loadRequiredScript();
              }, 1000);
            } else {
              this.unloadFormerScript();
            }
          }
        });
      });
    });
    observer.observe(document.getElementById('app'), {
      subtree: true,
      childList: true
    });
  }
};
