import readline from 'node:readline'; 


const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close()
    } else {
        console.log(
            `You wrote: ${input}`
        )
    }
})