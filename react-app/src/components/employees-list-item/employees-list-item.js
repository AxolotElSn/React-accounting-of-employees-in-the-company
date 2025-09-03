import './employees-list-item.css'

const EmployeesListItem = (props) => {
    const {name, salary, onDelete, increase, star, onToggleProp} = props;

    let classNames = "list-group-item d-flex justify-content-between";

    if (increase) { /* increase это класс который мы написали в css. Он выделяет цветом если есть премия (печенька которая) */ /* если печенька не активна, то добавляем класс и она становится активной и наоборот */
        classNames += ' increase' /* важно в начале поставить пробел */
    }
    if (star) {
        classNames += ' like'
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label"
                  onClick={onToggleProp}
				  data-toggle="star"
				  style={{fontSize: 22}}>{name}</span> {/* так можем накидывать инлайн стили. Но только в виде объекьта */}
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button"
                    className="btn-cookie btn-sm"
                    onClick={onToggleProp} /* при клике мы вызываем обработчик onToggleProp передавая значения data-toggle */
                    data-toggle="increase"> {/* делаем дата атрибуты по которым будем передавать что надо менять */}
                    <i className="fas fa-cookie"></i> {/* иконка печеньки (премия типа) */}
                </button>

                <button type="button"
                    className="btn-trash btn-sm"
                    onClick={onDelete}> {/* и тут уже используем ф-ию на кнопке переданную как пропс */}
                    <i className="fas fa-trash"></i> {/* иконка мусорки */}
                </button>
                <i className="fas fa-star"></i> {/* иконка звездочки */}
            </div>
        </li>
    );   
}


export default EmployeesListItem;