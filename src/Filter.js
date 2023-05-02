import './Filter.css'


export function Filter(props) {
    return (
        <div className="option bool_option">
            <input type="checkbox" name={props.value} value={props.value} onChange={props.onToggle} defaultChecked={props.checked}></input>
            <label htmlFor={props.value}>{props.value}</label>
        </div>
    )
}

export function DateFilter(props) {
    
    return (
        <div className="option date_option">
            <label htmlFor={props.label}>{props.label}</label>
            <input type="date" name={props.label} onChange={props.onToggle} value={props.startvalue}></input>
        </div>
    )
}

export function FilterPanel(props) {
    
    return (
        <div>
            <div>
            {props.options.map((filter, index) => {
                return <Filter key={index} value={filter} onToggle={props.onToggle}></Filter>
            })}
            </div>
        </div>
    )
}