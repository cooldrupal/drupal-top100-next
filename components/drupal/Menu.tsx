import { getMenu } from "next-drupal"
import { menusMap } from "@/params/menus";
import { Link } from "@/components/navigation/Link"

export async function Menu({menu_id, list_class='', item_class = ''}: any) {
  const id = menu_id.includes(':') ? menu_id.split(':')[1] : menu_id

  let menu
  try {
    menu = await getMenu(id)
  }
  catch (error) {
    console.error(`Error getting menu "${id}": `, error)
    return null
  }

  const options = menusMap(id);

  return (
    <nav className={`menu ${id}`}>
      <ul className={options?.list_class}>
      {menu?.items?.map((item) => {
        return (
          <li key={item.id}>
            <Link
              href={item.url}
              className={options?.item_class}
            >
              {item.title}
            </Link>
          </li>
        )
      })}
    </ul>
    </nav>
  )
}
