import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"

export function CountriesBlock({ block }: any) {
  const options = blocksMap(block.block_id)

  if (block.provider === 'views') {
    const rows = block.results;
    if (!rows || rows.length === 0) {
      return null
    }

    return (
      <>
        <div className="mb-6">
        {options?.title && <h2 className="text-xl pb-2 mb-2">{options?.title}</h2>}
        <ul className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
          {rows.map((row: any, index: number) => (
            <li key={index}>
              <Link href={row.path.alias} className="no-underline hover:text-gray-600 text-orange-600" >
                {row.name}
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </>
    )
  }

  return null
}
