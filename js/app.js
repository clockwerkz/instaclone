document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(document.getElementById('username').value);
    localStorage.setItem('username', document.getElementById('username').value);
    window.location.replace('feed.html');
});