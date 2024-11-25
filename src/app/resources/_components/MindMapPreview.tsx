"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { learnings } from "../../../lib/learningData";

export function MindMapPreview() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    // Create a group for zoom/pan behavior
    const g = svg.append("g");

    // Only show important nodes for preview
    const previewNodes = learnings
      .filter((node) => (node.importance || 0) > 4)
      .slice(0, 12)
      .map((node) => ({
        ...node,
        x: 0,
        y: 0,
      }));

    // Create links from central node to others
    const links = previewNodes.slice(1).map((node) => ({
      source: previewNodes[0],
      target: node,
    }));

    // Create force simulation
    const simulation = d3
      .forceSimulation(previewNodes)
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("link", d3.forceLink(links).distance(80))
      .force("collide", d3.forceCollide().radius(30))
      .stop();

    // Run simulation
    for (let i = 0; i < 300; ++i) simulation.tick();

    // Draw links with gradients
    const linksGroup = g.append("g").attr("class", "links");
    links.forEach((link, i) => {
      // Create gradient
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", `link-gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", link.source.x)
        .attr("y1", link.source.y)
        .attr("x2", link.target.x)
        .attr("y2", link.target.y);

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", getColor(link.source.group));

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", getColor(link.target.group));

      // Draw link with gradient
      linksGroup
        .append("line")
        .attr("x1", link.source.x)
        .attr("y1", link.source.y)
        .attr("x2", link.target.x)
        .attr("y2", link.target.y)
        .attr("stroke", `url(#link-gradient-${i})`)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.6);
    });

    // Draw nodes
    const nodes = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(previewNodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Node circles with glows
    nodes
      .append("circle")
      .attr("r", (d) => 4 + (d.importance || 1) * 2)
      .style("filter", "url(#glow)")
      .attr("fill", (d) => getColor(d.group))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add glow filter
    const defs = svg.append("defs");
    const filter = defs
      .append("filter")
      .attr("id", "glow")
      .attr("height", "300%")
      .attr("width", "300%")
      .attr("x", "-100%")
      .attr("y", "-100%");

    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Add labels for important nodes
    nodes
      .filter((d) => (d.importance || 0) > 4)
      .append("text")
      .attr("dy", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#666")
      .style("font-size", "10px")
      .style("pointer-events", "none")
      .text((d) => d.title);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-background via-background/80 to-background"
    >
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}

function getColor(group?: string): string {
  const colors: { [key: string]: string } = {
    language: "#D32F2F",
    framework: "#1976D2",
    tool: "#2E7D32",
    concept: "#7B1FA2",
    activity: "#F57F17",
    project: "#455A64",
  };
  return colors[group?.toLowerCase() || ""] || "#455A64";
}
