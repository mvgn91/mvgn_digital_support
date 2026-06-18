import { GeometryBoard } from "react-dynamic-geometry";

const boardConfig = { xMin: -7, xMax: 7, yMin: -7, yMax: 7 };

const commonCfg = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

export function RotatingDiamond() {
  return (
    <div class="cmt-geo">
      <div class="cmt-geo-inner">
        <GeometryBoard config={boardConfig}>
          {(build) => {
            const A = build("Point", { x: 0, y: 5, cfg: { hidden: true } });
            const B = build("Point", { x: 5, y: 0, cfg: { hidden: true } });
            const C = build("Point", { x: 0, y: -5, cfg: { hidden: true } });
            const D = build("Point", { x: -5, y: 0, cfg: { hidden: true } });
            build("Polygon", {
              vertices: [A, B, C, D],
              cfg: { ...commonCfg, strokeOpacity: 0.65 },
            });
            build("Line", { start: A, end: C, cfg: { stroke: "currentColor", strokeOpacity: 0.2, strokeWidth: 1 } });
            build("Line", { start: B, end: D, cfg: { stroke: "currentColor", strokeOpacity: 0.2, strokeWidth: 1 } });
          }}
        </GeometryBoard>
      </div>
    </div>
  );
}

export function RotatingSphere() {
  return (
    <div class="cmt-geo">
      <div class="cmt-geo-inner">
        <GeometryBoard config={boardConfig}>
          {(build) => {
            const O = build("Point", { x: 0, y: 0, cfg: { hidden: true } });
            build("Circle", {
              center: O,
              radius: 5,
              cfg: { ...commonCfg, strokeOpacity: 0.65 },
            });
            const T = build("Point", { x: 0, y: 5, cfg: { hidden: true } });
            const B2 = build("Point", { x: 0, y: -5, cfg: { hidden: true } });
            build("Line", { start: T, end: B2, cfg: { stroke: "currentColor", strokeOpacity: 0.2, strokeWidth: 1 } });
          }}
        </GeometryBoard>
      </div>
    </div>
  );
}

export function RotatingTriangle() {
  return (
    <div class="cmt-geo">
      <div class="cmt-geo-inner">
        <GeometryBoard config={boardConfig}>
          {(build) => {
            const A = build("Point", { x: 0, y: 5, cfg: { hidden: true } });
            const B = build("Point", { x: 5.5, y: -4, cfg: { hidden: true } });
            const C = build("Point", { x: -5.5, y: -4, cfg: { hidden: true } });
            build("Polygon", {
              vertices: [A, B, C],
              cfg: { ...commonCfg, strokeOpacity: 0.65 },
            });
            const M = build("Point", { x: 0, y: -4, cfg: { hidden: true } });
            build("Line", { start: A, end: M, cfg: { stroke: "currentColor", strokeOpacity: 0.2, strokeWidth: 1 } });
          }}
        </GeometryBoard>
      </div>
    </div>
  );
}
