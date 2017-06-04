const React = require('react');
const ReactDOM = require('react-dom');

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;
    let dueDate;
    
    return (
    <div className="row add-task">
        <div className="col-md-6"><input ref={node => {
            input = node;
        }} type="text" className="form-control" /></div>
        <div className="col-md-4"><input ref={node => {
            dueDate = node;
        }} type="text" className="form-control" data-provide="datepicker" data-date-autoclose="true" data-date-format="M d" /></div>
        <div className="col-md-2"><button onClick={() => {
            addTodo(input.value, dueDate.value);
            input.value = '';
            dueDate.value = '';
          }} type="submit" className="btn btn-primary">
            Add task
        </button></div>
    </div>
  );
};

const Todo = ({todo, remove}) => {
    // Each todo
    return (
        <div className="row todo-item">
            <div className="col-md-8 task-wrapper">
                <span onClick={() => {remove(todo.id)}} className="todo-check"><span className="glyphicon glyphicon-ok checkmark"></span></span>
                <span className="task-title">{todo.text}</span>
            </div>
            <div className="col-md-4 task-due-date">{todo.date}</div>
        </div>
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
        this.apiUrl = 'https://59331b4766fd6e0011df0d21.mockapi.io/todos'
    }
    // Lifecycle method
    componentDidMount() {
        // Make HTTP request with Axios
        axios.get(this.apiUrl)
            .then((res) => {
                // Set state with result
                this.setState({ data: res.data });
        });
    }
    // Add todo handler
    addTodo(val, dueDate){
        // Assemble data
        const todo = {text: val, date: dueDate};
        // Update data
        axios.post(this.apiUrl, todo)
            .then((res) => {
                this.state.data.push(res.data);
                this.setState({ data: this.state.data });
        });
    }
    // Handle remove
    handleRemove(id){
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });
        // Update state with filter
        axios.delete(this.apiUrl+'/'+id)
            .then((res) => {
                this.setState({data: remainder});
        });
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