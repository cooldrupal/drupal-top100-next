import { Link } from "@/components/navigation/Link"

export async function Breadcrumb({ breadcrumb }: any, delimiter: string = '/') {
  return (
    <nav aria-label="breadcrumb" className="mb-6 text-center">
      <ul className="flex justify-center space-x-2">
        {breadcrumb?.map((item: any, index: number) => {
          const isLast = index === breadcrumb.length - 1;
          return (
            <li key={index} className="flex items-center">
              {item.url ? (
                <Link href={item.url} className="text-blue-600 hover:underline">
                  {item.text}
                </Link>
              ) : (
                <span className="text-gray-500">{item.text}</span>
              )}
              {!isLast && <span className="mx-2 text-gray-400">{delimiter}</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  )
}
