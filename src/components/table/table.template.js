import {$} from '../../core/dom'

/* eslint-disable max-len */
const CODES = {
    A: 65,
    Z: 90
  }

  // eslint-disable-next-line no-unused-vars
   function createCell() {
     return `
       <div class="cell" contenteditable></div>
     `
  }

  function toColumn(col) {
    return `
      <div class="column" data-column='col' data-col =${col}>${col}
      <div class = "col-resize" data-resize="col"></div>
      </div>
    `
  }

  function createRow(content, count) {
      count = !count ? '' : count
      const resize = count ? '<div class="row-resize" data-resize="row"></div>':''
    return `
      <div class="row" data-type="resize">
        <div class="row-info" data-info="info">${count}
        ${resize}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `
  }

  function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
  }

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

     const cells = new Array(colsCount).fill('').map(toChar) // со значениями в ячейках

    for (let i = 0; i < rowsCount; i++) {
        const newcells = cells.map((elem)=>{
           return `<div class="cell" contenteditable data-sel="select" data-num=${i+1} data-name=${elem}${i+1} data-cell=${elem}></div>`
        }).join('')
      rows.push(createRow(newcells, i+1))
    }

    /* for (let i = 0; i < rowsCount; i++) {
      const cells = new Array(colsCount).fill('').map(toChar).map(createCell).join('')
      rows.push(createRow(cells, i+1))
    } */

    return rows.join('')
  }

  export function resizeTable(event, $root) {
    document.onselectstart=()=>{ // убирает выделение содержимого таблицы при ресайзе
      return false
    }
  //  console.log(event.target, 'mouseDown') // {resize: "row"} если нажимаем на элемент с датой data-resize = 'row'
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
   const cells = $root.findAll(`[data-cell=${$parent.data.col}]`)
    cells.forEach((el) =>{
            //  el.style.width = widthcol + 'px'
            el.css({width: widthcol + 'px'})
      })
    $parent.removeEl($line)
    console.log(document.onmousemove)
  }
}
}
export function current(root, selection, curCol, curNum) {
  if (curNum<=20 && curNum >=1 && curCol.charCodeAt(0) >=65 && curCol.charCodeAt(0)<=90) {
  const el = root.find(`[data-name=${curCol}${curNum}]`)
    selection.select(el)
  } else {
    return false
  }
}


export function matrix(data, $root, selection) {
  document.onmousemove = (e) =>{
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
const els = arr.reduce((acc, coll)=>{
num.forEach((elem)=>{
acc.push($root.find(`[data-name =${coll}${elem}]`))
})
return acc
}, [])

selection.selectGroup(els)
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
     }
}
