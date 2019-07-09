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
      hasRequiredScript: true,
      watchTag: 'app',
      self: 'login',
      requiredScriptUrl: '/js/login.js'
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
      hasRequiredScript: true,
      watchTag: 'app',
      self: 'signup',
      requiredScriptUrl: '/js/signup.js'
    }),
    new Route({
      url: '/home',
      hasDefault: true,
      default: '#feeds',
      renderingContext: document.getElementById('app'),
      hasParentScript: true,
      hasChildren: true,
      watchTag: 'app',
      parentScriptUrl: '/js/home.js',
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
      hasRequiredScript: true,
      requiredScriptUrl: '/js/upload.js',
      watchTag: 'home',
      parentTag: 'app',
      self: 'upload'
    }),
    new Route({
      url: '/collection',
      hasDefault: false,
      renderingContext: document.getElementById('profile'),
      hasRequiredScript: true,
      requiredScriptUrl: '/js/collection.js',
      watchTag: 'profile',
      // parentTag: 'home',
      self: 'collection'
    }),
    new Route({
      url: '/followers',
      hasDefault: false,
      renderingContext: document.getElementById('profile'),
      hasScript: false,
      watchTag: 'profile',
      self: 'followers'
    }),
    new Route({
      url: '/search',
      hasDefault: false,
      renderingContext: document.getElementById('home'),
      watchTag: 'home',
      self: 'search'
    })
  ],
  default: '#landing'
});
