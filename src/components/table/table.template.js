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
           return `<div class="cell" contenteditable data-cell=${elem}>${elem}${i+1}</div>`
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
    console.log(event.target, 'mouseDown') // {resize: "row"} если нажимаем на элемент с датой data-resize = 'row'
const $resizer = $(event.target)
if (event.target.dataset.resize ==='row') {
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
