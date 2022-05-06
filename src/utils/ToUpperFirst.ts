const ToUpperFirst = (_: string | undefined): string | null => {
    if (_) {
        return _.toLowerCase().split(' ').map((val: string) => val.charAt(0).toUpperCase() + val.slice(1)).join(' ').split('_').join(' ')
    }
    return null
}
export default ToUpperFirst
