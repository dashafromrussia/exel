/* eslint-disable max-len */
import {$} from '../../core/dom'
import {Emiter} from '../../core/Emiter'

export default class Excel {
 constructor(selector, options) {
this.$el = $(selector) // dom obj
this.components = options.components || []
this.emmiter = new Emiter()
 }

getRoot() {
const node = $.create('div', 'excel') // dom obj
const componentOptions = {emmiter: this.emmiter} // один общий эммитер для всех
this.components = this.components.map( (Component) => {
    const $el = $.create('div', Component.className) // dom obj
    // передаем el в Component,чтобы не ругался domlistener
    const component = new Component($el, componentOptions) // formula heder toolbar table obj
    console.log(component)
   $el.html(component.toHTML()) // dom obj
   node.append($el) // dom obj
   return component // получаем инстансы классов formula heder toolbar table obj
})
return node
}

 render() {
     console.log(this.$el) // dom obj
     this.$el.append(this.getRoot()) // готовится html
     this.components.forEach((component) => {
        component.init() // после того как готов html,вешаем события
        // eslint-disable-next-line max-len
        // Инициализировать компонент component.init() (слушатели и тд) в пререопределенном массиве можно только после генерации корневого div, поэтому мы вынесли это за пределы getRoot..это делается только после append
         console.log(component)
        })
 }
 destroy() {
   this.components.forEach((component) => {
            component.rem()
            })
 }
}
