import { fetchImage } from '../fetch.mjs'

export type BackgroundResources = Awaited<ReturnType<typeof getBackgroundResources>>

export const getBackgroundResources = async (
    id: string,
    imageUrl: string,
    thumbnailUrl: string
) => {
    const name = id
    console.log('Getting background', name, 'resources...')

    console.log('Fetching assets...')
    const [image, thumbnail] = await Promise.all([fetchImage(imageUrl), fetchImage(thumbnailUrl)])

    return {
        name,

        image,
        thumbnail,
    }
}
