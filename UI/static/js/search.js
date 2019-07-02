(() => {
  const searchGroup = document.getElementById('search-group');
  const search = document.getElementById('search');
  const i = document.createElement('i');
  i.className = 'fas fa-lg fa-search';
  searchGroup.insertBefore(i, search);
})();
