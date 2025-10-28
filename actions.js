import { writeTodo, readTodos, writeAllTodos } from "./crud.js"
import { formatInput, formatTodos } from './utils.js'
import inquirer from "inquirer"

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

export async function deleteTodo() {
    try {
        const todos = await readTodos() 
        
        if (!todos || todos?.length === 0 ) {
            console.log("No todos found.");
            return;
        } 

        const choices = todos.map((t, i) => {
            const text = t.todo ?? t.detail ?? '( No Text )'
            const cat = t.category ? ` [${t.category}]`: ''  
            const box = t.completed ? '[x]' : '[ ]'
            return {
                name: `${i + 1}. ${box} ${text}${cat}`, value: i, short: text
            }
        });

        const pageSize = Math.min(process.stdout.rows ? 
            Math.max(6, process.stdout.rows - 6) : 12, 
            choices.length
        )

        const { idx } = await inquirer.prompt([
            {
                type: 'list',
                name: 'idx',
                message: 'Select a todo to delete (↑/↓, Enter)', 
                choices, 
                pageSize
            }
        ])

        const text =  todos[idx].todo ?? todos[idx].detail ?? '(No Text)'

        const { confirm } = await inquirer.prompt([
            { 
                type: 'confirm',
                name: 'confirm',
                default: false, 
                message: `Delete ${text} ?`
            }
        ])

        if (!confirm) {
            console.log("Cancelled.");
            return;
        }

        const [removed] = todos.splice(idx, 1)
        await writeAllTodos(todos)
        
        console.log(`🗑️ Deleted "${removed.todo ?? removed.detail ?? '(No Text)'}" successfully.`)
        } catch (err) {
            console.log('Error deleting todo: ', err.message)
        }
}

export function clearAllTodos() {
    console.log('clear all') 
}


