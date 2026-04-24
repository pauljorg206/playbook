"use client";

import { useRef, useState, useCallback } from "react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#ffffff",
  "#facc15",
];

interface DrawingOverlayProps {
  width: number;
  height: number;
  onExit: () => void;
}

export default function DrawingOverlay({
  width,
  height,
  onExit,
}: DrawingOverlayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushWidth, setBrushWidth] = useState(4);

  const getPoint = useCallback(
    (e: React.PointerEvent): Point => {
      const rect = svgRef.current!.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * width,
        y: ((e.clientY - rect.top) / rect.height) * height,
      };
    },
    [width, height],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      svgRef.current?.setPointerCapture(e.pointerId);
      setIsDrawing(true);
      setCurrentStroke([getPoint(e)]);
    },
    [getPoint],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      setCurrentStroke((prev) => [...prev, getPoint(e)]);
    },
    [isDrawing, getPoint],
  );

  const onPointerUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      setStrokes((prev) => [
        ...prev,
        { points: currentStroke, color, width: brushWidth },
      ]);
    }
    setCurrentStroke([]);
  }, [isDrawing, currentStroke, color, brushWidth]);

  const toPolyline = (points: Point[]) =>
    points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-black/90 backdrop-blur-sm flex-wrap">
        <span className="text-white font-bold text-sm tracking-wide">
          ✏️ DRAW
        </span>

        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-7 h-7 rounded-full border-2 transition-transform active:scale-95"
              style={{
                background: c,
                borderColor: color === c ? "#fff" : "transparent",
                transform: color === c ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <select
          value={brushWidth}
          onChange={(e) => setBrushWidth(Number(e.target.value))}
          className="bg-gray-800 text-white text-sm px-2 py-1 rounded-lg border border-gray-600"
        >
          <option value={2}>Thin</option>
          <option value={4}>Medium</option>
          <option value={8}>Thick</option>
        </select>

        <button
          onClick={() => setStrokes([])}
          className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          Clear
        </button>

        <button
          onClick={onExit}
          className="ml-auto px-4 py-1.5 text-sm bg-red-700 hover:bg-red-600 text-white rounded-lg font-bold transition-colors"
        >
          ✕ Exit
        </button>
      </div>

      {/* Drawing canvas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="flex-1 cursor-crosshair touch-none"
        style={{ background: "transparent" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {strokes.map((stroke, i) => (
          <polyline
            key={i}
            points={toPolyline(stroke.points)}
            fill="none"
            stroke={stroke.color}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />
        ))}
        {currentStroke.length > 1 && (
          <polyline
            points={toPolyline(currentStroke)}
            fill="none"
            stroke={color}
            strokeWidth={brushWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />
        )}
      </svg>
    </div>
  );
}
