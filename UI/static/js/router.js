function Router(config) {
  this.constructor(config);
}

Router.prototype = {
  routes: [],
  default: null,
  constructor(config) {
    this.routes = config.routes || [];
    this.default = config.default || '';
    this.toDefault();
    this.watchHashChange();
  },
  async navigate(url, renderingContext) {
    const resolved = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      }
    });
    await resolved
        .then((res) => res.text())
        .then((res) => (renderingContext.innerHTML = res))
        .catch((err) => console.log(err));
  },
  watchHashChange() {
    window.addEventListener('hashchange', (event) => {
      const route = this.routes.find((value) => {
        return value.isActive(window.location.hash);
      });
      if (route) {
        if (route.hasDefault) {
          const loc = this.routes.find((value) => {
            return value.url.replace('/', '') == route.default.replace('#', '');
          });
          this.navigate(loc.url, loc.renderingContext);
          if (loc.hasScript) {
            setTimeout(() => {
              loadScript(`/js/${loc.url.replace('/', '')}.js`);
            }, 2000);
          }
        } else {
          this.navigate(route.url, route.renderingContext);
          if (route.hasScript) {
            setTimeout(() => {
              loadScript(`/js/${route.url.replace('/', '')}.js`);
            }, 2000);
          }
        }
      } else {
        const alt = this.routes.find((value) => {
          return value.url.replace('/', '') == this.default.replace('#', '');
        });
        this.navigate(alt.url, alt.renderingContext);
        if (alt.hasScript) {
          setTimeout(() => {
            loadScript(`/js/${alt.url.replace('/', '')}.js`);
          }, 2000);
        }
      }
    });
  },
  toDefault() {
    const route = this.routes.find((value) => {
      return value.url.replace('/', '') === this.default.replace('#', '');
    });
    this.navigate(route.url, route.renderingContext);
    if (route.hasScript) {
      setTimeout(() => {
        loadScript(`/js/${route.url.replace('/', '')}.js`);
      }, 2000);
    }
  }
};
