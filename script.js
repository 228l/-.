let tdlist, data;
const container_todo = document.querySelector('.container_todo');
// Прогрузка json фйла при первом запуске програмы
a=`[
  {
    "userId": 1,
    "id": 1,
    "title": "Добро пожаловать в ваш список дел.",
    "completed": false
  }
]`

function test() {
  data = JSON.parse(a)
  localStorage.setItem('data', JSON.stringify(data))
};

if (localStorage.getItem('data') == null){
  test()
}

drawList();
//-------------------------------------------------------------------------------------------

//Прогрузка всех дел
function drawList() {
  data = JSON.parse(localStorage.getItem('data', JSON.stringify(data))) 
  let key;
  container_todo.innerHTML='';
  for (key in data){
    container_todo.innerHTML +=`
    <div class="container_todo_element" id="${key}">
        <div class="container_todo_element_checkbox_completed ${data[key].completed}" id="${key}"></div>
        <div class="container_todo_element_box">
          <div class="container_todo_element_box_text" id="${key}"> ${data[key].title}
          </div>
            <div class="container_todo_element_box_delete">
              <img src="img/ball-point-pen.png" class="container_todo_element_box_delete_img" id="${key}">
            </div>
        </div>
    </div>`
  };
};

//Редактирования списка дел. Сделана так для оптимизации при 120+ элементов списка.
function drawList_edition(x,checke) {
  data = JSON.parse(localStorage.getItem('data', JSON.stringify(data)))
  document.querySelectorAll('.container_todo_element')[x].innerHTML='';
  document.querySelectorAll('.container_todo_element')[x].innerHTML +=`
        <div class="container_todo_element_checkbox_completed ${data[x].completed}" id="${x}"></div>
        <div class="container_todo_element_box">
          <div class="container_todo_element_box_text" id="${x}"> ${data[x].title}
          </div>
            <div class="container_todo_element_box_delete">
              <img src="img/ball-point-pen.png" class="container_todo_element_box_delete_img" id="${x}">
            </div>
        </div>`
};

//Модалка на обработку окна
const container_add = document.querySelector('.container_add'); 
const container_add_modal = document.querySelector('.container_add_modal');
const container_add_modal_box_buttons_cancel = document.querySelector('.container_add_modal_box_buttons_cancel'); 
const container_add_modal_box_buttons_confirm = document.querySelector('.container_add_modal_box_buttons_confirm');
const input_modal = document.querySelector('.container_add_modal_box_input');

function open_container_add_modal() {
  container_add_modal.classList.add('opened');
};

function сlose_container_add_modal() {
  container_add_modal.classList.remove('opened');
  input_modal.value = ''
};

function close_container_add_modal_fromWindow(event) {
  if (event.target == container_add_modal ) {
    сlose_container_add_modal();
  };
};

function insert_to_list() {
  input_data = input_modal.value;
  data.push({"userId":1, "id":1,"title":input_data, "completed":false });
  localStorage.setItem('data', JSON.stringify(data))
  window.setTimeout(сlose_container_add_modal);
  setTimeout(drawList,50);
  c=Object.keys(localStorage.getItem('data', JSON.stringify(data))).length
  container_todo.innerHTML +=`
  <div class="container_todo_element" id="${c}">
      <div class="container_todo_element_checkbox_completed ${data[c].completed}" id="${c}"></div>
      <div class="container_todo_element_box">
        <div class="container_todo_element_box_text" id="${c}"> ${data[c].title}
        </div>
          <div class="container_todo_element_box_delete">
            <img src="img/ball-point-pen.png" class="container_todo_element_box_delete_img" id="${c}">
          </div>
      </div>
  </div>`
};


container_add.addEventListener('click',open_container_add_modal);
container_add_modal_box_buttons_cancel.addEventListener('click',сlose_container_add_modal);
container_add_modal_box_buttons_confirm.addEventListener('click',insert_to_list);
window.addEventListener("click",close_container_add_modal_fromWindow);

//РЕДАКТИРОВАНИЕ ПУНКТОВ СПИСКА

