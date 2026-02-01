export default function LaptopTemplate({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto aspect-[512/294] w-[95%] rounded-t-xl border-[8px] border-gray-700 bg-gray-700 dark:border-gray-700">
        <div className="h-full w-full overflow-hidden rounded-lg bg-white dark:bg-gray-700">{children}</div>
      </div>
      <div className="relative mx-auto aspect-[597/21] w-full rounded-t-sm rounded-b-xl bg-gray-900 dark:bg-gray-600">
        <div className="absolute top-0 left-1/2 aspect-[96/8] w-[16%] -translate-x-1/2 rounded-b-xl bg-gray-700"></div>
      </div>
    </div>
  );
}
