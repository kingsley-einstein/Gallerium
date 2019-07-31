(() => {
  // /**
  //  * @constructor
  //  * @implements {PushManager}
  //  */
  // function Push() {
  //   console.log(this);
  // };
  // /**
  //  * @implements {PushManager}
  //  * @return {any}
  //  */
  // function Push() {
  //   console.log(PushManager);
  //   return {};
  // };
  // Push.prototype = {};
  // function Push() {
  //   this.push = PushManager.prototype;
  //   console.log(this);
  // }
  // Push.prototype = PushManager.prototype;
  // function push() {
  //   console.log(PushManager());
  // }
  // push();
  const vapidPublicKey =
    'BD-L0RsMjTh_dy_la-BYNIGNc1o3ceKlAPImrW_bLvvhOjrkyRZxxaTj1K-ZOZA5csfO8vLtC-zlqS39T23QPn8';
  const notifCheck = document.getElementById('notif-check');
  const vapidToUint8Array = (vapid) => {
    const padding = '='.repeat((4 - (vapid.length % 4)) % 4);
    const base64 = (vapid + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  // const pushManager = new PushManager();
  /**
   * @param {PushSubscription} subscription
   */
  const subscribe = async (subscription) => {
    const body = JSON.stringify({
      endpoint: subscription.endpoint,
      auth: btoa(
          String.fromCharCode.apply(
              null,
              new Uint8Array(subscription.getKey('auth'))
          )
      ),
      p256dh: btoa(
          String.fromCharCode.apply(
              null,
              new Uint8Array(subscription.getKey('p256dh'))
          )
      ),
      user_id: localStorage.getItem('id')
    });
    await fetch('/api/v1/push/subscribe', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const deleteSubscription = async () => {
    await fetch(`/api/v1/push/unsubscribe/${localStorage.getItem('id')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  /**
   *
   * @param {PushManager} pushManager
   */
  const unsubscribe = (pushManager) => {
    pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
        deleteSubscription();
      }
    });
  };
  /**
   *
   * @param {PushManager} pushManager
   */
  const addCheckEvent = (pushManager) => {
    notifCheck.addEventListener('click', (event) => {
      if (notifCheck.checked) {
        console.log('Checked');
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: vapidToUint8Array(vapidPublicKey)
                })
                .then((subscription) => {
                  subscribe(subscription);
                });
          } else {
            notifCheck.checked = false;
          }
        });
      } else {
        console.log('Not checked');
        unsubscribe(pushManager);
      }
    });
  };
  // pushManager.getSubscription().then((subscription) => {
  //   if (subscription) {
  //     notifCheck.checked = true;
  //   }
  //   addCheckEvent(subscription);
  // });
  const checkPush = () => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        console.log(reg);
        const pushManager = reg.pushManager;
        pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            notifCheck.checked = true;
          }
        });
        addCheckEvent(pushManager);
      });
    }
  };
  checkPush();
})();
