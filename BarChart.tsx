import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AgeGroup } from '../types/health';

interface BarChartProps {
  data: AgeGroup[];
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.ageRange))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.averageHeartRate) || 0])
      .range([innerHeight, 0]);

    // Color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, d => d.averageHeartRate) || 0]);

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('font-size', '12px')
      .style('pointer-events', 'none');

    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.ageRange) || 0)
      .attr('y', innerHeight)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', d => colorScale(d.averageHeartRate))
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`
            <strong>Age Group:</strong> ${d.ageRange}<br/>
            <strong>Average Heart Rate:</strong> ${d.averageHeartRate.toFixed(1)} bpm<br/>
            <strong>Sample Size:</strong> ${d.count} people
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('opacity', 0.7);
      })
      .on('mouseout', (event) => {
        tooltip.transition().duration(500).style('opacity', 0);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('opacity', 1);
      })
      .transition()
      .duration(1000)
      .attr('y', d => yScale(d.averageHeartRate))
      .attr('height', d => innerHeight - yScale(d.averageHeartRate));

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

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
      .text('Average Heart Rate (bpm)');

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
      .text('Average Heart Rate by Age Group');

    // Cleanup tooltip on unmount
    return () => {
      d3.select('.tooltip').remove();
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

export default BarChart;