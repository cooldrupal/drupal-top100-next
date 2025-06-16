import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"

export function BlueBlock({ block }: any) {
  const options = blocksMap(block.block_id)

  if (block.provider === 'block_content') {
    return (
      <>
        {options?.title &&<h2 className="text-xl">{options?.title}</h2>}
        <div
          dangerouslySetInnerHTML={{ __html: block.body?.processed }}
          className="mt-6 text-m leading-loose prose bg-blue-100 rounded-md"
        />
      </>
    )
  }

  if (block.provider === 'views') {
    const rows = block.results;
    if (!rows || rows.length === 0) {
      return null
    }

    return (
      <>
        {options?.title && <h2 className="text-xl">{options?.title}</h2>}
        <ul>
          {rows.map((row: any, index: number) => (
            <li key={index}>
              <Link href={row.path.alias} className="no-underline hover:text-blue-600">
                <h3>{row.title}</h3>
              </Link>
              <div
                dangerouslySetInnerHTML={{ __html: row.body?.processed }}
                className="mt-6 text-m leading-loose prose bg-blue-100 rounded-md p-4"
              />
            </li>
          ))}
        </ul>
      </>
    )
  }

  return null
}
