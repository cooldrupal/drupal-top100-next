import { drupal } from "@/lib/drupal"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { OrganizationTeaser } from "@/components/nodes/OrganizationTeaser"
import type { Metadata, ResolvingMetadata } from "next"

const slug = 'organizations'
const title = 'Organizations'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
  }
}

export default async function Organizations(props: any) {
  const blocks = await getBlocks(slug, ['header', 'footer_top'])
  const menu = await getBlocks('/', ['primary_menu'], ['system'])

  const view = await drupal.getView("organizations--page_1")

  type BreadcrumbItem = { text: string; url: string };
  const breadcrumb = (await getBreadcrumb(slug, 'page_header')) as BreadcrumbItem[] | undefined;
  if (breadcrumb) {
    breadcrumb.push({ text: title, url: '' });
  }

  return (
    <>
    <Header blocks={blocks.header} menus={menu?.primary_menu} />
    <Breadcrumb breadcrumb={breadcrumb} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full">
        <h1 className="mb-4 text-6xl font-black leading-tight">Organizations</h1>
        {
          view?.results?.length &&
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {view.results.map((row: any) => (
              <li key={row.id}>
                <OrganizationTeaser node={row}/>
              </li>
            ))}
            </ul>
        }
      </main>
    </div>
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
