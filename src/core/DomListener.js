/* eslint-disable max-len */
import {capitolize} from './utils'

export class DomListener {
constructor($root, listeners=[], name) {
    if (!$root) {
        throw new Error('No root provided for DomListener!')
    }
    this.$root = $root
    this.listeners = listeners
}

initDOMListeners() {
    this.listeners.forEach((listener) => {
        const method = getMethodName(listener)
        console.log(method)
        console.log(this[method])// инстанс класса Formula..Header..в нем ищется с-во onInput
// то же самое что и addEventListener..root - это инстанс класса Дом,у котрого есть метод on
        if (!this[method]) {
throw new Error(`Method ${method} not defined in ${this.name || ''} Component`)
        }
        this[method] = this[method].bind(this) // переоред зис метод, тк бинд создает новую ф-цию..и получается когда мы исп зис метод,мы работаем со старой ф-цией..а нас нужна уже забиндиная ф-ция
this.$root.on(listener, this[method]) // теряется контекст ф-ции onInput при addeventlistener..поэтому биндим
    })
    console.log(this.listeners)
    console.log(this.$root) // инстанс класса дом
    console.log(this) // инстанс класса Formula..Header..в общем компонентов
}

removeDomListeners() {
    this.listeners.forEach((listener) => {
        const method = getMethodName(listener)
        console.log(method)
        console.log(this[method])// инстанс класса Formula..Header..в нем ищется с-во onInput
// то же самое что и addEventListener..root - это инстанс класса Дом,у котрого есть метод on
       /* if (!this[method]) {
throw new Error(`Method ${method} not defined in ${this.name || ''} Component`)
        }*/
this.$root.remove(listener, this[method])
    })
    console.log(this.listeners)
    console.log(this.$root) // инстанс класса дом
    console.log(this) // инстанс класса Formula..Header..в общем компонентов
}
}

function getMethodName(eventName) {
 return 'on' + capitolize(eventName)
}
