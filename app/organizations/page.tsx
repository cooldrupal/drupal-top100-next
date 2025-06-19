import { drupal } from "@/lib/drupal"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { OrganizationTeaser } from "@/components/nodes/OrganizationTeaser"
import type { Metadata } from "next"
import { PagerMore } from "@/components/drupal/PagerMore"

const slug = 'organizations'
const title = 'Organizations'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
  }
}

export default async function Organizations({ searchParams }: { searchParams: { [key: string]: string } }) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '0', 10)
  const nextPage = page + 1
  const nextPageUrl = `/${slug}?page=${nextPage}`

  const options = {
    params: {
      page: page
    }
  }
  const view = await drupal.getView("organizations--page_1", options)

  const blocks = await getBlocks(slug, ['header', 'footer_top'])
  const menu = await getBlocks('/', ['primary_menu'], ['system'])

  type BreadcrumbItem = { text: string; url: string };
  const breadcrumb = (await getBreadcrumb(slug, 'page_header')) as BreadcrumbItem[] | undefined;
  if (breadcrumb) {
    breadcrumb.push({ text: title, url: '' });
  }

  return (
    <>
    <Header blocks={blocks.header} menus={menu?.primary_menu} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full">
        <h1 className="my-4 text-6xl font-black leading-tight text-center">{title}</h1>
        <Breadcrumb breadcrumb={breadcrumb} />
        {
          view?.results?.length &&
            <>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {view.results.map((row: any) => (
              <li key={row.id}>
                <OrganizationTeaser node={row}/>
              </li>
            ))}
            </ul>
            <PagerMore url={nextPageUrl} />
            </>
        }
      </main>
    </div>
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
