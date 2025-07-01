import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import { drupal } from "@/lib/drupal"
import { getNode } from "@/lib/node"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { Block } from "@/components/drupal/Block"
import { Node, getNodeTypes } from "@/components/drupal/Node"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { OrganizationTeaser } from "@/components/nodes/OrganizationTeaser"

export async function generateMetadata(
  props: NodePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params

  const { slug } = params

  let node
  try {
    node = await getNode(slug)
  } catch (e) {
    // If we fail to fetch the node, don't return any metadata.
    return {}
  }

  return {
    title: node.title ?? node.name,
  }
}

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: Promise<NodePageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const RESOURCE_TYPES = getNodeTypes()

export async function generateStaticParams(): Promise<NodePageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(
    RESOURCE_TYPES,
    {
      // The pathPrefix will be removed from the returned path segments array.
      // pathPrefix: "/blog",
      // The list of locales to return.
      // locales: ["en", "es"],
      // The default locale.
      // defaultLocale: "en",
    }
  )

  return resources.map((resource) => {
    // resources is an array containing objects like: {
    //   path: "/blog/some-category/a-blog-post",
    //   type: "node--article",
    //   locale: "en", // or `undefined` if no `locales` requested.
    //   segments: ["blog", "some-category", "a-blog-post"],
    // }
    return {
      slug: resource.segments
    }
  })
}

export default async function NodePage(props: NodePageProps) {
  const params = await props.params
  const { slug } = params

  const breadcrumb = await getBreadcrumb(slug, 'page_header');

  let node
  try {
    node = await getNode(slug)
  } catch (error) {
    notFound()
  }

  let view
  const taxonomies = ['taxonomy_term--partner', 'taxonomy_term--countries']
  if (taxonomies.includes(node.type)) {
    const options = {
      params: {
        'views-argument': [node.drupal_internal__tid]
      }
    }
    view = await drupal.getView("taxonomy_term--page_1", options)

    breadcrumb?.push({ text: 'Organizations', url: '/organizations' });
  }

  const blocks = await getBlocks(slug, ['sidebar_second', 'header', 'footer_top'],
    ['block_content', 'views'], { 'current_id': node.drupal_internal__nid }
  )
  const menu = await getBlocks(slug, ['primary_menu'], ['system'])

  breadcrumb?.push({ text: node.title ?? node.name, url: '' });

  return (
    <>
    <Header blocks={blocks?.header} menus={menu?.primary_menu} />
    <h1 className="mb-4 text-6xl font-black leading-tight text-center">{node.title ?? node.name}</h1>
    <Breadcrumb breadcrumb={breadcrumb} />
    {view ? (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {view.results.map((row: any) => (
          <li key={row.id}>
            <OrganizationTeaser node={row} />
          </li>
        ))}
      </ul>
      ) : (
        <div className="flex flex-col md:flex-row gap-12">
          <main className="w-full md:w-2/3">
            <Node node={node} />
          </main>

          <aside className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
            {blocks?.sidebar_second?.length &&
              blocks.sidebar_second.map((block: any) => (
                <div key={block?.block_id}>
                  <Block block={block} />
                </div>
              ))
            }
          </aside>
        </div>
      )
    }
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
