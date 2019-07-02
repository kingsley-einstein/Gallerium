(() => {
  const signUpForm = document.getElementById('sign-up');
  const spinner = document.getElementById('spinner');
  // console.log('SIGNUP');
  // const form = document.createElement('form');
  const submit = async (data) => {
    const send = await fetch('/api/v1/auth/register', {
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

  signUpForm.addEventListener('submit', (event) => {
    const data = {};
    for (let i = 0; i < signUpForm.elements.length; i++) {
      const input = signUpForm.elements[i];
      if (input.name) {
        data[input.name] = input.value;
      }
    }
    submit(data)
        .then((res) => res.json())
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
    signUpForm.reset();
  });
})();
