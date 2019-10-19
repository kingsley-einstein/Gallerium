(() => {
  setTimeout(() => {
    const isLoading = false;
    const loader_proxy = new Proxy({isLoading}, {
      set(target) {
        return true;
      }
    });
    const modalInstances = document.querySelectorAll('.modal');
    M.Modal.init(modalInstances, {});
    const messageInstance = M.Modal.getInstance(document.querySelector('#message'));
    messageInstance.open();
  }, 1000);
})();
