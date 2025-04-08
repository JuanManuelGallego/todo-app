import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { renderPending, renderTodos } from './use-cases'

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '.new-todo',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count'
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getSelectedFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCount)
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    const btnClearCompleted = document.querySelector(ElementIDs.ClearCompleted);
    const newTodoDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    btnClearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    newTodoDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value)
        displayTodos();
        event.target.value = '';
    });


    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if (!element || !event.target.classList.contains('destroy')) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.innerHTML) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;

                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;

                default:
                    break;
            }
            displayTodos();
        });
    })
}   