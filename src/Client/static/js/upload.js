(() => {
  setTimeout(() => {
    const toggleButton = document.querySelector('#toggle');
    const cameraButton = document.querySelector('#camera_btn');
    const video = document.querySelector('#player');
    const video_container = document.querySelector('#video-container');
    const canvas = document.querySelector('#capture_image');
    const captureButton = document.querySelector('#capture');
    const cancelButton = document.querySelector('#cancel');
    const context = canvas.getContext('2d');
    toggleButton.addEventListener('click', (e) => {
      const attr = toggleButton.getAttribute('target-item');
      document.querySelector(`#${attr}`).classList.toggle('hidden');
    });
    cameraButton.addEventListener('click', (e) => {
      if (navigator.mediaDevices) {
        const constraints = {
          video: true
        };
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          video_container.classList.remove('video-hidden');
          video.srcObject = stream;
        });
      }
    });
    captureButton.addEventListener('click', (e) => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.srcObject.getVideoTracks().forEach((track) => track.stop());
    });
    cancelButton.addEventListener('click', (e) => {
      video.srcObject.getVideoTracks().forEach((track) => track.stop());
      context.clearRect(0, 0, canvas.width, canvas.height);
      video_container.classList.add('video-hidden');
    });
  }, 1000);
})();
