import { Link } from "@/components/navigation/Link"

export function OrganizationCareer({ node }: any) {
  console.log(node)
  return (
    <article className="mb-6">
      <Link href={node.field_career.uri}>
        <span className="mb-2 font-light">{node.title}</span>
      </Link>
    </article>
  )
}
