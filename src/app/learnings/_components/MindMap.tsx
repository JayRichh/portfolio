"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import debounce from "lodash.debounce";
import { useSidebarState } from "./SidebarStateContext";

interface LearningNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  description: string;
  group?: string;
  importance?: number;
  x?: number;
  y?: number;
  z?: number;
  projX?: number;
  projY?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
}

interface LinkData extends d3.SimulationLinkDatum<LearningNode> {
  source: string | LearningNode;
  target: string | LearningNode;
}

interface MindMapProps {
  learnings: LearningNode[];
}

const MindMap: React.FC<MindMapProps> = ({ learnings }) => {
  const { highlightedGroups, highlightedImportance } = useSidebarState();

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<LearningNode | null>(null);
  const [activeBranchNodes, setActiveBranchNodes] = useState<Set<string>>(
    new Set(),
  );
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(
    null,
  );
  const [initialZoom, setInitialZoom] = useState<number>(1);

  const memoizedHighlightedGroups = useMemo(
    () => highlightedGroups?.map((group) => group.toLowerCase()) || [],
    [highlightedGroups],
  );

  const memoizedHighlightedImportance = useMemo(
    () => highlightedImportance || [],
    [highlightedImportance],
  );

  const updateDimensions = useMemo(
    () =>
      debounce(() => {
        if (containerRef.current) {
          const { width, height } =
            containerRef.current.getBoundingClientRect();
          setDimensions({ width, height: Math.max(600, height) });
        }
      }, 300),
    [],
  );

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const nodeRadius = useCallback(
    (d: LearningNode): number => {
      const baseRadius = d.importance ? 8 + d.importance * 1.5 : 8;
      const minDimension = Math.min(dimensions.width, dimensions.height);
      const scaleFactor = minDimension / 800;
      return baseRadius * scaleFactor;
    },
    [dimensions],
  );

  const nodesWithZ = useMemo(() => {
    return learnings.map((node) => ({
      ...node,
      x: (Math.random() - 0.5) * dimensions.width * 0.8,
      y: (Math.random() - 0.5) * dimensions.height * 0.8,
      z:
        (Math.random() - 0.5) *
        Math.min(dimensions.width, dimensions.height) *
        0.8,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
    }));
  }, [learnings, dimensions.width, dimensions.height]);

  const links = useMemo(() => generateLinks(nodesWithZ), [nodesWithZ]);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0)
      return;

    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll<SVGLineElement, LinkData>("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", (d) => getColor((d.source as LearningNode).group))
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", (d) =>
        Math.max(
          1,
          Math.min(
            (d.source as LearningNode).importance || 1,
            (d.target as LearningNode).importance || 1,
          ),
        ),
      );

    const nodeSelection = g
      .append("g")
      .attr("class", "nodes")
      .selectAll<SVGCircleElement, LearningNode>("circle")
      .data(nodesWithZ)
      .enter()
      .append("circle")
      .attr("r", (d) => nodeRadius(d))
      .attr("fill", (d) => getColor(d.group))
      .style("cursor", "pointer");

    const label = g
      .append("g")
      .attr("class", "labels")
      .selectAll<SVGGElement, LearningNode>("g")
      .data(nodesWithZ)
      .enter()
      .append("g")
      .style("pointer-events", "none");

    label
      .append("rect")
      .attr("x", 0)
      .attr("y", -10)
      .attr("height", 20)
      .attr("fill", "rgba(255, 255, 255, 0.8)")
      .attr("stroke", "#ccc")
      .attr("rx", 5)
      .attr("ry", 5);

    label
      .append("text")
      .text((d) => d.title)
      .attr("font-size", () => {
        const minDimension = Math.min(dimensions.width, dimensions.height);
        const scaleFactor = minDimension / 800;
        return `${10 * scaleFactor}px`;
      })
      .attr("dx", 5)
      .attr("dy", 5)
      .attr("fill", "#333");

    const simulation = d3
      .forceSimulation<LearningNode>()
      .nodes(nodesWithZ)
      .force(
        "link",
        d3
          .forceLink<LearningNode, LinkData>(links)
          .id((d) => d.id)
          .distance(
            (d) =>
              100 +
              (learnings.find((n) => n.id === (d.source as LearningNode).id)
                ?.importance || 0) *
                20,
          )
          .strength(
            (d) =>
              0.1 +
              Math.min(
                learnings.find((n) => n.id === (d.source as LearningNode).id)
                  ?.importance || 0,
                learnings.find((n) => n.id === (d.target as LearningNode).id)
                  ?.importance || 0,
              ) *
                0.02,
          ),
      )
      .force(
        "charge",
        d3
          .forceManyBody<LearningNode>()
          .strength((d) => -50 - (d.importance || 0) * 10),
      )
      .force("center", (alpha: number) => {
        nodesWithZ.forEach((node) => {
          node.x! += (0 - node.x!) * alpha * 0.1;
          node.y! += (0 - node.y!) * alpha * 0.1;
          node.z! += (0 - node.z!) * alpha * 0.1;
        });
      })
      .force(
        "collision",
        d3.forceCollide<LearningNode>().radius((d) => nodeRadius(d) + 5),
      )
      .stop();

    simulation.on("tick", () => {
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      nodesWithZ.forEach((node) => {
        const cosNodeX = Math.cos(node.rotX!);
        const sinNodeX = Math.sin(node.rotX!);
        const cosNodeY = Math.cos(node.rotY!);
        const sinNodeY = Math.sin(node.rotY!);
        const cosNodeZ = Math.cos(node.rotZ!);
        const sinNodeZ = Math.sin(node.rotZ!);

        let x = node.x!;
        let y = node.y!;
        let z = node.z!;

        let tempX = x * cosNodeZ - y * sinNodeZ;
        let tempY = x * sinNodeZ + y * cosNodeZ;
        x = tempX;
        y = tempY;

        tempX = x * cosNodeY + z * sinNodeY;
        let tempZ = -x * sinNodeY + z * cosNodeY;
        x = tempX;
        z = tempZ;

        tempY = y * cosNodeX - z * sinNodeX;
        tempZ = y * sinNodeX + z * cosNodeX;
        y = tempY;
        z = tempZ;

        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x1 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        const fov = 1000;
        const scale = fov / (fov + z2);
        node.projX = x1 * scale * zoom + dimensions.width / 2;
        node.projY = y1 * scale * zoom + dimensions.height / 2;

        node.projX = Math.max(
          nodeRadius(node),
          Math.min(dimensions.width - nodeRadius(node), node.projX),
        );
        node.projY = Math.max(
          nodeRadius(node),
          Math.min(dimensions.height - nodeRadius(node), node.projY),
        );
      });

      link
        .attr("x1", (d) => (d.source as LearningNode).projX!)
        .attr("y1", (d) => (d.source as LearningNode).projY!)
        .attr("x2", (d) => (d.target as LearningNode).projX!)
        .attr("y2", (d) => (d.target as LearningNode).projY!)
        .attr("opacity", (d) => {
          const sourceId = (d.source as LearningNode).id;
          const targetId = (d.target as LearningNode).id;
          const sourceHighlighted =
            memoizedHighlightedGroups.length === 0 ||
            memoizedHighlightedGroups.includes(
              (d.source as LearningNode).group?.toLowerCase() || "",
            );
          const targetHighlighted =
            memoizedHighlightedGroups.length === 0 ||
            memoizedHighlightedGroups.includes(
              (d.target as LearningNode).group?.toLowerCase() || "",
            );
          const bothPassFilters = sourceHighlighted && targetHighlighted;

          if (activeBranchNodes.size === 0) {
            return bothPassFilters ? 0.3 : 0.1;
          } else {
            return activeBranchNodes.has(sourceId) &&
              activeBranchNodes.has(targetId) &&
              bothPassFilters
              ? 1
              : 0.1;
          }
        });

      nodeSelection
        .attr("cx", (d) => d.projX!)
        .attr("cy", (d) => d.projY!)
        .attr("opacity", (d) => {
          const passesFilters =
            (memoizedHighlightedGroups.length === 0 ||
              memoizedHighlightedGroups.includes(
                d.group?.toLowerCase() || "",
              )) &&
            (memoizedHighlightedImportance.length === 0 ||
              memoizedHighlightedImportance.includes(d.importance || 0));

          if (d.id === hoveredNode?.id || d.id === selectedNode?.id) {
            return 1;
          }

          if (!passesFilters) {
            return 0.1;
          }

          if (activeBranchNodes.size === 0) {
            return 1;
          } else {
            return activeBranchNodes.has(d.id) ? 1 : 0.1;
          }
        });

      label
        .attr("transform", (d) => `translate(${d.projX},${d.projY})`)
        .attr("display", (d) => {
          const passesFilters =
            (memoizedHighlightedGroups.length === 0 ||
              memoizedHighlightedGroups.includes(
                d.group?.toLowerCase() || "",
              )) &&
            (memoizedHighlightedImportance.length === 0 ||
              memoizedHighlightedImportance.includes(d.importance || 0));

          if (d.id === hoveredNode?.id || d.id === selectedNode?.id) {
            return "block";
          }

          if (
            selectedNode &&
            activeBranchNodes.has(d.id) &&
            passesFilters &&
            d.group?.toLowerCase() === selectedNode.group?.toLowerCase()
          ) {
            return "block";
          }

          return "none";
        });

      label.select("rect").attr("width", (d) => {
        const textWidth =
          getTextWidth(
            d.title,
            `${10 * (Math.min(dimensions.width, dimensions.height) / 800)}px sans-serif`,
          ) + 10;
        return textWidth;
      });
    });

    simulation.alpha(1).restart();

    nodeSelection
      .on("click", (event, d) => {
        event.stopPropagation();
        const newSelectedNode = d === selectedNode ? null : d;
        setSelectedNode(newSelectedNode);

        if (newSelectedNode) {
          const connectedNodes = getConnectedNodes(newSelectedNode.id, links);
          setActiveBranchNodes(connectedNodes);
        } else {
          setActiveBranchNodes(new Set());
        }
      })
      .on("mouseover", (event, d) => setHoveredNode(d))
      .on("mouseout", () => setHoveredNode(null));

    svg.on("click", () => {
      setSelectedNode(null);
      setActiveBranchNodes(new Set());
    });

    return () => {
      simulation.stop();
    };
  }, [
    nodesWithZ,
    dimensions.width,
    dimensions.height,
    rotationX,
    rotationY,
    zoom,
    nodeRadius,
    links,
    learnings,
    memoizedHighlightedGroups,
    memoizedHighlightedImportance,
    selectedNode,
    hoveredNode,
    activeBranchNodes,
  ]);

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (isDragging && lastMousePosition) {
      const deltaX = event.clientX - lastMousePosition.x;
      const deltaY = event.clientY - lastMousePosition.y;

      setRotationY((prev) => prev + deltaX * 0.01);
      setRotationX((prev) => prev + deltaY * 0.01);

      setLastMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastMousePosition(null);
  };

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const delta = event.deltaY;
    const zoomFactor = 0.1;
    setZoom((prevZoom) =>
      Math.max(0.1, Math.min(5, prevZoom - delta * zoomFactor * 0.01)),
    );
  };

  const handleTouchStart = (event: React.TouchEvent<SVGSVGElement>) => {
    event.preventDefault();
    const touches = Array.from(event.touches);
    if (touches.length === 1) {
      const touch = touches[0];
      setIsDragging(true);
      if (touch) {
        setLastMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    } else if (touches.length === 2) {
      const touch1 = touches[0];
      const touch2 = touches[1];
      if (touch1 && touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        setTouchStartDistance(distance);
      }
      setInitialZoom(zoom);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<SVGSVGElement>) => {
    event.preventDefault();
    const touches = Array.from(event.touches);
    if (touches.length === 1 && isDragging && lastMousePosition) {
      const touch = touches[0];

      if (touch && lastMousePosition) {
        const deltaX = touch.clientX - lastMousePosition.x;
        const deltaY = touch.clientY - lastMousePosition.y;

        setRotationY((prev) => prev + deltaX * 0.01);
        setRotationX((prev) => prev + deltaY * 0.01);

        setLastMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    } else if (touches.length === 2 && touchStartDistance !== null) {
      const touch1 = touches[0];
      const touch2 = touches[1];
      if (touch1 && touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = distance / touchStartDistance;
        const newZoom = initialZoom * scaleFactor;
        setZoom(Math.max(0.1, Math.min(5, newZoom)));
      }
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<SVGSVGElement>) => {
    event.preventDefault();
    const touches = Array.from(event.touches);
    if (touches.length === 0) {
      setIsDragging(false);
      setLastMousePosition(null);
      setTouchStartDistance(null);
    } else if (touches.length === 1 && touches[0]) {
      setTouchStartDistance(null);
      setInitialZoom(zoom);
      const touch = touches[0];
      setIsDragging(true);
      setLastMousePosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  return (
    <div
      ref={containerRef}
      className="no-text-select"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "600px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
};

function generateLinks(nodes: LearningNode[]): LinkData[] {
  const links: LinkData[] = [];
  const groupedNodes: { [key: string]: LearningNode[] } = {};

  nodes.forEach((node) => {
    if (node.group) {
      const groupKey = node.group.toLowerCase();
      if (!groupedNodes[groupKey]) {
        groupedNodes[groupKey] = [];
      }
      groupedNodes[groupKey]?.push(node);
    }
  });

  const centralNode = nodes[0];
  if (!centralNode) {
    throw new Error("Central node is not defined");
  }

  Object.values(groupedNodes).forEach((group) => {
    if (group.length === 0) return;

    const sortedGroup = group
      .filter((node): node is LearningNode => !!node)
      .sort((a, b) => (b.importance || 0) - (a.importance || 0));

    if (sortedGroup.length === 0) return;

    const groupLeader = sortedGroup[0];

    if (centralNode.id !== groupLeader!.id) {
      links.push({
        source: centralNode.id,
        target: groupLeader!.id,
      });
    }

    sortedGroup.slice(1).forEach((node) => {
      if (node) {
        links.push({
          source: groupLeader!.id,
          target: node.id,
        });
      }
    });
  });

  return links;
}

function getColor(group?: string): string {
  const colors: { [key: string]: string } = {
    language: "#FFB6C1",
    framework: "#87CEFA",
    tool: "#98FB98",
    concept: "#DDA0DD",
    activity: "#FFD700",
  };
  return colors[group?.toLowerCase() || ""] || "#B0C4DE";
}

function getConnectedNodes(
  selectedNodeId: string,
  links: LinkData[],
): Set<string> {
  const visited = new Set<string>();
  const queue = [selectedNodeId];

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    visited.add(nodeId);

    links.forEach((link) => {
      const sourceId = (link.source as LearningNode).id;
      const targetId = (link.target as LearningNode).id;

      if (sourceId === nodeId && !visited.has(targetId)) {
        queue.push(targetId);
      } else if (targetId === nodeId && !visited.has(sourceId)) {
        queue.push(sourceId);
      }
    });
  }

  return visited;
}

function getTextWidth(text: string, font: string): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

export default MindMap;