const container_change_modal = document.querySelector('.container_change_element');
function change_list_elem(){
  if(event.target.classList == 'container_todo_element_box_delete_img' || event.target.classList =='container_todo_element_box_text' || event.target.classList[0] == "container_todo_element_checkbox_completed"){
  let list_element_index = event.target.id;
  let title_info = data[list_element_index].title;
  console.log(list_element_index);
  container_change_modal.innerHTML=`
      <div class="container_change_element_modal">
            <div class="container_change_element_modal_box">
                <div class="container_change_element_modal_box_checkbox"><input class="container_change_element_modal_box_input" type="text" placeholder="Введите текст"><div class="container_change_element_modal_box_checkbox_completed ${data[list_element_index].completed}"></div></div>
                <div class="container_change_element_modal_box_buttons">
                    <div class="container_change_element_modal_box_buttons_cancel"><p class="container_add_modal_box_buttons_cancel_text">Отмена</p></div>
                    <div class="container_change_element_modal_box_buttons_remove"><p class="container_add_modal_box_buttons_confirm_text">Удалить</p></div>
                    <div class="container_change_element_modal_box_buttons_confirm"><p class="container_add_modal_box_buttons_confirm_text">Сохранить</p></div>
                </div>
            </div>
        </div>`;
  const input_info = document.querySelector('.container_change_element_modal_box_input');
  input_info.value = title_info;
  const container_change_element_modal_box_buttons_cancel = document.querySelector('.container_change_element_modal_box_buttons_cancel');
  const container_change_element_modal_box_buttons_confirm = document.querySelector('.container_change_element_modal_box_buttons_confirm');
  const container_change_element_modal_box_buttons_remove = document.querySelector('.container_change_element_modal_box_buttons_remove');
  const container_change_element_modal_box_checkbox_completed = document.querySelector('.container_change_element_modal_box_checkbox_completed');
  const container_window = document.querySelector('.container_change_element_modal');
  
  if (event.target.classList[0] == "container_todo_element_checkbox_completed"){
    change_list_element_complete();
    if(container_change_element_modal_box_checkbox_completed.classList[1]=='true'){
      container_change_modal.innerHTML=``;
      data[list_element_index].completed = container_change_element_modal_box_checkbox_completed.classList[1];
      localStorage.setItem('data', JSON.stringify(data))
      drawList_edition(list_element_index,true);
    }
    else{
      data[list_element_index].completed = container_change_element_modal_box_checkbox_completed.classList[1];
      container_change_modal.innerHTML=``;
      localStorage.setItem('data', JSON.stringify(data))
      drawList_edition(list_element_index,true);
    }
  }

  function save_close_change_list_element() {
    data[list_element_index].title = input_info.value;
    container_change_modal.innerHTML=``;
    data[list_element_index].completed = container_change_element_modal_box_checkbox_completed.classList[1];
    localStorage.setItem('data', JSON.stringify(data))
    drawList_edition(list_element_index,true);
  };

  function forgot_close_change_list_element() {
    container_change_modal.innerHTML=``;
  }

  function delete_close_change_list_element() {
    data.splice(list_element_index,1)
    container_change_modal.innerHTML=``;
    localStorage.setItem('data', JSON.stringify(data))
    drawList();
  }

  function change_list_element_complete() {
    container_change_element_modal_box_checkbox_completed.classList.toggle('true');
    container_change_element_modal_box_checkbox_completed.classList.toggle('false');
  }

  container_change_element_modal_box_checkbox_completed.addEventListener('click',change_list_element_complete);
  container_change_element_modal_box_buttons_confirm.addEventListener('click',save_close_change_list_element);
  container_change_element_modal_box_buttons_cancel.addEventListener('click',forgot_close_change_list_element);
  container_change_element_modal_box_buttons_remove.addEventListener('click',delete_close_change_list_element);

  function close_container_add_modal_fromWindow2(event) {
    if (event.target == container_window)  {
      forgot_close_change_list_element();
    }
  };

  window.addEventListener("click",close_container_add_modal_fromWindow2);
}
  else{return}
};

document.querySelector(".container_todo").addEventListener("click", change_list_elem);

//Поиск

const container_search_button = document.querySelector('.container_search_button');
const search_input = document.querySelector('.container_search_input');

function search() {
  for (var i = 0; i < data.length; i++) {
      console.log(data[i].title);
      elem = document.getElementById(i)
      elem.classList = ('container_todo_element')
  }

    val = search_input.value;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].title);
      if (data[i].title.search(val) == '-1') {
          elem = document.getElementById(i)
          elem.classList.add('hide')
      }
  }
}

container_search_button.addEventListener('click', search);
