(() => {
  setTimeout(() => {
    const sendToApi = (body) => fetch('/api/v1/auth/register', {
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
        // console.log(value);
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
    const form = document.querySelector('#sign_up_form');
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
      if (!response.ok && response.status >= 400) {
        M.toast({
          html: `<span class="red-text text-lighten-1">Error: ${response.status} - ${JSON.stringify(responseContent.error)}</span>`
        });
        return;
      }
      if (response.status == 201 || response.status == 200) {
        form.reset();
        console.log(responseContent);
        M.toast({
          html: `<span class="green-text text-lighten-1">Successfully registered user.</span>`
        });
        localStorage.setItem('token', await Hasher.asyncTokenAsJson(responseContent.data.token));
        // console.log(await Hasher.asyncJsonAsToken(localStorage.getItem('token')));
        location.hash = '/home';
      }
    });
  }, 1000);
})();
