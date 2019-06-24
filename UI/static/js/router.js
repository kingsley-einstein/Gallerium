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
    // this.popState();
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
        .then((res) => {
          renderingContext.innerHTML = res;
        // window.history.pushState({}, url, window.location.origin + url);
        })
        .catch((err) => console.log(err));
  },
  watchHashChange() {
    window.addEventListener('hashchange', (event) => {
      const route = this.routes.find((value) => {
        return value.isActive(window.location.hash);
      });
      if (route) {
        // if (route.hasChildren) {
        //   reloadRouter();
        // }
        if (route.hasDefault) {
          console.log('Has default');
          const loc = this.routes.find((value) => {
            return value.url.replace('/', '') == route.default.replace('#', '');
          });
          this.navigate(route.url, route.renderingContext);
          setTimeout(() => {
            this.navigate(loc.url, loc.renderingContext);
          }, 1000);
          // if (loc.hasScript) {
          //   setTimeout(() => {
          //     loadScript(`/js/${loc.url.replace('/', '')}.js`);
          //   }, 2000);
          // } else {
          //   unloadScript();
          // }
        } else {
          this.navigate(route.url, route.renderingContext);
          // console.log(route.renderingContext);
          // if (route.hasScript) {
          //   setTimeout(() => {
          //     loadScript(`/js/${route.url.replace('/', '')}.js`);
          //   }, 2000);
          // } else {
          //   unloadScript();
          // }
        }
      } else {
        const alt = this.routes.find((value) => {
          return value.url.replace('/', '') == this.default.replace('#', '');
        });
        this.navigate(alt.url, alt.renderingContext);
        // if (alt.hasScript) {
        //   setTimeout(() => {
        //     loadScript(`/js/${alt.url.replace('/', '')}.js`);
        //   }, 2000);
        // } else {
        //   unloadScript();
        // }
      }
    });
  },
  toDefault() {
    const route = this.routes.find((value) => {
      return value.url.replace('/', '') === this.default.replace('#', '');
    });
    this.navigate(route.url, route.renderingContext);
    // if (route.hasScript) {
    //   setTimeout(() => {
    //     loadScript(`/js/${route.url.replace('/', '')}.js`);
    //   }, 2000);
    // } else {
    //   // unloadScript();
    // }
  },
  popState() {
    window.onpopstate = () => {
      const res = this.routes.find((value) => {
        return (
          new RegExp(window.location.hash.substring(1)).test(
              value.url.replace('/', '')
          ) || new RegExp(window.location.pathname)
              .test(value.url.replace('/', ''))
        );
      });
      this.navigate(res.url, res.renderingContext);
    };
  }
};
