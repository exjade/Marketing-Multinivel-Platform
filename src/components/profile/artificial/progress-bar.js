import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({ user }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const percentage = Math.min((user?.Profit / (user?.Applied * 2)) * 100, 100).toFixed(0);
      setPercentage(percentage);
    };

    calculateProgress();
  }, [user?.Applied, user?.Profit]);

  const loadingValue = isNaN(percentage) ? `0%` : `${percentage}%`;

  return (
    <div
      className='flex-col justify-center items-center gap-4 p-3 w-full h-full flex'>
      <CircularProgressbar
        value={percentage}
        text={`${loadingValue}`}
        circleRatio='1'
        className='w-44 h-44'
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `rgba(62, 152, 199, ${percentage / 100})`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Customize transition animation
            transition: 'stroke-dashoffset 0.5s ease 0s',
            // Rotate the path
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: '#d6d6d6',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Rotate the trail
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the text
          text: {
            // Text color
            fill: '#000000',
            // Text size
            fontSize: '16px',
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: '#259682',
          },
        }}
      />
    </div>
  );
}
export default CircularProgressBar;

CircularProgressBar.propTypes = {
  user: PropTypes.object
}