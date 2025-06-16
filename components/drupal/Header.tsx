import { Block } from "@/components/drupal/Block"
import { Menu } from "@/components/drupal/Menu"

export function Header({ blocks, menus }: any) {
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
    <header>
      {
        blocks?.length &&
        blocks.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </header>
    </>
  )
}
