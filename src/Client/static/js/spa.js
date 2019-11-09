new Router({
  '/login': new Route({
    url: '/login',
    context: 'app',
    keyword: 'login',
    script: '/js/login.js'
  }),
  '/signup': new Route({
    url: '/signup',
    context: 'app',
    keyword: 'signup',
    script: '/js/signup.js'
  }),
  '/home': new Route({
    url: '/home',
    context: 'app',
    isParent: true,
    keyword: 'home',
    defaultUrl: '/home/feeds',
    script: '/js/home.js'
  }),
  '/home/feeds': new Route({
    url: '/home/feeds',
    context: 'home',
    keyword: 'feeds',
    script: '/js/feeds.js',
    parent: '/home'
  }),
  '/home/profile': new Route({
    url: '/home/profile',
    context: 'home',
    keyword: 'profile',
    script: '/js/profile.js',
    isParent: true,
    defaultUrl: '/home/profile/me',
    parent: '/home'
  }),
  '/home/profile/me': new Route({
    url: '/home/profile/me',
    context: 'profile',
    keyword: 'me',
    script: '/js/me.js',
    parent: '/home/profile'
  }),
  '/home/profile/uploads': new Route({
    url: '/home/profile/uploads',
    context: 'profile',
    keyword: 'uploads',
    script: '/js/uploads.js',
    parent: '/home/profile'
  }),
  '/home/profile/edit': new Route({
    url: '/home/profile/edit',
    context: 'profile',
    keyword: 'edit',
    script: '/js/edit.js',
    parent: '/home/profile'
  }),
  '/home/settings': new Route({
    url: '/home/settings',
    context: 'home',
    keyword: 'settings',
    script: '/js/settings.js',
    parent: '/home'
  }),
  '/home/upload': new Route({
    url: '/home/upload',
    context: 'home',
    keyword: 'upload',
    script: '/js/upload.js',
    parent: '/home'
  }),
  '/home/notifications': new Route({
    url: '/home/notifications',
    context: 'home',
    keyword: 'notifications',
    script: '/js/notifications.js',
    parent: '/home'
  }),
  '/home/search': new Route({
    url: '/home/search',
    context: 'home',
    keyword: 'search',
    script: '/js/search.js',
    parent: '/home'
  })
});
