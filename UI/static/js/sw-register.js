if ('serviceWorker' in navigator) {
  window.addEventListener('load', async (event) => {
    // const {serviceWorker} = navigator;
    await navigator.serviceWorker
        .register('/js/sw.js', {
          scope: '/'
        })
        .then((reg) => {
          console.log(reg);
        })
        .catch((err) => console.log(err));
  });
}
