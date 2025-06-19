import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"

interface OrganizationProps {
  node: DrupalNode
}

export function Organization({ node, ...props }: OrganizationProps) {
  return (
    <article {...props}>
      {node.field_logo && (
        <figure>
          <Image
            src={absoluteUrl(node.field_logo.uri.url)}
            width={768}
            height={400}
            alt={node.field_logo.resourceIdObjMeta.alt || ""}
            priority
          />
          {node.field_logo.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_logo.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.field_teaser && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_teaser }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
      {node.field_partner && (
        <>
        <div>Badge:</div>
        <Link href={node.field_partner.path.alias}>
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={absoluteUrl(node.field_partner.field_logo.uri.url)}
              alt={node.field_partner.name}
              title={node.field_partner.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        </>
      )}
      {node.field_countries && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <div>Countries:</div>
            {node.field_countries.map((country: any) => (
              <span key={country.id}>
                <Link href={country.path.alias}>
                  <span className="mb-2 font-light">{country.name}</span>
                </Link>
              </span>
            ))}
          </div>
        </>
      )}
      {node.field_website?.uri && (
        <>
        <div className="flex items-center gap-2 mt-2">
          <div>Website:</div>
          <Link href={node.field_website.uri}>
            <span className="mb-2 font-light">{node.field_website.uri}</span>
          </Link>
        </div>
        </>
      )}
      {node.field_career?.uri && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <div>Career:</div>
            <Link href={node.field_career.uri}>
              <span className="mb-2 font-light">{node.field_career.uri}</span>
            </Link>
          </div>
        </>
      )}
    </article>
  )
}
