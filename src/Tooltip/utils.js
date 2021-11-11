export const getTooltipPosition = (el, tooltip, position, gap) => {
  const { top: elTop, left: elLeft, height: elHeight, width: elWidth } = el.getBoundingClientRect();
  const { width: tooltipWidth, height: tooltipHeight } = tooltip.getBoundingClientRect();

  let correctedLeft = elLeft;
  let correctedTop = elTop;

  switch (position) {
    case 'top': {
      correctedLeft = correctedLeft + elWidth / 2 - tooltipWidth / 2;
      correctedTop = correctedTop - gap - tooltipHeight;
      break;
    }
    case 'left': {
      correctedLeft = elLeft - gap - tooltipWidth;
      correctedTop = correctedTop + elHeight / 2 - tooltipHeight / 2;
      break;
    }
    case 'right': {
      correctedLeft = correctedLeft + elWidth + gap;
      correctedTop = correctedTop + elHeight / 2 - tooltipHeight / 2;
      break;
    }
    case 'bottom':
    default:
      correctedLeft = correctedLeft + elWidth / 2 - tooltipWidth / 2;
      correctedTop = correctedTop + elHeight + gap;
  }

  return {
    left: correctedLeft,
    top: correctedTop,
  };
}