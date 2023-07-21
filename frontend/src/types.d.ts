
export enum RecurringType {
  Daily = 0,
  Weekly,
  Monthly,
  Yearly
}

export interface RecurringEventPattern{
  eventId?: number,
  type: RecurringType,
  separation_count?: number,
  max_occurrences?: number,
  day_of_week?: number,
  week_of_month?: number,
  day_of_month?: number,
  month_of_year?: number,
}

export interface EventItem {
  id?: number,
  title: string,
  location?: string,
  description?: string,
  start_date: Date,
  end_date?: Date,
  is_full_day: boolean,
  is_recurring: boolean
  has_multiple: boolean,
  // recurring_pattern: RecurringEventPattern,
  parent_event_id?: number,
  user_created?: string,
  date_created?: string,

  max_attendees?: number,
  price?: number
}

export interface EventDate {
  id: number,
  start_date?: Date,
  end_date?: Date,
}

export interface RecurringEvent {
  startDate: Date,
  recurringType: string,
  maxOccurrences?: number
}

export interface EventDates {
  multiple?: EventDate[]
  recurring?: RecurringEvent
}

export interface GalleryImage {
  fullUrl: string,
  thumbnailUrl: string,
  altText: string,
}

export interface PhotoGallery {
  id?: string
  name?: string,
  description?: string,
  location?: string,
  gallery_folder?: string
  date_created?: string,
  user_created?: {
    first_name: string
    last_name: string
  }
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
