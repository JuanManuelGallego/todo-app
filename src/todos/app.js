import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos } from './use-cases'

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '.new-todo',
    ClearCompleted: '.clear-completed',
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getSelectedFilter());
        renderTodos(ElementIDs.TodoList, todos);
    }


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    
    const btnClearCompleted =  document.querySelector(ElementIDs.ClearCompleted);
    btnClearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    const newTodoDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    newTodoDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value)
        displayTodos();
        event.target.value = '';
    });

    const todoListUL = document.querySelector(ElementIDs.TodoList);
    todoListUL.addEventListener('click', (event) => {
        // if(event.target)
        console.log(event.target);
        
    });
}   