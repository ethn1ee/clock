"use client";

import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import Image from "next/image";

const RootPage = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    const update = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(update);
  }, []);

  if (!time) return null;

  return (
    <main className="relative h-svh w-svw">
      <Image
        src="/forest-texture.webp"
        alt="forest texture"
        fill
        className="opacity-10 object-cover -z-10"
      />
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-1/2">
        <div className="flex gap-2 text-4xl">
          {[time.getHours(), time.getMinutes(), time.getSeconds()].map(
            (item, i) => (
              <Fragment key={i}>
                <ScrollingText>
                  {item.toString().padStart(2, "0")}
                </ScrollingText>
                <span className="last:hidden leading-none">:</span>
              </Fragment>
            ),
          )}
        </div>

        <div className="mt-4 text-secondary-foreground flex gap-1">
          {[time.getFullYear(), time.getMonth(), time.getDate()].map(
            (item, i) => (
              <Fragment key={i}>
                <ScrollingText>
                  {item.toString().padStart(2, "0")}
                </ScrollingText>
                <span className="last:hidden leading-none">/</span>
              </Fragment>
            ),
          )}
        </div>
      </div>
    </main>
  );
};

export default RootPage;

const ascii = [
  ...Array(256)
    .keys()
    .filter((a) => a > 32) // skipping non-printable characters and a space
    .map((char) => String.fromCharCode(char)),
] as const;

const ScrollingText = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  if (typeof children != "string") throw new Error("children must be a string");

  const fontSize = parseFloat(
    ref.current?.computedStyleMap().get("font-size")?.toString() ?? "16",
  );

  return (
    <motion.div ref={ref} className="flex overflow-hidden">
      {children
        .split("")
        .map((char) => char.charCodeAt(0) - 33)
        .map((char, i) => (
          <div
            key={i}
            style={{ height: fontSize }}
            className="relative **:leading-none"
          >
            <div>&nbsp;</div>
            <motion.div
              animate={{ top: -(char * (fontSize + 4)) }}
              transition={{ ease: "easeOut", duration: 0.8 }}
              className="flex flex-col gap-[4px] absolute"
            >
              {ascii.map((a, j) => (
                <motion.div
                  key={j}
                  animate={{ opacity: j === char ? 1 : 0.3 }}
                  transition={{ ease: "easeOut", duration: 0.8 }}
                >
                  {a}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
    </motion.div>
  );
};
