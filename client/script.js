let todos = [];
let isUpdateFormActive = true;
let id = 0;
let isComplate = false;

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

get();
showTrueForm();
function get(){
    axios.get("https://todo-api-theta.vercel.app/api/todo").then(res=>{
        todos=res.data.data;
        console.log(todos);
        setUlList();
    })
}

function deleteTodoFromApi(id){
    axios.delete('https://todo-api-theta.vercel.app/api/todo/'+id).then(res=>{
        get();
    })
}

const deleteTodo = (index)=>{
    todos.splice(index,1);
    setUlList();
}

function showTrueForm(){
    isUpdateFormActive = !isUpdateFormActive;

    const addFormEl = document.getElementById("addForm");
    const updateFormEl = document.getElementById("updateForm");
    const operationsEl = document.querySelectorAll(".operations");

    if(isUpdateFormActive){
        addFormEl.style.display = "none";
        updateFormEl.style.display = "block";
        for(let el of operationsEl){
            el.style.display = "none"
        }

    }
    else{
        addFormEl.style.display = "flex";
        updateFormEl.style.display = "none";
        for(let el of operationsEl){
            el.style.display = "block"
        }
    }
}

function save(e){
    const inputElement = document.getElementById("input-box");
    const value = inputElement.value;
    
        axios.post("https://todo-api-theta.vercel.app/api/todo",{name: value}).then(res=>{
            get();
            inputElement.value="";
            inputElement.focus();
        })
}

function saveEnter(e){
    if(e.keyCode === 13){
        save();
    }
}

function setUlList(){
    let text = "";
    for(let i in todos){
        const value = todos[i];
        text += `<div class="list">
        <li id="isComplateWork" onclick="ISCOMPLATE('${i}')">${value.name}</li>
        <span class="operations">
        <span onclick="show('${i}')"><i class="fa-solid fa-pen-to-square"></i></span>
        <span onclick="deleteTodoFromApi('${value._id}')"><i class="fa-solid fa-trash"></i></span>
        </span></div>`
    }
    const ulElement = document.getElementById("list-container");
    ulElement.innerHTML = text;
}

const updateWorkEl = document.querySelector("#updateWork");

function show(i){
    showTrueForm();
    updateWorkEl.value = todos[i].name;
    index = i;
    id = todos[i]._id;
    console.log(id);
}


function update(){
    console.log(id);
    const value = updateWorkEl.value;
    axios.put(`https://todo-api-theta.vercel.app/api/todo/${id}`, {name: value, isComplate: isComplate}).then(res=> {
        showTrueForm();
        get();
    })
}

function cancel(){
    showTrueForm();
}

// function ISCOMPLATE(i){
//     updateWorkEl.value = todos[i].name;
//     index = i;
//     id = todos[i]._id;
//     isComplate = todos[i].isComplate;
//     if(isComplate){
//         i.target.classList.toggle("checked");
//     }
//     else{
//         i.target.parentElement.remove();
//     }
//     console.log(id);
// }

// function ISCOMPLATE(id) {
//     const index = todos.findIndex(todo => todo._id === id);
//     if (index > -1) {
//         const isCompleted = !todos[index].isCompleted;
//         todos[index].isCompleted = isCompleted;
//         axios.put(`http://localhost:5000/api/todo/${id}`, { isCompleted: isCompleted })
//             .then(res => {
//                 // Başarılı güncelleme durumunda yapılacak işlemler
//                 get(); // Listeyi güncellemek için API'yi tekrar çağırın
//             })
//             .catch(error => {
//                 // Hata durumunda yapılacak işlemler
//                 console.error(error);
//             });
//     }
// }

// listContainer.addEventListener("click", function (e) {
//     if (e.target.tagName === "LI") {
//         e.target.classList.toggle("checked");
//         const todoElement = e.target.parentElement;
//         const id = todoElement.querySelector("span").getAttribute("onclick").match(/deleteTodoFromApi\('([^']+)'\)/)[1];
//         const isCompleted = e.target.classList.contains("checked");
//         ISCOMPLATE(id, isCompleted);
//         console.log(id)
//     } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//     }
// }, false);
