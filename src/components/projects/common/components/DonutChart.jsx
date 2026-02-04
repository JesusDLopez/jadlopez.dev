// DonutChart - Reusable D3.js donut chart component
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../Styles/DonutChart.css';

const DonutChart = ({
  data,
  title,
  width = 300,
  height = 300,
  colors = ['#3b82f6', '#06b6d4'],
  innerRadius = 60,
  className = '',
  showLabels = true,
  showLegend = true,
  legendItems
}) => {
  const svgRef = useRef(null);
  const tooltipIdRef = useRef(null);

  // Generate unique ID only once
  if (!tooltipIdRef.current) {
    tooltipIdRef.current = `donut-tooltip-${Math.random().toString(36).substr(2, 9)}`;
  }

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const tooltipId = tooltipIdRef.current;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 40;

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${width/2}, ${height/2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(colors);

    const pie = d3.pie()
      .value(d => d.percentage)
      .sort(null);

    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - innerRadius);

    // Remove any existing tooltip for this chart instance
    d3.selectAll(`.${tooltipId}`).remove();

    // Create tooltip with unique ID
    const tooltip = d3.select("body").append("div")
      .attr("class", `chart-tooltip ${tooltipId}`)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("opacity", 0)
      .style("background", "rgba(30, 41, 59, 0.95)")
      .style("color", "white")
      .style("padding", "12px 16px")
      .style("border-radius", "8px")
      .style("font-size", "14px")
      .style("pointer-events", "none")
      .style("z-index", "10000")
      .style("box-shadow", "0 8px 25px rgba(0, 0, 0, 0.4)")
      .style("border", "1px solid rgba(255, 255, 255, 0.1)")
      .style("backdrop-filter", "blur(8px)")
      .style("max-width", "250px");

    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    // Create a larger arc for hover effect
    const hoverPath = d3.arc()
      .outerRadius(radius + 10)
      .innerRadius(radius - innerRadius);

    // Append paths first
    const paths = arcs.append("path")
      .attr("d", path)
      .attr("fill", d => color(d.data.category))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("cursor", "pointer");

    // Store labels separately with updated positions
    let labels = null;
    if (showLabels) {
      labels = arcs.append("text")
        .attr("transform", d => `translate(${path.centroid(d)})`)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "14px")
        .style("fill", "white")
        .style("pointer-events", "none")
        .text(d => `${d.data.percentage.toFixed(1)}%`);
    }

    // Add hover interactions
    paths
      .on("mouseover", function(event, d) {
        const currentPath = d3.select(this);
        currentPath
          .transition()
          .duration(250)
          .ease(d3.easeBackOut.overshoot(1.5))
          .attr("d", hoverPath);

        // Update label position if labels exist
        if (showLabels) {
          d3.select(this.parentNode).select("text")
            .transition()
            .duration(250)
            .attr("transform", `translate(${hoverPath.centroid(d)})`);
        }

        // Stop any ongoing transitions and show tooltip immediately
        tooltip.interrupt();
        tooltip
          .style("visibility", "visible")
          .style("opacity", 1)
          .html(`<strong>${d.data.category}</strong><br/>Count: ${d.data.count.toLocaleString()}<br/>Percentage: ${d.data.percentage.toFixed(1)}%`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function(event, d) {
        const currentPath = d3.select(this);
        currentPath
          .transition()
          .duration(250)
          .ease(d3.easeBackOut)
          .attr("d", path);

        // Reset label position if labels exist
        if (showLabels) {
          d3.select(this.parentNode).select("text")
            .transition()
            .duration(250)
            .attr("transform", `translate(${path.centroid(d)})`);
        }

        // Hide tooltip immediately
        tooltip
          .style("visibility", "hidden")
          .style("opacity", 0);
      });

    // Cleanup function to remove tooltip when component unmounts
    return () => {
      d3.selectAll(`.${tooltipId}`).remove();
    };
  }, [data, width, height, colors, innerRadius, showLabels]);

  if (!data || data.length === 0) {
    return <div className="chart-loading">Loading chart data...</div>;
  }

  return (
    <div className={`donut-chart-container ${className}`}>
      {title && <h3>{title}</h3>}
      <svg ref={svgRef}></svg>
      {showLegend && legendItems && (
        <div className="chart-legend">
          {legendItems.map((item, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{backgroundColor: item.color}}
              ></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonutChart;