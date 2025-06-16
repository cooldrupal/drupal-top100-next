
export function blocksMap(id?: string) {
  const map = {
    'articles--block_1': {
      params: {
        include: 'field_image,uid',
      },
      next: {
        revalidate: 3600,
      },
      title: 'Latest articles',
    },
    'articles--block_2': {
      params: {
        include: 'field_image,uid',
      },
      next: {
        revalidate: 3600,
      },
      title: 'Related articles',
      component: 'BlueBlock',
    },
    'homepage': {
      'title': 'Info',
    }
  } as Record<string, any>;

  return id ? map[id] : map;
}

