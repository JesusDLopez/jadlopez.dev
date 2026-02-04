// BarChart - Reusable D3.js bar chart component following dual-mode pattern
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../Styles/BarChart.css';

const BarChart = ({
  data,
  title,
  width = 400,
  height = 300,
  colors = ['#10b981', '#f59e0b', '#8b5cf6'],
  className = '',
  categoryMapping = null,
  fullNameMapping = null,
  margin = {top: 20, right: 30, bottom: 60, left: 40}
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .rangeRound([0, innerWidth])
      .paddingInner(0.1)
      .paddingOuter(0.2)
      .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
      .rangeRound([innerHeight, 0])
      .domain([0, d3.max(data, d => d.percentage) || 100]);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(colors);

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("opacity", 0)
      .style("background", "rgba(30, 41, 59, 0.95)")
      .style("color", "white")
      .style("padding", "12px 16px")
      .style("border-radius", "8px")
      .style("font-size", "14px")
      .style("z-index", "10000")
      .style("pointer-events", "none")
      .style("box-shadow", "0 8px 25px rgba(0, 0, 0, 0.4)")
      .style("backdrop-filter", "blur(8px)")
      .style("border", "1px solid rgba(255, 255, 255, 0.1)")
      .style("line-height", "1.5")
      .style("max-width", "250px");

    // Draw bars
    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.percentage))
      .attr("width", x.bandwidth())
      .attr("height", d => innerHeight - y(d.percentage))
      .attr("fill", d => color(d.category))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        const bar = d3.select(this);
        const originalWidth = x.bandwidth();
        const originalX = x(d.category);
        const growAmount = 8;

        bar.transition()
          .duration(200)
          .ease(d3.easeBackOut.overshoot(1.3))
          .attr("width", originalWidth + growAmount)
          .attr("x", originalX - growAmount / 2);

        const displayName = fullNameMapping && fullNameMapping[d.category]
          ? fullNameMapping[d.category]
          : d.category;

        // Stop any ongoing transitions and show tooltip immediately
        tooltip.interrupt();
        tooltip
          .style("visibility", "visible")
          .style("opacity", 1)
          .html(`<strong style="color: #60a5fa; font-weight: 600; display: block; margin-bottom: 4px;">${displayName}</strong><div>Count: ${d.count.toLocaleString()}</div><div>Percentage: ${d.percentage.toFixed(1)}%</div>`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function(event, d) {
        const bar = d3.select(this);
        const originalWidth = x.bandwidth();
        const originalX = x(d.category);

        bar.transition()
          .duration(200)
          .ease(d3.easeBackOut)
          .attr("width", originalWidth)
          .attr("x", originalX);

        // Hide tooltip immediately
        tooltip
          .style("visibility", "hidden")
          .style("opacity", 0);
      });

    // X-axis
    const xAxis = d3.axisBottom(x);
    if (categoryMapping) {
      xAxis.tickFormat(d => categoryMapping[d] || d);
    }

    g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y-axis
    g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`));

    // Cleanup function to remove tooltip when component unmounts
    return () => {
      d3.selectAll('.chart-tooltip').remove();
    };
  }, [data, width, height, colors, margin, categoryMapping, fullNameMapping]);

  if (!data || data.length === 0) {
    return <div className="chart-loading">Loading chart data...</div>;
  }

  return (
    <div className={`bar-chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;