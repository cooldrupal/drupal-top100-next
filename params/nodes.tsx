import type { JsonApiParams } from "next-drupal"

export function nodesMap(type?: string) {
  const map = {
    'node--organization': {
      params: {
        include: "field_logo,field_countries,field_partner,field_partner.field_logo"
      },
    }
  } as Record<string, JsonApiParams>;

  return type ? map[type] : map;
}

