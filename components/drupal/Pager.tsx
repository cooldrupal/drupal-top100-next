import { Link } from "@/components/navigation/Link"
import { PagerLinks } from "@/lib/pager"

interface PagerMoreProps {
  links: PagerLinks;
  page: number;
}

export function PagerFull({ links, page }: PagerMoreProps) {
  return (
    <nav className="flex gap-2 justify-center mb-8 mt-4">
      <>
      {(links.first && links.prev) && (
        <Link href={links.first} title='Go to first page'>
          <span className="pager p-4 text-center text-xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
            {'|<'} First
          </span>
        </Link>
      )}

      {links.prev && (
        <Link href={links.prev} title='Go to previous page'>
          <span className="pager p-4 text-center text-xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
            {'<'} Previous
          </span>
        </Link>
      )}

      {Object.entries(links.pages).map(([pageNumber, url]) => {
        const isActive = Number(pageNumber) === page + 1;
        return (
          <Link href={url} key={pageNumber} title={isActive ? 'Current page' : `Go to page ${pageNumber}`}>
            <span
              className={`pager p-4 text-center text-xl cursor-pointer ${isActive ? 'bg-orange-500' : 'bg-gray-300 hover:bg-orange-500'}`}
            >
              {pageNumber}
            </span>
          </Link>
        );
      })}

      {(links.next) && (
        <Link href={links.next} title='Go to next page'>
          <span className="p-4 text-center text-xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
              Next {'>'}
          </span>
        </Link>
      )}

      {links.next && links.last && (
        <Link href={links.last} title='Go to last page'>
          <span className="p-4 text-center text-xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
              Last {'>|'}
          </span>
        </Link>
      )}
      </>
    </nav>
  )
}

export function PagerMini({ links, page }: PagerMoreProps) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8 mt-4">
      {links.prev && (
        <Link href={links.prev} title="Go to previous page">
          <span className="pager p-4 text-center text-xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
            {'<'}
          </span>
        </Link>
      )}

      <span className="pager p-4 text-center text-xl bg-orange-500 text-white font-bold cursor-default">
        {page + 1}
      </span>

      {links.next && (
        <Link href={links.next} title="Go to next page">
          <span className="pager p-4 text-center text-xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
            {'>'}
          </span>
        </Link>
      )}
    </div>
  )
}
