import './scss/index.scss'
import 'core-js/stable'
// import './module'
// исп вместо полифилла babel,чтобы работать с новыми встроенными модулями
import 'regenerator-runtime/runtime'
import Excel from './components/exel/Excel'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'

// console.log('hello!')
const excel = new Excel('#app', {components: [Header, Toolbar, Formula, Table]})
excel.render()

