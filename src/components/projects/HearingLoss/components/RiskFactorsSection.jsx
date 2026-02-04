import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { useHearingLossData } from '../data/DataContext';
import { ContentCard, KeyFinding, StatCard, AnalysisCard, TransitionCard } from '../../common';
import '../Styles/risk-factors.css';

const RiskFactorsSection = () => {
  const { riskFactors, allDiabetesTypes, isReady } = useHearingLossData();
  const [data, setData] = useState([]);
  const [expandedDiabetes, setExpandedDiabetes] = useState(false);
  const [expandedGD, setExpandedGD] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const chartRef = useRef(null);
  const allDiabetesData = allDiabetesTypes;

  useEffect(() => {
    if (isReady && riskFactors) {
      setData(riskFactors.risk_factors || []);
    }
  }, [isReady, riskFactors]);

  const drawChart = () => {
    if (!chartRef.current || data.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    // FIXED CANVAS APPROACH: Calculate maximum possible items to set fixed height
    const maxPossibleItems = data.length; // Initial view has most items (~15 risk factors)
    const barStep = 35; // Fixed bar height + padding

    const margin = { top: 40, right: 220, bottom: 100, left: 300 }; // Increased bottom margin for x-axis
    const containerWidth = chartRef.current.parentElement?.clientWidth || 1100;
    const width = containerWidth - margin.left - margin.right - 60;

    // FIXED HEIGHT: Based on maximum possible items, never changes
    // Add extra space to prevent last item from overlapping x-axis
    const fixedHeight = (maxPossibleItems * barStep) + 35;

    // Set SVG dimensions ONCE - these never change during transitions
    svg.attr("width", width + margin.left + margin.right)
       .attr("height", fixedHeight + margin.top + margin.bottom);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Helper function to calculate significance based on OR
    const calculateSignificance = (or) => {
      if (!or || or === 1.0) return 'none';
      if (or > 5) return 'high';
      if (or >= 2) return 'moderate';
      return 'low';
    };

    // Create "All Types Diabetes" using comprehensive data and put it first
    // Recalculate significance based on actual OR values
    const processedData = data.map(d => ({
      ...d,
      significance: calculateSignificance(d.odds_ratio)
    }));

    if (allDiabetesData) {
      // Use the comprehensive diabetes data with proper odds ratios
      const allTypesDiabetes = {
        name: 'All Types Diabetes',
        category: 'primary_predictor',
        hearing_loss_rate: allDiabetesData.hearing_loss_rate,
        total_cases: allDiabetesData.total_cases,
        hearing_loss_cases: allDiabetesData.hearing_loss_cases,
        prevalence: allDiabetesData.prevalence,
        significance: calculateSignificance(allDiabetesData.odds_ratio),
        odds_ratio: allDiabetesData.odds_ratio,
        confidence_interval: allDiabetesData.confidence_interval,
        p_value: allDiabetesData.p_value,
        subtypes: allDiabetesData.subtypes
      };

      // Remove old Gestational Diabetes entry and add new All Types Diabetes at the start
      const filteredData = processedData.filter(d => d.name !== 'Gestational Diabetes');
      processedData.splice(0, 0, allTypesDiabetes);
      processedData.splice(1, processedData.length - 1, ...filteredData);
    }

    // Show expanded diabetes breakdown within the main chart
    let chartData = processedData;
    if (expandedDiabetes && allDiabetesData) {
      // Group all GD subtypes under one "Gestational Diabetes" entry
      const gdSubtypes = (allDiabetesData.subtypes || []).filter(subtype =>
        subtype.name && subtype.name.includes('Gestational Diabetes')
      );
      const otherSubtypes = (allDiabetesData.subtypes || []).filter(subtype =>
        subtype.name && !subtype.name.includes('Gestational Diabetes')
      );

      // Calculate combined GD stats and OR
      const totalGDCases = gdSubtypes.reduce((sum, subtype) => sum + (subtype.total_cases || 0), 0);
      const totalGDHLCases = gdSubtypes.reduce((sum, subtype) => sum + (subtype.hearing_loss_cases || 0), 0);
      const gdHearingLossRate = totalGDCases > 0 ? (totalGDHLCases / totalGDCases) * 100 : 0;
      const gdPrevalence = gdSubtypes.reduce((sum, subtype) => sum + (subtype.prevalence || 0), 0);

      // Calculate proper OR for combined GD using 2×2 contingency table
      // Reference group: "No Diabetes" from allDiabetesData.subtypes
      const noDiabetes = (allDiabetesData.subtypes || []).find(s => s.name === 'No Diabetes');
      let gdOddsRatio = 1.0;
      let gdConfidenceInterval = { lower: 1.0, upper: 1.0 };
      let gdPValue = 1.0;

      if (noDiabetes && totalGDCases > 0) {
        // 2×2 table: | GD | No Diabetes |
        //            | HL |  a  |    c    |
        //            | No |  b  |    d    |
        const a = totalGDHLCases;  // HL with GD
        const b = totalGDCases - totalGDHLCases;  // No HL with GD
        const c = noDiabetes.hearing_loss_cases || 0;  // HL without diabetes
        const d = (noDiabetes.total_cases || 0) - (noDiabetes.hearing_loss_cases || 0);  // No HL without diabetes

        if (a > 0 && b > 0 && c > 0 && d > 0) {
          gdOddsRatio = (a * d) / (b * c);

          // Calculate 95% CI using log-OR method
          const logOR = Math.log(gdOddsRatio);
          const seLogOR = Math.sqrt(1/a + 1/b + 1/c + 1/d);
          const z = 1.96; // 95% CI
          gdConfidenceInterval = {
            lower: Math.exp(logOR - z * seLogOR),
            upper: Math.exp(logOR + z * seLogOR)
          };
        }
      }

      // Create combined GD entry
      const combinedGD = {
        name: 'Gestational Diabetes',
        hearing_loss_rate: gdHearingLossRate,
        total_cases: totalGDCases,
        hearing_loss_cases: totalGDHLCases,
        prevalence: gdPrevalence,
        odds_ratio: gdOddsRatio,
        confidence_interval: gdConfidenceInterval,
        p_value: gdPValue,
        category: 'diabetes_subtype',
        significance: 'moderate',
        subtypes: gdSubtypes
      };

      // Show ONLY diabetes subtypes when expanded (hide all other risk factors)
      chartData = [
        combinedGD,
        ...otherSubtypes.map(subtype => ({
          name: subtype.name || 'Unknown',
          hearing_loss_rate: subtype.hearing_loss_rate || 0,
          total_cases: subtype.total_cases || 0,
          hearing_loss_cases: subtype.hearing_loss_cases || 0,
          prevalence: subtype.prevalence || 0,
          odds_ratio: subtype.odds_ratio,
          confidence_interval: subtype.confidence_interval,
          p_value: subtype.p_value,
          category: 'diabetes_subtype',
          significance: subtype.significance || 'none'
        }))
      ];
    }

    // Handle GD expansion
    if (expandedGD && expandedDiabetes && allDiabetesData) {
      // Show only GD subtypes
      const gdSubtypes = (allDiabetesData.subtypes || []).filter(subtype =>
        subtype.name && subtype.name.includes('Gestational Diabetes')
      );
      chartData = gdSubtypes.map(subtype => ({
        name: subtype.name || 'Unknown',
        hearing_loss_rate: subtype.hearing_loss_rate || 0,
        total_cases: subtype.total_cases || 0,
        hearing_loss_cases: subtype.hearing_loss_cases || 0,
        prevalence: subtype.prevalence || 0,
        odds_ratio: subtype.odds_ratio,
        confidence_interval: subtype.confidence_interval,
        p_value: subtype.p_value,
        category: 'gd_subtype',
        significance: subtype.significance || 'none'
      }));
    }

    const sortedData = chartData;

    // ADAPTIVE X-AXIS DOMAIN: Adjust scale based on current view
    // Use appropriate max scale for each configuration
    let maxRate;
    if (expandedGD) {
      // GD subtypes have very small values (< 1%)
      const maxValue = d3.max(sortedData, d => d.hearing_loss_rate || 0);
      maxRate = Math.ceil(maxValue * 1.2); // 20% padding above max value
    } else if (expandedDiabetes) {
      // Diabetes subtypes have small values (< 2%)
      const maxValue = d3.max(sortedData, d => d.hearing_loss_rate || 0);
      maxRate = Math.ceil(maxValue * 1.2);
    } else {
      // Initial view: adapt to actual data range instead of fixed 100%
      const maxValue = d3.max(sortedData, d => d.hearing_loss_rate || 0);
      maxRate = Math.ceil(maxValue * 1.3); // 30% padding for better visualization
      // Ensure minimum scale of 25% for readability
      maxRate = Math.max(maxRate, 25);
    }

    const x = d3.scaleLinear()
      .domain([0, maxRate])
      .range([0, width]);

    const barPadding = 4;
    const barHeight = barStep - barPadding;

    // FIXED Y-AXIS: Use the fixed height for all views, position bars at top
    const y = d3.scaleBand()
      .domain(sortedData.map(d => d.name))
      .range([0, sortedData.length * barStep]) // Only use space needed for current items
      .paddingInner(barPadding / barStep);

    const color = d3.scaleOrdinal()
      .domain(['high', 'moderate', 'low', 'none', 'primary_predictor', 'diabetes_subtype', 'gd_subtype'])
      .range(['#dc2626', '#f59e0b', '#6b7280', '#9ca3af', '#3b82f6', '#10b981', '#059669']);

    // Create enhanced tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "hl-chart-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.95)")
      .style("color", "white")
      .style("padding", "15px")
      .style("border-radius", "10px")
      .style("font-size", "13px")
      .style("z-index", "1000")
      .style("pointer-events", "none")
      .style("box-shadow", "0 8px 25px rgba(0,0,0,0.3)")
      .style("backdrop-filter", "blur(10px)")
      .style("max-width", "300px")
      .style("line-height", "1.4");

    // Create bars with sophisticated animations
    const bars = g.selectAll(".bar")
      .data(sortedData, d => d.name);

    // Remove old bars with fade out animation
    bars.exit()
      .transition()
      .duration(300)
      .attr("width", 0)
      .attr("opacity", 0)
      .remove();

    // Update existing bars
    bars.transition()
      .duration(500)
      .delay((d, i) => i * 50) // Staggered animation
      .ease(d3.easeCubicInOut)
      .attr("y", d => y(d.name))
      .attr("height", y.bandwidth())
      .attr("width", d => x(d.hearing_loss_rate || 0))
      .attr("fill", d => {
        // In initial view, color all bars (including All Types Diabetes) by significance
        if (!expandedDiabetes && !expandedGD) {
          return color(d.significance);
        }
        // In diabetes expanded view, all diabetes types green, "No Diabetes" gray
        if (d.category === 'diabetes_subtype') {
          if (d.name === 'No Diabetes') return '#9ca3af'; // Gray for reference group
          return '#10b981'; // Green for all diabetes types
        }
        // In GD subtype view, use green shades
        if (d.category === 'gd_subtype') {
          return color('gd_subtype');
        }
        // Fallback to significance
        return color(d.significance);
      });

    // Add new bars with slide-in animation
    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.name))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", 0) // Start with width 0
      .attr("fill", d => {
        // In initial view, color all bars (including All Types Diabetes) by significance
        if (!expandedDiabetes && !expandedGD) {
          return color(d.significance);
        }
        // In diabetes expanded view, all diabetes types green, "No Diabetes" gray
        if (d.category === 'diabetes_subtype') {
          if (d.name === 'No Diabetes') return '#9ca3af'; // Gray for reference group
          return '#10b981'; // Green for all diabetes types
        }
        // In GD subtype view, use green shades
        if (d.category === 'gd_subtype') {
          return color('gd_subtype');
        }
        // Fallback to significance
        return color(d.significance);
      })
      .attr("opacity", 0)
      .style("cursor", d => {
        if (d.name === 'All Types Diabetes') return 'pointer';
        if (d.name === 'Gestational Diabetes' && d.category === 'diabetes_subtype') return 'pointer';
        return 'default';
      })
      .transition()
      .duration(600)
      .delay((d, i) => i * 80) // Staggered entrance
      .ease(d3.easeBackOut.overshoot(0.3))
      .attr("width", d => x(d.hearing_loss_rate || 0))
      .attr("opacity", 0.8);

    // Apply interactions to all bars (both new and updated)
    g.selectAll(".bar")
      .on("mouseover", function(event, d) {
        const currentFill = d3.select(this).attr("fill");
        d3.select(this)
          .style("opacity", 1)
          .attr("fill", d3.color(currentFill).brighter(0.2).toString());

        let tooltipContent = `<strong>${d.name}</strong><br/>`;
        tooltipContent += `Prevalence: ${(d.prevalence || 0).toFixed(2)}%<br/>`;
        tooltipContent += `Hearing Loss Rate: ${(d.hearing_loss_rate || 0).toFixed(2)}%<br/>`;
        tooltipContent += `Cases: ${(d.hearing_loss_cases || 0).toLocaleString()} / ${(d.total_cases || 0).toLocaleString()}<br/>`;

        if (d.odds_ratio) {
          tooltipContent += `<br/><strong>Statistical Results:</strong><br/>`;
          tooltipContent += `Odds Ratio: ${d.odds_ratio.toFixed(3)}<br/>`;

          if (d.confidence_interval) {
            tooltipContent += `95% CI: (${d.confidence_interval.lower.toFixed(3)} - ${d.confidence_interval.upper.toFixed(3)})<br/>`;
          }

          if (d.p_value !== undefined) {
            tooltipContent += `P-value: ${d.p_value.toFixed(3)}<br/>`;
          }
        }

        if (d.study_note) {
          tooltipContent += `<br/><em>${d.study_note}</em><br/>`;
        }

        if (d.name === 'All Types Diabetes') {
          tooltipContent += `<br/><strong>💡 Click to view diabetes subtypes</strong>`;
        } else if (d.name === 'Gestational Diabetes' && d.category === 'diabetes_subtype') {
          tooltipContent += `<br/><strong>💡 Click to view GD subtypes</strong>`;
        }

        tooltip.style("visibility", "visible")
          .html(tooltipContent)
          .style("opacity", 0);
        tooltip.transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function(event, d) {
        const originalColor = (() => {
          if (d.category === 'primary_predictor') return color('primary_predictor');
          if (d.category === 'diabetes_subtype') {
            // Gray for "No Diabetes", green for all other diabetes subtypes
            return d.name === 'No Diabetes' ? '#9ca3af' : '#10b981';
          }
          if (d.category === 'gd_subtype') {
            // All GD subtypes should be green
            return color('gd_subtype');
          }
          return color(d.significance);
        })();

        d3.select(this)
          .style("opacity", 0.8)
          .attr("fill", originalColor);
        tooltip.transition()
          .duration(200)
          .style("opacity", 0)
          .on("end", function() {
            tooltip.style("visibility", "hidden");
          });
      })
      .on("click", function(event, d) {
        // Only allow expansion clicks, return icon handles going back
        if (d.name === 'All Types Diabetes') {
          setExpandedDiabetes(true);
          setExpandedGD(false);
        } else if (d.name === 'Gestational Diabetes' && d.category === 'diabetes_subtype') {
          setExpandedGD(true);
        }
      });

    // Add rate labels with animations
    const labels = g.selectAll(".bar-label")
      .data(sortedData, d => d.name);

    // Remove old labels with fade out
    labels.exit()
      .transition()
      .duration(300)
      .attr("opacity", 0)
      .remove();

    // Update existing labels
    labels.transition()
      .duration(500)
      .delay((d, i) => i * 50)
      .ease(d3.easeCubicInOut)
      .attr("x", d => x(d.hearing_loss_rate || 0) + 5)
      .attr("y", d => y(d.name) + y.bandwidth() / 2)
      .text(d => `${(d.hearing_loss_rate || 0).toFixed(2)}%`);

    // Add new labels with slide-in animation
    labels.enter().append("text")
      .attr("class", "bar-label")
      .attr("x", 5) // Start at left edge
      .attr("y", d => y(d.name) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", "var(--hl-title-color)")
      .style("opacity", 0)
      .text(d => `${(d.hearing_loss_rate || 0).toFixed(2)}%`)
      .transition()
      .duration(600)
      .delay((d, i) => i * 80 + 200) // Slight delay after bars
      .ease(d3.easeBackOut.overshoot(0.2))
      .attr("x", d => x(d.hearing_loss_rate || 0) + 5)
      .style("opacity", 1);

    // FIXED X-AXIS POSITION: Always at the bottom of fixed canvas
    // Remove tick marks and axis line, keep only labels
    const xAxis = g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${fixedHeight})`)
      .call(d3.axisBottom(x).tickFormat(d => `${d}%`).tickSize(0));

    // Remove the domain line (the horizontal axis line)
    xAxis.select(".domain").remove();

    // Y-AXIS: No line, no ticks, only text labels
    const yAxis = g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSize(0));

    // Remove the domain line (the vertical axis line)
    yAxis.select(".domain").remove();

    // Move all Y-axis labels further left to add spacing from bars
    yAxis.selectAll(".tick text")
      .attr("x", -15); // Move 15px further left (default is -9px)

    // Make y-axis labels interactive and handle long text
    yAxis.selectAll(".tick text")
      .style("cursor", d => {
        if (d === 'All Types Diabetes') return 'pointer';
        if (d === 'Gestational Diabetes' && expandedDiabetes && !expandedGD) return 'pointer';
        return 'default';
      })
      .style("transition", "all 0.2s ease")
      .each(function(d) {
        const textElement = d3.select(this);

        // Handle long GD subtype names when fully expanded
        if (expandedGD && d.includes('Gestational Diabetes')) {
          const originalText = d;
          let displayText = originalText;

          // Truncate long gestational diabetes names
          if (originalText.length > 25) {
            displayText = originalText.replace('Gestational Diabetes - ', 'GD - ');
          }
          if (displayText.length > 25) {
            displayText = displayText.substring(0, 22) + '...';
          }

          textElement.text(displayText);
        }

        if (d === 'All Types Diabetes') {
          // Clean button styling for All Types Diabetes
          textElement
            .style("fill", "#1e40af")
            .style("font-weight", "700")
            .style("font-size", "12px")
            .style("cursor", "pointer");

          // Add button background - using setTimeout to get accurate bounding box
          setTimeout(() => {
            const bbox = textElement.node().getBBox();
            const padding = { x: 12, y: 6 }; // Increased padding for better button appearance

            // Background rectangle - proper padding on both sides
            d3.select(this.parentNode).insert("rect", ":first-child")
              .attr("class", "clickable-button-bg")
              .attr("x", bbox.x - padding.x)
              .attr("y", bbox.y - padding.y)
              .attr("width", bbox.width + (padding.x * 2))
              .attr("height", bbox.height + (padding.y * 2))
              .attr("rx", 6)
              .attr("ry", 6)
              .style("fill", "#dbeafe")
              .style("stroke", "#3b82f6")
              .style("stroke-width", "1.5px")
              .style("cursor", "pointer")
              .style("transition", "all 0.2s ease");
          }, 10);
        } else if (d === 'Gestational Diabetes' && expandedDiabetes && !expandedGD) {
          // Button styling for Gestational Diabetes in diabetes view
          textElement
            .style("fill", "#1e40af")
            .style("font-weight", "700")
            .style("font-size", "11px")
            .style("cursor", "pointer");

          // Add button background for Gestational Diabetes
          setTimeout(() => {
            const bbox = textElement.node().getBBox();
            const padding = { x: 12, y: 6 };

            d3.select(this.parentNode).insert("rect", ":first-child")
              .attr("class", "clickable-button-bg-gd")
              .attr("x", bbox.x - padding.x)
              .attr("y", bbox.y - padding.y)
              .attr("width", bbox.width + (padding.x * 2))
              .attr("height", bbox.height + (padding.y * 2))
              .attr("rx", 6)
              .attr("ry", 6)
              .style("fill", "#dbeafe")
              .style("stroke", "#3b82f6")
              .style("stroke-width", "1.5px")
              .style("cursor", "pointer")
              .style("transition", "all 0.2s ease");
          }, 10);
        } else if (expandedDiabetes && !expandedGD) {
          // Style other diabetes subtypes when in diabetes view
          const color = d === 'No Diabetes' ? '#9ca3af' : '#10b981';
          textElement
            .style("fill", color)
            .style("font-weight", "600")
            .style("font-size", "10px");
        } else if (expandedGD) {
          // Style GD subtypes when in GD view
          textElement
            .style("fill", "#059669")
            .style("font-weight", "600")
            .style("font-size", "9px");
        }
      })
      .on("click", function(event, d) {
        // Only allow expansion clicks, return icon handles going back
        if (d === 'All Types Diabetes') {
          setExpandedDiabetes(true);
          setExpandedGD(false);
        } else if (d === 'Gestational Diabetes' && expandedDiabetes && !expandedGD) {
          setExpandedGD(true);
        }
      });

    // FIXED X-AXIS LABEL POSITION
    g.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", fixedHeight + 50)
      .style("font-size", "14px")
      .style("font-weight", "500")
      .style("fill", "var(--hl-title-color)")
      .text("Hearing Loss Rate (%)");

    // Add return icon when in expanded views
    if (expandedDiabetes || expandedGD) {
      const returnButton = g.append("g")
        .attr("class", "return-button")
        .style("cursor", "pointer")
        .attr("transform", `translate(-30, -25)`);

      // Return button background
      returnButton.append("circle")
        .attr("r", 18)
        .attr("fill", "#3b82f6")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
        .style("transition", "all 0.2s ease");

      // Return arrow icon (curved return arrow)
      returnButton.append("path")
        .attr("d", "M-6,-6 Q-10,-6 -10,-2 Q-10,2 -6,2 L4,2 M1,-1 L4,2 L1,5")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", "2")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

      // Return button interactions
      returnButton
        .on("mouseover", function() {
          d3.select(this).select("circle")
            .attr("fill", "#1e40af")
            .attr("r", 20);
        })
        .on("mouseout", function() {
          d3.select(this).select("circle")
            .attr("fill", "#3b82f6")
            .attr("r", 18);
        })
        .on("click", function(event) {
          event.stopPropagation();
          if (expandedGD) {
            setExpandedGD(false);
          } else if (expandedDiabetes) {
            setExpandedDiabetes(false);
            setExpandedGD(false);
          }
        });

      // Add tooltip for return button
      returnButton.append("title")
        .text(expandedGD ? "Back to diabetes types" : "Back to all risk factors");
    }

    // Add column headers to the right (similar to forest plot)
    g.append("text")
      .attr("x", width + 50)
      .attr("y", -15)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "var(--hl-title-color)")
      .text("Sample Size (N)");

    g.append("text")
      .attr("x", width + 150)
      .attr("y", -15)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "var(--hl-title-color)")
      .text("Odds Ratio");

    // Add N and OR columns for each risk factor with consistent positioning
    sortedData.forEach((d, i) => {
      const yPos = y(d.name) + y.bandwidth() / 2;

      // Sample size (N)
      g.append("text")
        .attr("x", width + 50)
        .attr("y", yPos)
        .attr("dy", "0.35em")
        .style("font-size", "11px")
        .style("fill", "var(--hl-body-color)")
        .text((d.total_cases || 0).toLocaleString());

      // Odds Ratio (if available)
      if (d.odds_ratio) {
        g.append("text")
          .attr("x", width + 150)
          .attr("y", yPos)
          .attr("dy", "0.35em")
          .style("font-size", "11px")
          .style("fill", "var(--hl-body-color)")
          .text(d.odds_ratio.toFixed(2));
      } else {
        g.append("text")
          .attr("x", width + 150)
          .attr("y", yPos)
          .attr("dy", "0.35em")
          .style("font-size", "11px")
          .style("fill", "var(--hl-muted-color)")
          .text("N/A");
      }
    });
  };

  useEffect(() => {
    if (data.length > 0 && allDiabetesData && chartRef.current) {
      drawChart();
    }
  }, [data, allDiabetesData, expandedDiabetes, expandedGD]);

  useEffect(() => {
    return () => {
      d3.selectAll('.hl-chart-tooltip').remove();
    };
  }, []);

  if (!isReady || data.length === 0) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-loading">Loading risk factors data...</div>
        </div>
      </div>
    );
  }

  // Helper function to calculate significance based on OR (same as in drawChart)
  const calculateSignificance = (or) => {
    if (!or || or === 1.0) return 'none';
    if (or > 5) return 'high';
    if (or >= 2) return 'moderate';
    return 'low';
  };

  // Recalculate significance for stat cards based on actual OR values
  // Include "All Types Diabetes" as an additional risk factor (not in original data array)
  const allTypesDiabetes = allDiabetesData ? {
    name: 'All Types Diabetes',
    odds_ratio: allDiabetesData.odds_ratio,
    significance: calculateSignificance(allDiabetesData.odds_ratio)
  } : null;

  const dataWithRecalculatedSignificance = data.map(d => ({
    ...d,
    significance: calculateSignificance(d.odds_ratio)
  }));

  // Add "All Types Diabetes" to the data for counting
  const allRiskFactors = allTypesDiabetes
    ? [...dataWithRecalculatedSignificance, allTypesDiabetes]
    : dataWithRecalculatedSignificance;

  const highRiskFactors = allRiskFactors.filter(d => d.significance === 'high');
  const moderateRiskFactors = allRiskFactors.filter(d => d.significance === 'moderate');
  const lowRiskFactors = allRiskFactors.filter(d => d.significance === 'low');
  const noRiskFactors = allRiskFactors.filter(d => d.significance === 'none');

  return (
    <div className="hl-section">
      <div className="hl-container">

        {/* Header */}
        <div className="hl-risk-factors-header">
          <h2>Risk Factor Landscape</h2>
          <p className="hl-risk-factors-subtitle">
            Exploring the prevalence and impact of various risk factors on hearing loss incidence
          </p>
        </div>

        {/* Analysis Focus */}
        <div className="hl-disclaimer-section">
          <ContentCard
            title="Analysis Focus"
            icon="📋"
            className="hl-content-card analysis-focus"
          >
            <p>
              This section presents univariate logistic regression results for a selection of risk factors.
              For the main narrative of this report, <strong>only gestational diabetes</strong> will be
              retained as the primary exposure variable in subsequent multivariable analyses.
            </p>
          </ContentCard>
        </div>

        {/* Key Finding */}
        <KeyFinding>
          Multiple risk factors documented in the literature demonstrated significant associations with
          congenital hearing loss in our cohort. While several diabetes subtypes, including gestational diabetes,
          exhibited modest odds ratios (OR &gt; 1), these preliminary univariate associations require
          multivariable adjustment to account for potential confounding and establish independent effects.
        </KeyFinding>

        {/* Main Chart */}
        <div className="hl-visualization-container">
          <div className="hl-chart-section">
            <h3>Hearing Loss Rates by Risk Factor</h3>
            <svg ref={chartRef}></svg>
          </div>

          {/* Categories Overview - Using StatCards */}
          <div className={`hl-categories-overview ${expandedDiabetes || expandedGD ? 'faded' : ''}`}>
            <StatCard
              label="Primary Predictor"
              value={1}
              description="All Types Diabetes (focus of study)"
              className="hl-stat-card primary-predictor"
              onMouseEnter={() => {
                setHoveredCategory('primary');
                setCategoryInfo({
                  title: 'Primary Predictor: All Types Diabetes',
                  items: allTypesDiabetes ? [allTypesDiabetes.name] : [],
                  description: 'This is the main exposure variable being studied. All diabetes types are combined to assess overall association with hearing loss.'
                });
              }}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setCategoryInfo(null);
              }}
            />

            <StatCard
              label="High Risk Factors"
              value={highRiskFactors.length}
              description="OR > 5 • Strong associations"
              className="hl-stat-card high-risk"
              onMouseEnter={() => {
                setHoveredCategory('high');
                setCategoryInfo({
                  title: 'High Risk Factors (OR > 5)',
                  items: highRiskFactors.map(f => `${f.name} (OR: ${f.odds_ratio?.toFixed(2)})`),
                  description: 'These factors show the strongest associations with hearing loss, representing primarily genetic and congenital conditions.'
                });
              }}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setCategoryInfo(null);
              }}
            />

            <StatCard
              label="Moderate Risk"
              value={moderateRiskFactors.length}
              description="OR 2-5 • Moderate associations"
              className="hl-stat-card moderate-risk"
              onMouseEnter={() => {
                setHoveredCategory('moderate');
                setCategoryInfo({
                  title: 'Moderate Risk Factors (OR 2-5)',
                  items: moderateRiskFactors.map(f => `${f.name} (OR: ${f.odds_ratio?.toFixed(2)})`),
                  description: 'These factors show moderate associations with hearing loss, often representing prenatal or perinatal conditions.'
                });
              }}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setCategoryInfo(null);
              }}
            />

            <StatCard
              label="Low/No Risk"
              value={lowRiskFactors.length + noRiskFactors.length}
              description="OR ≤ 2 • Weak/no associations"
              className="hl-stat-card low-risk"
              onMouseEnter={() => {
                setHoveredCategory('low');
                const combinedFactors = [...lowRiskFactors, ...noRiskFactors];
                setCategoryInfo({
                  title: 'Low/No Risk Factors (OR ≤ 2)',
                  items: combinedFactors.map(f => `${f.name} (OR: ${f.odds_ratio?.toFixed(2)})`),
                  description: 'These factors show weak or no significant associations with hearing loss in univariate analysis.'
                });
              }}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setCategoryInfo(null);
              }}
            />
          </div>

          {/* Category Info Panel */}
          {categoryInfo && (
            <div className="category-info-panel">
              <h4>{categoryInfo.title}</h4>
              <p className="category-info-description">{categoryInfo.description}</p>
              <div className="category-info-items">
                {categoryInfo.items.map((item, idx) => (
                  <div key={idx} className="category-info-item">{item}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Analysis */}
        <AnalysisCard
          icon="⚖️"
          title="Clinical Context: Strong vs. Modifiable Risk Factors"
          className="hl-analysis-card secondary-analysis full-width"
        >
          <p>
            The strongest univariate associations—craniofacial abnormalities (OR=82.8), syndromic conditions (OR=53.5),
            and family history (OR=14.4)—represent well-established, largely non-modifiable risk factors that are
            typically identified at birth or through genetic screening. In contrast, gestational diabetes, despite its
            modest univariate odds ratio (OR=1.19), represents a potentially preventable maternal condition affecting
            over 38,000 pregnancies in our cohort. Understanding whether this association persists after adjusting for
            confounding factors has important implications for prenatal counseling and public health interventions
            targeting modifiable risk factors.
          </p>
          <div className="hl-analysis-stats">
            <div className="hl-stat-item">
              <span className="hl-stat-value">11</span>
              <span className="hl-stat-label">Risk factors evaluated</span>
            </div>
            <div className="hl-stat-item">
              <span className="hl-stat-value">328K+</span>
              <span className="hl-stat-label">Pregnancies analyzed</span>
            </div>
          </div>
        </AnalysisCard>

        {/* Transition */}
        <TransitionCard
          icon="📊"
          title="From Broad Risk Factor Screening to Focused Analysis"
          description="Having examined multiple risk factors in isolation, we now turn our attention to gestational diabetes—our primary predictor of interest. Before proceeding to complex multivariable modeling, we perform a direct statistical comparison between gestational diabetes and non-diabetes groups to establish baseline differences in hearing loss rates. This targeted analysis provides essential context for subsequent adjusted analyses."
          className="hl-risk-factors-transition"
        />

      </div>
    </div>
  );
};

export default RiskFactorsSection;