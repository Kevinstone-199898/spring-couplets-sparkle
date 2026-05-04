import { useState, useCallback } from "react";
import ParticleCanvas from "@/components/ParticleCanvas";
import CoupletScroll from "@/components/CoupletScroll";
import CoupletEditor from "@/components/CoupletEditor";
import Lantern from "@/components/Lantern";

const DEFAULT_COUPLET = {
  top: "万事如意",
  right: "春回大地千山秀",
  left: "日照神州万里春",
};

const Index = () => {
  const [couplet, setCouplet] = useState(DEFAULT_COUPLET);
  const [showCouplet, setShowCouplet] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [editing, setEditing] = useState(true);

  const handleDisplay = useCallback(() => {
    setShowCouplet(false);
    setEditing(false);
    // Small delay then show
    setTimeout(() => {
      setShowCouplet(true);
      setTrigger((t) => t + 1);
    }, 300);
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setShowCouplet(false);
  };

  return (
    <div className="min-h-screen gradient-festive relative overflow-hidden">
      <ParticleCanvas trigger={trigger} />

      {/* Lanterns */}
      <Lantern side="left" text="福" />
      <Lantern side="right" text="春" />

      <div className="relative z-10 flex flex-col items-center min-h-screen py-8 px-4">
        {/* 标题 */}
        <h1 className="font-calligraphy text-4xl md:text-6xl text-gold-glow mt-6 mb-8 text-center">
          🏮 春联生成器 🏮
        </h1>

        {editing ? (
          <CoupletEditor
            couplet={couplet}
            onChange={setCouplet}
            onDisplay={handleDisplay}
          />
        ) : (
          <>
            {/* Couplet display area */}
            <div className="flex-1 flex items-center justify-center w-full max-w-4xl">
              <div className="flex items-start gap-4 md:gap-12">
                {/* Right scroll (上联) */}
                <CoupletScroll
                  text={couplet.right}
                  direction="right"
                  show={showCouplet}
                  delay={0}
                />

                {/* Center: top banner */}
                <div className="flex flex-col items-center gap-6 pt-0">
                  <CoupletScroll
                    text={couplet.top}
                    direction="top"
                    show={showCouplet}
                    delay={800}
                  />

                  {/* Big Fu character */}
                  <div
                    className={`w-24 h-24 md:w-32 md:h-32 bg-primary rounded-md shadow-lantern flex items-center justify-center transition-all duration-1000 ${
                      showCouplet ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-0"
                    }`}
                    style={{ transitionDelay: "1.5s" }}
                  >
                    <div className="absolute inset-1 border-2 border-accent/40 rounded-sm" />
                    <span
                      className="font-calligraphy text-5xl md:text-7xl text-primary-foreground"
                      style={{
                        textShadow: "0 0 15px hsl(40,100%,50%,0.6)",
                        transform: "rotate(180deg)",
                      }}
                    >
                      Fu
                    </span>
                  </div>
                </div>

                {/* Left scroll (下联) */}
                <CoupletScroll
                  text={couplet.left}
                  direction="left"
                  show={showCouplet}
                  delay={400}
                />
              </div>
            </div>

            {/* Back to edit button */}
            <button
              onClick={handleEdit}
              className="mt-8 mb-4 px-6 py-2 bg-muted/50 backdrop-blur text-foreground font-calligraphy text-lg rounded border border-border hover:bg-primary/30 transition-all"
            >
              ✏️ Edit Again
            </button>

            {/* Replay fireworks */}
            <button
              onClick={() => setTrigger((t) => t + 1)}
              className="mb-8 px-6 py-2 bg-primary/80 text-primary-foreground font-calligraphy text-lg rounded shadow-lantern hover:brightness-110 transition-all active:scale-95"
            >
              🎆 Replay Fireworks
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
