/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// import {$} from '../../core/dom';
import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponrent';
import {createTable, current, matrix, resizeTable} from './table.template';
 import {TableSelection} from './TableSelection';
// import {$select} from './TableSelection';

export class Table extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Table',
          listeners:
          ['mousedown', 'keydown', 'input'],
          ...options
        })
    }
    static className = 'excel__table'
    toHTML() {
        return createTable(20)
    }
prepare() { // вызовется до метода инит
  this.selection = new TableSelection()
}
  init() {
        super.init()
        const el = this.$root.find('[data-name="A1"]')
       this.selection.select(el)
       this.$on('text', (text)=>{
        this.selection.current.text(text)
       })
       this.$on('enter', () =>{
       this.selection.current.focus()
       })
       this.$emit('inptext', this.selection.current.text())
    }

 /* onClick(event) {
     console.log(event.target)
}*/

onKeydown(e) {
  const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab']
  if (keys.includes(e.code) && !e.shiftKey) { // при зажатой клавише шифт одновременно с ентер нам не нужно e.preventDefault()
    e.preventDefault()
  let curNum = this.selection.current.getAttr('data-num')
  let curCol = this.selection.current.getAttr('data-cell')
  if (e.code=='ArrowDown' || e.code=='Enter') {
    curNum = Number(curNum)+1
    current(this.$root, this.selection, curCol, curNum)
  } else if (e.code =='ArrowUp') {
    curNum = Number(curNum)-1
    current(this.$root, this.selection, curCol, curNum)
  } else if (e.code == 'ArrowRight'|| e.code == 'Tab') {
    curCol = String.fromCharCode(curCol.charCodeAt(0)+1)
    current(this.$root, this.selection, curCol, curNum)
  } else if (e.code == 'ArrowLeft') {
    curCol = String.fromCharCode(curCol.charCodeAt(0)-1)
    current(this.$root, this.selection, curCol, curNum)
  }
  this.$emit('inptext', this.selection.current.text())
}
}

onInput(e) {
console.log(this.selection.current.text())
this.$emit('inptext', this.selection.current.text())
}


