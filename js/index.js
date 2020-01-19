document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const usernames = ['carlos', 'tom34', 'claude'];
    const passwords = ['123','123','123'];
    const username = document.getElementById('username').value;
    if (!username) {
        console.error('Please Enter a valid username');
        return;
    }
    const pw = document.getElementById('password').value;
    if (!pw) {
        console.warn('Please Enter a valid password');
        return;
    }
    const index = usernames.indexOf(username);
    if (index === -1) {
        console.warn('Please Enter a valid username');
        return
    }
    if (passwords[index] !== pw) {
        console.warn('Please Enter a valid password');
        return;
    }
    localStorage.setItem('instaclone', username);
    //If the username and password are correct, we want to load the feed.html file
    window.location.assign('feed.html');
});

