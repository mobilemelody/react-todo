const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;
    
    return (
    <div className="input-group">
        <input ref={node => {
            input = node;
        }} type="text" className="form-control" />
        <span className="input-group-btn">
            <button onClick={() => {
                addTodo(input.value);
                input.value = '';
              }} className="btn btn-primary">
                Add task
            </button>
        </span>
    </div>
  );
};

const Todo = ({todo, remove}) => {
    // Each todo
    return (
        <a onClick={() => {remove(todo.id)}} className="list-group-item">
            <span className="glyphicon glyphicon-ok-circle todo-check" aria-hidden="true"></span>
            {todo.text}
        </a>
    );
};

const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
       return (<Todo todo={todo} key={todo.id} remove={remove} />); 
    });
    return (<ul className="list-group">{todoNode}</ul>);
};

const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h1>to-do <span className="badge">{todoCount}</span></h1>
            </div>
        </div>
    );
};

// Container Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component{
    constructor(props){
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            data: []
        }
    }
    // Add todo handler
    addTodo(val){
        // Assemble data
        const todo = {text: val, id: window.id++}
        // Update data
        this.state.data.push(todo);
        // Update state
        this.setState({data: this.state.data});
    }
    // Handle remove
    handleRemove(id){
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });
        // Update state with filter
        this.setState({data: remainder});
    }
    
    render() {
        // Render JSX
        return (
            <div>
                <Title todoCount={this.state.data.length} />
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)} />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('container'));