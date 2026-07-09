export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white">
        AI
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-gray-900">mySFT</span>
        <span className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
          Property Assistant
        </span>
      </div>
    </div>
  );
}
