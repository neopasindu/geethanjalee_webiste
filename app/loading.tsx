export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b] text-white">
      <img
        src="/only_geethanjalee.png"
        alt="Geethanjalee"
        className="w-48 sm:w-64 h-auto object-contain animate-pulse mb-3"
      />
      <span className="font-display text-sm tracking-widest uppercase text-accent animate-pulse">
        Geethanjalee
      </span>
      <span className="text-xs text-neutral-400 mt-1 font-prompt">
        Loading concert experience...
      </span>
    </div>
  );
}
