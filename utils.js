import { randomUUID } from "node:crypto"

export function formatInput(input, category = 'General') {
    
    return {
        id: randomUUID(), 
        category, 
        todo: input, 
        completed: false, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}