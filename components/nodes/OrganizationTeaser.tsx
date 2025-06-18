import { Link } from "@/components/navigation/Link"

export function OrganizationTeaser({ node }: any) {
  return (
    <article className="mb-6">
      <Link href={node.path.alias}>
        <span className="mb-2 text-4xl font-light">{node.title}</span>
      </Link>
      {node.field_teaser && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_teaser }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}
