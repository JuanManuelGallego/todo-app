import { Todo } from "../todos/models/todo.models";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Mind Stone'),
        new Todo('Power Stone'),
        new Todo('Reality Stone'),
        new Todo('Soul Stone'),
        new Todo('Space Stone'),
        new Todo('Time Stone'),
    ],

    filter: Filters.All
}


const initStore = () => {
    console.log(state);
    console.log('InitStore 🥑');
}

const loadStore = () => {
    throw new Error('Not implemented');
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [ ...state.todos ];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

const addTodo = (description) => {
    if (!description) throw new Error('description is required');
    state.todos.push(new Todo(description));
}

const toggleTodo = (todoId) => {   
    state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = () => {
    console.log('delete');
    
    state.todos = state.todos.filter(todo => !todo.done);
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
}

const getSelectedFilter = () => {
    return state.filter.toString();
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getSelectedFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}