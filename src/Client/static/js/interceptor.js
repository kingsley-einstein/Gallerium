(() => {
  const globalFetch = fetch;

  fetch = (input, init) => {
    return new Promise(async (resolve) => {
      if (localStorage.getItem('token')) {
        if (init) {
          init.headers['Authorization'] = `Bearer ${await Hasher.asyncJsonAsToken(localStorage.getItem('token'))}`;
        }
      }
      const response = await globalFetch(input, init);
      if (response.status === 401) {
        M.toast({
          html: `<span class="red-text text-lighten-1">Error: 401 - "You need to sign in."</span>`
        });
        localStorage.clear();
        location.hash = '/login';
      }
      resolve(response);
      console.log(response);
    });
  };
})();
