const loginButton = document.querySelector('#loginButton');
async function loginFormHandler(event) {
    console.log("1");
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        console.log("2");
        console.log(email,password);
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert(response.statusText);
        }
    }
}

loginButton.addEventListener('click', loginFormHandler);