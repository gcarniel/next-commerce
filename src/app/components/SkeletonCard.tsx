import clsx from 'clsx'

interface SkeletonCardProps {
  isLoading?: boolean
}
export default function SkeletonCard({ isLoading }: SkeletonCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-slate-300 rounded-md',
        {
          'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r ':
            isLoading,
        },
      )}
    >
      <div className="relative max-h-72 flex-1 bg-zinc-700"></div>
      <div className="flex justify-between font-bold my-3 bg-zinc-700"></div>
      <div className="h-3 w-8/12 rounded-md bg-zinc-700"></div>
    </div>
  )
}
