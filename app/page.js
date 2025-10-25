'use client'
import { useEffect, useRef, useState } from "react";
import { Button, Typography } from "antd";
import FullscreenMenu from "./components/Menu";
import { gsap } from "gsap";

const { Text, Title } = Typography;

export default function Page() {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // ورود اولیه متن و دکمه
    gsap.from(buttonRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  const handleEnter = () => {
    setLoading(true);

    // انیمیشن لودینگ
    const tl = gsap.timeline({
      onComplete: () => setShowMenu(true),
    });

    tl.to(buttonRef.current, { scale: 0, opacity: 0, duration: 0.5 })
      .to(textRef.current, { opacity: 0, duration: 0.3 }, "<")
      .fromTo(
        ".loading-text span",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );
  };

  return (
    <div className="relative w-screen h-screen bg-white flex items-center justify-center overflow-hidden">
      {!showMenu && !loading && (
        <div className="flex flex-col items-center gap-4">
          <Title ref={textRef}>به سایت ما خوش آمدید!</Title>
          <Button
            ref={buttonRef}
            type="primary"
            size="large"
            onClick={handleEnter}
          >
            ورود به سایت
          </Button>
        </div>
      )}

      {loading && !showMenu && (
        <div className="absolute flex flex-col items-center justify-center w-full h-full bg-white">
          <div className="loading-text text-2xl font-bold flex gap-2">
            {"signing...".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>
        </div>
      )}

      {showMenu && <FullscreenMenu />}
    </div>
  );
}
