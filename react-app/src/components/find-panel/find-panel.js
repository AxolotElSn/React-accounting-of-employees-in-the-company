import { Component } from 'react';

import './find-panel.css';

class FindPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            find: ''
        }
    }

    onUpdateSearch = (e) => { /* это локальная ф-ия */
        const find = e.target.value; /* то что ввели в поле */
        this.setState({find}); /* тут мы локально закидываем то что ввели  */
        this.props.onUpdateSearch(find) /* а тут мы вызываем родительский метод и в качестве аргумента закидываем то что ввели (поднимаем состояние в родительский компонент получается) */ /*  а это ф-ия из пропсов. То есть из родительского компонента. Просто названия одинаковые */ 
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input" // классы из бутстрапа
                placeholder="Найти сотрудника"
                value={this.state.find} 
                onChange={this.onUpdateSearch} /* 1) то есть когда вводим что-то в поле срабатывает событие и вызывается метод onUpdateSearch и обрабатывает то что ввели и записывает в find введенное*/
                />
        );
    }
}

export default FindPanel;