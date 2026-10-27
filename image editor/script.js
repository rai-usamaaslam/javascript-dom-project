const filterContainer=document.querySelector('.filters')
const imageCanvas=document.querySelector('.image-canvas')
const imageInput=document.querySelector('#image-input')
const canvasCtx=imageCanvas.getContext('2d');
const reset=document.querySelector('#Resetbtn')
const Download=document.querySelector('#DownloadBTn')

let file =null;
let image =null;

let filters={
  brightness:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  contrast:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  exposure:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  saturation:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  hueRotation:{
    value:0,
    min:0,
    max:200,
    unit:"deg"
  },
  blur:{
    value:0,
    min:0,
    max:200,
    unit:"px"

  },
  grayscale:{
    value:0,
    min:0,
    max:200,
    unit:"%"
  },
  sepia:{
    value:0,
    min:0,
    max:200,
    unit:"%"
  },
  opacity:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  invert:{
    value:0,
    min:0,
    max:200,
    unit:"%"
  }
};
function createFilterElement(name,unit="%",value,min,max){
  const div = document.createElement('div');
  div.classList.add('filter');

  const input = document.createElement('input');
  input.type="range"
  input.min=min;
  input.max=max;
  input.value=value;
  input.id=name;

  const p = document.createElement('p');
  p.textContent=name;

  div.appendChild(p);
  div.appendChild(input);
  input.addEventListener('input',(dets)=>{
name,filters[name].value=input.value;
applyFilters();
})
  return div;

}
function createFilters(){
Object.keys(filters).forEach( key => {
  const filterElem = createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
  filterContainer.appendChild(filterElem);
})
}
createFilterElement();


imageInput.addEventListener('change',(dets)=>{

  const file = dets.target.files[ 0 ];
  const placeholder=document.querySelector('.placeholder');
  imageCanvas.style.display="block";
  placeholder.style.display='none';
  const img= new Image();
  img.src=URL.createObjectURL(file);


  img.onload=()=>{ 
    image=img;
    imageCanvas.width=img.width;
    imageCanvas.height=img.height;
    canvasCtx.drawImage(img,0,0)
  }

})
function applyFilters(){
  canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height);

  canvasCtx.filter=`brightness(${filters.brightness.value}${filters.brightness.unit})`
  canvasCtx.drawImage(image,0,0)
}
reset.addEventListener('click',() =>{
filters={
  brightness:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  contrast:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  exposure:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  saturation:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  hueRotation:{
    value:0,
    min:0,
    max:200,
    unit:"deg"
  },
  blur:{
    value:0,
    min:0,
    max:200,
    unit:"px"

  },
  grayscale:{
    value:0,
    min:0,
    max:200,
    unit:"%"
  },
  sepia:{
    value:0,
    min:0,
    max:200,
    unit:"%"
  },
  opacity:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  invert:{
    value:0,
    min:0,
    max:200,
    unit:"%"
  }
};
applyFilters();
filterContainer.innerHTML="";
createFilterElement();

})

Download.addEventListener('click',()=>{
  const link = document.createElement('a');
  link.download="edited-image.png"
  link.href=imageCanvas.toDataURL();
  link.click();
})