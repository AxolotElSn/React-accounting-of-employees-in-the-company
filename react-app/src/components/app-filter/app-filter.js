import './app-filter.css';

const AppFilter = (props) => {
    const btnData = [ /* мы все кнопкт положили в массив для удобства */
        {name: 'all', label: 'Все сотрудники', colored: false},
        {name: 'star', label: 'На повышение', colored: false},
        {name: 'moreThen1000', label: 'З/П больше 1000$', colored: false}
    ];

    const buttons = btnData.map(({name, label, colored}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light' /* если кнопка активная то выделяем, иначе не выделяем */
        const style = colored ? {color: 'red'} : null /* то есть если colored true то мы возвращаем объект со стилями которые хотим накинуть на элемент. Иначе просто возвращаем null, то есть оставляем все как есть */

        return (
            <button
                className={`btn ${clazz}`} /* так мы добиваемся что активная кнопка ваделяется */
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}
                style={style} 
                >
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
}

export default AppFilter;