import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

 
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const dataFolder = join(__dirname, 'data')
const dataFile = join(dataFolder, 'data.json')


export async function initiateFile() {
    try {
        await access(dataFile)
        console.log(`${basename(dataFile)} already exists - you are good to go!`)
    } catch {
        await mkdir(dataFolder, { recursive: true})
        await writeFile(dataFile, JSON.stringify([]),  'utf8') 
        console.log(`${basename(dataFile)} file was created in ${basename(dataFolder)} folder successfully`)
    }
}

export async function writeTodo(input) {

    let rawData; 
    try {
        rawData = await readFile(dataFile, 'utf8')
    } catch {
        console.warn('Failed to read file, resetting file')
        rawData = '[]'
    }

    let todos;
    try {
        todos = JSON.parse(rawData)
        
        if (!Array.isArray(todos)) {
            console.warn('Todos data format is not array, resetting it back to array')
            todos = [] 
        }
    } catch {
        console.warn('Invalid JSON format: resetting todos')
        todos = [] 
    }

    todos.push(input) 
    
    try {   
        await writeFile(dataFile, JSON.stringify(todos), 'utf8')
    } catch(err) {
        console.error(err)
    }
}