window.addEventListener('load', (event) => {
  if (window.screen.width <= 500) {
    location.assign('/');
  }
});

window.addEventListener('hashchange', (event) => {
  if (window.screen.width <= 500) {
    location.assign('/');
  }
});
