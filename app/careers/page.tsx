import { drupal } from "@/lib/drupal"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { OrganizationCareer } from "@/components/nodes/OrganizationCareer"
import type { Metadata } from "next"
import { isEmpty } from "@/lib/utils"

const slug = 'careers'
const title = 'Careers'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
    description: 'Careers page list',
  }
}

export default async function Careers(props: any) {
  const blocks = await getBlocks(slug, ['header', 'footer_top'])
  const menu = await getBlocks(slug, ['primary_menu'], ['system'])
  const view = await drupal.getView("organizations--page_2")
  const breadcrumb = await getBreadcrumb(slug, 'page_header', title);
  return (
    <>
    <Header blocks={blocks.header} menus={menu?.primary_menu} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full">
        <h1 className="my-4 text-6xl font-black leading-tight text-center">{title}</h1>
        <Breadcrumb breadcrumb={breadcrumb} />
        {!isEmpty(view.results) &&
          <ul className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
          {view.results.map((row: any) => (
            <li key={row.id}>
              <OrganizationCareer node={row}/>
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
