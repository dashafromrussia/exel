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
 // возвр this, чтобы можно было на нем вызвать метод clear..это назыв чейн
// $('div').html('<h1>text</h1>').clear()
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
