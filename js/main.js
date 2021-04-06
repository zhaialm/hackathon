
let editedId = null;

const API = 'http://localhost:8000/students'

renderStudent()

$('.add-btn').on('click', function(){
    let newStudent = {
        name: $('.name').val(),
        lastName: $('.lastname').val(),
        image: $('.image').val(),
        phone: $('.phone').val(),
        weeklyKpi: $('.weekly-kpi').val(),
        monthlyKpi: $('.monthly-kpi').val()
    }
    fetch(API, {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => renderStudent())
})

function renderStudent(){
    fetch(API)
        .then(res => res.json())
        .then(studentData => {
            $('.student-block').html('');
            studentData.forEach((item) => {
                $('.student-block').append(`
                <div class="card" style="width: 18rem;">
                        <img src="${item.image}" class="card-img-top" alt="...">
                        <div id="${item.id}"class="card-body">
                        <h5 class="card-title">${item.name} ${item.lastName}</h5>
                        <p class="card-text"> <img style="height: 20px" src="./img/icon.png" >${item.phone}</p>
                        <p class="card-text"> Weekly KPI: ${item.weeklyKpi}</p>
                        <p class="card-text"> Monthly KPI: ${item.monthlyKpi}</p>
                        <button class="btn-edit btn btn-primary">Edit</button>
                        <button class="btn-delete btn btn-primary">Delete</button>

                        </div>
                    </div>
                `)
            });
        })
}
$('body').on('click', '.btn-delete', function(e){
    let id = e.target.parentNode.id
    console.log(id);
    fetch(`${API}/${id}/`, {
        method: 'DELETE'
    })
    .then(() => renderStudent())
})

$('body').on('click', '.btn-edit', function(e){
    editedId = e.target.parentNode.id
    fetch(`${API}/${editedId}/`)
        .then(res => res.json())
        .then(infoToEdit => {
            $('.edit-name').val(infoToEdit.task);
            $('.edit-lastname').val(infoToEdit.task);
            $('.edit-image').val(infoToEdit.task);
            $('.edit-phone').val(infoToEdit.task);
            $('.edit-weekly-kpi').val(infoToEdit.task);
            $('.edit-monthly-kpi').val(infoToEdit.task);
            $('.main-modal').css('display', 'block')
       })
})
$('.btn-save').on('click', function(e){
    if(!$('.edit-name').val() ||!$('.edit-lastname').val() || !$('.edit-image').val() || !$('.edit-phone').val() || !$('.edit-weekly-kpi').val() || !$('.edit-monthly-kpi').val() ){
        alert('Заполните поле!')
        $('.edit-list').val('')
        return
    }
    let editedInfo ={
        name: $('.edit-name').val(),
        lastName: $('.edit-lastname').val(),
        image: $('.edit-image').val(),
        phone: $('.edit-phone').val(),
        weeklyKpi: $('.edit-weekly-kpi').val(),
        monthlyKpi: $('.edit-monthly-kpi').val()
    }
    fetch(`${API}/${editedId}`, {
        method: 'PUT',  
        body: JSON.stringify(editedInfo),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(() => {
        renderStudent()
        $('.main-modal').css('display', 'none')
    })
})

$('.btn-close').on('click', function(){
    $('.main-modal').css('display', 'none')
})
