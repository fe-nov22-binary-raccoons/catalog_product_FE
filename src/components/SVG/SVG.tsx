/* eslint-disable max-len */
import React, { memo, ReactNode, RefObject, useEffect, useState } from 'react';

interface SVGProps {
  svg: string;
  children?: ReactNode;

  trigger?: RefObject<HTMLDivElement> | undefined;
  alt: string;
  isOnlyLayout?: boolean;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  defaultColor?: string;
  transition?: string;
  classForImg?: string;
  light: string;
}

type MouseEventTriggerVariant = 'enter' | 'leave';

/**
 * @param svg - svg for prepare,
 * @syntax const SVG = '<svg></svg>'
 *
 * @param fromColor - initial color of svg (in HEX format)
 * @param toColor - color in which svg will be repainted
 * @returns svg with changed color
 */
const ReColorSvg = (
  svg: string,
  fromColor: string,
  toColor = '',
  light = '',
) => {
  const normalizeFromColor = fromColor.replace('#', '%23');

  if (light) {
    return svg.replaceAll(light, normalizeFromColor);
  }

  if (toColor) {
    const normalizeToColor = toColor.replace('#', '%23');

    // eslint-disable-next-line no-console
    console.log('inside', normalizeFromColor, normalizeToColor);

    return svg.replaceAll(normalizeFromColor, normalizeToColor);
  }

  return svg.replaceAll(fromColor, normalizeFromColor);
};

/**
 *
 * @param svg - svg for changing color
 * @param hoverColor - change the svg color when mouse on svg
 * @param isOnlyLayout - only layout without Hover effect
 * @param transition - set the transition for hover (e.g. '1s')
 * @param trigger - set trigger for hover (accept a ref)
 * @param defaultColor - set default color in svg (or the most dominant)
 * @param alt - native alt attribute for img
 * @param hoverBackgroundColor - set background color for trigger ref
 * @returns the img tag with the SVG in src attribute
 */
export const SVG: React.FC<SVGProps> = memo((props) => {
  const {
    svg,
    hoverColor,
    isOnlyLayout,
    transition,
    trigger,
    defaultColor,
    alt,
    hoverBackgroundColor,
    classForImg,
    light,
  } = props;

  const [newSVG, setNewSVG] = useState(ReColorSvg(svg, `${defaultColor}`));

  useEffect(() => {
    setNewSVG(ReColorSvg(svg, `${defaultColor}`, '', light));
  }, [defaultColor]);

  // eslint-disable-next-line no-console
  console.log(newSVG);
  // eslint-disable-next-line no-console
  console.log(defaultColor);
  // eslint-disable-next-line no-console
  console.log(hoverColor);

  const MouseSVGTrigger = (type: MouseEventTriggerVariant) => {
    setNewSVG(
      type === 'enter'
        ? ReColorSvg(newSVG, `${defaultColor}`, `${hoverColor}`)
        : ReColorSvg(newSVG, `${hoverColor}`, `${defaultColor}`),
    );
    if (trigger && trigger.current) {
      trigger.current.style.backgroundColor
        = type === 'enter' ? `${defaultColor}` : `${hoverBackgroundColor}`;
      trigger.current.style.transition = `${transition}`;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const ref_node = trigger?.current;

    const RunMouseEnter = () =>
      ref_node?.addEventListener('mouseenter', () => MouseSVGTrigger('enter'));
    const RunMouseLeave = () =>
      ref_node?.addEventListener('mouseleave', () => MouseSVGTrigger('leave'));

    if (trigger) {
      RunMouseEnter();
      RunMouseLeave();
    }

    return () => {
      if (trigger) {
        ref_node?.removeEventListener('mouseenter', () => RunMouseEnter());
        ref_node?.removeEventListener('mouseleave', () => RunMouseLeave());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // don't add any mouse events for improving perfomance
  if (isOnlyLayout) {
    return <img src={`data:image/svg+xml;utf8,${newSVG}`} alt={alt} />;
  }

  return (
    <img
      src={`data:image/svg+xml;utf8,${newSVG}`}
      onMouseEnter={() =>
        typeof trigger !== 'undefined' ? null : MouseSVGTrigger('enter')
      }
      onMouseLeave={() =>
        typeof trigger !== 'undefined' ? null : MouseSVGTrigger('leave')
      }
      alt={alt}
      className={classForImg}
    />
  );
});

SVG.displayName = 'SVG';
