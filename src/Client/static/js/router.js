Router.prototype = {
  routes: {},
  defaultUrl: '/landing',
  constructor(routes = {}) {
    this.routes = routes;
    this.watchHashChange();
    this.navigateToDefault();
  },
  watchHashChange() {
    window.addEventListener('hashchange', (event) => {
      const route = this.routes[event.newURL.split('#')[1].split('?')[0]];
      const oldRoute = this.routes[event.oldURL.split('#')[1].split('?')[0]];
      route.render();
      route.setActiveState(event.newURL.split('#')[1]);
      if (route.script) {
        route.loadScript();
        if (!oldRoute.isParent && !oldRoute.isActive) {
          oldRoute.unloadScript();
        }
      }
      if (route.defaultUrl) {
        const child = this.routes[route.defaultUrl];
        location.hash = child.url;
      }
    });
  },
  navigateToDefault() {
    const route = this.routes[this.defaultUrl];
    location.hash = route.url;
  }
};

/**
 *
 * @param {*} routes
 */
function Router(routes = {}) {
  this.constructor(routes);
}
