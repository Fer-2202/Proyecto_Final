import React, { createContext, useContext, useEffect, useState } from 'react';

const LayoutTransitionContext = createContext();

export const LayoutTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (duration = 1200) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, duration);
  };

  return (
    <LayoutTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </LayoutTransitionContext.Provider>
  );
};

export const useLayoutTransition = () => useContext(LayoutTransitionContext);

