// ForestPlot - D3.js forest plot for multivariable analysis results
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../styles/ForestPlot.css';

const ForestPlot = ({
  data,
  width = 800,
  height = 500,
  className = '',
  margin = {top: 40, right: 150, bottom: 60, left: 220},
  hoveredCategory = null
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Detect dark mode
    const isDarkMode = document.body.classList.contains('dark') ||
                       document.body.classList.contains('dark-theme');

    // Dynamic colors based on theme
    const textColor = isDarkMode ? '#e2e8f0' : '#374151';
    const labelColor = isDarkMode ? '#94a3b8' : '#6b7280';
    const axisColor = isDarkMode ? '#475569' : '#d1d5db';

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sort data: primary predictor first, then by category and OR
    const sortedData = [...data].sort((a, b) => {
      if (a.category === 'primary_predictor') return -1;
      if (b.category === 'primary_predictor') return 1;
      if (a.category !== b.category) {
        const categoryOrder = ['strong_risk', 'moderate_risk', 'non_significant'];
        return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      }
      return b.odds_ratio - a.odds_ratio;
    });

    // Create scales
    const maxOR = Math.max(...data.map(d => d.ci_upper));
    const minOR = Math.min(...data.map(d => d.ci_lower));

    const xScale = d3.scaleLog()
      .domain([Math.max(0.1, minOR * 0.8), maxOR * 1.2])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(sortedData.map(d => d.variable))
      .range([0, innerHeight])
      .paddingInner(0.1);

    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(['primary_predictor', 'strong_risk', 'moderate_risk', 'non_significant'])
      .range(['#3b82f6', '#dc2626', '#f59e0b', '#6b7280']);

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "forest-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(30, 41, 59, 0.95)")
      .style("color", "white")
      .style("padding", "12px 16px")
      .style("border-radius", "8px")
      .style("font-size", "12px")
      .style("z-index", "1000")
      .style("pointer-events", "none")
      .style("box-shadow", "0 8px 25px rgba(0, 0, 0, 0.4)")
      .style("backdrop-filter", "blur(8px)")
      .style("border", "1px solid rgba(255, 255, 255, 0.1)")
      .style("line-height", "1.5")
      .style("max-width", "300px");

    // Draw vertical line at OR = 1 (no effect)
    g.append("line")
      .attr("x1", xScale(1))
      .attr("x2", xScale(1))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .style("opacity", 0.7);

    // Add "No Effect" label
    g.append("text")
      .attr("x", xScale(1))
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#ef4444")
      .style("font-weight", "600")
      .text("No Effect (OR = 1)");

    // Draw confidence intervals (lines)
    g.selectAll(".ci-line")
      .data(sortedData)
      .enter().append("line")
      .attr("class", "ci-line")
      .attr("x1", d => xScale(d.ci_lower))
      .attr("x2", d => xScale(d.ci_upper))
      .attr("y1", d => yScale(d.variable) + yScale.bandwidth() / 2)
      .attr("y2", d => yScale(d.variable) + yScale.bandwidth() / 2)
      .attr("stroke", d => colorScale(d.category))
      .attr("stroke-width", 3);

    // Draw CI caps (lower)
    g.selectAll(".ci-cap-lower")
      .data(sortedData)
      .enter().append("line")
      .attr("class", "ci-cap-lower")
      .attr("x1", d => xScale(d.ci_lower))
      .attr("x2", d => xScale(d.ci_lower))
      .attr("y1", d => yScale(d.variable) + yScale.bandwidth() / 2 - 8)
      .attr("y2", d => yScale(d.variable) + yScale.bandwidth() / 2 + 8)
      .attr("stroke", d => colorScale(d.category))
      .attr("stroke-width", 3);

    // Draw CI caps (upper)
    g.selectAll(".ci-cap-upper")
      .data(sortedData)
      .enter().append("line")
      .attr("class", "ci-cap-upper")
      .attr("x1", d => xScale(d.ci_upper))
      .attr("x2", d => xScale(d.ci_upper))
      .attr("y1", d => yScale(d.variable) + yScale.bandwidth() / 2 - 8)
      .attr("y2", d => yScale(d.variable) + yScale.bandwidth() / 2 + 8)
      .attr("stroke", d => colorScale(d.category))
      .attr("stroke-width", 3);

    // Draw odds ratio points
    g.selectAll(".or-point")
      .data(sortedData)
      .enter().append("circle")
      .attr("class", "or-point")
      .attr("cx", d => xScale(d.odds_ratio))
      .attr("cy", d => yScale(d.variable) + yScale.bandwidth() / 2)
      .attr("r", d => {
        // Size based on sample size (log scale)
        const minSize = 4;
        const maxSize = 12;
        const logSize = Math.log(d.sample_size);
        const logMin = Math.log(100);
        const logMax = Math.log(100000);
        return minSize + (maxSize - minSize) * Math.max(0, (logSize - logMin) / (logMax - logMin));
      })
      .attr("fill", d => colorScale(d.category))
      .attr("stroke", isDarkMode ? "#1e293b" : "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        const dot = d3.select(this);
        const originalRadius = parseFloat(dot.attr("r"));

        // Bounce/grow animation
        dot.transition()
          .duration(200)
          .ease(d3.easeBackOut.overshoot(1.3))
          .attr("r", originalRadius * 1.4)
          .attr("stroke-width", 3);

        const significanceText = d.p_value < 0.05 ? "Significant" : "Not significant";
        const significanceColor = d.p_value < 0.05 ? "#10b981" : "#f59e0b";

        let tooltipContent = `<strong style="color: #60a5fa; font-weight: 600; display: block; margin-bottom: 4px;">${d.variable}</strong>`;
        tooltipContent += `<div>Odds Ratio: ${d.odds_ratio.toFixed(3)}</div>`;
        tooltipContent += `<div>95% CI: ${d.ci_lower.toFixed(3)} - ${d.ci_upper.toFixed(3)}</div>`;
        tooltipContent += `<div>P-value: ${d.p_value < 0.001 ? '<0.001' : d.p_value.toFixed(3)}</div>`;
        tooltipContent += `<div>Sample Size: ${d.sample_size.toLocaleString()}</div>`;
        tooltipContent += `<div style="color: ${significanceColor}; font-weight: 600; margin-top: 4px;">${significanceText}</div>`;

        tooltip.style("visibility", "visible")
          .html(tooltipContent);
      })
      .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function(event, d) {
        const dot = d3.select(this);
        // Recalculate original radius based on sample size
        const minSize = 4;
        const maxSize = 12;
        const logSize = Math.log(d.sample_size);
        const logMin = Math.log(100);
        const logMax = Math.log(100000);
        const originalRadius = minSize + (maxSize - minSize) * Math.max(0, (logSize - logMin) / (logMax - logMin));

        // Return to original size with bounce
        dot.transition()
          .duration(200)
          .ease(d3.easeBackOut)
          .attr("r", originalRadius)
          .attr("stroke-width", 2);

        tooltip.style("visibility", "hidden");
      });

    // Y-axis (variable names)
    const yAxis = g.append("g")
      .attr("class", "y-axis");

    yAxis.selectAll(".tick")
      .data(sortedData)
      .enter().append("g")
      .attr("class", "tick")
      .attr("transform", d => `translate(0, ${yScale(d.variable) + yScale.bandwidth() / 2})`)
      .each(function(d) {
        const tick = d3.select(this);

        // Variable name
        tick.append("text")
          .attr("x", -10)
          .attr("dy", "0.35em")
          .style("text-anchor", "end")
          .style("font-size", d.category === 'primary_predictor' ? "14px" : "12px")
          .style("font-weight", d.category === 'primary_predictor' ? "700" : "500")
          .style("fill", d.category === 'primary_predictor' ? "#3b82f6" : textColor)
          .text(d.variable);
      });

    // X-axis
    const xAxisTicks = [0.1, 0.5, 1, 2, 5, 10, 20, 40];
    const xAxis = d3.axisBottom(xScale)
      .tickValues(xAxisTicks.filter(t => t >= xScale.domain()[0] && t <= xScale.domain()[1]))
      .tickFormat(d => d >= 1 ? d.toString() : d.toFixed(1));

    const xAxisGroup = g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis);

    // Style x-axis for dark mode
    xAxisGroup.selectAll("line, path")
      .attr("stroke", axisColor);
    xAxisGroup.selectAll("text")
      .style("fill", labelColor);

    // X-axis label
    g.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .style("font-size", "14px")
      .style("font-weight", "500")
      .style("fill", textColor)
      .text("Odds Ratio (95% Confidence Interval)");

    // Add column header for OR values
    g.append("text")
      .attr("class", "or-header")
      .attr("x", innerWidth + 10)
      .attr("y", -15)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", textColor)
      .style("text-anchor", "start")
      .text("OR (95% CI)");

    // Add OR values and CI text on the right
    g.selectAll(".or-text")
      .data(sortedData)
      .enter().append("text")
      .attr("class", "or-text")
      .attr("x", innerWidth + 10)
      .attr("y", d => yScale(d.variable) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", textColor)
      .text(d => `${d.odds_ratio.toFixed(2)} (${d.ci_lower.toFixed(2)}-${d.ci_upper.toFixed(2)})`);

    // Apply hover category highlighting to dots with transitions
    g.selectAll(".or-point")
      .transition()
      .duration(200)
      .attr("opacity", d => {
        if (!hoveredCategory) return 1;
        if (d.category === hoveredCategory) return 1;
        return 0.2; // Dim non-matching dots
      })
      .attr("r", d => {
        const minSize = 4;
        const maxSize = 12;
        const logSize = Math.log(d.sample_size);
        const logMin = Math.log(100);
        const logMax = Math.log(100000);
        const baseRadius = minSize + (maxSize - minSize) * Math.max(0, (logSize - logMin) / (logMax - logMin));

        if (!hoveredCategory) {
          return baseRadius;
        }
        if (d.category === hoveredCategory) {
          return baseRadius * 1.5; // Larger when highlighted
        }
        return baseRadius * 0.8; // Smaller when dimmed
      })
      .attr("stroke-width", d => {
        if (!hoveredCategory) return 2;
        if (d.category === hoveredCategory) return 4;
        return 1;
      });

    // Also highlight the CI lines
    g.selectAll(".ci-line, .ci-cap-lower, .ci-cap-upper")
      .transition()
      .duration(200)
      .attr("opacity", d => {
        if (!hoveredCategory) return 1;
        if (d.category === hoveredCategory) return 1;
        return 0.2;
      })
      .attr("stroke-width", d => {
        if (!hoveredCategory) return 3;
        if (d.category === hoveredCategory) return 4;
        return 2;
      });

    // Cleanup function
    return () => {
      d3.selectAll('.forest-tooltip').remove();
    };
  }, [data, width, height, margin, hoveredCategory]);

  if (!data || data.length === 0) {
    return <div className="chart-loading">Loading forest plot data...</div>;
  }

  return (
    <div className={`forest-plot-container ${className}`}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ForestPlot;