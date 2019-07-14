(() => {
  // console.log('hi');
  const avatar = document.getElementById('avatar');
  const loadAvatar = async (id) => {
    await fetch(`/api/v1/uploads/byid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          avatar.src = res.data.url;
        })
        .catch((err) => {
          console.log(err);
        });
  };
  fetch(`/api/v1/users/${localStorage.getItem('id')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
      // console.log(res);
        const {data} = res;
        if (data.pic) {
          loadAvatar(data.pic);
        }
      })
      .catch((err) => {
        console.log(err);
      });
})();
