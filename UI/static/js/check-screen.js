window.addEventListener('load', (event) => {
  if (window.screen.width > 500) {
    location.assign('unsupported-view');
  }
});

window.addEventListener('hashchange', (event) => {
  if (window.screen.width > 500) {
    location.assign('unsupported-view');
  }
});
