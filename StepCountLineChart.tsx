import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AgeGroup } from '../types/health';

interface StepCountLineChartProps {
  data: AgeGroup[];
  width?: number;
  height?: number;
}

/**
 * StepCountLineChart Component
 * 
 * Creates a line chart showing average step count by age group
 * to demonstrate the inverse relationship between age and physical activity
 */
const StepCountLineChart: React.FC<StepCountLineChartProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Convert age ranges to numeric values for proper scaling
    const dataWithNumericAge = data.map(d => ({
      ...d,
      numericAge: d.minAge + (d.maxAge - d.minAge) / 2
    }));

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(dataWithNumericAge, d => d.numericAge) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataWithNumericAge, d => d.averageStepCount || 0) || 10000])
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<typeof dataWithNumericAge[0]>()
      .x(d => xScale(d.numericAge))
      .y(d => yScale(d.averageStepCount || 0))
      .curve(d3.curveMonotoneX);

    // Area generator for gradient fill
    const area = d3
      .area<typeof dataWithNumericAge[0]>()
      .x(d => xScale(d.numericAge))
      .y0(innerHeight)
      .y1(d => yScale(d.averageStepCount || 0))
      .curve(d3.curveMonotoneX);

    // Gradient definition
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'stepCountGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', innerHeight)
      .attr('x2', 0).attr('y2', 0);

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#F59E0B')
      .attr('stop-opacity', 0.1);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#F59E0B')
      .attr('stop-opacity', 0.8);

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'step-line-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('font-size', '12px')
      .style('pointer-events', 'none');

    // Add area
    g.append('path')
      .datum(dataWithNumericAge)
      .attr('fill', 'url(#stepCountGradient)')
      .attr('d', area);

    // Add line
    g.append('path')
      .datum(dataWithNumericAge)
      .attr('fill', 'none')
      .attr('stroke', '#F59E0B')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add dots
    g.selectAll('.dot')
      .data(dataWithNumericAge)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.numericAge))
      .attr('cy', d => yScale(d.averageStepCount || 0))
      .attr('r', 5)
      .attr('fill', '#F59E0B')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`
            <strong>Age Group:</strong> ${d.ageRange}<br/>
            <strong>Average Steps:</strong> ${(d.averageStepCount || 0).toLocaleString()}<br/>
            <strong>Sample Size:</strong> ${d.count} people
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 7);
      })
      .on('mouseout', (event) => {
        tooltip.transition().duration(500).style('opacity', 0);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 5);
      });

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `${d} yrs`));

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d => `${d3.format('.1s')(d as number)}`));

    // Axis labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (innerHeight / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Average Daily Steps');

    g.append('text')
      .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Age Groups');

    // Chart title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Step Count Trends by Age Group');

    // Trend annotation
    g.append('text')
      .attr('x', innerWidth - 100)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#F59E0B')
      .style('font-weight', 'bold')
      .text('↘ Decreasing Trend');

    // Cleanup tooltip on unmount
    return () => {
      d3.select('.step-line-tooltip').remove();
    };
  }, [data, width, height]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg bg-white"
      />
    </div>
  );
};

export default StepCountLineChart;