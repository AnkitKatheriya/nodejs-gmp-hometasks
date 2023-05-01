const reverseStr = (input) => {
    return input.split('').reverse().join('')
}

const writeToStdout = (output) => {
    process.stdout.write(`${output} \n`)
}

process.stdin.on("data", data => {
    const inputStr = data.toString()
    writeToStdout(reverseStr(inputStr))
})