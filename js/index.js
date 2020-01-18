document.getElementById('login-form').addEventListener('submit', function(e) {

    const usernames = ['carlos', 'tom34', 'claude'];
    const passwords = ['123','123','123'];
    const username = document.getElementById('username').value;
    
    const index = usernames.indexOf(username);
    e.preventDefault();
    
    //window.location.replace('feed.html');
});

