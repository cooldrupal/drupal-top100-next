
export interface PagerLinks {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
  pages: Record<number, string>;
}

export function getPagerLinks(slug: string, current_page: number, total_count: number, page_count: number = 20): PagerLinks {
  const links: PagerLinks = { pages: {} }

  const total_pages = Math.ceil(total_count / page_count)
  const last_page = total_pages - 1

  links.first = `/${slug}`
  links.last = `/${slug}?page=${last_page}`

  if (current_page > 0) {
    const prev_page = current_page - 1
    links.prev = prev_page == 0 ? links.first : `/${slug}?page=${prev_page}`
  }
  if (current_page < last_page) {
    links.next = `/${slug}?page=${current_page + 1}`
  }

  for (let page = 0; page < total_pages; page++) {
    links.pages[page + 1] = page == 0 ? links.first : `/${slug}?page=${page}`
  }

  return links;
}

