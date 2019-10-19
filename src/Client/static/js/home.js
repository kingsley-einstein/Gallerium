(() => {
    setTimeout(() => {
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Sidenav.init(elems, {});
      console.log(instances, elems);
    }, 1000);
})();
