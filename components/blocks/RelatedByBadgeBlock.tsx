import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"

export function RelatedByBadgeBlock({ block }: any) {
  const options = blocksMap(block.block_id)

  if (block.provider === 'views') {
    const rows = block.results;
    if (!rows || rows.length === 0) {
      return null
    }

    return (
      <>
        {options?.title && <h2 className="text-3xl mb-2">{options?.title}:</h2>}
        <ul>
          {rows.map((row: any, index: number) => (
            <li key={index} className="py-2">
              <Link href={row.path.alias} className="no-underline hover:text-blue-600">
                {row.field_logo && (
                  <figure>
                    <Image
                      src={absoluteUrl(row.field_logo.uri.url)}
                      width={row.field_logo.resourceIdObjMeta.width}
                      height={row.field_logo.resourceIdObjMeta.height}
                      alt={row.field_logo.resourceIdObjMeta.alt || ""}
                      priority
                    />
                  </figure>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return null
}
