import {ExcelComponent} from '../../core/ExcelComponrent';

export class Header extends ExcelComponent {
    static className = 'excel__header'
constructor($root) {
  super($root)
}
    toHTML() {
        return `<input type="text" class="input" value="Новая таблица"/>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
        <div class="button">
          <i class="material-icons">delete</i>`
    }
}