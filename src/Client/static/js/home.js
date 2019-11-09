(() => {
    setTimeout(async () => {
      const state = {
        authenticated_user: {},
        notification: 0
      };
      const state_proxy = new Proxy(state, {
        set(target, p, value) {
          const username = document.querySelector('#username');
          const count = document.querySelector('#notif_count');
          if (p === 'authenticated_user') {
            username.textContent = value.username;
          }
          if (p === 'notification') {
            count.textContent = value;
          }
          return true;
        }
      });
      const getFromApi = () => fetch('/api/v1/auth/authenticated_user', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const getUser = async () => {
        const response = await getFromApi();
        const content = await response.json();
        state_proxy.authenticated_user = content.data;
      };
      const countNotifications = async () => {
        socket.emit('COUNT_ALL_NOTIFICATIONS', {
          token: await Hasher.asyncJsonAsToken(localStorage.getItem('token'))
        });
      };
      const getNotificationsCount = async () => {
        socket.on('RECEIVED_NOTIFS_COUNT', (count) => {
          state_proxy.notification = count;
        });
      };
      const countNotifsAtIntervals = async () => {
        setInterval(async () => {
          await countNotifications();
        }, 60 * 5 * 1000);
      };
      const logUserOut = () => fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Sidenav.init(elems, {});
      const logOutLink = document.querySelector('#logout_link');
      logOutLink.addEventListener('click', async (event) => {
        const response = await logUserOut();
        const responseContent = await response.json();
        M.toast({
          html: `<span class="green-text text-lighten-1">${responseContent.data.message}</span>`
        });
        localStorage.clear();
        location.hash = '/login';
      });
      await getUser();
      await getNotificationsCount();
      await countNotifications();
      await countNotifsAtIntervals();
      console.log(instances, elems);
    }, 1000);
})();
