import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HealthRecord } from '../types/health';

interface ScatterPlotProps {
  data: HealthRecord[];
  width?: number;
  height?: number;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 100, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.age) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.glucoseLevel) as [number, number])
      .range([innerHeight, 0]);

    // Color scale for diabetes status
    const colorScale = d3
      .scaleOrdinal<boolean, string>()
      .domain([true, false])
      .range(['#EF4444', '#10B981']);

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'scatter-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('font-size', '12px')
      .style('pointer-events', 'none');

    // Add dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.age))
      .attr('cy', d => yScale(d.glucoseLevel))
      .attr('r', 5)
      .attr('fill', d => colorScale(d.hasDiabetes))
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .attr('opacity', 0.7)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`
            <strong>Age:</strong> ${d.age} years<br/>
            <strong>Glucose Level:</strong> ${d.glucoseLevel} mg/dL<br/>
            <strong>Heart Rate:</strong> ${d.heartRate} bpm<br/>
            <strong>Steps:</strong> ${d.stepCount.toLocaleString()}<br/>
            <strong>Diabetes:</strong> ${d.hasDiabetes ? 'Yes' : 'No'}<br/>
            <strong>Gender:</strong> ${d.gender}
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 7)
          .attr('opacity', 1);
      })
      .on('mouseout', (event) => {
        tooltip.transition().duration(500).style('opacity', 0);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 5)
          .attr('opacity', 0.7);
      });

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

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
      .text('Glucose Level (mg/dL)');

    g.append('text')
      .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Age (years)');

    // Chart title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Diabetes Risk Factors: Age vs Glucose Level');

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 20})`);

    const legendData = [
      { label: 'Has Diabetes', color: '#EF4444' },
      { label: 'No Diabetes', color: '#10B981' }
    ];

    legend.selectAll('.legend-item')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)
      .each(function(d) {
        const item = d3.select(this);
        
        item.append('circle')
          .attr('r', 6)
          .attr('fill', d.color)
          .attr('stroke', 'white')
          .attr('stroke-width', 1);
        
        item.append('text')
          .attr('x', 15)
          .attr('y', 5)
          .style('font-size', '12px')
          .style('font-weight', '500')
          .text(d.label);
      });

    // Cleanup tooltip on unmount
    return () => {
      d3.select('.scatter-tooltip').remove();
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

export default ScatterPlot;