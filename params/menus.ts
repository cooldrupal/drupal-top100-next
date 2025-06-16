import { Container } from "postcss";

export function menusMap(id?: string) {
  const map = {
    'main': {
      container_class: "w-full flex justify-end",
      list_class: "flex flex-wrap gap-4 md:flex-nowrap",
      item_class: "inline-flex items-center px-6 py-2 rounded-full hover:bg-gray-100",
    },
    'header': {
      container_class: "w-full flex justify-end",
      list_class: "flex flex-wrap gap-4 md:flex-nowrap justify-start",
      item_class: "inline-flex items-center px-6 py-2 hover:bg-gray-200",
    },
  } as Record<string, any>;

  return id ? map[id] : map;
}

