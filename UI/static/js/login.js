(() => {
  // console.log('WELCOME');
  const loginForm = document.getElementById('sign-in');
  const spinner = document.getElementById('spinner');
  const alert = document.getElementById('alert');
  const alertText = document.getElementById('alert-text');
  const actionBtn = document.getElementById('action');
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
  const showAndDismissAlert = (text) => {
    alertText.textContent = text;
    alert.classList.add('show');
    setTimeout(() => {
      alert.classList.remove('show');
    }, 3000);
  };
  const handleResponse = ({status, data, error}) => {
    const errorStatusRegex = new RegExp(/(4\d\d)|(5\d\d)/);
    if (errorStatusRegex.test(status.toString())) {
      console.log(error);
      showAndDismissAlert(error);
      hideSpinner();
    } else {
      hideSpinner();
      const {token, _id} = data;
      localStorage.setItem('token', token);
      localStorage.setItem('id', _id);
      location.assign(`#home?user_id=${_id}`);
    }
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
    submit(data)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // hideSpinner();
          // window.location.assign('#home');
          handleResponse(res);
        })
        .catch((err) => {
          console.log(err);
          hideSpinner();
        });
    event.preventDefault();
    loginForm.reset();
  });
  actionBtn.addEventListener('click', (event) => {
    if (alert.classList.contains('show')) {
      alert.classList.remove('show');
    }
  });
})();
