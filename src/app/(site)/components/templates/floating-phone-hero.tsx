'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

const calculateMinHeight = (height: number, range: number) => {
  return height + height * range;
};

const rand = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (+max - +min)) + +min;
};

interface FloatingPhoneHeroProps {
  image: string;
  altText?: string;
}

export default function FloatingPhoneHero({ image, altText = 'Chairy app screen' }: FloatingPhoneHeroProps) {
  const range = 0.9;
  const { scrollY } = useScroll();
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [offsetTop, setOffsetTop] = useState(0);
  const springConfig = {
    damping: 100,
    stiffness: 100,
    mass: rand(1, 3),
  };

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const onResize = () => {
      if (!imageRef.current) return;
      setOffsetTop(imageRef.current.offsetTop);
      calculateMinHeight(imageRef.current.offsetHeight, range);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const y = useSpring(
    useTransform(scrollY, [offsetTop - 400, offsetTop + 400], ['0%', `${range * 100}%`]),
    springConfig
  );

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-[2rem] blur-3xl pointer-events-none" style={{backgroundImage: 'radial-gradient(600px at 50% 50%, rgba(238,76,44,0.18), transparent 70%)'}} />
      <motion.div ref={imageRef} initial={{ y: 0 }} style={{ y }} className="relative">
        <Image
          src={image}
          alt={altText}
          width={600}
          height={1200}
          className="w-full rounded-[2rem] object-cover shadow-2xl shadow-black/40"
          priority
        />
      </motion.div>
    </div>
  );
}
