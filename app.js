import data from './data.js';
import Elementer from './elementer.js';


let root=data.flex;

/** ^ Helper pure functions */

//convert to camelcase
const camelCaser = (value) => value.replace(/-([a-z])/g, (full, first) => first.toUpperCase());

//get element/elements
const getEl = (selector, parent = document) => parent.querySelector(selector)
const getEls = (selector, parent = document) => ([...parent.querySelectorAll(selector)]);

/** $ Helper pure functions */

/** ^ Event Listeners */
//listen to property select change.
const changeDisplay=(e)=>{
    const display=e.currentTarget.value;
    root=data[display];
    injectForm(root);
}

const changePropAction = (e) => {
    let select = e.currentTarget;
    let prop = select.dataset.property;
    let elements = getEls(select.parentElement.dataset.target);
    for (let element of elements) {
        element.style[prop] = select.value;
    }
}

//listen to flex child select change.
const changeChildActive = (e) => {
    const selector = e.currentTarget.value;
    const child = getEl(selector);

    getEl('.child-form').dataset.target = selector;
    root.children.forEach(entry => {
        let propvalue = child.style.getPropertyValue(entry.property);
        let select = getEl(`[data-property=${camelCaser(entry.property)}]`);
        select.value = propvalue;
    })

}

/** $ Event Listeners */

/** ^ Create Form Inputs with initial data */

//@return option elements.
const createOptions = (options = []) => options.map(({ value, text }) => {
    return new Elementer('option').addAttr('value', value).addProp('textContent', text).getElement();
})

//@return array of label and select element.
function getInputs(root) {
    return root.map(entry => {

        const options = createOptions(
                entry.values.map(val => ({ value: val, text: val }) )
            )

        const select = new Elementer('select')
            .addData('property', camelCaser(entry.property))
            .addAttr('class','dyno-add')
            .append(options)
            .getElement();

        select.addEventListener('change', changePropAction);

        const label = new Elementer('label').text(entry.property).addAttr('class', 'dyno-add').getElement();

        return [label, select];

    })
}

/** $ Create Form Inputs with initial data */

function injectForm(root) {
    const parentForm=getEl('.parent-form');
    const childForm=getEl('.child-form');

    getEls('.dyno-add',parentForm).forEach(element=>parentForm.removeChild(element));
    getEls('.dyno-add',childForm).forEach(element=>childForm.removeChild(element));

    parentForm.append(...getInputs(root.parent).flat());
    childForm.append(...getInputs(root.children).flat());

    getEl('.visual-container').style=root.parentDefaults;
    getEls('.child-item').forEach(flexChild=>{
        flexChild.style=root.childDefaults;
    })
}

/** ^ Manipulate DOM */

injectForm(root);

getEl('#display-type').addEventListener('change',changeDisplay);
getEl('.child-selector').addEventListener('change', changeChildActive)


/** $ Manipulate DOM */