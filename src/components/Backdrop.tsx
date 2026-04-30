"use client";

import { useEffect, useRef, useState } from "react";

type Props = { show: boolean; onClose: () => void };

export function Backdrop({ show, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const armedAt = useRef<number>(0);

  useEffect(() => {
    if (show) {
      armedAt.current = performance.now();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(false), 320);
    return () => clearTimeout(t);
  }, [show]);

  if (!mounted) return null;

  const handleClick = () => {
    if (performance.now() - armedAt.current < 350) return;
    onClose();
  };

  return (
    <div
      className={`backdrop${show ? " show" : ""}`}
      onClick={handleClick}
      aria-hidden
    />
  );
}
