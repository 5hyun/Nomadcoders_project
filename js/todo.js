const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const finished = document.querySelector(".finished");

const TODOS_KEY = "todos";
const FINISH_KEY = "finish";

let toDos = [];
let finish = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function savefinish() {
  localStorage.setItem(FINISH_KEY, JSON.stringify(finish));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span").innerText;
  //todo
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  //finish
  paintfinish(span);
  finish.push(span);
  savefinish();
}

function deletefinish(event) {
  const li = event.target.parentElement;
  li.remove();
  const liText = li.querySelector("span").innerText;
  finish = finish.filter((item) => item !== liText);
  savefinish();
}

function paintfinish(newfinish) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = newfinish;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deletefinish);
  li.appendChild(span);
  li.appendChild(button);
  finished.appendChild(li);
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
const savedfinish = localStorage.getItem(FINISH_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

if (savedfinish) {
  const parsedfinish = JSON.parse(savedfinish);
  finish = parsedfinish;
  parsedfinish.forEach(paintfinish);
}
