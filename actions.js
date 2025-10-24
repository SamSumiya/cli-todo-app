import { writeFile } from "node:fs/promises"

import { writeTodo } from "./crud.js"


export function addTodo(input) {
    writeTodo(input)
    return input
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


