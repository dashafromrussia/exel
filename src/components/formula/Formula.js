import {ExcelComponent} from '../../core/ExcelComponrent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
        name: 'Formula',
        listeners: ['input', 'click'],
        ...options
        })
    }

    init() {
        super.init()
        this.input = this.$root.find('[data-type="input"]')
        this.$on('inptext', (text) =>{
         this.input.text(text)
     })
     this.$on('inptext', (text) =>{
        this.input.text(text)
    })
    }

    toHTML() {
        return `<div class="info">fx</div>
        <div class="input" data-type ="input"
         contenteditable spellcheck="false"></div>`
    }

    onInput(event) {
        console.log(this)
        const text = event.target.textContent.trim()
        console.log('input', text)
        this.$emit('text', text)
        document.onkeydown =(e)=>{
            const keys =['Enter', 'Tab']
            if (keys.includes(e.code)) {
               // console.log('enter')
                 e.preventDefault()
                 this.$emit('enter')
              }
        }
        // исп не event.target.value, потому что это не инпут!
    }

    onClick(event) {
     console.log('click', event)
    }
}
