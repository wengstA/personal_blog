import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  noLoop?: boolean;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
  cursorClassName,
  noLoop = false,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex].text;
      
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        // If completed typing current word
        if (currentText.length === currentWord.length) {
          // If this is the last word and noLoop is true, don't delete
          if (noLoop && currentWordIndex === words.length - 1) {
            // Just stay here indefinitely
            setTypingSpeed(Infinity);
          } else {
            // Pause before starting to delete
            setTypingSpeed(1500);
            setIsDeleting(true);
          }
        } else {
          // Normal typing speed
          setTypingSpeed(150);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        // If completed deleting current word
        if (currentText.length === 0) {
          setIsDeleting(false);
          // Move to next word
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          // Pause before starting to type next word
          setTypingSpeed(700);
        } else {
          // Deleting speed
          setTypingSpeed(70);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words]);

  return (
    <div className={cn("flex flex-row items-center gap-[2px]", className)}>
      {/* 创建一个固定宽度的容器来保持文字位置稳定 */}
      <div className="relative min-w-[20px] whitespace-nowrap">
        {/* 当前显示的文字 */}
        <span className={cn(
          words[currentWordIndex]?.className
        )}>
          {currentText}
        </span>
      </div>
      {/* 光标 */}
      <span
        className={cn(
          "h-5 w-[2px] animate-blink bg-primary",
          cursorClassName
        )}
      />
    </div>
  );
};
