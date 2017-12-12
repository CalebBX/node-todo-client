const SERVER_PATH = 'http://localhost:3000';
jQuery('#register').on('submit', function(e){
    e.preventDefault();

    var txtEmail = jQuery('[name=email]');
    var txtPassword = jQuery('[name=password]');

    axios.post(SERVER_PATH + '/users', {
        email: txtEmail.val(),
        password: txtPassword.val()
    }).then(function(res){
        console.log(res);
    }).catch(function(e){
        console.log(e);
    });
});

jQuery('#login').on('submit', function(e){
    e.preventDefault();

    var txtEmail = jQuery('[name=email]');
    var txtPassword = jQuery('[name=password]');

    axios.post(SERVER_PATH + '/users/login', {
        email: txtEmail.val(),
        password: txtPassword.val()
    }).then(function(res){
        console.log('Logged in');
        sessionStorage.token = res.headers['x-auth'];
        window.location.href = './todos.html'; 
    }).catch(function(e){
        console.log(e);
    });
});


