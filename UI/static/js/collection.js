(() => {
  const el = document.getElementById('collection');
  const obj = {
    status: null,
    images: null
  };
  Object.defineProperty(obj, 'images', {
    set(v) {
      if (!!v && v.length > 0) {
        el.classList.add('is-grid-of-images');
        v.forEach((item) => {
          const div = document.createElement('div');
          const button = document.createElement('button');
          const image = document.createElement('img');

          button.className = 'button-green';
          button.addEventListener('click', (event) => {
            setPic(item._id).then((res) => {
              return res.json();
            }).then((res) => {
              console.log(res);
            }).catch((err) => {
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
    const errorRegex = new RegExp(/(4\d\d)|(5\d\d)/);
    if (errorRegex.test(status.toString())) {
      await console.log(error);
    } else {
      await console.log(data);
      obj.images = data;
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
