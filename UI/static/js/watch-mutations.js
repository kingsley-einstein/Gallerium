const observer = new MutationObserver((mutations, observer) => {
  mutations.forEach((mr) => {
    // console.log(mr.type);
    console.log(mr.addedNodes);
  });
});

observer.observe(document.getElementById('app'), {
  childList: true,
  subtree: true
});
