const signUpForm = document.getElementById('sign-up');
// const form = document.createElement('form');
const submit = async (data) => {
  const send = await fetch('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return send;
};

signUpForm.addEventListener('submit', (event) => {
  const data = {};
  for (let i = 0; i < signUpForm.elements.length; i++) {
    const input = signUpForm.elements[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  submit(data)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  event.preventDefault();
});
