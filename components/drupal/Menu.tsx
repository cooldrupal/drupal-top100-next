import { getMenu } from "next-drupal"
import { menusMap } from "@/params/menus";
import { Link } from "@/components/navigation/Link"

export async function Menu({menu_id, container_class='', list_class='', item_class = ''}: any) {
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
    <div className="w-full sm:w-auto">
      <nav className={`menu_${id}`}>
        <ul className={options?.list_class}>
        {menu?.items?.map((item) => {
          return (
            <li key={item.id} className={options?.item_class}>
              <Link
                href={item.url}
                className={options?.link_class}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
    </div>
  )
}
