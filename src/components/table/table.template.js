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
      <div class="column">${col}</div>
    `
  }

  function createRow(content, count) {
      count = !count ? '' : count
    return `
      <div class="row">
        <div class="row-info">${count}</div>
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

    /* const cells = new Array(colsCount).fill('').map(toChar) // со значениями в ячейках

    for (let i = 0; i < rowsCount; i++) {
        const newcells = cells.map((elem)=>{
           return `<div class="cell" contenteditable>${elem}${i+1}</div>`
        }).join('')
      rows.push(createRow(newcells, i+1))
    }*/

    for (let i = 0; i < rowsCount; i++) {
      const cells = new Array(colsCount).fill('').map(toChar).map(createCell).join('')
      rows.push(createRow(cells, i+1))
    }

    return rows.join('')
  }

/* <div class="excel__table">
          <div class="row">
            <div class="row-info"></div>
            <div class="row-data">
              <div class="column">a</div>
              <div class="column">b</div>
              <div class="column">c</div>
            </div>
          </div>
          <div class="row">
            <div class="row-info">1</div>
            <div class="row-data">
              <div class="cell selected" contenteditable></div>
              <div class="cell" contenteditable></div>
              <div class="cell" contenteditable></div>
            </div>
          </div>
      </div> */
