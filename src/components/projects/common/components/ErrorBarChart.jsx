// ErrorBarChart - Bar chart with confidence intervals for comparison data
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../Styles/BarChart.css';

const ErrorBarChart = ({
  data,
  title,
  width = 400,
  height = 300,
  colors = ['#10b981', '#3b82f6'],
  className = '',
  margin = {top: 20, right: 30, bottom: 80, left: 60},
  yAxisLabel = 'Hearing Loss Rate (%)',
  onBarHover = null,
  onBarLeave = null,
  showConfidenceNote = true
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Detect dark mode
    const isDarkMode = document.body.classList.contains('dark-theme');

    // Dynamic colors based on theme
    const textColor = isDarkMode ? '#e2e8f0' : '#374151';
    const labelColor = isDarkMode ? '#94a3b8' : '#6b7280';
    const axisColor = isDarkMode ? '#475569' : '#d1d5db';
    const errorBarColor = isDarkMode ? '#64748b' : '#374151';

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Convert rates to percentages for better display
    const processedData = data.map(d => ({
      ...d,
      percentage: d.percentage || (d.hearing_loss_rate * 100),
      lowerCI: d.confidence_interval ? d.confidence_interval.lower * 100 : null,
      upperCI: d.confidence_interval ? d.confidence_interval.upper * 100 : null
    }));

    const x = d3.scaleBand()
      .rangeRound([0, innerWidth])
      .paddingInner(0.1)
      .paddingOuter(0.2)
      .domain(processedData.map(d => d.category || d.gdm_status));

    // Set Y scale to show precise differences (0 to 0.5%)
    const maxY = Math.max(...processedData.map(d => d.upperCI || d.percentage)) * 1.1;
    const y = d3.scaleLinear()
      .rangeRound([innerHeight, 0])
      .domain([0, Math.max(0.5, maxY)]);

    const color = d3.scaleOrdinal()
      .domain(processedData.map(d => d.category || d.gdm_status))
      .range(colors);

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "chart-tooltip")
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
      .style("max-width", "280px");

    // Draw bars
    g.selectAll(".bar")
      .data(processedData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category || d.gdm_status))
      .attr("y", d => y(d.percentage))
      .attr("width", x.bandwidth())
      .attr("height", d => innerHeight - y(d.percentage))
      .attr("fill", d => color(d.category || d.gdm_status))
      .attr("stroke", isDarkMode ? "#1e293b" : "white")
      .style("stroke-width", "2px")
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        const bar = d3.select(this);
        const originalWidth = x.bandwidth();
        const originalX = x(d.category || d.gdm_status);
        const growAmount = 8;

        bar.transition()
          .duration(200)
          .ease(d3.easeBackOut.overshoot(1.3))
          .attr("width", originalWidth + growAmount)
          .attr("x", originalX - growAmount / 2);

        // Tooltip disabled - information shown in table
        // let tooltipContent = `<strong style="color: #60a5fa; font-weight: 600; display: block; margin-bottom: 4px;">${d.category || d.gdm_status}</strong>`;
        // tooltipContent += `<div>Hearing Loss Rate: ${d.percentage.toFixed(3)}%</div>`;
        // if (d.total_cases || d.total) {
        //   tooltipContent += `<div>Cases: ${(d.hearing_loss_cases || d.count || 0).toLocaleString()} / ${(d.total_cases || d.total || 0).toLocaleString()}</div>`;
        // }
        // if (d.lowerCI !== null && d.upperCI !== null) {
        //   tooltipContent += `<div>95% CI: ${d.lowerCI.toFixed(3)}% - ${d.upperCI.toFixed(3)}%</div>`;
        // }

        // tooltip.interrupt();
        // tooltip
        //   .style("visibility", "visible")
        //   .style("opacity", 1)
        //   .html(tooltipContent);

        // Call external hover handler if provided
        if (onBarHover) {
          onBarHover(d.category || d.gdm_status, d);
        }
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function(event, d) {
        const bar = d3.select(this);
        const originalWidth = x.bandwidth();
        const originalX = x(d.category || d.gdm_status);

        bar.transition()
          .duration(200)
          .ease(d3.easeBackOut)
          .attr("width", originalWidth)
          .attr("x", originalX);

        tooltip
          .style("visibility", "hidden")
          .style("opacity", 0);

        // Call external leave handler if provided
        if (onBarLeave) {
          onBarLeave();
        }
      });

    // Draw error bars if confidence intervals exist
    processedData.forEach(d => {
      if (d.lowerCI !== null && d.upperCI !== null) {
        const barCenter = x(d.category || d.gdm_status) + x.bandwidth() / 2;

        // Vertical line for error bar
        g.append("line")
          .attr("class", "error-bar")
          .attr("x1", barCenter)
          .attr("x2", barCenter)
          .attr("y1", y(d.lowerCI))
          .attr("y2", y(d.upperCI))
          .attr("stroke", errorBarColor)
          .attr("stroke-width", 2);

        // Top cap
        g.append("line")
          .attr("class", "error-cap")
          .attr("x1", barCenter - 8)
          .attr("x2", barCenter + 8)
          .attr("y1", y(d.upperCI))
          .attr("y2", y(d.upperCI))
          .attr("stroke", errorBarColor)
          .attr("stroke-width", 2);

        // Bottom cap
        g.append("line")
          .attr("class", "error-cap")
          .attr("x1", barCenter - 8)
          .attr("x2", barCenter + 8)
          .attr("y1", y(d.lowerCI))
          .attr("y2", y(d.lowerCI))
          .attr("stroke", errorBarColor)
          .attr("stroke-width", 2);
      }
    });

    // Add value labels on bars (positioned to avoid error bars)
    g.selectAll(".bar-label")
      .data(processedData)
      .enter().append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.category || d.gdm_status) + x.bandwidth() / 2)
      .attr("y", d => {
        // Position above error bars if they exist, otherwise above bar
        const hasErrorBars = d.lowerCI !== null && d.upperCI !== null;
        return hasErrorBars ? y(d.upperCI) - 8 : y(d.percentage) - 5;
      })
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", textColor)
      .text(d => `${d.percentage.toFixed(3)}%`);

    // X-axis
    const xAxis = g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    xAxis.selectAll("text")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .style("fill", textColor);

    xAxis.selectAll("line, path")
      .attr("stroke", axisColor);

    // Y-axis
    const yAxis = g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `${d.toFixed(2)}%`));

    yAxis.selectAll("text")
      .style("font-size", "11px")
      .style("fill", labelColor);

    yAxis.selectAll("line, path")
      .attr("stroke", axisColor);

    // Y-axis label
    g.append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (innerHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .style("fill", textColor)
      .text(yAxisLabel);

    // Add confidence interval note at bottom if enabled
    if (showConfidenceNote && processedData.some(d => d.lowerCI !== null && d.upperCI !== null)) {
      g.append("text")
        .attr("class", "confidence-note")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .style("font-style", "italic")
        .style("fill", labelColor)
        .text("Error bars represent 95% confidence intervals");
    }

    // Cleanup function
    return () => {
      d3.selectAll('.chart-tooltip').remove();
    };
  }, [data, width, height, colors, margin, yAxisLabel, onBarHover, onBarLeave, showConfidenceNote]);

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

export default ErrorBarChart;