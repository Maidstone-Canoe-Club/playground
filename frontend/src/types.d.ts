export interface GalleryImage {
  fullUrl: string,
  thumbnailUrl: string,
  altText: string
}

export interface NewsItem {
  id: number | undefined,
  title: string,
  content: string,
  slug: string
}

declare module "nuxt-directus"{
  export interface DirectusUser {
    avatar?: string
  }
}