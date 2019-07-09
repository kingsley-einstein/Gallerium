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
          const image = document.createElement('img');
          image.src = item.url;
          el.appendChild(image);
        });
      } else {
        el.classList.add('is-with-placeholder');
        el.innerHTML = `<p>No Uploads</p>`;
      }
    }
  });
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
  }).then((res) => res.json())
      .then((res) => {
        handleResponse(res);
      })
      .catch((err) => console.log(err));
})();
