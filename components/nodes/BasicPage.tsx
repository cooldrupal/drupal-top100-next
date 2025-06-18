import type { DrupalNode } from "next-drupal"

interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  return (
    <article {...props}>
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}
