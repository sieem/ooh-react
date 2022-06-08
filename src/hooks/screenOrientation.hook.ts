import { useState, useEffect } from 'react';

export const useScreenOrientation = (): OrientationType => {
  const [state, setState] = useState<OrientationType>(window.screen.orientation.type);

  useEffect(() => {
    const handleChange = () => {
      setState(window.screen.orientation.type);
    };
    window.screen.orientation.addEventListener('change', handleChange);
    return () => window.screen.orientation.removeEventListener('change', handleChange);
    
  }, []);

  return state;
};
