"use client";

import { useState, useEffect } from 'react';


export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<{width:number, height:number, small : boolean, document: Document | null}>({width : 600, height : 900, small : true, document : null});

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimensions({width, height, small : width < 640, document : document});
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};