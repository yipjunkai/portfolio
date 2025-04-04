export default function LaptopTemplate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl w-[95%] aspect-[512/294]">
        <div className="rounded-lg overflow-hidden h-full w-full bg-white dark:bg-gray-800 *:h-full *:w-full *:rounded-lg *:bg-white *:dark:bg-gray-600">
          {children}
        </div>
      </div>
      <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm w-full aspect-[597/21]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[16%] aspect-[96/8] bg-gray-800"></div>
      </div>
    </div>
  );
}
