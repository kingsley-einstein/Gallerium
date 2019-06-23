document.getElementById('vert-dots').addEventListener('click', (event) => {
  document.getElementById('sidebar').classList.add('show');
});

document.getElementById('cancel').addEventListener('click', (event) => {
  document.getElementById('sidebar').classList.remove('show');
});

document.getElementById('a-feeds').classList.add('active');

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
});
