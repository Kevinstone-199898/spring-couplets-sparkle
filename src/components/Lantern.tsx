export default function Lantern({ side, text = "福" }: { side: "left" | "right"; text?: string }) {
  return (
    <div
      className={`absolute top-0 ${side === "left" ? "left-4 md:left-10" : "right-4 md:right-10"} z-10`}
      style={{ animation: "float 3s ease-in-out infinite", animationDelay: side === "right" ? "1s" : "0s" }}
    >
      {/* String */}
      <div className="w-0.5 h-8 bg-accent/60 mx-auto" />
      {/* Lantern body */}
      <div className="relative w-12 h-16 md:w-16 md:h-20">
        {/* Top cap */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 md:w-10 h-2 bg-accent rounded-t-sm" />
        {/* Body */}
        <div className="absolute top-2 left-0 right-0 bottom-2 bg-primary rounded-[50%] shadow-lantern flex items-center justify-center">
          <span className="font-calligraphy text-primary-foreground text-lg md:text-2xl" style={{ textShadow: "0 0 8px hsl(40,100%,50%,0.6)" }}>
            {text}
          </span>
        </div>
        {/* Bottom cap */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-10 h-2 bg-accent rounded-b-sm" />
        {/* Tassels */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-0.5 h-4 bg-accent/70 rounded-b" />
          <div className="w-0.5 h-5 bg-accent/70 rounded-b" />
          <div className="w-0.5 h-4 bg-accent/70 rounded-b" />
        </div>
      </div>
    </div>
  );
}
