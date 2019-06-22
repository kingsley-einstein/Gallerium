document.getElementById('vert-dots').addEventListener('click', (event) => {
  document.getElementById('sidebar').classList.add('show');
});

document.getElementById('cancel').addEventListener('click', (event) => {
  document.getElementById('sidebar').classList.remove('show');
});
