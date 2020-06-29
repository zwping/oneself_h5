export function stime(second) {
    second = Number(second.toString().padEnd(13, '0'))
    let d = new Date(second)
    return `
    ${d.getFullYear()}-${__f(d.getMonth() + 1)}-${__f(d.getDate())} 
    ${__f(d.getHours())}:${__f(d.getMinutes())}:${__f(d.getSeconds())}
    `.trim()
}

function __f(d) {
    return d.toString().padStart(2, '0')
}
