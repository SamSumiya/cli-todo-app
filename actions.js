import { writeTodo, readTodos, writeAllTodos } from "./crud.js"
import { formatInput, formatTodos } from './utils.js'

export async function addTodo(input) {
    try {
        const formatted = formatInput(input) 
        await writeTodo(formatted)
        console.log(`✅ Added new todo: "${formatted.detail}" in [${formatted.category}] category!`) 
    } catch(err) {
        console.log(`⚠️ ${err.message} ??`)
    }
}   

export async function addAllTodos(input) {
    try {
        await writeAllTodos(input)
    } catch(err) {
        console.log(err?.message)
    }
}

export async function changeTodo(input) {
}

export async function listAllTodos() {
    const todos = await readTodos()
    try {   
        if (!todos || todos.length === 0) {
            console.log("No todos found.")
            return 
        } 
        console.log(formatTodos(todos))
    } catch(err) {
        console.log("Error listing todos: ", err.message)
    }
}

export async function deleteTodo(input) {
    try {
        const todos = await readTodos() 
        console.log(todos)
    }
}

export function clearAllTodos() {
    console.log('clear all') 
}


