var selectedTodo;
var isSelected = false;
var text = jQuery('#todo_text');
var config;

refreshTodos();

jQuery('#add').click(function () {
    axios.post(SERVER_PATH + '/todos', { text: text.val() }, config).then(function (res) {
        console.log(res);
        refreshTodos();
    }).catch(function (e) {
        console.log(e);
    });

});

jQuery(document).on('click', '.delete', function () {
    axios.delete(SERVER_PATH + '/todos/' + jQuery(this).parent().attr('id'), config).then(function (res) {
        refreshTodos();
    }).catch(function (e) {
        console.log(e);
    });
});

jQuery(document).on('click', '.edit', function () {
    var todoId = jQuery(this).parent().attr('id');
    var todo = jQuery('#' + todoId);
    var todoText = todo.find('.todoText');

    if (!isSelected) {
        todoText.html('<input value="' + todoText.text() + '"></input>');
        isSelected = true;
    } else {
        var todoInput = todoText.find('input');
        axios.patch(SERVER_PATH + '/todos/' + todoId, { text: todoInput.val() }, config).then(function (res) {
            console.log(res);
            refreshTodos();
        });
        isSelected = false;
    }
});


jQuery('#logout').click(function () {
        axios.delete(SERVER_PATH + '/users/me/token', config).then(function (res) {
            console.log(res);
        }).catch(function (e) {
            console.log(e);
        });
        window.location.href = './login.html';
    });

jQuery(document).on('click', '#todos ul li', function () {
    var todo = jQuery(this);
    if(todo.hasClass('checked')){
        todo.removeClass('checked');
    } else {
        todo.addClass('checked');
    }
});

function refreshTodos() {
    selectedTodo = undefined;
    text.val('');
    config = { headers: { 'x-auth': sessionStorage.token } };
    axios.get(SERVER_PATH + '/todos', config).then(function (res) {
        console.log(res.data.todos);
        var ul = jQuery('<ul></ul>');
        res.data.todos.forEach(function (todo) {
            var txtTodo = jQuery('<span class="todoText">' + todo.text + '</>');
            var btnDelete = jQuery('<span class="delete">&#215</>');
            var btnEdit = jQuery('<span class="edit">&#9741</>');
            ul.append(jQuery('<li id="' + todo._id + '"></li>').append(txtTodo).append(btnDelete).append(btnEdit));
            jQuery('#todos').html(ul);
        });

    }).catch(function (e) {
        console.log(e);
    });
}