
let url = window.location.href.split('/');
let number = parseInt(url[5]);


const deleteComment = async (event) =>{
    event.preventDefault();
    try{
        await fetch('/api/comment', {
            method: 'DELETE',
            body: JSON.stringify({id: number}),
            headers: { 'Content-Type': 'application/json' },
        })
        location.replace('/dasboard');
    }catch(err){
        console.log(err);
    }
};

const updateComment = async (event) => {
    event.preventDefault();
    const newText = document.getElementById('comment-text').value;
        try{
        await fetch('/api/comment', {
            method: 'PUT',
            body: JSON.stringify({newText, id: number}),
            headers: { 'Content-Type': 'application/json' },
        }),
        location.replace('/dashboard');
    }catch(err){
        console.log(err);
    }
}  

const deleteBtn = document.getElementById('delBtn').addEventListener('click', deleteComment);
const updateBtn = document.getElementById('upBtn').addEventListener('click', updateComment);
