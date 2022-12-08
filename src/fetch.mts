import fetch from 'node-fetch'

export const fetchImage = async (path: string) => {
    const response = await fetch(`https://card.llsif.moe${path}`)
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
}

export const fetchText = async (path: string) => {
    const response = await fetch(`https://card.llsif.moe${path}`)
    return await response.text()
}
