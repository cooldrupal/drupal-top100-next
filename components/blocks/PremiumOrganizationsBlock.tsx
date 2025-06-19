import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"

export function PremiumOrganizationsBlock({ block }: any) {
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
        <ul className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rows.map((row: any, index: number) => (
            <li key={index}>
              <Link href={row.path.alias} className="no-underline hover:text-blue-600">
                {row.field_logo && (
                  <Image
                  src={absoluteUrl(row.field_logo.uri.url)}
                  alt={row.field_logo.resourceIdObjMeta.alt || row.title}
                  title={row.field_logo.resourceIdObjMeta.title || row.title}
                  width={200}
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                />
                )}
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
