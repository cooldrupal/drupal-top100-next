
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
    },
    'badges--block_1': {
      params: {
        include: 'field_logo',
      },
      next: {
        revalidate: 3600,
      },
      title: 'Badges',
      component: 'BadgesBlock',
    },
    'organizations--block_1': {
      params: {
        include: 'field_logo',
      },
      next: {
        revalidate: 3600,
      },
      component: 'PremiumOrganizationsBlock',
    },
    'countries--block_1': {
      title: 'Countries',
      component: 'CountriesBlock',
    }
  } as Record<string, any>;

  return id ? map[id] : map;
}

