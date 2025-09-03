import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import FindPanel from '../find-panel/find-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmpolyeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [ /* это мы имитируем что эти данные с сервера пришли */
                {name: 'Alex O', salary: 5250, increase: false, star: true, id: 1},
                {name: 'Ksenya S', salary: 4800, increase: true, star: false, id: 2},
                {name: 'John D', salary: 3000, increase: false, star: false, id: 3}
            ],
            find: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            /* мы не можем напрямую изменять state, мы должны скопировать data и менять копию, иначе будут баги */
            
            // метод 1
            // const index = data.findIndex(element => element.id === id); /* метод массива который позвращает индекс элемента если ф-ия вернет true*/
            // const before = data.slice(0, index) /* копируем массив с 0 элемента до какого нам нужно (index это будет тот элемент на который мы кликнули на корзину) */
            // const after = data.slice(index + 1) /* а тут мы пропускаем элемент на который мы кликнули и копируем остальную часть массива без этого элемента */ /* то есть эти переменные в сумме дают наш массив без того элемента на который мы кликнули */

            // const newArr = [...before, ...after]; /* ну а тут мы создаем новый массив в котором не будет элемента на который мы кликнули */

            // return {
            //     data: newArr
            // }

            //метод 2
            return {
                data: data.filter(item => item.id !== id) /* то есть filter вернет массив без удаленного элемента */ /* то есть мы перебираем каждый объекти в массиве и исключаем элемент на id которого мы кликнули. Иначе говоря останутся только те элементы id которых не совпадают с id на котрорый мы кликнули */
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            star: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]; /* в конец старого массива добавляем новый элемент */
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        // способ 1
        // this.setState(({data}) => {
            // const index = data.findIndex(element => element.id === id); /* то есть в index запишется объект с нашим индексом */

            // const old = data[index];
            // const newItem = {...old, increase: !old.increase}; /* ну а тут сы делаем новый элемент с противоположным increase */
            // const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            // return {
            //     data: newArr
            // }
        // })

        // способ 2
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]} /* то есть если id элемента совпадает с id элемента на который мы кликнули, то возвращаем этот элемент с противоположными prop (increase или star) */
                }
                return item;
            })
        }))
    }

    findEmpl = (items, find) => { /* строчка что ищем и массив данных который фильтруем */
        if (find.lengtn === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(find) > -1 /* indexOf() это метод, который ищет указанный элемент в массиве или строке */ /* если метод ничего не найдет, то он возвращает -1. По этому у нас такая проверка что фильтр возвращает только те элементы, которые больше -1 */
        })
    }

    onUpdateSearch = (find) => {
        this.setState({find});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'star' :
                return items.filter(item => item.star); /* фильтруем только те где star true */
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, find, filter} = this.state,
               employees = this.state.data.length, /* общее число сотрудников */
               increased = this.state.data.filter(item => item.increase).length, /* сотрудники с премией */
               visibleData = this.filterPost(this.findEmpl(data, find), filter) /* то есть мы фильтруем отфильтпрванные данные. Тначе говоря мы одновременно работаем и с формой поиска и с фильтрующими кнопками */ 

        return (
            <div className="app">
                <AppInfo
                employees={employees}
                increased={increased}/>
    
                <div className="find-panel">
                    <FindPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                data={visibleData} /* Передаем в компонент масссив с данными */
                onDelete={this.deleteItem} /* тут мы ф-ию передаем как пропс (свойство) через onDelete получается от самого старшего компонента в компонент EmployeesList (мы передаем id)*/
                onToggleProp={this.onToggleProp}/>

                <EmpolyeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;