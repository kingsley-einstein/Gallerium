Route.prototype = {
  url: null,
  context: 'app',
  script: null,
  defaultUrl: '',
  isParent: false,
  isActive: false,
  keyword: '',
  scriptId: '',
  /**
   *
   * @param {{}} config
   */
  constructor(config) {
    this.url = config.url;
    this.context = config.context || 'app';
    this.script = config.script || null;
    this.defaultUrl = config.defaultUrl || '';
    this.isParent = config.isParent || false;
    this.keyword = config.keyword || '';
  },
  render() {
    fetch(this.url)
      .then((res) => res.text())
      .then((responseHTML) => {
        const renderingContext = document.getElementById(this.context);
        renderingContext.innerHTML = responseHTML;
      });
  },
  loadScript() {
    if (this.scriptId.length > 0) {
      this.unloadScript();
    }
    this.generateScriptId();
    const script = document.createElement('script');
    script.id = this.scriptId;
    script.src = this.script;
    script.defer = true;
    document.body.appendChild(script);
  },
  unloadScript() {
    const script = document.getElementById(this.scriptId);
    if (script) {
      document.body.removeChild(script);
    }
  },
  /**
   *
   * @param {string} activeUrl
   */
  setActiveState(activeUrl) {
    const splitUrl = activeUrl.split('/');
    this.isActive = splitUrl.indexOf(this.keyword) !== -1;
  },
  generateScriptId() {
    this.scriptId = '';
    const possible = ['A', 'B', 'C', 'D', 'E', '1', '2', '3', '4', '5', '$', '+', '-', '^', 'a', 'b', 'c', 'd', 'e'];
    for (let i = 0; i < possible.length; i++) {
      this.scriptId += possible[Math.floor(Math.random() * i)];
    }
  }
};

/**
 *
 * @param {*} config
 */
function Route(config = {}) {
  this.constructor(config);
}
