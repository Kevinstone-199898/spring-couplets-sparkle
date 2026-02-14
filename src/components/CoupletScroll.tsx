import { useEffect, useState } from "react";

interface CoupletScrollProps {
  text: string;
  direction: "left" | "right" | "top";
  show: boolean;
  delay?: number;
}

export default function CoupletScroll({ text, direction, show, delay = 0 }: CoupletScrollProps) {
  const [visible, setVisible] = useState(false);
  const [charVisible, setCharVisible] = useState<boolean[]>([]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setVisible(true);
        // Animate characters one by one
        const chars = text.split("");
        chars.forEach((_, i) => {
          setTimeout(() => {
            setCharVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 150);
        });
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setCharVisible([]);
    }
  }, [show, text, delay]);

  const isVertical = direction === "left" || direction === "right";
  const chars = text.split("");

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-y-0"
      }`}
      style={{
        transformOrigin: "top center",
      }}
    >
      <div
        className={`relative bg-primary shadow-lantern rounded-sm ${
          isVertical ? "px-4 py-6 w-20 md:w-24" : "px-6 py-3"
        }`}
      >
        {/* Gold border decoration */}
        <div className="absolute inset-1 border-2 border-accent/50 rounded-sm pointer-events-none" />
        <div className="absolute inset-2 border border-accent/25 rounded-sm pointer-events-none" />

        <div
          className={`flex ${
            isVertical ? "flex-col items-center gap-2 md:gap-3" : "flex-row justify-center gap-2 md:gap-4"
          }`}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              className={`font-calligraphy text-2xl md:text-4xl text-primary-foreground transition-all duration-500 ${
                charVisible[i]
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-50 blur-sm"
              }`}
              style={{
                textShadow: "0 0 10px hsl(40, 100%, 50%, 0.5)",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Top/bottom ornament for vertical scrolls */}
        {isVertical && (
          <>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[110%] h-6 bg-accent rounded-sm shadow-gold" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110%] h-6 bg-accent rounded-sm shadow-gold" />
          </>
        )}
        {!isVertical && (
          <>
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-[110%] bg-accent rounded-sm shadow-gold" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-[110%] bg-accent rounded-sm shadow-gold" />
          </>
        )}
      </div>
    </div>
  );
}
