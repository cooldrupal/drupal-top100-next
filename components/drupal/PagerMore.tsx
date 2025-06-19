import { Link } from "@/components/navigation/Link"

export function PagerMore({ url }: { url: string }) {
  return (
    <div className="text-center my-8">
      <Link href={url}>
        <span className="pager p-6 text-center text-2xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
          More
        </span>
      </Link>
    </div>
  )
}
