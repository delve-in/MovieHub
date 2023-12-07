const loginButton = document.querySelector('#loginButton');
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
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
            Swal.fire({
                title: 'Error!',
                text: 'The email and/or password are incorrect',
                icon: 'error',
                confirmButtonText: 'Okay'
              })
    
        }
    }
}

loginButton.addEventListener('click', loginFormHandler);