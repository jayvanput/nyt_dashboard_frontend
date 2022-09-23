import './Filter.css'


export function Filter(props) {
    return (
        <div class="option bool_option">
            <input type="checkbox" name={props.value} value={props.value} onChange={props.onToggle}></input>
            <label htmlFor={props.value}>{props.value}</label>
        </div>
    )
}

export function DateFilter(props) {
    return (
        <div class="option date_option">
            <label htmlFor={props.value}>{props.value}</label>
            <input type="date" name={props.value} onChange={props.onToggle}></input>
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