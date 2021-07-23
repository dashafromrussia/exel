// pure functions
export function capitolize(string) {
if (typeof string !== 'string') {
    return
}
return string.charAt(0).toUpperCase() + string.slice(1)
}
