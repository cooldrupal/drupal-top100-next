export function menusMap(id?: string) {
  const map = {
    'main': {
      list_class: "flex flex-wrap sm:flex-nowrap gap-4 w-full sm:w-auto",
      item_class: "w-1/2 sm:w-auto",
      link_class: "block px-6 py-2 text-gray-600 text-xl font-bold border-b-2 border-transparent hover:border-orange-600 transition-colors duration-200",
    },
  } as Record<string, any>;

  return id ? map[id] : map;
}

