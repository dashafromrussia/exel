/* eslint-disable max-len */
// import {$} from '../../core/dom'

// eslint-disable-next-line no-unused-vars
export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    select($el) {
        this.clear()
        this.current = $el
   // const selectEl = root.selectorAllinstans('[data-selected ="true"]')
  // let find = false
 //  this.group.forEach((el)=>{
   /* if (el==$el.$el) {
       find = true
    }*/
  //  el.removeAttr('data-selected')
  //  el.removeClass('selected')
   // el.css({border: '1px solid #e2e2e3', zIndex: 0, outline: 'none'})
// })
// this.group =[]
// if (!find) {
    this.group.push($el)
    this.group.forEach((el)=>{
    el.focus().addClass(TableSelection.className)
   // el.css({border: 'none', zIndex: 2, outline: '2px solid blue'})
    el.setAttr('data-selected', 'true')
    })
// }
    }
    clear() {
        this.group.forEach((el)=>{
             el.removeAttr('data-selected')
             el.removeClass(TableSelection.className)
         })
         this.group =[]
    }

    selectGroup(data) {
        this.clear()
       /* const selectEl = root.selectorAll('[data-selected ="true"]')
        let find = false
        selectEl.forEach((el)=>{
         if (data.find((elem)=>elem==el)) {
            find = true
         }
         el.removeAttribute('data-selected')
        //  el.classList.remove('selected')
          el.style.border = '1px solid #e2e2e3'
         el.style.zIndex = 1
         el.style.outline = 'none'
     })*/
    // if (!find) {
        this.group =[...data]
      /* const arrNum = this.group.map((el)=>el.getAttribute('data-num')).sort(function(a, b) {
            return a-b
           })*/
     /* const arrCell = this.group.map((el)=>el.getAttribute('data-cell').charCodeAt(0)).sort(function(a, b) {
            return a-b
           })*/
       this.group.forEach((el)=>{
      // el.classList.add('selected')
      el.addClass(TableSelection.className)
      // el.css({border: 'none', zIndex: 2, outline: '2px solid blue'})
       el.setAttr('data-selected', 'true')
       /* if (el.getAttribute('data-num') > arrNum[0] && el.getAttribute('data-num')<arrNum[arrNum.length-1]) {
            el.style.outline = '1px solid grey'
            console.log(el, 'elllllllllll')
        } else {
            el.style.outline = '2px solid blue'
        }*/
           })
    // }
    }
}
/* class TableSelection {
    constructor(cell) {
   this.cell = cell
    }

select() {
if (!this.cell.dataset.selected) {
this.cell.classList.add('selected')
this.cell.setAttribute('data-selected', 'true')
// console.log(this.cell)
} else {
    this.cell.classList.remove('selected')
    this.cell.removeAttribute('data-selected')
    // console.log('remm')
}
}
}
export function $select(cell) {
    return new TableSelection(cell)
}*/
// eslint-disable-next-line spaced-comment
//////////////////////////////////////////////////////////////////////////
/* const data =['a','a','c','c','c','n','n','v','v']

/* let mass ={}
data.forEach(el=>{
  if(!mass[el]){
    mass[el] = 1// [el]
  }else{
    mass[el] =++ mass[el]// [...mass[el],el]
  }
})
console.log(mass)

const sort = Object.keys(mass).sort(function(a,b){return mass[a]-mass[b]})
console.log(sort)
const max ={[mass[sort[sort.length-1]]]: sort[sort.length-1]}
console.log(max)*/
// дополн массив с евент недостающими элементами
