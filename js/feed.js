 function processFormSubmit(e){
    e.preventDefault();
    const form = e.target;
    const text = form.querySelector('.comment-input').value;
    const photoEntry = form.parentNode;
    const comments = photoEntry.querySelector('.comments');
    const newComment = `<div class="comment"><span class="author">${username} </span>${text}</div>`
    comments.innerHTML+=newComment;
    form.querySelector('.comment-input').value = '';
};


function getPhotos() {
    fetch('https://image-server-codesmith.firebaseapp.com/images')
    .then(function(results){
        return results.json();
    })
    .then(function(data){
        processPhotoArray(data);
    })
    .catch(function(err){
        console.error(err);
    });
}


function processPhotoArray(arr) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    let filteredPhotos = 
    arr.forEach(function(url){
        if (url.includes('https')) {
            let likeCount = Math.floor(Math.random()*20);
            wrapper.innerHTML += createPhotoEntry(url, likeCount);
        }
    });
};


function createPhotoEntry(src, likes) { 
    return `
        <div class="photo-entry">
        <img src='${src}'/>
        <div class="photo-navbar">
            <i class="far fa-heart"></i>
            <p class="photo-likes"><span class="photo-likes__count">${likes}</span> likes</p>
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="comments"></div>
        <form class="comment-form" onSubmit=>
            <input type="text" name="comment" class="comment-input" placeholder="Enter comment here"/>
        </form>
    </div> <!--.photo-entry -->
    `;
}

function processLike(e) {
    if (e.target.nodeName === 'IMG' || e.target.classList.contains('fa-heart')) {
        const entry =  e.target.classList.contains('fa-heart') ? e.target.parentNode.parentNode :e.target.parentNode;
        let photoLikes = entry.querySelector('.photo-likes__count');
        currentLikes = parseInt(photoLikes.textContent);
        if (entry.querySelector('i').classList.contains('far')) {
            photoLikes.textContent = currentLikes + 1;
            toggleLikeBtn(entry);
        } else {
            photoLikes.textContent = currentLikes - 1;
            toggleLikeBtn(entry);
        }
    } 
}

function toggleLikeBtn(entry) {
    entry.querySelector('i').classList.toggle('far');
    entry.querySelector('i').classList.toggle('fas');
}

document.addEventListener('DOMContentLoaded', ()=> {
    const username = localStorage.getItem('instaclone');
    document.querySelector('.nav__profile').textContent = username;
    document.querySelector('.wrapper').addEventListener('dblclick', processLike);
    document.querySelector('.wrapper').addEventListener('submit', processFormSubmit);
    getPhotos();
});