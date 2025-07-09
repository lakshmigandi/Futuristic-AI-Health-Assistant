import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { StepTrend } from '../types/health';

interface LineChartProps {
  data: StepTrend[];
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
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

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.averageSteps) || 0])
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<StepTrend>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.averageSteps))
      .curve(d3.curveMonotoneX);

    // Area generator for gradient fill
    const area = d3
      .area<StepTrend>()
      .x(d => xScale(d.date))
      .y0(innerHeight)
      .y1(d => yScale(d.averageSteps))
      .curve(d3.curveMonotoneX);

    // Gradient definition
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'stepGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', innerHeight)
      .attr('x2', 0).attr('y2', 0);

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10B981')
      .attr('stop-opacity', 0.1);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#10B981')
      .attr('stop-opacity', 0.8);

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'line-tooltip')
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
      .datum(data)
      .attr('fill', 'url(#stepGradient)')
      .attr('d', area);

    // Add line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10B981')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.averageSteps))
      .attr('r', 4)
      .attr('fill', '#10B981')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`
            <strong>Date:</strong> ${d.date.toLocaleDateString()}<br/>
            <strong>Average Steps:</strong> ${d.averageSteps.toLocaleString()}<br/>
            <strong>Records:</strong> ${d.count}
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 6);
      })
      .on('mouseout', (event) => {
        tooltip.transition().duration(500).style('opacity', 0);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 4);
      });

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%m/%d')));

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale));

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
      .text('Date');

    // Chart title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Step Count Trends Over Time');

    // Cleanup tooltip on unmount
    return () => {
      d3.select('.line-tooltip').remove();
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

export default LineChart;