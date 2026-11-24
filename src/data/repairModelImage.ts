export function repairModelImage(slug: string) {
  return slug.startsWith('iphone-') ? `/devices/repair/${slug}.webp` : `/devices/models/${slug}.jpg`;
}
