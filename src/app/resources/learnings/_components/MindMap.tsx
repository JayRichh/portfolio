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
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const zoom = useRef(1);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(
    null,
  );
  const initialZoom = useRef(1);

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
    const centralNode = learnings[0];
    const groupedNodes: { [key: string]: LearningNode[] } = {};

    learnings.forEach((node) => {
      const groupKey = node.group?.toLowerCase() || "ungrouped";
      if (!groupedNodes[groupKey]) {
        groupedNodes[groupKey] = [];
      }
      groupedNodes[groupKey]?.push(node);
    });

    const radiusIncrement = 200;
    let currentRadius = radiusIncrement;

    const nodesWithPositions: LearningNode[] = [];

    nodesWithPositions.push({
      ...centralNode,
      x: 0,
      y: 0,
      z: 0,
    });

    Object.entries(groupedNodes).forEach(([groupKey, groupNodes]) => {
      if (groupNodes.includes(centralNode)) {
        return;
      }

      const angleIncrement = (2 * Math.PI) / groupNodes.length;
      groupNodes.forEach((node, index) => {
        const angle = index * angleIncrement;
        nodesWithPositions.push({
          ...node,
          x: currentRadius * Math.cos(angle),
          y: currentRadius * Math.sin(angle),
          z: (Math.random() - 0.5) * 100,
        });
      });
      currentRadius += radiusIncrement;
    });

    return nodesWithPositions;
  }, [learnings]);

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
      .attr("stroke", (d) => getLinkColor((d.source as LearningNode).group))
      .attr("stroke-opacity", 0.4) // Reduced default opacity
      .attr(
        "stroke-width",
        (d) =>
          1 +
          Math.min(
            (d.source as LearningNode).importance || 1,
            (d.target as LearningNode).importance || 1,
          ) *
            0.5,
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
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .style("cursor", "pointer");

    const label = g
      .append("g")
      .attr("class", "labels")
      .selectAll<SVGGElement, LearningNode>("g")
      .data(nodesWithZ)
      .enter()
      .append("g")
      .attr("class", "label-group")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("transition", "opacity 0.15s ease-in-out");

    const labelBgColor = "rgba(0, 0, 0, 0.85)";
    const labelTextColor = "#ffffff";

    label
      .append("rect")
      .attr("x", 0)
      .attr("y", -10)
      .attr("height", 20)
      .attr("fill", labelBgColor)
      .attr("stroke", "#ccc")
      .attr("rx", 5)
      .attr("ry", 5);

    label
      .append("text")
      .text((d) => d.title)
      .attr("fill", labelTextColor)
      .attr("font-size", () => {
        const minDimension = Math.min(dimensions.width, dimensions.height);
        const scaleFactor = minDimension / 800;
        return `${12 * scaleFactor}px`;
      })
      .attr("dx", 5)
      .attr("dy", 5);

    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .attr(
        "class",
        "tooltip absolute pointer-events-none opacity-0 p-2 rounded shadow-md text-sm max-w-xs",
      )
      .style("background-color", "rgba(0, 0, 0, 0.9)")
      .style("color", "#ffffff")
      .style("transition", "opacity 0.15s ease-in-out");

    const simulation = d3
      .forceSimulation<LearningNode>()
      .nodes(nodesWithZ)
      .force(
        "link",
        d3
          .forceLink<LearningNode, LinkData>(links)
          .id((d) => d.id)
          .distance(100)
          .strength(1),
      )
      .force(
        "charge",
        d3.forceManyBody<LearningNode>().strength(-300).distanceMax(500),
      )
      .force("center", d3.forceCenter(0, 0));

    simulation.on("tick", () => {
      nodesWithZ.forEach((node) => {
        node.x = node.x!;
        node.y = node.y!;
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
      .on("mousedown", (event) => {
        event.stopPropagation();
      })
      .on("mouseover", function (event, d) {
        setHoveredNode(d);
        d3.select(this)
          .attr("stroke", "#000")
          .attr("stroke-width", 2)
          .attr("r", (d) => nodeRadius(d) * 1.2);

        tooltip
          .html(
            `<strong>${d.title}</strong>${
              d.description ? `<br/><br/>${d.description}` : ""
            }`,
          )
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 15}px`)
          .style("opacity", 1);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 15}px`);
      })
      .on("mouseout", function (d) {
        setHoveredNode(null);
        d3.select(this)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .attr("r", (d) => nodeRadius(d));
        tooltip.style("opacity", 0);
      });

    svg.on("click", () => {
      setSelectedNode(null);
      setActiveBranchNodes(new Set());
    });

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [
    nodesWithZ,
    dimensions.width,
    dimensions.height,
    nodeRadius,
    links,
    learnings,
  ]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    const nodeSelection = svg.selectAll<SVGCircleElement, LearningNode>(
      "circle",
    );
    const linkSelection = svg.selectAll<SVGLineElement, LinkData>("line");
    const labelSelection = svg.selectAll<SVGGElement, LearningNode>(
      ".labels g",
    );

    const timer = d3.timer(() => {
      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      nodesWithZ.forEach((node) => {
        let x = node.x!;
        let y = node.y!;
        let z = node.z!;

        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x1 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        const fov = 1000;
        const scale = fov / (fov + z2);
        node.projX = x1 * scale * zoom.current + dimensions.width / 2;
        node.projY = y1 * scale * zoom.current + dimensions.height / 2;

        node.projX = Math.max(
          nodeRadius(node),
          Math.min(dimensions.width - nodeRadius(node), node.projX),
        );
        node.projY = Math.max(
          nodeRadius(node),
          Math.min(dimensions.height - nodeRadius(node), node.projY),
        );
      });

      linkSelection
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

          // Highlight connections for hovered node
          if (
            hoveredNode &&
            (sourceId === hoveredNode.id || targetId === hoveredNode.id)
          ) {
            return 0.8;
          }

          // Show connections for selected group
          if (activeBranchNodes.size > 0) {
            return activeBranchNodes.has(sourceId) &&
              activeBranchNodes.has(targetId) &&
              bothPassFilters
              ? 0.6
              : 0.1;
          }

          // Default state
          return bothPassFilters ? 0.4 : 0.1;
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

          if (!passesFilters) {
            return 0.1;
          }

          // Highlight hovered node and its connections
          if (hoveredNode) {
            if (d.id === hoveredNode.id) return 1;
            if (getConnectedNodes(hoveredNode.id, links).has(d.id)) return 0.8;
            return 0.2;
          }

          // Show selected group
          if (activeBranchNodes.size > 0) {
            return activeBranchNodes.has(d.id) ? 0.8 : 0.2;
          }

          // Default state
          return 0.6;
        });

      labelSelection
        .attr("transform", (d) => `translate(${d.projX},${d.projY})`)
        .style("opacity", (d) => {
          const passesFilters =
            (memoizedHighlightedGroups.length === 0 ||
              memoizedHighlightedGroups.includes(
                d.group?.toLowerCase() || "",
              )) &&
            (memoizedHighlightedImportance.length === 0 ||
              memoizedHighlightedImportance.includes(d.importance || 0));

          // Only show label for hovered node
          if (hoveredNode?.id === d.id && passesFilters) {
            return 1;
          }

          // Only show label for selected node
          if (selectedNode?.id === d.id && passesFilters) {
            return 1;
          }

          return 0;
        })
        .each(function (d) {
          const textElement = d3.select(this).select("text");
          const rectElement = d3.select(this).select("rect");
          const textWidth = textElement.node()?.getComputedTextLength() || 0;
          rectElement.attr("width", textWidth + 10);
        });
    });

    return () => {
      timer.stop();
    };
  }, [
    nodesWithZ,
    dimensions.width,
    dimensions.height,
    nodeRadius,
    memoizedHighlightedGroups,
    memoizedHighlightedImportance,
    activeBranchNodes,
    selectedNode,
    hoveredNode,
    links,
  ]);

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && lastMousePosition) {
      event.preventDefault();
      const deltaX = event.clientX - lastMousePosition.x;
      const deltaY = event.clientY - lastMousePosition.y;

      rotationY.current += deltaX * 0.0015;
      rotationX.current += deltaY * 0.0015;

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
    const zoomFactor = 0.001;
    zoom.current = Math.max(
      0.1,
      Math.min(5, zoom.current - delta * zoomFactor),
    );
  };

  const handleTouchStart = (event: React.TouchEvent<SVGSVGElement>) => {
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
      initialZoom.current = zoom.current;
    }
  };

  const handleTouchMove = (event: React.TouchEvent<SVGSVGElement>) => {
    const touches = Array.from(event.touches);
    if (touches.length === 1 && isDragging && lastMousePosition) {
      const touch = touches[0];

      if (touch && lastMousePosition) {
        const deltaX = touch.clientX - lastMousePosition.x;
        const deltaY = touch.clientY - lastMousePosition.y;

        rotationY.current += deltaX * 0.0015;
        rotationX.current += deltaY * 0.0015;

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
        const newZoom = initialZoom.current * scaleFactor;
        zoom.current = Math.max(0.1, Math.min(5, newZoom));
      }
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<SVGSVGElement>) => {
    const touches = Array.from(event.touches);
    if (touches.length === 0) {
      setIsDragging(false);
      setLastMousePosition(null);
      setTouchStartDistance(null);
    } else if (touches.length === 1 && touches[0]) {
      setTouchStartDistance(null);
      initialZoom.current = zoom.current;
      const touch = touches[0];
      setIsDragging(true);
      setLastMousePosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  return (
    <div
      ref={containerRef}
      className="no-text-select w-full h-full min-h-[600px] relative overflow-hidden"
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
        className={`absolute top-0 left-0 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } touch-none`}
      />
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 p-2 rounded text-sm text-white pointer-events-none">
        <p className="m-0 font-semibold">Controls:</p>
        <ul className="m-0 pl-4 list-disc">
          <li>Click and drag to rotate</li>
          <li>Scroll to zoom</li>
          <li>Hover over nodes for details</li>
          <li>Click nodes to explore connections</li>
        </ul>
      </div>
    </div>
  );
};

function generateLinks(nodes: LearningNode[]): LinkData[] {
  const links: LinkData[] = [];
  const groupedNodes: { [key: string]: LearningNode[] } = {};

  nodes.forEach((node) => {
    const groupKey = node.group?.toLowerCase() || "ungrouped";
    if (!groupedNodes[groupKey]) {
      groupedNodes[groupKey] = [];
    }
    groupedNodes[groupKey]?.push(node);
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
    language: "#D32F2F", // Darker red for better contrast
    framework: "#1976D2", // Darker blue
    tool: "#2E7D32", // Darker green
    concept: "#7B1FA2", // Darker purple
    activity: "#F57F17", // Darker yellow/orange
  };
  return colors[group?.toLowerCase() || ""] || "#455A64"; // Darker default color
}

function getLinkColor(group?: string): string {
  const colors: { [key: string]: string } = {
    language: "#EF5350", // Slightly lighter than node color for links
    framework: "#42A5F5",
    tool: "#66BB6A",
    concept: "#AB47BC",
    activity: "#FFA726",
  };
  return colors[group?.toLowerCase() || ""] || "#78909C";
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

export default MindMap;
