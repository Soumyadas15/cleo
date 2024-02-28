import { useEffect, useState } from 'react';

export const useScrollPosition = (): number => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const calculateScrollPercentage = (): void => {
    const windowHeight: number = window.innerHeight;
    const documentHeight: number = document.documentElement.scrollHeight - windowHeight;
    const scrolled: number = window.scrollY;

    const percentage: number = (scrolled / documentHeight) * 100;

    setScrollPercentage(percentage);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      calculateScrollPercentage();
    };

    window.addEventListener('scroll', handleScroll);

    // Initial calculation
    calculateScrollPercentage();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPercentage;
};
