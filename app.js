const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;
    
    return (
        <div>
            <input ref={node => {
                    input = node;
                }} />
            <button onclick={() => {
                    addTodo(input.value);
                    input.value = '';
                }}>+</button>
        </div>
    );
};

const Todo = ({todo, remove}) => {
    // Each todo
    return (
        <li onClick(remove(todo.id)>
            {todo.text}
        </li>
    );
};

const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
       return (<Todo todo={todo} key={todo.id} remove={remove} />); 
    });
    return (<ul>{todoNode}</ul>);
};

const Title = () => {
    return (
        <div>
            <div>
                <h1>to-do</h1>
            </div>
        </div>
    );
};