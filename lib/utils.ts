import { type Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  titleDefault = 'Snapvibe',
  titleTemplate = '%s | Snapvibe',
  description = 'Snapvibe is a visually stunning platform for sharing moments, connecting with friends, and exploring the world through photos and videos.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
}: {
  titleDefault?: string
  titleTemplate?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title: {
      default: titleDefault,
      template: titleTemplate,
    },
    description,
    openGraph: {
      title: {
        default: titleDefault,
        template: titleTemplate,
      },
      description,
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: titleDefault,
        template: titleTemplate,
      },
      description,
      ...(image && {
        card: 'summary_large_image',
        images: [image],
      }),
      creator: '@abdtriedcoding',
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  }
}
