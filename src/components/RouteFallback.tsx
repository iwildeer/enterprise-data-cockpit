/** 路由 chunk 下载期间的整屏占位：黑底 + 呼吸光点，避免白屏闪烁 */
export function RouteFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#020409]">
      <div
        className="h-4 w-4 animate-pulse rounded-full"
        style={{
          background: "#00ffc2",
          boxShadow: "0 0 24px 6px rgba(0, 255, 194, 0.45)",
        }}
      />
    </div>
  )
}
