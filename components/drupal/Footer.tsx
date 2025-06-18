import { Block } from "@/components/drupal/Block"
import { Menu } from "@/components/drupal/Menu"

export function Footer({ blocks, menus }: any) {
  return (
    <>
    {
      menus?.length &&
      menus.map((menu: any) => (
        <Menu
          key={menu.id}
          menu_id={menu.id}
        />
      ))
    }
    <footer>
      {
        blocks?.length &&
        blocks.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
      <section id="footer-bottom-last">
        <div className="copyright text-center py-2 text-gray-400 bg-slate-800">
          © {new Date().getFullYear()} Drupal Top 100, All rights reserved.
        </div>
      </section>
    </footer>
    </>
  )
}
