const createButton = document.querySelector('#createButton');

async function signupFormHandler(event) {
    event.preventDefault();
    console.log("1.1.1");
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/signup/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert(response.statusText);
        }
    }
}

createButton.addEventListener('click', signupFormHandler);
