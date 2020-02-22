export interface IProfile {
    displayName: string,
    username: string,
    image: string,
    bio: string,
    photos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean
}