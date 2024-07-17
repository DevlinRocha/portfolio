export function slug(string: string) {
    return string
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
}
