export function menusMap(id?: string) {
  const map = {
    'main': {
      list_class: "flex justify-end gap-4",
      item_class: "px-6 py-2 text-gray-600 text-xl font-bold border-b-2 border-transparent hover:border-orange-600 transition-colors duration-200",
    },
  } as Record<string, any>;

  return id ? map[id] : map;
}

