        const list = $('#my-todo-list');
        
        const drawList = function() {
        list.html(''); //set the inner html of todolist empty
        //REQUEST THE TODOs
            $.ajax({
            url      : "/todos",
            type     : 'get',
            dataType : 'json',
            data     : {
            searchtext : $("#searchtxtbx").val()  },

                success  : function(data) {     
                data.items.forEach(function(todoItem) {
                let li = $('<li>'+todoItem.message+'<input type="checkbox" class="checkbox"><button class="delete" id='+todoItem.id+'> Delete </button></li>');
                let input = li.find('input');
                input.prop('checked', todoItem.completed);
                input.on('change', function() {
                todoItem.completed = input.prop('checked');
                //UPDATE A TODO
                $.ajax({
                url         : "/todos/" + todoItem.id,
                type        : 'put',
                dataType    : 'json',
                data        : JSON.stringify(todoItem),
                contentType : "application/json; charset=utf-8",
                success     : function(data) { },
                error       : function(data) {
                    alert('Error updating todo');
                            }
                    })
                });
            //DELETE A TODO
            $(document).ready(function(){
            $('.delete').on('click', function(todoItem) {
                $.ajax({
                url     : "/todos/" + $(this).prop('id'),
                type    : 'delete',
                success : function(data) {
                    drawList();
                }
                })

            });
        });
            list.append(li);
            });
        },
                error    : function(data) {
                 alert('Error searching');
                    }
        })
    
    };
                //SEARCH A TODO
                $('#searchbtn').on('click', function() {
                    drawList();
        });
                //CREATE A TODO
            $('#savebtn').on('click', function() {
            const val = $('#msgtxtbx').val();
            $('#msgtxtbx').val(''); //clear the textbox
                $.ajax({
                url         : "/todos",
                type        : 'post',
                dataType    : 'json',
                data        : JSON.stringify({
                message   : val,
                completed : false
                    }),
                contentType : "application/json; charset=utf-8",
                success     : function(data) {
                drawList(); // refresh the list (re-run the search query)
                },
                error       : function(data) {
                    alert('Error creating todo');
                    }
                });
        });

            drawList();