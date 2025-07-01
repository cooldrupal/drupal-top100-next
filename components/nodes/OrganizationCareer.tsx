import { Link } from "@/components/navigation/Link"

export function OrganizationCareer({ node }: any) {
  return (
    <article className="mb-6 mt-2">
      <Link href={node.field_career.uri} target="_blank" rel="noopener noreferrer">
        <span className="mb-2 text-xl text-blue-600 hover:text-orange-600">{node.title}</span>
      </Link>
    </article>
  )
}
