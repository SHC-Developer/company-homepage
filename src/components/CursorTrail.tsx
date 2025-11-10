import { useEffect, useRef } from "react";

const TRAIL_COUNT = 8;
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input[type='button'], input[type='submit'], input[type='reset'], input[type='checkbox'], input[type='radio'], summary, label, select, textarea";

const CursorTrail = () => {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const positionsRef = useRef<Array<{ x: number; y: number }>>([]);
  const fadeTimeoutRef = useRef<number | undefined>(undefined);
  const interactiveRef = useRef(false);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL ?? "/";
    const defaultCursor = `${baseUrl}mugungwha32.png`;
    const pointerCursor = `${baseUrl}mugungwha32-2.png`;

    document.documentElement.style.setProperty(
      "--cursor-default-url",
      `url("${defaultCursor}")`,
    );
    document.documentElement.style.setProperty(
      "--cursor-pointer-url",
      `url("${pointerCursor}")`,
    );

    return () => {
      document.documentElement.style.setProperty(
        "--cursor-default-url",
        "",
      );
      document.documentElement.style.setProperty(
        "--cursor-pointer-url",
        "",
      );
    };
  }, []);

  useEffect(() => {
    const updateInteractiveState = (target: EventTarget | null) => {
      const isInteractive =
        target instanceof Element &&
        Boolean(target.closest(INTERACTIVE_SELECTOR));

      if (interactiveRef.current !== isInteractive) {
        interactiveRef.current = isInteractive;
        document.body.classList.toggle("cursor-interactive", isInteractive);
      }
    };

    const handleMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      updateInteractiveState(event.target);

      const positions = positionsRef.current;
      positions.unshift({ x: clientX, y: clientY });

      if (positions.length > TRAIL_COUNT) {
        positions.length = TRAIL_COUNT;
      }

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        const position = positions[index] ?? positions[positions.length - 1];
        if (!position) return;

        const size = dot.offsetWidth;
        dot.style.setProperty("--cursor-x", `${position.x - size / 2}px`);
        dot.style.setProperty("--cursor-y", `${position.y - size / 2}px`);
        dot.style.opacity = `${Math.max(0.15, 1 - index / TRAIL_COUNT)}`;
      });

      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }

      fadeTimeoutRef.current = window.setTimeout(() => {
        dotsRef.current.forEach((dot) => {
          if (dot) {
            dot.style.opacity = "0";
          }
        });
      }, 140);
    };

    const handleLeave = () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      interactiveRef.current = false;
      document.body.classList.remove("cursor-interactive");
      dotsRef.current.forEach((dot) => {
        if (dot) {
          dot.style.opacity = "0";
        }
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      document.body.classList.remove("cursor-interactive");
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, index) => (
        <div
          key={index}
          className="cursor-trail-dot"
          ref={(element) => {
            if (element) {
              dotsRef.current[index] = element;
            } else {
              dotsRef.current.splice(index, 1);
            }
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;

