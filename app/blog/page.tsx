import { drupal } from "@/lib/drupal"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { Block } from "@/components/drupal/Block"
import { ArticleTeaser } from "@/components/nodes/ArticleTeaser"

export default async function Blog(props: any) {
  const slug = 'blog'

  const blocks = await getBlocks(slug, ['sidebar', 'header', 'footer_top'])
  const breadcrumb = await getBreadcrumb(slug)
  const view = await drupal.getView("articles--page_1")

  return (
    <>
    <Header blocks={blocks.header} />
    <Breadcrumb breadcrumb={breadcrumb} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full md:w-2/3">
        <h1 className="mb-4 text-6xl font-black leading-tight">Articles</h1>
        {
          view?.results?.length &&
            <ul>
            {view.results.map((row: any) => (
              <li key={row.id}>
                <ArticleTeaser node={row}/>
              </li>
            ))}
            </ul>
        }
      </main>

      <aside className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
      {
        blocks?.sidebar?.length &&
        blocks.sidebar.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
      </aside>
    </div>
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
