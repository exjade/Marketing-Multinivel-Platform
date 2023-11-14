import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

const AnimatedGraph = ({ data, duration }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const bars = svg.querySelectorAll('.bar');

    bars.forEach((bar, index) => {
      // const { height } = bar.getBoundingClientRect();
      bar.style.height = '0';

      setTimeout(() => {
        bar.style.height = `${data[index]}%`;
      }, index * duration);
    });
  }, [data, duration]);

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" width="100" height="100">
      {data.map((value, index) => (
        <rect
          key={index}
          className="bar"
          x={index * 25}
          y={200 - value}
          width="20"
          height="0"
          fill='#B5E7BD'
        />
      ))}
    </svg>
  );
};

export default AnimatedGraph;

AnimatedGraph.propTypes = {
  data: PropTypes.any,
  duration: PropTypes.any,
}