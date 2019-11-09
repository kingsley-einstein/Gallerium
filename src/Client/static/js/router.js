Router.prototype = {
  routes: {},
  defaultUrl: '/login',
  parentRoutes: {},
  constructor(routes = {}) {
    this.routes = routes;
    this.watchHashChange();
    // this.watchPopState();
    this.navigateToDefault();
  },
  watchHashChange() {
    window.addEventListener('hashchange', (event) => {
      // console.log(window.history);
      const route = this.routes[event.newURL.split('#')[1].split('?')[0]];
      const oldRoute = this.routes[event.oldURL.split('#')[1] ? event.oldURL.split('#')[1].split('?')[0] : ''];
      // window.history.pushState(route.url, route.keyword, location.origin + route.url);
      route.render();
      route.setActiveState(event.newURL.split('#')[1]);
      if (route.script) {
        route.loadScript();
      }
      if (oldRoute) {
        oldRoute.setActiveState(event.newURL.split('#')[1]);
        if ((!oldRoute.isActive) && oldRoute.script) {
          oldRoute.unloadScript();
        }
      }
      if (route.isParent) {
        this.parentRoutes[route.url] = route;
      }
      Object.keys(this.parentRoutes).forEach((key) => {
        this.parentRoutes[key].setActiveState(event.newURL.split('#')[1]);
        if ((!this.parentRoutes[key].isActive) && this.parentRoutes[key].script) {
          this.parentRoutes[key].unloadScript();
        }
      });
      if (route.defaultUrl) {
        const child = this.routes[route.defaultUrl];
        setTimeout(() => {
          location.hash = child.url;
        }, 1000);
      }
    });
  },
  navigateToDefault() {
    const route = this.routes[this.defaultUrl];
    location.hash = route.url;
  },
  watchPopState() {
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      const route = this.routes[location.pathname];
      location.hash = route.url;
      // history.forward();
    });
  }
};

/**
 *
 * @param {*} routes
 */
function Router(routes = {}) {
  this.constructor(routes);
}
