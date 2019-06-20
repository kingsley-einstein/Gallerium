// eslint-disable-next-line no-unused-vars
const router = new Router({
  routes: [
    new Route({
      url: '/',
      hasDefault: true,
      default: '#landing',
      renderingContext: document.getElementById('app'),
      hasScript: false
    }),
    new Route({
      url: '/login',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: true
    }),
    new Route({
      url: '/landing',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: false
    }),
    new Route({
      url: '/signup',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: true
    })
  ],
  default: '#landing'
});
