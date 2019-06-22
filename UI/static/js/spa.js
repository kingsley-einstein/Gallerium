// eslint-disable-next-line no-unused-vars
const router = new Router({
  routes: [
    new Route({
      url: '/',
      hasDefault: true,
      default: '#landing',
      renderingContext: document.getElementById('app'),
      hasScript: false,
      hasChildren: true,
      watchTag: 'app'
    }),
    new Route({
      url: '/login',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: true,
      watchTag: 'app'
    }),
    new Route({
      url: '/landing',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: false,
      watchTag: 'app'
    }),
    new Route({
      url: '/signup',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: true,
      watchTag: 'app'
    }),
    new Route({
      url: '/home',
      hasDefault: true,
      default: '#feeds',
      renderingContext: document.getElementById('app'),
      hasScript: true,
      hasChildren: true,
      watchTag: 'app',
      hasRequiredScript: true,
      requiredScriptUrl: '/js/home.js'
    }),
    new Route({
      url: '/feeds',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home'
    }),
    new Route({
      url: '/profile',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home'
    }),
    new Route({
      url: '/settings',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home'
    }),
    new Route({
      url: '/upload',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home'
    })
  ],
  default: '#landing'
});
