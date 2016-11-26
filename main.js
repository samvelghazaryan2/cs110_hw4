const todolist = $('#todo_ul');

// FUNCTION FOR DELETE ITEM
const delItem = function(){
    let delID = $(this).parent().prop('id');
    $.ajax({
        url     : "/todos/" + delID,
        type    : 'delete',
        success : function() {
            draw_list();
        },
        error   : function() {
            alert('Error deleting the item');
         }
    });
};

// FUNCTION FOR DATA SEARCH
$("#search_button").on('click', function(){
    const search_text = $('#search_box').val();
    todolist.html('');
    draw_list(search_text);
});

// FUNCTION FOR CREATE NEW TO-DO ITEM
$("#create_button").on('click', function(){ 
    let newItem = $('#create_box').val();
    if(newItem !==""){
        $.ajax({
            url         : "/todos",
            type        : 'post',
            dataType    : 'json',
            data        : JSON.stringify({
                message     : newItem,
                completed   : false
            }),
            contentType : "application/json; charset=utf-8",
            success     : function() {
                draw_list();
            },
            error       : function() {
                alert('Error creating todo');
            }
        });
        $('#create_box').val('');//clear the box after click
    } else {alert("Please insert TODO text!")}
});

// FUNCTION FOR UPDATE ITEM
const updateItem = function(todoItem){
      $.ajax({
        url         : "/todos/" + todoItem.id, //serch for the id in the server
        type        : 'put',
        dataType    : 'json',
        data        : JSON.stringify(todoItem),
        contentType : "application/json; charset=utf-8",
        success     : function() {},
        error       : function() {
            alert('Error creating todo');
        }
    });
};

//GET DATA AND DRAW PAGE, AND SEARCH DATA
const draw_list = function(search_text){
    $.ajax({
        url      : "/todos",
        type     : 'get',
        dataType : 'json',
        data     : {searchtext : search_text},
        success  : function(data) {
            todolist.html('');

            //  On click DELETE event
            $(document).ready(function(){
                $("button.delete").on('click', delItem);
            });
           // end DELETE

           data.items.forEach(function(todoItem){
                const li = $('<li id='+todoItem.id+'><span>'+todoItem.message+'</span><input type="checkbox" chaked = '+todoItem.completed +'><button class="delete">DELETE</button></li>');
                const input = li.find('input');
                input.prop('checked', todoItem.completed);

               // On click CheckBox event
                input.on('change', function(){
                    todoItem.completed = input.prop('checked');

                    // PUT Update
                    updateItem(todoItem);
                });
                //item updated 

               todolist.append(li);
            });

        },
        error    : function() { alert('Error receive data from server'); }
    });
    $('#search_box').val('');
};


draw_list();