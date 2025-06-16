import type { JsonApiParams } from "next-drupal"

export function nodesMap(type?: string) {
  const map = {
    'node--article': {
      params: {
        include: "field_image,uid"
      },
    }
  } as Record<string, JsonApiParams>;

  return type ? map[type] : map;
}