onMousedown(event) {
  const data =[]
    if (event.target.dataset.resize) {
 resizeTable(event, this.$root)
    } else if (event.target.dataset.sel) {
      data.push(event.target)
      if (event.shiftKey == false) {
        const target = $(event.target)
      this.selection.select(target)
      this.$emit('inptext', target.text())
      } else if (event.shiftKey == true) {
        matrix(data, this.$root, this.selection)
       /* document.onmousemove = (e) =>{
          if (!data.find((el)=>el==e.target)) {
              data.push(e.target)
              console.log('celll', e.target)
              console.log('mass', data)
          }
           }
           document.onmouseup =()=>{
            console.log(data, 'DATA')
            const startEl = data[0]
            const startLetter = startEl.getAttribute('data-cell').charCodeAt(0)
            const startNum = Number(startEl.getAttribute('data-num'))
            const endEl = data[data.length-1]
            const endLetter = endEl.getAttribute('data-cell').charCodeAt(0)
            const endNum = Number(endEl.getAttribute('data-num'))
            console.log(startEl, 'start', startNum, startLetter)
            console.log(endEl, 'end', endNum, endLetter)
            // const a = 'F'.charCodeAt(0)
// const b = 'F'.charCodeAt(0)
 const arr = []
if (startLetter>endLetter) {
  for (let i=endLetter; i<=startLetter; i++) {
    arr.push(String.fromCharCode(i))
  }
  } else if (startLetter<endLetter) {
   for (let i=startLetter; i<=endLetter; i++) {
    arr.push(String.fromCharCode(i))
  }
  } else if (startLetter==endLetter) {
     arr.push(String.fromCharCode(startLetter))
  }
console.log(arr)
const num = []
if (startNum>endNum) {
  for (let i=endNum; i<=startNum; i++) {
    num.push(i)
  }
  } else if (startNum<endNum) {
   for (let i=startNum; i<=endNum; i++) {
    num.push(i)
  }
  } else if (startNum==endNum) {
     num.push(startNum)
  }
console.log(num)
// const els =[]
/* arr.forEach((el)=>{
  num.forEach((elem)=>{
   els.push(this.$root.find(`[data-name =${el}${elem}]`))
  })
})*/
/* const els = arr.reduce((acc, coll)=>{
  num.forEach((elem)=>{
    acc.push(this.$root.find(`[data-name =${coll}${elem}]`))
   })
   return acc
}, [])

this.selection.selectGroup(els)
document.onmousemove = null
document.onmouseup = null

console.log(els)


              /* const mass ={}
              data.forEach((el)=>{
                  const attr = el.getAttribute('data-cell')
                if (!mass[attr]) {
                  mass[attr] = 1
                } else {
                  mass[attr] =++ mass[attr]
                }
              })
              const nums ={}
              data.forEach((el)=>{
                const attr = el.getAttribute('data-num')
              if (!nums[attr]) {
                nums[attr] = 1
              } else {
                nums[attr] =++ nums[attr]
              }
            })
              console.log(mass)
             const sort = Object.keys(mass).sort(function(a, b) {
              return mass[a]-mass[b]
             })
             const sortnums = Object.keys(nums).sort(function(a, b) {
              return nums[a]-nums[b]
             })
             console.log(sortnums, 'nums')
              const filtCell = data.filter((el)=>el.dataset.cell == sort[sort.length-1]) // буквы уникальные
              const numCell = filtCell.map((el)=> el.dataset.num) // номера строк конкртн столбца,где больше выбрано ячеек
              const eventArr =[]
              numCell.forEach((num)=>{
                sort.forEach((b)=>{
                  eventArr.push(this.$root.find(`[data-name =${b}${num}]`))
                })
              })
              sort.forEach((b)=>{
                numCell.forEach((num)=>{
                  if (eventArr.find((el)=>el!=this.$root.find(`[data-name =${b}${num}]`))) {
                  eventArr.push(this.$root.find(`[data-name =${b}${num}]`))
                  }
                })
              })
              console.log('aarrrrrrrrrrrr', eventArr)
              // const objArr = eventArr.map((el)=>$(el))
               this.selection.selectGroup(eventArr)
              document.onmousemove = null
              document.onmouseup = null */
          // }
      }
/*
document.onmousemove = (e) =>{
if (!data.find((el)=>el==e.target)) {
    data.push(e.target)
    console.log('celll', e.target)
    console.log('mass', data)
    // s
}
 }
 document.onmouseup =()=>{
    const mass ={}
    data.forEach((el)=>{
        const attr = el.getAttribute('data-cell')
      if (!mass[attr]) {
        mass[attr] = 1
      } else {
        mass[attr] =++ mass[attr]
      }
    })
    console.log(mass)
   const sort = Object.keys(mass).sort(function(a, b) {
    return mass[a]-mass[b]
   })
    const filtCell = data.filter((el)=>el.dataset.cell == sort[sort.length-1]) // буквы уникальные
    const numCell = filtCell.map((el)=> el.dataset.num) // номера строк конкртн столбца,где больше выбрано ячеек
    const eventArr =[]
     sort.forEach((b)=>{
      numCell.forEach((num)=>{
    eventArr.push(document.querySelector(`[data-name =${b}${num}]`))
      })
    })
    console.log('aarrrrrrrrrrrr', eventArr)
     this.selection.selectGroup(eventArr)
    document.onmousemove = null
    document.onmouseup = null
 }*/
 }
    }
 /* console.log(event.target, 'mouseDown') // {resize: "row"} если нажимаем на элемент с датой data-resize = 'row'
if (event.target.dataset.resize ==='row') {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resize"]')
    const coords = $parent.getCoords()
    const $parentInfo =$resizer.closest('[data-info="info"]')
    const $line = $.create('div', 'line-rowresize')
    let height
    $parentInfo.append($line)
    $line.css({display: 'block', width: document.documentElement.clientWidth +'px'})
    document.onmousemove = (e) =>{
        const delta = e.pageY - coords.bottom
        height = coords.height + delta + 'px'
        const change = -delta
        $line.css({bottom: change + 'px'})
       // $parent.styles.height = coords.height + delta + 'px'
    }
    document.onmouseup=()=>{
        document.onmousemove = null
        $parent.css({height: height})
        $parentInfo.removeEl($line)
    }
}
if (event.target.dataset.resize ==='col') {
const $resizer = $(event.target)
const $parent = $resizer.closest('[data-column="col"]')
const coords = $parent.getCoords()
const $line = $.create('div', 'line-resize')
$parent.append($line)
let widthcol
document.onmousemove = (e) =>{
    const delta = e.pageX - coords.right
    widthcol = coords.width + delta
    // $parent.styles.width = widthcol + 'px'
    $parent.css({width: widthcol + 'px'})
    $line.css({display: 'block', height: document.documentElement.clientHeight +'px'})
}
document.onmouseup=()=>{
    document.onmousemove = null
   // document.onmouseup = null
   // const cells = document.querySelectorAll(`[data-cell=${$parent.$el.getAttribute('data-col')}]`)
   const cells = this.$root.findAll(`[data-cell=${$parent.data.col}]`)
    cells.forEach((el) =>{
            //  el.style.width = widthcol + 'px'
            el.css({width: widthcol + 'px'})
      })
    $parent.removeEl($line)
    console.log(document.onmousemove)
  }
}*/
}
/* onMousemove() {
    console.log('mousemovee')
    }
onMouseup() {
        console.log('mouseeeeUp')
        }
        onClick(event) {
            console.log('click', event.target)
        }*/

