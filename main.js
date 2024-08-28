// let btn     = document.querySelector("button");
// let input   = document.querySelector("input");
// let form    = document.querySelector("form");
// let section = document.querySelector("section");
// form.addEventListener("submit" , function(e){
//     e.preventDefault();  // لمنع المتصفح من عمل تحديث
//     let task = `
//        <div class="task">
//             <div class="icon">
//                 <span><i class="fa-solid fa-trash"></i></span>
//                 <div>
//                     <span><i class="fa-solid fa-star"></i></span>
//                     <span><i class="fa-solid fa-heart"></i></span>
//                 </div>
//             </div>
//             <p>${input.value}</p>
//         </div>
//     `
//     section.innerHTML += task;
//     input.value = ''
// });
// section.addEventListener('click' , function(e){  //لبرمجة زر الحذف
//     if (e.target.className == 'fa-solid fa-trash') {  // target داخل القسم  المقصود بها الهدف المطلوب
//         e.target.parentElement.parentElement.parentElement.remove();
//     }else if (e.target.className == 'fa-solid fa-heart') {
//         e.target.classList.add('heart');
//     }else if (e.target.className == 'fa-solid fa-heart heart') {
//         e.target.classList.remove('heart');
//     }else if (e.target.className == 'fa-solid fa-star') {
//         e.target.classList.add('yellowStar');
//         section.prepend(e.target.parentElement.parentElement.parentElement.parentElement);
//     }else if (e.target.className == 'fa-solid fa-star yellowStar'){
//         e.target.classList.remove('yellowStar');
//     }
// });


let btn     = document.querySelector("button");
let input   = document.querySelector("input");
let form    = document.querySelector("form");
let section = document.querySelector("section");
let errorMessage = document.getElementById("error-message");

// استرجاع المهام من localStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", loadTasks);

form.addEventListener("submit", function(e) {
    e.preventDefault();  // لمنع المتصفح من عمل تحديث
    if (input.value.trim() === "") {  // التحقق إذا كان الإدخال فارغًا
        errorMessage.classList.remove("hidden");
        return;
    }
    errorMessage.classList.add("hidden");
    addTask(input.value);
    saveTask(input.value);
    input.value = '';
});

section.addEventListener('click', function(e) {
    if (e.target.matches('.fa-trash')) {
        removeTask(e.target);
    } else if (e.target.matches('.fa-heart')) {
        toggleHeart(e.target);
    } else if (e.target.matches('.fa-star')) {
        toggleStar(e.target);
    }
});

function addTask(taskText) {
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    let iconDiv = document.createElement('div');
    iconDiv.className = 'icon';

    let trashSpan = document.createElement('span');
    let trashIcon = document.createElement('i');
    trashIcon.className = 'fa-solid fa-trash';
    trashSpan.appendChild(trashIcon);

    let starHeartDiv = document.createElement('div');

    let starSpan = document.createElement('span');
    let starIcon = document.createElement('i');
    starIcon.className = 'fa-solid fa-star';
    starSpan.appendChild(starIcon);

    let heartSpan = document.createElement('span');
    let heartIcon = document.createElement('i');
    heartIcon.className = 'fa-solid fa-heart';
    heartSpan.appendChild(heartIcon);

    starHeartDiv.appendChild(starSpan);
    starHeartDiv.appendChild(heartSpan);

    iconDiv.appendChild(trashSpan);
    iconDiv.appendChild(starHeartDiv);

    let taskParagraph = document.createElement('p');
    taskParagraph.textContent = taskText;

    taskDiv.appendChild(iconDiv);
    taskDiv.appendChild(taskParagraph);

    section.appendChild(taskDiv);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => {
        addTask(taskText);
    });
}

function removeTask(target) {
    let task = target.closest('.task');
    let taskText = task.querySelector('p').textContent;
    task.remove();
    removeTaskFromStorage(taskText);
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleHeart(target) {
    target.classList.toggle('heart');
}

function toggleStar(target) {
    target.classList.toggle('yellowStar');
    let task = target.closest('.task');
    if (target.classList.contains('yellowStar')) {
        section.prepend(task);
    }
}

