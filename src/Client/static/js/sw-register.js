(async () => {
  if (navigator.serviceWorker) {
    const registration = await navigator.serviceWorker.register('/js/sw.js', {scope: '/'});
    console.log(registration);
    M.toast({
      html: `<span class="orange-text text-lighten-1">Service worker registered. Now loading resources for offline capability</span>`
    });
  }
})();
