export default function MobileTemplate({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <div className="absolute -start-[17px] top-[72px] h-[32px] w-[3px] rounded-s-lg bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute -start-[17px] top-[124px] h-[46px] w-[3px] rounded-s-lg bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute -start-[17px] top-[178px] h-[46px] w-[3px] rounded-s-lg bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute -end-[17px] top-[142px] h-[64px] w-[3px] rounded-e-lg bg-gray-800 dark:bg-gray-700"></div>
      <div className="h-[572px] w-[272px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-600">{children}</div>
    </div>
  );
}
