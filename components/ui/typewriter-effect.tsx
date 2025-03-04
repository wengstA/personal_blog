import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
  cursorClassName,
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
          // Pause before starting to delete
          setTypingSpeed(1500);
          setIsDeleting(true);
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
    <div className={cn("flex items-center space-x-1", className)}>
      <span className="inline-block">
        {words.map((word, idx) => (
          <span
            key={idx}
            className={cn(
              "absolute opacity-0",
              idx === currentWordIndex && "opacity-100",
              word.className
            )}
          >
            {idx === currentWordIndex ? currentText : word.text}
          </span>
        ))}
      </span>
      <span
        className={cn(
          "inline-block h-5 w-[2px] animate-blink bg-primary",
          cursorClassName
        )}
      />
    </div>
  );
};
