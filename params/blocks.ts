
export function blocksMap(id?: string) {
  const map = {
    'organizations--block_2': {
      params: {
        include: 'field_logo',
        'views-argument': ['***CURRENT_ID', '***CURRENT_ID'],
      },
      next: {
        revalidate: 3600,
      },
      title: 'Related by badge',
      component: 'RelatedByBadgeBlock',
    }
  } as Record<string, any>;

  return id ? map[id] : map;
}

