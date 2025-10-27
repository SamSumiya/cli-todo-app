import { writeTodo } from "./crud.js"
import { randomUUID } from 'crypto'



export async function addTodo(input) {
    const formatted = {
        id: randomUUID(), 
        category: 'General', 
        detail: input, 
        completed: false, 
        createAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
    }
    await writeTodo(formatted)
    console.log(`Added new todo ${input} successfully`)
}   

export function changeTodo(input) {
    console.log('change', input)
}

export function listAllTodos() {
    console.log('list all')
}

export function deleteTodo(input) {
    console.log('delete one', input)
}

export function clearAllTodos() {
    console.log('clear all') 
}


