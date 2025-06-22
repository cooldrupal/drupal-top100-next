import { Link } from "@/components/navigation/Link"

export function OrganizationCareer({ node }: any) {
  return (
    <article className="mb-6">
      <Link href={node.field_career.uri}>
        <span className="mb-2 font-light">{node.title}</span>
      </Link>
    </article>
  )
}
