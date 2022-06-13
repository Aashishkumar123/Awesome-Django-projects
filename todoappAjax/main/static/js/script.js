const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

// Create a list
$("#submitList").submit(function(e) {
    e.preventDefault();
    var title = e.target.title.value;
    $.ajax({
        url: '/submit-list/',
        type: 'post',
        dataType: 'json',
        data: {
            title:title,
            csrfmiddlewaretoken: csrftoken
        },
        success: function(data) {
            e.target.title.value = '';
            $('#list-items').append(`<div class="list" id="list${data['id']}">
            <div class="title">
                <input type="text" value="${data['title']}" id="edit-title${data['id']}" class="d-none">
                <span class="text-white" id="show-title${data['id']}">${data['title']}</span>
            </div>
            <div class="action-button" id="action-btn${data['id']}">
                <button class="bg-success text-white" id="showEditbtn${data['id']}" data="${data['id']}" onclick="showEdit(this)"><i class="fa-solid fa-pen-to-square bg-success"></i></button>
                <button class="bg-danger text-white" id="delete-btn${data['id']}" data="${data['id']}" onclick="deleteList(this)"><i class="fa-solid fa-ban bg-danger"></i></button>
            </div>
            <div class="d-none" id="show-edit-action-btn${data['id']}">
                <button class="bg-success text-white" style="padding-left:1.7rem;padding-right:1.7rem;" id="EditListbtn${data['id']}" data="${data['id']}" onclick="editList(this)"><i class="fa-solid fa-check bg-success"></i></button>
                <button class="bg-danger text-white" style="padding-left:1.7rem;padding-right:1.7rem;" id="close-edit-btn${data['id']}" data="${data['id']}" onclick="closeEdit(this)"><i class="fa-solid fa-xmark bg-danger"></i></button>
            </div>
        </div>`)
        }
    });
});

//Delete List
function deleteList(d){
    id = d.getAttribute("data")
    $.ajax({
    url: `/delete-list/${id}/`,
    type: 'post',
    dataType: 'json',
    data: {
        csrfmiddlewaretoken: csrftoken
    },
    success: function(data) {
        $(`#list${id}`).remove();
    }
});
}

//show Edit input
function showEdit(data){
    var id = data.getAttribute("data");
    $(`#show-title${id}`).attr('class', 'd-none');
    $(`#edit-title${id}`).attr('class', 'd-block');
    $(`#action-btn${id}`).attr('class', 'd-none');
    $(`#show-edit-action-btn${id}`).attr('class', 'd-block action-button');
}

//close Edit 
function closeEdit(data){
    var id = data.getAttribute("data");
    $(`#show-title${id}`).attr('class', 'd-block text-white');
    $(`#edit-title${id}`).attr('class', 'd-none');
    $(`#action-btn${id}`).attr('class', 'd-block action-button');
    $(`#show-edit-action-btn${id}`).attr('class', 'd-none');

}

// Edit List
function editList(d){
    var id = d.getAttribute("data");
    var title = $(`#edit-title${id}`).val();
    $.ajax({
        url: `/edit-list/${id}/`,
        type: 'post',
        dataType: 'json',
        data: {
            csrfmiddlewaretoken: csrftoken,
            title:title
        },
        success: function(data) {
            $(`#show-title${id}`).text(data['title']);
            closeEdit(d);
        }
    });
}

//Change Mode
function changedayMode(){
    $('html').css("background","white");
    $('body').css("background","white");
    $('#day-mode').attr('class', 'd-none');
    $('#night-mode').attr('class', 'd-block');
}

function changenightMode(){
    $('html').css("background","#535C79");
    $('body').css("background","#535C79");
    $('#day-mode').attr('class', 'd-block');
    $('#night-mode').attr('class', 'd-none');
}
