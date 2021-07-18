export default class Elementer{

    constructor(type){
        this.element=document.createElement(type||'div');
    }

    text(val){
        this.element.textContent=val;
        return this;
    }

    addAttr(prop,val){
        this.element.setAttribute(prop,val);
        return this;
    }

    addProp(prop,val){
        this.element[prop]=val;
        return this;
    }

    addData(prop,val){
        this.element.dataset[prop]=val;
        return this;
    }

    append(children=[]){
        this.element.append(...children);
        return this;
    }

    addStyle(prop,val){
        this.element.style[prop]=val;
        return this;
    }

    getElement(){
        return this.element;
    }
}