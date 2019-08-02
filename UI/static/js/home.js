(() => {
  const homeState = {
    user: {},
    notifCounts: 0
  };
  const vertDots = document.getElementById('vert-dots');
  const sidebar = document.getElementById('sidebar');
  const cancel = document.getElementById('cancel');
  const feeds = document.getElementById('a-feeds');
  const userImage = document.getElementById('user-img');
  const username = document.getElementById('user-username');
  const handleResponses = ({error, data}) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      homeState.user = data;
    }
  };
  const assignImage = ({url}) => {
    userImage.src = url;
  };
  const getUser = async () => {
    const send = await fetch(`/api/v1/users/${localStorage.getItem('id')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return send;
  };
  const getImage = async ({pic}) => {
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
          assignImage(data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  Object.defineProperty(homeState, 'user', {
    set(u) {
      console.log(u);
      username.textContent = u.username;
      if (u.pic) {
        getImage(u);
      }
    }
  });

  getUser()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        handleResponses(res);
      })
      .catch((err) => {
        console.log(err);
      });

  vertDots.addEventListener('click', (event) => {
    sidebar.classList.add('show');
  });

  cancel.addEventListener('click', (event) => {
    sidebar.classList.remove('show');
  });

  feeds.classList.add('active');

  window.addEventListener('hashchange', (event) => {
    const links = document.getElementsByTagName('a');
    const hashRegex = new RegExp(window.location.hash.replace('#', ''));
    Array.from(links).forEach((a) => {
      // const linkRegex = new RegExp(a.id.replace('a-', ''));
      if (hashRegex.test(a.id.replace('a-', ''))) {
        a.classList.add('active');
      } else {
        if (a.classList.contains('active')) {
          a.classList.remove('active');
        }
      }
    });
    if (sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
    }
  });
})();
