import React, { useEffect } from 'react';

const CalendlyWidget = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div   className='mt-32'>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/artificialtech4u/el-metodo-night-meetting-con-leonardo-macalister?background_color=17171f&text_color=ffffff"
        style={{ minWidth: '320px', height: '900px' }} // Ajusta el tamaño según tus preferencias
      />
    </div>
  );
};

export default CalendlyWidget;
