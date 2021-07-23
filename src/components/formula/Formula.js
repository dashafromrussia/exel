import {ExcelComponent} from '../../core/ExcelComponrent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root) {
        super($root, {
        name: 'Formula',
        listeners: ['input', 'click']
        })
    }

    toHTML() {
        return `<div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>`
    }
    onInput(event) {
        console.log(this)
        console.log('input', event.target.textContent.trim())
        // исп не event.target.value, потому что это не инпут!
    }

    onClick(event) {
     console.log('click', event)
    }
}
