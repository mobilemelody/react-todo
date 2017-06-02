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