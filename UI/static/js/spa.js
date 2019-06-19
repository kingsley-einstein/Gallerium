// eslint-disable-next-line no-unused-vars
const router = new Router({
  routes: [
    new Route({
      url: '/',
      hasDefault: true,
      default: '#landing',
      renderingContext: document.getElementById('app')
    }),
    new Route({
      url: '/login',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app')
    }),
    new Route({
      url: '/landing',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app')
    }),
    new Route({
      url: '/signup',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app')
    })
  ],
  default: '#landing'
});
