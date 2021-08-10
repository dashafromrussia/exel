import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emmiter = options.emmiter
        this.unsubscribes = []
        this.prepare() // вызыв до метода инит, тк вызывается в конструкторе
    }
// возвращает шаблон компонента
toHTML() {
    return ''
}
 prepare() {

}
init() {
    this.initDOMListeners()
}
// уведомл слушателя о событии евент
$emit(event, ...args) {
    this.emmiter.emit(event, ...args)
}
// подпис на событие евент
$on(event, fn) {
const unsub = this.emmiter.subscribe(event, fn)
this.unsubscribes.push(unsub)
}

rem() {
    this.removeDomListeners()
    this.unsubscribes.forEach((f)=>f())
    // console.log('aaa')
}
}
