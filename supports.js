//convert to camelcase
export const camelCaser = (value) => value.replace(/-([a-z])/g, (full, first) => first.toUpperCase());

//get element/elements
export const getEl = (selector, parent = document) => parent.querySelector(selector)
export const getEls = (selector, parent = document) => ([...parent.querySelectorAll(selector)]);