(() => {
  const uploadForm = document.getElementById('upload-form');
  const spinner = document.getElementById('spinner');
  const showSpinner = async () => {
    await spinner.classList.remove('hide');
  };
  const hideSpinner = async () => {
    await spinner.classList.add('hide');
  };
  const submit = async (data) => {
    showSpinner();
    const send = await fetch(
        `/api/v1/upload?user_id=${localStorage.getItem('id')}`,
        {
          method: 'POST',
          body: new FormData(data),
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
    return send;
  };
  uploadForm.addEventListener('submit', (event) => {
    submit(uploadForm).then((res) => res.json())
        .then((res) => {
          console.log(res);
          hideSpinner();
          uploadForm.reset();
        })
        .catch((err) => {
          console.log(err);
          hideSpinner();
        });
    event.preventDefault();
  });
})();
