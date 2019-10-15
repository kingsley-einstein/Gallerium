let scriptId = '';

/**
 *@description Generate random script id
 */
function generateScriptId() {
  scriptId = '';
  const possible = ['A', 'B', 'C', 'D', 'E', '1', '2', '3', '4', '5'];
  for (let i = 0; i < possible.length; i++) {
    scriptId += possible[Math.floor(Math.random() * i)];
  }
}

Route.prototype = {
  url: null,
  context: 'app',
  script: null,
  defaultUrl: '',
  isParent: false,
  isActive: false,
  keyword: '',
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
    generateScriptId();
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = this.script;
    script.defer = true;
    document.body.appendChild(script);
  },
  unloadScript() {
    const script = document.getElementById(scriptId);
    script.remove();
  },
  /**
   *
   * @param {string} activeUrl
   */
  setActiveState(activeUrl) {
    const splitUrl = activeUrl.split('/');
    this.isActive = splitUrl.indexOf(this.keyword) !== -1;
  }
};

/**
 *
 * @param {*} config
 */
function Route(config = {}) {
  this.constructor(config);
}
