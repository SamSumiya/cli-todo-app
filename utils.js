import { randomUUID } from "node:crypto"
import {DEFAULT_CATEGORY} from './config/constants.js'

export function formatInput(input, category = 'General') {
    console.log(DEFAULT_CATEGORY)
    if (!input || !input.trim()) throw new Error('Todo text cannot be empty.');
    
    return {
        id: randomUUID(), 
        category, 
        detail: input.trim(), 
        completed: false, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}



// List All todos
export function formatTodos (todos) {
    const toText = (value, fallback = '  ---') => (value ?? '').toString().trim() || fallback

    const row =  todos.map((todo, i) => {
        const idx = String(i + 1).padStart(3, ' ') 
        const completed =  todo.completed ? '[O]' : '[X]'
        const text = toText(todo.title ?? todo.detail).padEnd(28, ' ') 
        const category = toText(todo.category, 'General')
        const priority = toText(todo?.priority, 'Normal')
        return `${idx}  ${completed}  ${text}  [${category}  |  ${priority}]`;
    })
    const header = '  #  Done  Title                        [ Category | Priority ]'
    const line   = "----------------------------------------------------------------";
    return [header, line, ...row].join('\n')
}