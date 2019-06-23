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
      watchTag: 'app',
      self: '/'
    }),
    new Route({
      url: '/login',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: true,
      watchTag: 'app',
      self: 'login'
    }),
    new Route({
      url: '/landing',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: false,
      watchTag: 'app',
      self: 'landing'
    }),
    new Route({
      url: '/signup',
      hasDefault: false,
      default: null,
      renderingContext: document.getElementById('app'),
      hasScript: true,
      watchTag: 'app',
      self: 'signup'
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
      requiredScriptUrl: '/js/home.js',
      self: 'home'
    }),
    new Route({
      url: '/feeds',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home',
      self: 'feeds'
      // parentTag: 'app'
    }),
    new Route({
      url: '/profile',
      hasDefault: true,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home',
      default: '#collection',
      self: 'profile'
      // parentTag: 'app'
    }),
    new Route({
      url: '/settings',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home',
      self: 'settings'
      // parentTag: 'app'
    }),
    new Route({
      url: '/upload',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      hasScript: false,
      watchTag: 'home',
      parentTag: 'app',
      self: 'upload'
    }),
    new Route({
      url: '/collection',
      hasDefault: false,
      renderingContext: document.getElementById('profile'),
      hasScript: false,
      watchTag: 'profile',
      // parentTag: 'home',
      self: 'collection'
    })
  ],
  default: '#landing'
});
