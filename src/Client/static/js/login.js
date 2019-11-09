(() => {
  setTimeout(async () => {
    const checkSession = async () => {
      if (localStorage.getItem('token')) {
        M.toast({
          html: `<span class="green-text text-lighten-1">Valid session detected. Redirecting...</span>`
        });
        location.hash = '/home';
      }
    };
    const sendToApi = (body) => fetch('/api/v1/auth/login/username', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const isLoading = false;
    const loader = document.querySelector('#loader');
    const inputs = document.querySelectorAll('input');
    const loader_proxy = new Proxy({isLoading}, {
      set(target, p, value, r) {
        if (loader.classList.contains('active')) {
          loader.classList.remove('active');
        }
        if (value) {
          console.log('Loading...');
          loader.classList.add('active');
        }
        return true;
      }
    });
    const form = document.querySelector('#login_form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      let data = {};
      loader_proxy.isLoading = true;
      inputs.forEach((input) => {
        if (input.name) {
          data[input.name] = input.value;
        }
      });
      data = JSON.stringify(data);
      const response = await sendToApi(data);
      const responseContent = await response.json();
      if (responseContent || !responseContent || response || !response) {
        loader_proxy.isLoading = false;
      }
      if (!response.ok || response.status >= 400) {
        M.toast({
          html: `<span class="red-text text-lighten-1">Error: ${response.status} - ${JSON.stringify(responseContent.error)}</span>`
        });
        return;
      }
      if (response.status == 200) {
        form.reset();
        console.log(responseContent);
        M.toast({
          html: `<span class="green-text text-lighten-1">User logged in successfully.</span>`
        });
        localStorage.setItem('token', await Hasher.asyncTokenAsJson(responseContent.data.token));
        location.hash = '/home';
      }
    });
    await checkSession();
  }, 1000);
})();
