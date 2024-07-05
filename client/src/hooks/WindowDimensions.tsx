import { useState, useEffect } from 'react';


export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({width : 1600, height : 900});

  useEffect(() => {
    function handleResize() {
        const { innerWidth: width, innerHeight: height } = window;
        setWindowDimensions({width, height});
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};