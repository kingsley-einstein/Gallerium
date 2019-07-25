(() => {
  const el = document.getElementById('collection');
  const spinner = document.getElementById('spinner');
  const collectionState = {
    images: null
  };
  Object.defineProperty(collectionState, 'images', {
    set(v) {
      if (!!v && v.length > 0) {
        el.classList.add('is-grid-of-images');
        v.forEach((item) => {
          const div = document.createElement('div');
          const button = document.createElement('button');
          const image = document.createElement('img');

          button.className = 'button-green';
          button.addEventListener('click', (event) => {
            setPic(item._id)
                .then((res) => {
                  return res.json();
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
          });
          button.textContent = 'Set';
          image.src = item.url;
          div.appendChild(image);
          div.appendChild(button);
          el.appendChild(div);
        });
      } else {
        el.classList.add('is-with-placeholder');
        el.innerHTML = `<p>No Uploads</p>`;
      }
    }
  });
  const showSpinner = () => {
    spinner.classList.remove('hide');
  };
  const hideSpinner = () => {
    spinner.classList.add('hide');
  };
  const setPic = async (image_id) => {
    const send = await fetch(`/api/v1/users/${localStorage.getItem('id')}`, {
      method: 'PUT',
      body: JSON.stringify({
        pic: image_id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return send;
  };
  const handleResponse = async ({data, status, error}) => {
    await showSpinner();
    const errorRegex = new RegExp(/(4\d\d)|(5\d\d)/);
    if (errorRegex.test(status.toString())) {
      await console.log(error);
      await hideSpinner();
      el.innerHTML = `<p>${error}</p>`;
    } else {
      await console.log(data);
      await hideSpinner();
      collectionState.images = data;
    }
  };
  fetch(`/api/v1/uploads/byuser?user_id=${localStorage.getItem('id')}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })
      .then((res) => res.json())
      .then((res) => {
        handleResponse(res);
      })
      .catch((err) => console.log(err));
})();
