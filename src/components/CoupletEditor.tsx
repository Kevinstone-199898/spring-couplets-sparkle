import { useState } from "react";

interface Couplet {
  top: string;
  right: string;
  left: string;
}

const PRESETS: Couplet[] = [
  { top: "福满人间", right: "春回大地千山秀", left: "日照神州万里明" },
  { top: "万事如意", right: "天增岁月人增寿", left: "春满乾坤福满门" },
  { top: "吉祥如意", right: "一帆风顺年年好", left: "万事如意步步高" },
  { top: "龙年大吉", right: "龙腾四海千般瑞", left: "凤舞九天万里春" },
];

interface CoupletEditorProps {
  couplet: Couplet;
  onChange: (c: Couplet) => void;
  onDisplay: () => void;
}

export default function CoupletEditor({ couplet, onChange, onDisplay }: CoupletEditorProps) {
  const [activePreset, setActivePreset] = useState(0);

  const selectPreset = (idx: number) => {
    setActivePreset(idx);
    onChange(PRESETS[idx]);
  };

  return (
    <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-border space-y-4 w-full max-w-md">
      <h2 className="font-calligraphy text-2xl text-accent text-center">编辑春联</h2>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">选择模板</label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => selectPreset(i)}
              className={`px-3 py-2 rounded text-sm font-calligraphy transition-all ${
                activePreset === i
                  ? "bg-primary text-primary-foreground shadow-lantern"
                  : "bg-muted text-muted-foreground hover:bg-primary/20"
              }`}
            >
              {p.top}
            </button>
          ))}
        </div>
      </div>

      {/* Custom inputs */}
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground">横批</label>
          <input
            value={couplet.top}
            onChange={(e) => onChange({ ...couplet, top: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded text-foreground font-calligraphy text-lg text-center focus:outline-none focus:ring-2 focus:ring-accent"
            maxLength={8}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">上联（右）</label>
          <input
            value={couplet.right}
            onChange={(e) => onChange({ ...couplet, right: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded text-foreground font-calligraphy text-lg text-center focus:outline-none focus:ring-2 focus:ring-accent"
            maxLength={12}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">下联（左）</label>
          <input
            value={couplet.left}
            onChange={(e) => onChange({ ...couplet, left: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded text-foreground font-calligraphy text-lg text-center focus:outline-none focus:ring-2 focus:ring-accent"
            maxLength={12}
          />
        </div>
      </div>

      <button
        onClick={onDisplay}
        className="w-full py-3 bg-primary text-primary-foreground font-calligraphy text-xl rounded shadow-lantern hover:brightness-110 transition-all active:scale-95"
      >
        🎆 展示春联
      </button>
    </div>
  );
}
