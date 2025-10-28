import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

import { DATA_PATH } from "./config/constants.js"; 

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


export async function writeAllTodos(todos) {
    try {
        await writeFile(DATA_PATH, JSON.stringify(todos, null, 2), 'utf-8')
    } catch(err) {
       console.log(err)
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
        await writeFile(dataFile, JSON.stringify(todos, null, 2), 'utf8')
    } catch(err) {
        console.error(err)
    }
}


export async function readTodos() {
    try {
        const rawFile = await readFile(DATA_PATH, 'utf8')
        const todos = JSON.parse(rawFile)
        return todos 
    } catch(err) {
        console.log(err?.message)
        if (err.code === 'ENOENT') {
            console.log('Creating file...')
            await initiateFile()
            return [] 
        } else if (err.code === 'EACCES' || err.code === 'EPERM') {
            console.log('ACCESS DENIED: forbidden access to ', DATA_PATH)
            return [] 
        }
        throw err
    }
}
