import { Block } from "@/components/drupal/Block"
import { Menu } from "@/components/drupal/Menu"
import Image from "next/image"
import { Link } from "@/components/navigation/Link"

export function Header({ blocks, menus }: any) {
  return (
    <>
    <header className="flex items-center justify-between w-full px-4 py-2">
      <div className="logo">
      <Link href='/'>
        <Image
          src={'/logo.svg'}
          alt={'Home'}
          title={'Home'}
          width={200}
          height={200}
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </Link>
      </div>
      {
        menus?.length &&
        menus.map((menu: any) => (
          <Menu
            key={menu.id}
            menu_id={menu.id}
          />
        ))
      }
    </header>
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
