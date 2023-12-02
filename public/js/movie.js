const commentBtn = document.getElementById('commentBtn');


const addNewComment = async (event) =>{
    let url = window.location.href.split('/');
    let number = url[5];
    console.log(url, number);
    event.preventDefault();
    const imageLink = document.getElementById('posterLink').src;
    const textForComment = document.getElementById('newComment').value;
    const movTitle = document.getElementById('movieTitle').innerText;
    const ratingValue = document.getElementById('rating').value;
    const movie = number;
    const user = 1;

    console.log(textForComment, movie, user, imageLink, movTitle, ratingValue);

    await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment: textForComment, 
            imdbID: movie, 
            user_id: user,
            img: imageLink,
            title: movTitle,
            rating: ratingValue }),
        headers: { 'Content-Type': 'application/json' },
    });
    location.replace('/dashboard');
}

commentBtn.addEventListener('click', addNewComment)

