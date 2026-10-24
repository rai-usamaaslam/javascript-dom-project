const todo=document.querySelector('#to-do');
const progress=document.querySelector('#progress');
const done=document.querySelector('#done');

let dragElem=null;
const tasks=document.querySelectorAll('.task');

tasks.forEach(task =>{
  task.addEventListener('drag',(e)=>{
    dragElem=task;
  })
});

function addDragEvent(colums){
  colums.addEventListener('dragenter',(e)=>{
    e.preventDefault();
  colums.classList.add('hover-over');
})
colums.addEventListener('dragleave',(e)=>{
  e.preventDefault();
  colums.classList.remove('hover-over');
})
colums.addEventListener('dragover',(e)=>{
   e.preventDefault();
})
colums.addEventListener('drop',(e)=>{
   e.preventDefault();
   colums.appendChild(dragElem);
   colums.classList.remove('hover-over');
   console.log("dropped",dragElem,colums)
})
}
addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);