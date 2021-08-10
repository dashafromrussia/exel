/* eslint-disable max-len */
class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector) // если селектор выглядит "#app"
        : selector // если селектор выглядит <div>text</div> (получен путем event.target)
    }
 html(html) {
if (typeof html === 'string') {
    this.$el.innerHTML = html
    console.log(this)
    return this
}
return this.$el.outHTML.trim()
 }

 text(text) {
if (typeof text === 'string') {
    this.$el.textContent = text
    return this
}
return this.$el.textContent.trim()
 }
 // возвр this, чтобы можно было на нем вызвать метод clear..это назыв чейн
// $('div').html('<h1>text</h1>').clear()
get data() {
return this.$el.dataset // возвращ атрибут дата штмл элемента
}

clear() {
   return this.html('')
}
append(node) {
    if (node instanceof Dom) {
        node = node.$el
    }
    if (Element.prototype.append) {
        this.$el.append(node)
    } else {
        this.$el.appendChild(node)
    }
    return this
}
on(eventType, callback) {
this.$el.addEventListener(eventType, callback)
}
remove(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
}
closest(selector) {
return $(this.$el.closest(selector)) // closest возвращ штмл эл, оборачив его в инстанс класса дом
}
getCoords() {
    return this.$el.getBoundingClientRect()
}
get styles() {
    return this.$el.style
}

findAll(selector) { // делаем селектор не по всему документу,а только по тому,на кого вешаем эту ф-цию
    const mass =[]
    const data = this.$el.querySelectorAll(selector)
    data.forEach((el)=>{
        mass.push($(el))
    })
    return mass
}
selectorAll(selector) {
    return this.$el.querySelectorAll(selector)
}

selectorAllinstans(selector) {
    const data =[]
    this.$el.querySelectorAll(selector).forEach((el)=> {
        data.push($(el))
    })
    return data
}

css(styles={}) {
    Object.keys(styles).forEach((el)=>{
     this.$el.style[el] = styles[el]
       })
       return this
}
removeEl(data) {
    console.log(data)
    if (this.$el.contains(data.$el)) {
    this.$el.removeChild(data.$el)
    }
    return this
}

focus() {
    this.$el.focus()
    return this
}

find(selector) {
    const el = this.$el.querySelector(selector)
   return $(el)
}
removeAttr(data) {
    this.$el.removeAttribute(data)
    return this
}
getAttr(data) {
    return this.$el.getAttribute(data)
}
setAttr(selector, val) {
    this.$el.setAttribute(selector, val)
    return this
}
addClass(name) {
    this.$el.classList.add(name)
}
removeClass(name) {
    this.$el.classList.remove(name)
}
}


export function $(selector) {
    return new Dom(selector)
}

$.create=(tagName, classes='')=>{
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}


