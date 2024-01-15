"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";
import { useInterval } from "@/helpers/useInterval";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayMode = () => {
    setIsPlaying((p) => !p);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeElapsed(0);
  };

  useInterval(
    () => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    },
    isPlaying ? 1000 : null
  );

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={color.value}
              style={{
                zIndex: isSelected === index ? 1 : 2,
              }}
            >
              {isSelected && (
                <motion.div
                  layoutId="hovered-backdrop"
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={togglePlayMode}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
