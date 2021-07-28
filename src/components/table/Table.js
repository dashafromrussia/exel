/* eslint-disable max-len */
// import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponrent';
import {createTable, resizeTable} from './table.template';

export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Table',
          listeners:
          ['mousedown']
        })
    }
    static className = 'excel__table'
    toHTML() {
        return createTable(20)
    }

onMousedown(event) {
    resizeTable(event, this.$root)
/* console.log(event.target, 'mouseDown') // {resize: "row"} если нажимаем на элемент с датой data-resize = 'row'
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

