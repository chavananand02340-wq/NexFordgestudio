import { useEffect, useRef, useState } from "react";

// A tiny, dependency-free scroll-reveal primitive. Each section wraps its
// content in this once, instead of every section inventing its own
// IntersectionObserver + animation logic. Keeps the motion consistent
// (same easing/timing everywhere) and keeps the cost low -- one observer
// per element, disconnected the moment it has revealed once.
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
