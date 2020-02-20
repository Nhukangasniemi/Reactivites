export interface IProfile {
    displayName: string,
    userName: string,
    image: string,
    bio: string,
    photos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean
}