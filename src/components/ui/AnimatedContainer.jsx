import { useRef, useEffect, useState } from "react";

const AnimatedContainer = ({
  children,
  className = "",
  style = {},
  duration = 300,
  easing = "ease-in-out",
  disabled = false,
  ...rest
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("auto");

  useEffect(() => {
    if (contentRef.current && !disabled) {
      const updateHeight = () => {
        setHeight(`${contentRef.current.scrollHeight}px`);
      };

      updateHeight();

      // Set up a resize observer to detect content changes
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(contentRef.current);

      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current);
        }
      };
    }
  }, [children, disabled]);

  const containerStyle = disabled
    ? style
    : {
        ...style,
        height,
        transition: `height ${duration}ms ${easing}`,
        overflow: "hidden",
      };

  return (
    <div className={className} style={containerStyle} {...rest}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default AnimatedContainer;
