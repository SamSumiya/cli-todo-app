import { access, mkdir, writeFile } from "node:fs/promises";
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