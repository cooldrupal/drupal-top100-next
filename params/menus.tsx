export function menusMap(id?: string) {
  const map = {
    'main': {
      list_class: "flex flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-4 w-full sm:w-auto text-center",
      item_class: "w-1/2 sm:w-auto",
      link_class: "block px-6 py-2 text-gray-600 text-xl font-bold border-b-2 border-transparent hover:border-orange-600 hover:text-orange-600 transition-all duration-200",
    },
  } as Record<string, any>;

  return id ? map[id] : map;
}

