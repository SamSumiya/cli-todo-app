import { writeTodo } from "./crud.js"
import { randomUUID } from 'crypto'
import { formatInput } from './utils.js'

export async function addTodo(input) {
    const formatted = formatInput(input)
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


