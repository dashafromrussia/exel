/* eslint-disable max-len */
export class Emiter {
    constructor() {
     this.listeners ={}
    }
// уведомл слушателя если они есть
    emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) { // если это не массив
return false
    }
    this.listeners[event].forEach((listener)=>{
        listener(...args)
    })
    return true
    }

    // слушатель подписыв на уведомл
    // доб нового слуш
subscribe(event, fn) {
this.listeners[event] = this.listeners[event] || [] // если такой элемент не создан,то равно пустому массиву
this.listeners[event].push(fn)
return () => { // отпис от события
this.listeners[event] = this.listeners[event].filter((listener)=> listener !== fn)
}
}
}

// Example
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('vladilen', data => console.log(data))
// emitter.emit('1231231', 42)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 4 seconds')
// }, 4000)

