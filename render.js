import {getEl,getEls,camelCaser} from './supports.js';
import Elementer from './elementer.js';

export default class FormManager{
    constructor(){
        this.parent=getEl('.visual-container');
        this.parentForm=getEl('.parent-form');
        this.childForm=getEl('.child-form');

        this.parentForm.addEventListener('change',this._eventSelectChange.bind(this));
        this.childForm.addEventListener('change',this._eventSelectChange.bind(this));
    }

    changeDisplay(displaydata){
        this.main=displaydata;
        this.clearForm();
        this.render();
    }

    changeChildFocus(selector){
        this.childForm.dataset.target=selector;
        this.updateChildForm();
    }

    clearForm(){
        for(let element of getEls('.dyno-add')){
            element.remove();
        }
    }

    _eventSelectChange(e){
        let prop = e.target.dataset.property;
        let element = getEl(e.currentTarget.dataset.target);
    
        if(element instanceof HTMLElement)element.style[prop] = e.target.value;
    }


    updateParentForm(){
        for(let prop of this.main.parent){
            let propvalue = this.parent.style.getPropertyValue(prop.property);
            let select = getEl(`[data-property=${camelCaser(prop.property)}]`,this.parentForm);
            select.value = propvalue;
            console.log(propvalue);
        }    
    }
    updateChildForm(){
        const child=getEl(this.childForm.dataset.target,this.parent);
        for(let prop of this.main.children){
            let propvalue = child.style.getPropertyValue(prop.property);
            let select = getEl(`[data-property=${camelCaser(prop.property)}]`);
            select.value = propvalue;
        }
    }

    _createSelect({property,values}){
        const options= values.map(
                            (value)=>new Elementer('option')
                                        .addAttr('value',value)
                                        .text(value)
                                        .getElement()
                        );   
        const select= new Elementer('select')
                        .addData('property', camelCaser(property))
                        .addAttr('class','dyno-add')
                        .append(options)
                        .getElement(); 

        const label = new Elementer('label')
                        .text(property)
                        .addAttr('class', 'dyno-add')
                        .getElement();

        return [label, select];    

    }

    render(){
        let parentSelectors=this.main.parent.map(data=>this._createSelect(data)).flat();
        let childSelectors=this.main.children.map(data=>this._createSelect(data)).flat();
        
        this.parentForm.append(...parentSelectors);
        this.childForm.append(...childSelectors);

        //setting default styles.
        this.parent.style=this.main.parentDefaults;
        [...this.parent.children].forEach((child,i)=>{ child.style=this.main.getChildDefaults?.(i) });

        this.updateParentForm();
        this.updateChildForm();    

    }
}