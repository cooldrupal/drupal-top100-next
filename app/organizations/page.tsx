import { drupal } from "@/lib/drupal"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { getPagerLinks } from "@/lib/pager"
import { OrganizationTeaser } from "@/components/nodes/OrganizationTeaser"
import type { Metadata } from "next"
import { PagerMore } from "@/components/drupal/PagerMore"
import { PagerFull, PagerMini } from "@/components/drupal/Pager"
import { isEmpty } from "@/lib/utils"

const slug = 'organizations'
const title = 'Organizations'

type ViewPageParams = {
  slug: string[]
}

type ViewPageProps = {
  params: Promise<ViewPageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
    description: 'Drupal organizations',
  }
}

export default async function Organizations(props: ViewPageProps) {
  const searchParams = await props.searchParams
  const page = parseInt(searchParams?.page?.toString() || '0')

  const view = await drupal.getView("organizations--page_1", {params: { page: page }})
  const pagerLinks = getPagerLinks(slug, page, view.meta.count)

  const blocks = await getBlocks(slug, ['header', 'footer_top'])
  const menu = await getBlocks(slug, ['primary_menu'], ['system'])

  const breadcrumb = await getBreadcrumb(slug, 'page_header', title)

  return (
    <>
    <Header blocks={blocks.header} menus={menu?.primary_menu} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full">
        <h1 className="my-4 text-6xl font-black leading-tight text-center">{title}</h1>
        <Breadcrumb breadcrumb={breadcrumb} />
          {!isEmpty(view.results) && (
            <>
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {view.results.map((row: any) => (
                  <li key={row.id}>
                    <OrganizationTeaser node={row} />
                  </li>
                ))}
              </ul>
              <PagerMini links={pagerLinks} page={page} />
            </>
          )}
      </main>
    </div>
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
