const username = localStorage.getItem('instaclone');


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

async function processPhotoArray(arr) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    arr.forEach(function(url){
        let likeCount = Math.floor(Math.random()*20);
        wrapper.innerHTML += createPhotoEntry(url, likeCount);
    });
    await document.querySelectorAll('.photo-entry').forEach(function(entry){
        entry.addEventListener('dblclick', function(){
            let photoLikes = entry.querySelector('.photo-likes__count');
            currentLikes = parseInt(photoLikes.textContent);
            photoLikes.textContent = currentLikes + 1;
        });
        let form = entry.querySelector('form');
        form.addEventListener('submit', processFormSubmit);
    });
};


function createPhotoEntry(src, likes) { 
    return `
        <div class="photo-entry">
        <img src='${src}' onerror="this.onerror=null;this.src='https://via.placeholder.com/400';"/>
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

document.addEventListener('DOMContentLoaded', ()=> {
    getPhotos();
});