import { fetchText } from './fetch.mjs'

export type Catalog = Awaited<ReturnType<typeof getCatalog>>

export const getCatalog = async () => {
    console.log('Getting catalog...')

    console.log('Fetching others info...')
    const html = await fetchText('/others')

    const backgroundHtml = extractSegments(html, '<div class="row"')[1]
    const liveBackgroundHtml = extractSegments(backgroundHtml, '<div class="background">')[2]
    return {
        backgrounds: extractSegments(liveBackgroundHtml, '<div class="panel-background">').map(
            (segment) => {
                const image = extractSegment(segment, "bg_view.changeBackground('", "')")
                const thumbnail = extractSegment(segment, 'data-src="', '"')

                if (
                    !image.startsWith('assets/image/background/b_liveback_') ||
                    !image.endsWith('.png')
                )
                    throw image

                return {
                    id: image.substring(35, image.length - 4),
                    imageUrl: `/asset/${image}`,
                    thumbnailUrl: thumbnail,
                }
            }
        ),
    }
}

const extractSegments = (html: string, searchStart: string) => {
    const starts: number[] = []

    let start = html.indexOf(searchStart)
    while (start !== -1) {
        starts.push(start)

        start = html.indexOf(searchStart, start + 1)
    }

    return starts.map((start, index) => html.substring(start, starts[index + 1] || html.length))
}

const extractSegment = (html: string, searchStart: string, searchEnd: string) => {
    const start = html.indexOf(searchStart)
    if (start === -1) throw html

    const end = html.indexOf(searchEnd, start + searchStart.length)
    if (end === -1) throw html

    return html.substring(start + searchStart.length, end)
}
