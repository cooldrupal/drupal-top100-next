import { Link } from "@/components/navigation/Link"

interface PagerMoreProps {
  url: string
  text?: string
}

export function PagerMore({ url, text = 'More' }: PagerMoreProps) {
  return (
    <div className="text-center my-8">
      <Link href={url}>
        <span className="pager p-6 text-center text-2xl bg-gray-300 hover:bg-orange-500 cursor-pointer">
          {text}
        </span>
      </Link>
    </div>
  )
}
