(() => {
  setTimeout(async () => {
    const state = {
      result: []
    };
    const search_state = {
      result: []
    };
    const noResult = document.querySelector('#no-result');
    const searchInput = document.querySelector('#search');
    const loader = document.querySelector('#loader');
    const list = document.querySelector('#list');
    const search_state_proxy = new Proxy(search_state, {
      set(target, p, value) {
        list.innerHTML = '';
        noResult.style.display = value.length === 0 ? 'block' : 'none';
        if (value.length > 0) {
          value.forEach((user) => {
            const listItem = document.createElement('li');
            const image = document.createElement('img');
            const name = document.createElement('span');
            const link = document.createElement('a');
            const icon = document.createElement('i');

            listItem.className = 'collection-item avatar';
            image.src = '/img/jane_doe.jpg';
            image.className = 'circle';
            name.className = 'title grey-text text-darken-4';
            name.textContent = user.username;
            link.href = '#';
            link.className = 'secondary-content';
            icon.className = 'material-icons';
            icon.innerText = 'chevron_right';

            link.appendChild(icon);
            listItem.appendChild(image);
            listItem.appendChild(name);
            listItem.appendChild(link);

            list.appendChild(listItem);
          });
        }
      }
    });
    const getFromApi = () => fetch('/api/v1/auth/getAll', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const loadUsers = async () => {
      const response = await getFromApi();
      const responseContent = await response.json();
      state.result = responseContent.data;
    };
    const attachListeners = async () => {
      searchInput.addEventListener('input', (event) => {
        loader.classList.add('active');
        search_state_proxy.result = [];
        if (event.target.value.trim().length > 0) {
          search_state_proxy.result = state.result.filter((user) => {
            return user.username.trim().toLowerCase().startsWith(event.target.value.trim().toLowerCase());
          });
        }
        setTimeout(() => {
          loader.classList.remove('active');
        }, 500);
      });
    };
    await loadUsers();
    await attachListeners();
  }, 1000);
})();
