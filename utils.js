import { randomUUID } from "node:crypto"

export function formatInput(input, category = 'General') {
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