const globalFetch = window.fetch;
window.fetch = (input, init) => {
  return new Promise((resolve, reject) => {
    globalFetch(input, init).then((response) => {
      if (response.status === 401) {
        console.log('Unauthorized');
      }
      resolve(response);
    });
  });
};
