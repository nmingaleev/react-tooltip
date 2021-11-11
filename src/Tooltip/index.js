import React, { Children, useRef, useEffect, useState, cloneElement } from 'react';
import { createPortal } from 'react-dom';

import { getTooltipPosition } from './utils';

import './styles.css';

export const Tooltip = ({ children, position, gap, tooltipContent }) => {
  const child = Children.only(children);
  const childRef = useRef();
  const tooltipRef = useRef();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = childRef.current;
    if (!el) return;

    const handleMouseEnter = () => {
      setIsVisible(true);

      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      const { left, top } = getTooltipPosition(el, tooltip, position, gap);

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [childRef.current, tooltipRef.current, position, gap]);

  const setRef = (el) => {
    childRef.current = el;

    const { ref } = child;

    if (ref) {
      ref.current = el;
    }
  };

  return (
    <>
      {cloneElement(child, { ref: setRef })}

      {isVisible && createPortal(
        <div ref={tooltipRef} className="tooltip">
          {tooltipContent}
        </div>,
        document.getElementsByTagName('body')[0]
      )}
    </>
  );
};
