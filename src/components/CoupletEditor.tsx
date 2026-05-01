import { useState, useEffect } from "react";

interface Couplet {
  top: string;
  right: string;
  left: string;
}

const DEFAULT_PRESETS: Couplet[] = [
  { top: "福满人间", right: "春回大地千山秀", left: "日照神州万里明" },
  { top: "万事如意", right: "天增岁月人增寿", left: "春满乾坤福满门" },
  { top: "吉祥如意", right: "一帆风顺年年好", left: "万事如意步步高" },
  { top: "龙年大吉", right: "龙腾四海千般瑞", left: "凤舞九天万里春" },
];

const STORAGE_KEY = "custom-couplets";

interface CoupletEditorProps {
  couplet: Couplet;
  onChange: (c: Couplet) => void;
  onDisplay: () => void;
}

export default function CoupletEditor({ couplet, onChange, onDisplay }: CoupletEditorProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [customCouplets, setCustomCouplets] = useState<Couplet[]>([]);

  // Load custom couplets from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCustomCouplets(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load custom couplets", e);
    }
  }, []);

  const allCouplets = [...DEFAULT_PRESETS, ...customCouplets];

  const selectPreset = (idx: number) => {
    setActiveIdx(idx);
    onChange(allCouplets[idx]);
  };

  const handleAddCouplet = () => {
    if (!couplet.top.trim() || !couplet.right.trim() || !couplet.left.trim()) {
      alert("请先填写完整的横批、上联和下联");
      return;
    }
    // Check duplicate
    const exists = allCouplets.some(
      (c) => c.top === couplet.top && c.right === couplet.right && c.left === couplet.left
    );
    if (exists) {
      alert("这副春联已存在于模板中");
      return;
    }
    const updated = [...customCouplets, { ...couplet }];
    setCustomCouplets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setActiveIdx(DEFAULT_PRESETS.length + updated.length - 1);
  };

  const handleDeleteCustom = (customIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customCouplets.filter((_, i) => i !== customIdx);
    setCustomCouplets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (activeIdx >= DEFAULT_PRESETS.length + customIdx) {
      setActiveIdx(0);
    }
  };

  return (
    <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-border space-y-4 w-full max-w-md">
      <h2 className="font-calligraphy text-2xl text-accent text-center">编辑春联</h2>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">选择模板</label>
        <div className="grid grid-cols-2 gap-2">
          {DEFAULT_PRESETS.map((p, i) => (
            <button
              key={`default-${i}`}
              onClick={() => selectPreset(i)}
              className={`px-3 py-2 rounded text-sm font-calligraphy transition-all ${
                activeIdx === i
                  ? "bg-primary text-primary-foreground shadow-lantern"
                  : "bg-muted text-muted-foreground hover:bg-primary/20"
              }`}
            >
              {p.top}
            </button>
          ))}
          {customCouplets.map((p, i) => {
            const idx = DEFAULT_PRESETS.length + i;
            return (
              <button
                key={`custom-${i}`}
                onClick={() => selectPreset(idx)}
                className={`relative px-3 py-2 rounded text-sm font-calligraphy transition-all group ${
                  activeIdx === idx
                    ? "bg-accent text-accent-foreground shadow-lantern"
                    : "bg-muted text-muted-foreground hover:bg-accent/20"
                }`}
              >
                <span className="absolute top-0 left-1 text-[10px] opacity-60">★</span>
                {p.top}
                <span
                  onClick={(e) => handleDeleteCustom(i, e)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-[10px] leading-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  role="button"
                  aria-label="删除"
                >
                  ×
                </span>
              </button>
            );
          })}
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
        onClick={handleAddCouplet}
        className="w-full py-2 bg-accent/80 text-accent-foreground font-calligraphy text-lg rounded border border-accent hover:brightness-110 transition-all active:scale-95"
      >
        ➕ 添加到我的春联
      </button>

      <button
        onClick={onDisplay}
        className="w-full py-3 bg-primary text-primary-foreground font-calligraphy text-xl rounded shadow-lantern hover:brightness-110 transition-all active:scale-95"
      >
        🎆 展示春联
      </button>
    </div>
  );
}
