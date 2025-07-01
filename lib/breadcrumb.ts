import { getBlocks } from "@/lib/decoupled_kit"
import { getApiVersion } from "@/lib/decoupled_kit"
import { drupal } from "@/lib/drupal"

type BreadcrumbItem = { text: string; url: string };

export async function getBreadcrumb(path: string | string[], region: string = 'breadcrumb', title_item: string = ''):
  Promise<BreadcrumbItem[] | null | undefined> {
  let breadcrumb = null
  const apiVersion = getApiVersion()

  if (apiVersion === 1) {
    // Need to install Decoupled breadcrumb module.
    const drupalBase = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    const apiUrl = `${drupalBase}/decoupled_kit/breadcrumb?path=${path}`

    let data = null
    try {
      const res = await drupal.fetch(apiUrl)

      if (!res.ok) {
        console.error(`Empty fetched applications "${apiUrl}"`);
        return null
      }
      data = await res.json();
    }
    catch (error) {
      console.error(`Error getting API "${apiUrl}"`, error);
      return null
    }

    breadcrumb = Object.values(data.data).map(item => {
      const i = item as { title: string; link?: string };
      return {
        text: i.title,
        url: i.link ?? '',
      };
    });
  }
  else {
    const breadcrumb_blocks = await getBlocks(path, [region], ['system'])
    breadcrumb = Object.values(breadcrumb_blocks)[0] ?? null;
    if (breadcrumb) {
      breadcrumb = Object.values(breadcrumb)[0].breadcrumb ?? null
    }
  }

  if (title_item) {
    breadcrumb?.push({ text: title_item, url: '' });
  }

  return breadcrumb
}

