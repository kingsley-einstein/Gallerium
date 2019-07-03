(() => {
  // console.log('WELCOME');
  const loginForm = document.getElementById('sign-in');
  const spinner = document.getElementById('spinner');
  const submit = async (data) => {
    const send = await fetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await showSpinner();
    return send;
  };
  const showSpinner = async () => {
    await spinner.classList.remove('hide');
  };
  const hideSpinner = async () => {
    await spinner.classList.add('hide');
  };
  loginForm.addEventListener('submit', (event) => {
    const data = {};
    for (let i = 0; i < loginForm.elements.length; i++) {
      const input = loginForm.elements[i];
      if (input.name) {
        data[input.name] = input.value;
      }
    }
    // console.log(data);
    submit(data).then((res) => res.json())
        .then((res) => {
          console.log(res);
          hideSpinner();
          window.location.assign('#home');
        })
        .catch((err) => {
          console.log(err);
          hideSpinner();
        });
    event.preventDefault();
    loginForm.reset();
  });
})();
