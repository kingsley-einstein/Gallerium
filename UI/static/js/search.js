(() => {
  const searchInput = document.getElementById('search-input');
  const search = async ({target}) => {
    const send = await fetch(`/api/v1/users/search?search=${target.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return send;
  };
  searchInput.addEventListener('input', (event) => {
    search(event)
        .then((res) => {
          return res.json();
        })
        .then((value) => {
          console.log(value);
        })
        .catch((err) => {
          console.log(err);
        });
  });
})();
