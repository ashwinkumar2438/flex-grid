import FormManager from "./render.js";
import data from "./data.js"

const formManager=new FormManager();

formManager.changeDisplay(data.flex);


document.querySelector('#display-type').addEventListener('change',(e)=>{
    formManager.changeDisplay(data[e.target.value]);
})
document.querySelector('#child-selector').addEventListener('change',(e)=>{
    formManager.changeChildFocus(e.target.value);
})

