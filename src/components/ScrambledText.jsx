import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+<>?/|";

const ScrambledText = ({
  text,
  duration = 1400,
  startDelay = 0,
  className,
}) => {
  const [display, setDisplay] = useState(() => text.replace(/\S/g, " "));
  const frameRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    const letters = text.split("");
    const totalFrames = Math.max(Math.floor(duration / 40), letters.length);
    let frame = 0;

    const update = () => {
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * letters.length);
      const next = letters
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return char;
          const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
          return CHARACTERS[randomIndex];
        })
        .join("");

      setDisplay(next);
      frame += 1;

      if (frame <= totalFrames) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplay(text);
      }
    };

    timeoutRef.current = window.setTimeout(() => {
      frame = 0;
      frameRef.current = requestAnimationFrame(update);
    }, startDelay);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, duration, startDelay]);

  return (
    <span className={clsx("inline-block align-middle", className)}>
      {display}
    </span>
  );
};

export default ScrambledText;
