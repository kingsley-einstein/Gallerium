const script = document.getElementById('script');
const routeScript = document.getElementById('route');
const routerScript = document.getElementById('router');
const spaScript = document.getElementById('spa');
// eslint-disable-next-line no-unused-vars
const loadScript = (url) => {
  script.src = url;
};

// eslint-disable-next-line no-unused-vars
const unloadScript = () => {
  script.src = '';
};

// eslint-disable-next-line no-unused-vars
const reloadRouter = () => {
  setTimeout(() => {
    routeScript.remove();
    routerScript.remove();
    spaScript.remove();
  }, 500);
  setTimeout(() => {
    document.body.append(routeScript);
    document.body.append(routerScript);
    document.body.append(spaScript);
  }, 5000);
  // console.log(document.getElementById('home'));
};
