import { useState, useEffect, useCallback } from 'react';

interface IntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
}: IntersectionObserverProps = {}) => {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  // This function will be called with the DOM node when it mounts
  const ref = useCallback((node: Element | null) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  useEffect(() => {
    if (!node) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [node, threshold, root, rootMargin]);

  return { ref, inView };
};
