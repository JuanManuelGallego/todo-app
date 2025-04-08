import { Todo } from "../models/todo.models";
import todoStore from '../../store/todo.store'

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) => {
    if (!todo) throw new Error();

    const { id, done, description } = todo;

    // <li class=${done ? "completed" : ""} data-id="${id}">
    const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    if (todo.done) {
        liElement.classList.add('completed');
    }

    // liElement.querySelector('.toggle').addEventListener('click', () => {
    //     todoStore.toggleTodo(todo.id);
    //     if (todo.done) {
    //         liElement.classList.add('completed');
    //     } else{
    //         liElement.classList.remove('completed');
    //     }
    // });

    return liElement;
}