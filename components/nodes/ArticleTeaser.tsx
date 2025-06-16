import { textSummary } from "@/lib/utils"
import { Link } from "@/components/navigation/Link"

export function ArticleTeaser({ node }: any) {
  console.log(node)
  const teaser = node.body?.summary ? node.body.summary : textSummary(node.body?.processed)
  return (
    <article>
      <Link href={node.path.alias}>
        <span className="mb-2 text-4xl font-light">{node.title}</span>
      </Link>

      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: teaser }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}
