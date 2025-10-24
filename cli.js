import { addTodo, changeTodo, listAllTodos, deleteTodo, clearAllTodos} from './actions.js';

export const cliCommands = [
    {
        name: 'add', 
        description: 'Add a todo item', 
        handler: addTodo 
    }, 
    { 
        name: 'change',
        description: 'Change an exisitng todo item',
        handler: changeTodo
    }, 
    {
        name: 'list',
        description: 'List all todo items',
        handler: listAllTodos,
    }, 
    {
        name: 'delete', 
        description: 'Delete an todo item by index',
        handler: deleteTodo, 
    }, 
    {
        name: 'clear', 
        description: 'Clear all todos', 
        handler: clearAllTodos 
    }, 
    {
        name: 'exit', 
        description: 'Exit the app',
        handler: () => rl.close()
    }
]