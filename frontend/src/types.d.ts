export interface GalleryImage {
  fullUrl: string,
  thumbnailUrl: string,
  altText: string
}

export interface PhotoGallery {
  id?: string
  name?: string,
  description?: string,
  location?: string,
  gallery_folder?: string
  date_created?: string,
  user_created?: string
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