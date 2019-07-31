(() => {
  const searchState = {
    result: null
  };
  const searchInput = document.getElementById('search-input');
  const searchResultParent = document.getElementById('search-result-parent');
  const spinner = document.getElementById('spinner');
  const showSpinner = () => {
    spinner.classList.remove('hide');
  };
  const hideSpinner = () => {
    spinner.classList.add('hide');
  };
  const search = async ({target}) => {
    const send = await fetch(`/api/v1/users/search/${target.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return send;
  };
  const getImage = async ({pic}, img) => {
    await fetch(`/api/v1/uploads/byid/${pic}`, {
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
          const {data} = res;
          img.src = data.url;
        })
        .catch((err) => {
          console.log(err);
        });
  };
  Object.defineProperty(searchState, 'result', {
    set(v) {
      console.log(v);
      searchResultParent.innerHTML = '';
      if (v.length > 0 && !!v) {
        if (searchResultParent.classList.contains('is-with-placeholder')) {
          searchResultParent.classList.remove('is-with-placeholder');
          searchResultParent.classList.add('is-a-list');
        }
        v.forEach((item) => {
          const searchListItem = document.createElement('div');
          searchListItem.className = 'search-list-item';
          const div1 = document.createElement('div');
          const img = document.createElement('img');
          img.src = '/img/avatar.jpg';
          if (item.pic) {
            getImage(item, img);
          }
          div1.appendChild(img);
          const div2 = document.createElement('div');
          div2.className = 'inner-search-list-item';
          const div3 = document.createElement('div');
          div3.textContent = item.username;
          const div4 = document.createElement('div');
          const emphasis = document.createElement('cite');
          emphasis.textContent = `${item.first_name} ${item.last_name}`;
          div4.appendChild(emphasis);
          div2.appendChild(div3);
          div2.appendChild(div4);
          searchListItem.appendChild(div1);
          searchListItem.appendChild(div2);
          searchResultParent.appendChild(searchListItem);
        });
      } else {
        if (searchResultParent.classList.contains('is-a-list')) {
          searchResultParent.classList.remove('is-a-list');
        }
        if (!searchResultParent.classList.contains('is-with-placeholder')) {
          searchResultParent.classList.add('is-with-placeholder');
        }
        searchResultParent.childNodes.forEach((node) => {
          node.remove();
        });
        searchResultParent.textContent = 'No result';
      }
    }
  });
  searchInput.addEventListener('input', (event) => {
    if (event.target.value.trim().length > 0) {
      showSpinner();
      search(event)
          .then((res) => {
            return res.json();
          })
          .then((value) => {
            console.log(value);
            searchState.result = value.data;
            hideSpinner();
          })
          .catch((err) => {
            console.log(err);
            hideSpinner();
          });
    } else {
      hideSpinner();
      if (searchResultParent.classList.contains('is-a-list')) {
        searchResultParent.classList.remove('is-a-list');
      }
      if (!searchResultParent.classList.contains('is-with-placeholder')) {
        searchResultParent.classList.add('is-with-placeholder');
      }
      searchResultParent.innerHTML = '';
      searchResultParent.textContent = 'Enter a username to find';
    }
  });
})();
