const filterContainer=document.querySelector('.filters')
const filters={
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
  return div;

}

Object.keys(filters).forEach( key => {
  const filterElem = createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
  filterContainer.appendChild(filterElem);
})