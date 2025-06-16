import { drupal } from "@/lib/drupal"
import { nodesMap } from "@/params/nodes"
import { getPathFromSlug } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"

export async function getNode(slug: string[]) {
  const path = getPathFromSlug(slug)

  const translatedPath = await drupal.translatePath(path)
  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid
  const params = nodesMap(type)?.params ?? {}

  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

