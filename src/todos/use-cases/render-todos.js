import { Todo } from "../models/todo.models"
import { createTodoHtml } from "./create-todo-html";


let element;

/**
 * Display todos on screen
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    if(!element){
        element = document.querySelector(elementId);
    }

    if(!element) throw new Error();

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHtml(todo));
    });
}