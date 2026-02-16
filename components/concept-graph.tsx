"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ConceptGraph } from "@/lib/types";
import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";

interface GraphNode extends SimulationNodeDatum {
  id: string;
  title: string;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

export default function ConceptGraphView({ graph }: { graph: ConceptGraph }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const hoveredNodeRef = useRef<string | null>(null);
  const simulationRef = useRef<ReturnType<typeof import("d3").forceSimulation<GraphNode>> | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const dragRef = useRef<{
    node: GraphNode | null;
    isPanning: boolean;
    startX: number;
    startY: number;
    startTransformX: number;
    startTransformY: number;
  }>({ node: null, isPanning: false, startX: 0, startY: 0, startTransformX: 0, startTransformY: 0 });

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();

    async function init() {
      const d3 = await import("d3");
      if (cancelled) return;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const width = container.clientWidth;
      const height = 500;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const nodes: GraphNode[] = graph.nodes.map((n) => ({ ...n }));
      const links: GraphLink[] = graph.links.map((l) => ({ ...l }));
      nodesRef.current = nodes;
      linksRef.current = links;

      const connectionCount = new Map<string, number>();
      for (const link of graph.links) {
        connectionCount.set(
          link.source,
          (connectionCount.get(link.source) || 0) + 1
        );
        connectionCount.set(
          link.target,
          (connectionCount.get(link.target) || 0) + 1
        );
      }

      const simulation = d3
        .forceSimulation<GraphNode>(nodes)
        .force(
          "link",
          d3
            .forceLink<GraphNode, GraphLink>(links)
            .id((d) => d.id)
            .distance(80)
        )
        .force("charge", d3.forceManyBody().strength(-120))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(12));

      simulationRef.current = simulation;

      const isDark = () =>
        document.documentElement.classList.contains("dark");

      function draw() {
        if (!ctx) return;
        const t = transformRef.current;
        const dark = isDark();
        const hovered = hoveredNodeRef.current;

        ctx.save();
        ctx.setTransform(
          window.devicePixelRatio,
          0,
          0,
          window.devicePixelRatio,
          0,
          0
        );
        ctx.clearRect(0, 0, width, height);
        ctx.translate(t.x, t.y);
        ctx.scale(t.k, t.k);

        ctx.strokeStyle = dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.08)";
        ctx.lineWidth = 0.5;
        for (const link of linksRef.current) {
          const source = link.source as GraphNode;
          const target = link.target as GraphNode;
          if (source.x == null || source.y == null || target.x == null || target.y == null) continue;
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }

        for (const node of nodesRef.current) {
          if (node.x == null || node.y == null) continue;
          const count = connectionCount.get(node.id) || 0;
          const radius = Math.max(2.5, Math.min(8, 2 + count * 0.8));
          const isHovered = hovered === node.id;

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);

          if (isHovered) {
            ctx.fillStyle = dark
              ? "rgba(255,255,255,0.9)"
              : "rgba(0,0,0,0.9)";
          } else if (count > 3) {
            ctx.fillStyle = dark
              ? "rgba(255,255,255,0.5)"
              : "rgba(0,0,0,0.5)";
          } else {
            ctx.fillStyle = dark
              ? "rgba(255,255,255,0.25)"
              : "rgba(0,0,0,0.25)";
          }
          ctx.fill();

          if (isHovered) {
            ctx.font = "11px system-ui, sans-serif";
            ctx.fillStyle = dark
              ? "rgba(255,255,255,0.9)"
              : "rgba(0,0,0,0.9)";
            ctx.textAlign = "center";
            ctx.fillText(node.title, node.x, node.y - radius - 5);
          }
        }

        ctx.restore();
      }

      simulation.on("tick", draw);

      function getNodeAtPoint(
        mx: number,
        my: number
      ): GraphNode | null {
        const t = transformRef.current;
        const x = (mx - t.x) / t.k;
        const y = (my - t.y) / t.k;

        for (const node of nodesRef.current) {
          if (node.x == null || node.y == null) continue;
          const count = connectionCount.get(node.id) || 0;
          const radius = Math.max(2.5, Math.min(8, 2 + count * 0.8));
          const dx = node.x - x;
          const dy = node.y - y;
          if (dx * dx + dy * dy < (radius + 4) * (radius + 4)) {
            return node;
          }
        }
        return null;
      }

      const sig = { signal: ac.signal };

      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        if (dragRef.current.node) {
          const t = transformRef.current;
          dragRef.current.node.fx = (mx - t.x) / t.k;
          dragRef.current.node.fy = (my - t.y) / t.k;
          simulation.alpha(0.3).restart();
          return;
        }

        if (dragRef.current.isPanning) {
          transformRef.current.x =
            dragRef.current.startTransformX + (e.clientX - dragRef.current.startX);
          transformRef.current.y =
            dragRef.current.startTransformY + (e.clientY - dragRef.current.startY);
          draw();
          return;
        }

        const node = getNodeAtPoint(mx, my);
        const newHovered = node?.id || null;
        if (newHovered !== hoveredNodeRef.current) {
          hoveredNodeRef.current = newHovered;
          draw();
        }
        canvas.style.cursor = node ? "pointer" : "grab";
      }, sig);

      canvas.addEventListener("mouseleave", () => {
        if (hoveredNodeRef.current) {
          hoveredNodeRef.current = null;
          draw();
        }
      }, sig);

      canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const node = getNodeAtPoint(mx, my);

        if (node) {
          dragRef.current.node = node;
          node.fx = node.x;
          node.fy = node.y;
          simulation.alphaTarget(0.3).restart();
        } else {
          dragRef.current.isPanning = true;
          dragRef.current.startX = e.clientX;
          dragRef.current.startY = e.clientY;
          dragRef.current.startTransformX = transformRef.current.x;
          dragRef.current.startTransformY = transformRef.current.y;
          canvas.style.cursor = "grabbing";
        }
      }, sig);

      canvas.addEventListener("mouseup", () => {
        if (dragRef.current.node) {
          dragRef.current.node.fx = null;
          dragRef.current.node.fy = null;
          simulation.alphaTarget(0);
          dragRef.current.node = null;
        }
        dragRef.current.isPanning = false;
        canvas.style.cursor = "grab";
      }, sig);

      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const node = getNodeAtPoint(mx, my);
        if (node) {
          router.push(`/concepts/${node.id}`);
        }
      }, sig);

      canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const t = transformRef.current;
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        const newK = Math.max(0.2, Math.min(4, t.k * factor));
        t.x = mx - ((mx - t.x) / t.k) * newK;
        t.y = my - ((my - t.y) / t.k) * newK;
        t.k = newK;
        draw();
      }, { passive: false, signal: ac.signal });
    }

    init();

    return () => {
      cancelled = true;
      ac.abort();
      simulationRef.current?.stop();
    };
  }, [graph, router]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg border border-border bg-muted/20 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full" style={{ height: 500 }} />
    </div>
  );
}
