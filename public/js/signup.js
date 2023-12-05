const signupForm = document.getElementById('signup-form');

const errorMsg = async (num) =>{
    let text = "";
    (num === 1) ? text = 'Please enter more than 8 characters for password':
    (num === 2) ? text = 'Passwords do not match': 
    (num === 3) ? text = 'An account with this password already exists':
    (num === 4) ? text = 'An account with this username already exists': res.status(400).json(error);

    await Swal.fire({
        title: 'Error!',
        text: `${text}`,
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      return;
}

const signUp = async (username, email, password) => {
    try{
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
    })
    .then((res) => res.json())
    .then((data) => {
        (data.message === "email conflict") ? errorMsg(3):
        (data.message === "username conflict") ? errorMsg(4):
        (data.message === "okay") ? window.location.href = '/dashboard':
        console.log(data);
        return;
    })
    // if (response.ok) {
    //     window.location.href = '/dashboard';
    // } else {
    //     alert(response.statusText);
    // }
    }catch(err){
        console.log(err);
    }}


const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();

    if (username && email && password) {
        (password.length < 8) ? errorMsg(1): 
        (password !== confirmPassword) ? errorMsg(2):
        signUp(username, email, password)
    }
    else{
        await Swal.fire({
            title: 'Incomplete data',
            text: 'Please complete all fields',
            icon: 'info',
            confirmButtonText: 'Okay'
          })
          return; 
    };
};

signupForm.addEventListener('submit', signupFormHandler);