import { drupal } from "@/lib/drupal"
import { getPathFromSlug } from "@/lib/utils"
import { blocksMap } from "@/params/blocks"

/*
  Need to install decoupled_kit_block and JSON:API Views drupal modules.
*/

export function getApiVersion() {
  const apiVersion = parseInt(process.env.DECOUPLED_KIT_API_VERSION ?? '1', 10)
  return apiVersion
}

function getBlocksUrl(path: string | string[], regions: string[] = []) {
  if (Array.isArray(path)) {
    path = getPathFromSlug(path)
  }

  const drupalBase = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
  const currentTheme = process.env.DECOUPLED_KIT_CURRENT_THEME
  const apiVersion = getApiVersion()

  const apiUrl =
    apiVersion === 1
      ? (() => {
        let url = `${drupalBase}/decoupled_kit/block?path=${path}&mode=link`
        if (regions.length > 0) {
          const regionParam = regions.join(',')
          url += `&regions=${regionParam}`
        }
        return url;
      })()
      : (() => {
        let url = `${drupalBase}/jsonapi/decoupled_kit/blocks?current_path=${path}`
        if (regions.length > 0) {
          const regionParam = regions.join(',')
          url += `&selected_regions=${regionParam}`
        }
        if (currentTheme) {
          url += `&current_theme=${currentTheme}`
        }
        return url
      })();

  return apiUrl
}

async function getBlocksList(path: string | string[], regions: string[], providers: string[]) {
  const apiUrl = getBlocksUrl(path, regions)

  let blocksList = null
  try {
    const res = await drupal.fetch(apiUrl)

    if (!res.ok) {
      console.error(`Empty fetched applications "${apiUrl}"`);
      return null
    }
    blocksList = await res.json();
  }
  catch (error) {
    console.error(`Error getting API "${apiUrl}"`, error);
    return null
  }

  if (!blocksList) {
    console.warn('Empty block list')
    return null
  }

  const apiVersion = getApiVersion()

  const filteredBlocks = apiVersion === 1
    ? Object.values(blocksList.data)
      .filter((block: any) => providers.includes(block.settings?.provider))
    : Object.values(blocksList.data)
      .filter((block: any) => providers.includes(block.attributes.settings?.provider))

  if (apiVersion === 1) {
    const blocks = filteredBlocks
      .map((block: any) => {
        const [typePart, uuid] = block.plugin.split(':');
        const type = block.bundle ? `${block.settings.provider}--${block.bundle}` : block.settings.provider

        return {
          region: block.region,
          label: block.label,
          uuid,
          type: type,
          plugin: block.plugin,
          provider: block.settings.provider,
          settings: block.settings,
        }
      })

    return blocks
  }
  else {
    const blocks = filteredBlocks
      .map((block: any) => {
        let label, type, uuid, provider
        if (block.attributes.dependencies.content) {
          const content = block.attributes.dependencies.content[0]
          const [typePart, bundlePart, uuidPart] = content.split(':')
          uuid = uuidPart
          type = `${typePart}--${bundlePart}`
          label = block.attributes.settings.label
          provider = typePart
        }
        else {
          const [typePart, uuidPart] = block.attributes.plugin.split(':')
          uuid = uuidPart
          type = block.attributes.settings.provider
          label = block.attributes.settings.label.length ?
            block.attributes.settings.label : block.attributes.plugin
          provider = block.attributes.settings.provider
        }

        return {
          region: block.attributes.region,
          label: label,
          uuid,
          type,
          plugin: block.attributes.plugin,
          provider: block.attributes.settings.provider,
          settings: block.attributes.settings,
        };
      });

    return blocks
  }

  return null
}

export async function getBlocks(
  path: string | string[],
  regions: string[] = [],
  providers: string[] = ['block_content', 'views'],
  params: Record<string, any> | null = null,
) {
  const blocksList = await getBlocksList(path, regions, providers)
  if (!blocksList) {
    return null
  }

  const blocks = await Promise.all(
    blocksList.map(async (block) => {
      try {
        if (block.provider === 'block_content') {
          const blockResource = await drupal.getResource(block.type, block.uuid)
          return {
            ...blockResource,
            region: block.region,
            provider: block.provider,
            block_id: block.label
          }
        }
        else if (block.provider === 'views') {
          const viewId = block.plugin.replace(/^views_block:/, "").replace("-", "--")
          const options = blocksMap(viewId)

          if (params) {
            if (Array.isArray(options.params['views-argument'])) {
              options.params['views-argument'] = options.params['views-argument'].map(value => {
                if (typeof value === 'string' && value.startsWith('***')) {
                  const key = value.slice(3).toLowerCase();
                  return params[key as keyof typeof params] ?? value;
                }
                return value;
              });
            }
          }

          const view = await drupal.getView(viewId, options)
          return {
            ...view,
            region: block.region,
            provider: block.provider,
            block_id: viewId
          }
        }
        else {
          return {
            ...block.settings,
            region: block.region,
            provider: block.provider,
            block_id: block.label
          }
        }
      }
      catch (error) {
        console.error(`Error getting block "${block.label}" ID ${block.uuid}:`, error)
        return null
      }
    })
  );

  if (!blocks) {
    return null
  }

  return groupByRegion(blocks)
}

function groupByRegion(items: any) {
  return items.reduce((acc: any, item: any) => {
    const region = item.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
}
