export function repairModelImage(slug: string) {
  if (slug === 'iphone-17-pro-max' || slug === 'iphone-17-pro') {
    return `/devices/models/${slug}.webp`;
  }
  return slug.startsWith('iphone-') ? `/devices/repair/${slug}.webp` : `/devices/models/${slug}.jpg`;
}
