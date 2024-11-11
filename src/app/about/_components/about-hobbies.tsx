import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  
  import {
    MotionValue,
    motion,
    useAnimation,
    useAnimationFrame,
    useIsomorphicLayoutEffect,
    useScroll,
    useSpring,
    useTransform,
  } from 'framer-motion';
  import {
    Atom,
    BarChart3,
    Bomb,
    Clapperboard,
    Clock,
    CloudRain,
    Code,
    Crosshair,
    Dice1,
    Drumstick,
    ExternalLink,
    Factory,
    Film,
    Gamepad2,
    Globe,
    Headphones,
    Music,
    Play,
    Sliders,
    Syringe,
    Video,
  } from 'lucide-react';
  import { useTheme } from 'next-themes';
  
  //types
  interface HobbyDetail {
    imageUrl: string;
    title: string;
    description: string;
    link?: string;
    icon?: React.ElementType;
  }
  
  type Hobby = {
    title: string;
    description: string;
    icon: React.ElementType;
    backgroundImage: string;
    details: HobbyDetail[];
  };
  
  interface FloatingImageProps {
    detail: HobbyDetail;
    index: number;
    totalImages: number;
    viewportWidth: number;
    viewportHeight: number;
    scrollProgress: MotionValue<number>;
  }
  
  interface TooltipProps {
    content: React.ReactNode;
    x: number;
    y: number;
  }
  interface HobbyGroupProps {
    hobby: Hobby;
    index: number;
  }
  
  //helpfull stuff
  const lerp = (start: number, end: number, t: number): number => {
    if (
      typeof start !== 'number' ||
      typeof end !== 'number' ||
      typeof t !== 'number'
    ) {
      throw new TypeError('All arguments must be numbers');
    }
  
    if (t < 0 || t > 1) {
      console.warn(
        'Interpolation factor t should be between 0 and 1. Clamping to valid range.',
      );
      t = Math.max(0, Math.min(1, t));
    }
  
    return start * (1 - t) + end * t;
  };
  
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
  // useful stuff
  const iconMap: { [key: string]: React.ElementType } = {
    Web: Code,
    Bop: Music,
    Vid: Video,
    Gam: Gamepad2,
  };
  
  const hobbies: Hobby[] = [
    {
      title: 'Web',
      description: 'Turning imagination into web experiences.',
      icon: Code,
      backgroundImage:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      details: [
        {
          title: 'BopGL',
          description:
            'WebGL visualizer with vinyl record simulation. Realtime audio visualization, presets, customization, and track management.',
          imageUrl: '/images/fib.png',
          link: 'https://jayrichh.github.io/BopGL/',
          icon: Globe,
        },
        {
          title: 'PomoDev - Pomodoro Timer Extension',
          description:
            'Chrome extension built with React, TypeScript, and Vite, featuring customizable timers, task management, and themes.',
          imageUrl: '/images/pomodev3.png',
          link: 'https://github.com/JayRichh/pomodev',
          icon: Clock,
        },
        {
          title: 'CodePen Visualizations',
          description:
            'Interactive p5.js and three.js sketches exploring mathematical patterns and physics simulations.',
          imageUrl: '/images/codepen.png',
          link: 'https://codepen.io/JayRichh/',
          icon: Sliders,
        },
        {
          title: 'BopGL: WebGL Visualizer',
          description:
            'Dynamic Audio Visualizer with Vinyl Record Simulation, Realtime Audio Analysis, Customization, and Track Management.',
          imageUrl: '/images/codepen2.png',
          link: 'https://codepen.io/JayRichh/',
          icon: Sliders,
        },
        {
          title: 'Plane Curves',
          description:
            'Visualizing mathematical curves using JavaScript and sliders for real-time adjustments.',
          imageUrl: '/images/codepen1.png',
          link: 'https://codepen.io/JayRichh/pen/LYoWVOd',
          icon: BarChart3,
        },
      ],
    },
    {
      title: 'Bop',
      description: 'Exploring digital sets and experimenting with breakdowns.',
      icon: Music,
      backgroundImage:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      details: [
        {
          title: 'boppin #4 - breakcore/jungle mix',
          description: 'Heavy breakcore/jungle mix to get things moving.',
          imageUrl: '/images/bop10.jpg',
          link: 'https://soundcloud.com/distortie/boppin-4-breakcore-jungle-mix',
          icon: Headphones,
        },
        {
          title: 'Deep House¹',
          description: 'Favorite deep house bops with a side of slap.',
          imageUrl:
            'https://i1.sndcdn.com/artworks-UmWeZOwLJLslGQl3-4KM17g-t500x500.jpg',
          link: 'https://soundcloud.com/distortie/deep-house',
          icon: Play,
        },
        {
          title: 'boppin⁹ - tech house mix',
          description: 'A tech house mix to keep the groove going.',
          imageUrl:
            'https://i1.sndcdn.com/artworks-2NUCC15k0vZt2UaT-RzCrkA-t500x500.jpg',
          link: 'https://soundcloud.com/distortie/boppin-tech-house-mix',
          icon: Drumstick,
        },
        {
          title: 'filthy dnb mix',
          description: 'Filthy DnB featuring Slimzee, Boylan & Riko Dan.',
          imageUrl: '/images/bop2.webp',
          link: 'https://soundcloud.com/distortie/filthy-dnb',
          icon: Music,
        },
        {
          title: 'deep / tech house',
          description: 'yes.',
          imageUrl: '/images/boppin.png',
          link: 'https://soundcloud.com/distortie/bop-voly',
          icon: Video,
        },
      ],
    },
    {
      title: 'Vid',
      description: 'Learning fusion animation and filter effects.',
      icon: Video,
      backgroundImage:
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
      details: [
        {
          title: 'boppin #2 - trap/phonk & dub mix',
          description:
            'Filthy bassline bangers with visuals by sin, Cesco, and KAYO TECHNICS.',
          imageUrl: '/images/bop6.webp',
          link: 'https://www.youtube.com/watch?v=fgbDN1JoZlQ',
          icon: Film,
        },
        {
          title: 'nostalgic threads: lofi house mix',
          description:
            'Grab a coffee for this relaxed lofi house mix (Mall Grab, DJ Seinfeld, COMPUTER DATA).',
          imageUrl: '/images/bop3.webp',
          link: 'https://www.youtube.com/watch?v=L1u9QnXwnKY',
          icon: Clapperboard,
        },
        {
          title: 'tech house mix',
          description: 'One of my favorite genres in electronic music.',
          imageUrl: '/images/bop7.webp',
          link: 'https://www.youtube.com/watch?v=Q8kDiOnF--M',
          icon: Video,
        },
        {
          title: 'deep / tech house',
          description: 'yes.',
          imageUrl: '/images/bopp12.webp',
          link: 'https://www.youtube.com/watch?v=W4Qjp16epXA',
          icon: Video,
        },
        {
          title: 'cereal sessions¹ - weekend lofi house mix',
          description: 'Throwback vibes with nostalgic lofi house beats.',
          imageUrl: '/images/bop4.webp',
          link: 'https://www.youtube.com/watch?v=_CE-sFoYTn8',
          icon: Play,
        },
      ],
    },
  
    {
      title: 'Gam',
      description: 'Exploring virtual worlds and strategic challenges.',
      icon: Gamepad2,
      backgroundImage:
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      details: [
        {
          title: 'Satisfactory',
          description:
            'First-person factory building game set on an alien planet. Automate resource gathering, processing, and manufacturing.',
          imageUrl:
            'https://cdn.akamai.steamstatic.com/steam/apps/526870/header.jpg',
          link: 'https://www.satisfactorygame.com/',
          icon: Factory,
        },
        {
          title: 'Counter-Strike',
          description:
            'Tactical first-person shooter with a focus on team-based gameplay and strategic gunfights.',
          imageUrl:
            'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
          link: 'https://www.counter-strike.net/',
          icon: Crosshair,
        },
        {
          title: 'Borderlands Series',
          description:
            'Action RPG first-person shooter with a unique cel-shaded art style, known for its vast array of weapons and humorous storylines.',
          imageUrl:
            'https://cdn.akamai.steamstatic.com/steam/apps/397540/header.jpg',
          link: 'https://borderlands.com/',
          icon: Bomb,
        },
        {
          title: 'Fallout 4',
          description:
            'Post-apocalyptic open-world RPG set in a retro-futuristic Boston. Explore, craft, and shape the wasteland.',
          imageUrl:
            'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg',
          link: 'https://fallout.bethesda.net/en/games/fallout-4',
          icon: Atom,
        },
        {
          title: 'Risk of Rain 2',
          description:
            'Roguelike third-person shooter with procedurally generated levels and increasing difficulty over time.',
          imageUrl:
            'https://cdn.akamai.steamstatic.com/steam/apps/632360/header.jpg',
          link: 'https://www.riskofrain.com/',
          icon: CloudRain,
        },
      ],
    },
  ];
  
  const Tooltip: React.FC<TooltipProps> = ({ content, x, y }) => {
    const springConfig = { damping: 25, stiffness: 300 };
    const tooltipX = useSpring(x, springConfig);
    const tooltipY = useSpring(y, springConfig);
  
    const fadeConfig = { duration: 1, ease: 'easeInOut' };
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      tooltipX.set(-x);
      tooltipY.set(y);
      setIsVisible(true);
    }, [x, y, tooltipX, tooltipY]);
  
    return (
      <motion.div
        style={{
          position: 'absolute',
          top: tooltipY,
          left: tooltipX,
          pointerEvents: 'none',
          zIndex: 1000,
          transform: 'translate(-50%, -100%)',
        }}
        initial={{ opacity: 0, x: 20, y: 20 }} // Start from bottom right
        animate={{ opacity: isVisible ? 1 : 0, x: 10, y: 10 }} // Move to the target position
        transition={fadeConfig}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
          }}
        >
          {content}
        </div>
      </motion.div>
    );
  };
  
  const FloatingImage: React.FC<FloatingImageProps> = ({
    detail,
    index,
    totalImages,
    viewportWidth,
    viewportHeight,
    scrollProgress,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
    const isMobile = window.innerWidth <= 768;
  
    const cardWidth = isMobile ? 240 : 320;
    const cardHeight = isMobile ? 300 : 400;
  
    const randomOffset = useMemo(() => {
      const horizontalSpread = isMobile
        ? viewportWidth * 0.8
        : viewportWidth * 0.9;
      const verticalSpread = isMobile
        ? viewportHeight * 0.7
        : viewportHeight * 0.5;
  
      const baseX = isMobile
        ? ((index % 2) / 1) * (horizontalSpread / 2) - horizontalSpread / 4
        : (index / (totalImages - 1)) * horizontalSpread - horizontalSpread / 2;
      const baseY = isMobile
        ? Math.floor(index / 2) * (cardHeight + 20)
        : (Math.random() - 0.5) * verticalSpread;
  
      const noise = {
        x: (Math.random() - 0.5) * (viewportWidth * (isMobile ? 0.05 : 0.1)),
        y: (Math.random() - 0.5) * (viewportHeight * (isMobile ? 0.05 : 0.1)),
      };
  
      return {
        x: baseX + noise.x,
        y: baseY + noise.y,
        rotation: (Math.random() - 0.5) * (isMobile ? 5 : 10),
        scale: 0.95 + Math.random() * 0.1,
      };
    }, [index, totalImages, viewportWidth, viewportHeight, isMobile]);
  
    const springConfig = { stiffness: 300, damping: 30 };
  
    const expansionStart = 0;
    const expansionEnd = isMobile ? 0.9 : 0.7;
  
    const derivedX = useTransform(
      scrollProgress,
      [expansionStart, expansionEnd],
      [0, randomOffset.x],
    );
    const derivedY = useTransform(
      scrollProgress,
      [expansionStart, expansionEnd],
      [0, randomOffset.y],
    );
  
    const x = useSpring(derivedX, springConfig);
    const y = useSpring(derivedY, springConfig);
    const scale = useSpring(randomOffset.scale, springConfig);
  
    const handleMouseMove = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          setMousePosition({ x, y });
          setTooltipPosition({ x, y });
        }
      },
      [],
    );
  
    useEffect(() => {
      if (isHovered && circleRef.current && imageRef.current) {
        let animationFrameId: number;
  
        const animateCircle = () => {
          if (circleRef.current && imageRef.current) {
            const circleRect = circleRef.current.getBoundingClientRect();
            const cardRect = imageRef.current.getBoundingClientRect();
            const circleWidth = circleRect.width;
            const circleHeight = circleRect.height;
  
            const scaleX = cardWidth / cardRect.width;
            const scaleY = cardHeight / cardRect.height;
  
            const scaledX = mousePosition.x * scaleX;
            const scaledY = mousePosition.y * scaleY;
  
            const targetX = cardWidth - scaledX - circleWidth / 2;
            const targetY = scaledY - circleHeight / 2;
  
            const currentX = parseFloat(circleRef.current.style.left) || 0;
            const currentY = parseFloat(circleRef.current.style.top) || 0;
  
            const newX = lerp(currentX, targetX, 0.2);
            const newY = lerp(currentY, targetY, 0.2);
  
            circleRef.current.style.left = `${newX}px`;
            circleRef.current.style.top = `${newY}px`;
  
            animationFrameId = requestAnimationFrame(animateCircle);
          }
        };
  
        animationFrameId = requestAnimationFrame(animateCircle);
  
        return () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        };
      }
    }, [isHovered, mousePosition, cardWidth, cardHeight]);
  
    return (
      <motion.div
        ref={imageRef}
        className="absolute cursor-pointer overflow-visible"
        style={{
          x,
          y,
          rotate: randomOffset.rotation,
          scale,
          zIndex: isHovered ? 50 : 10 + index,
          width: cardWidth,
          height: cardHeight,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-lg bg-card shadow-lg"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front of the card */}
          <div className="h-full w-full overflow-hidden">
            <img
              src={detail.imageUrl}
              alt={detail.title}
              className="h-full w-full object-cover"
              style={{
                objectPosition:
                  detail.title.toLowerCase().includes('satisfactory') ||
                  detail.title.toLowerCase().includes('borderlands')
                    ? 'center 30%'
                    : detail.title.toLowerCase().includes('risk of rain')
                      ? 'center 60%'
                      : 'center 40%',
              }}
            />
          </div>
          {/* Back of the card */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-between bg-card bg-opacity-90 p-4 text-card-foreground md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="flex flex-grow flex-col items-center justify-center text-center">
              <h3
                className="mb-2 text-xl font-bold text-primary md:mb-4 md:text-3xl"
                style={{
                  letterSpacing: '0.02em',
                }}
              >
                {detail.title}
              </h3>
              <p
                className="mb-4 line-clamp-4 text-sm font-medium md:mb-6 md:text-lg"
                style={{
                  letterSpacing: '0.01em',
                  lineHeight: '1.6',
                }}
              >
                {detail.description}
              </p>
            </div>
            <div className="flex justify-center space-x-3">
              {detail.link && (
                <motion.a
                  href={detail.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-28 items-center justify-center rounded-full bg-primary px-2 py-2 text-xs font-bold text-primary-foreground shadow-md transition-colors hover:bg-opacity-90 md:w-36 md:px-4 md:py-3 md:text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow:
                      '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <ExternalLink className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                  Open Link
                </motion.a>
              )}
            </div>
          </motion.div>
          {/* Floating circle */}
          {isHovered && (
            <span>
              <motion.div
                ref={circleRef}
                className="pointer-events-none absolute h-4 w-4 rounded-full bg-primary opacity-50 md:h-6 md:w-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
              />
              {/* <Tooltip
              content={detail.title} 
              x={tooltipPosition.x}
              y={tooltipPosition.y} /> */}
            </span>
          )}
        </motion.div>
      </motion.div>
    );
  };
  
  const HobbyGroup: React.FC<HobbyGroupProps> = ({ hobby, index }) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { scrollYProgress } = useScroll({
      target: groupRef,
      offset: ['start end', 'end start'],
    });
  
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  
    useEffect(() => {
      const updateDimensions = () => {
        if (groupRef.current) {
          setDimensions({
            width: groupRef.current.offsetWidth,
            height: groupRef.current.offsetHeight,
          });
        }
      };
  
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, []);
  
    const Icon = iconMap[hobby.title] || Code;
  
    return (
      <motion.div
        ref={groupRef}
        className="relative mb-20 h-[80vh]"
        style={{ y, opacity, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <div className="sticky top-1/4 flex h-full items-center justify-center overflow-visible">
          <div className="pointer-events-none relative z-20 mb-12 text-center">
            <div className="relative flex h-[300px] w-[500px] items-center justify-center">
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%)',
                  mixBlendMode: 'multiply',
                  filter: 'blur(50px)',
                }}
              ></div>
              <div className="relative z-10 p-8">
                <Icon className="mx-auto mb-6 h-20 w-20 stroke-2 text-primary" />
                <motion.p
                  className="mx-auto max-w-2xl text-2xl font-extrabold tracking-wide text-secondary dark:invert dark:filter"
                  style={{
                    WebkitTextStroke: '1px rgba(0,0,0,0.2)',
                    letterSpacing: '0.05em',
                    lineHeight: '1.4',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {hobby.description}
                </motion.p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            {hobby.details.map((detail, detailIndex) => (
              <FloatingImage
                key={detailIndex}
                detail={detail}
                index={detailIndex}
                totalImages={hobby.details.length}
                viewportWidth={dimensions.width}
                viewportHeight={dimensions.height}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
  
  const HobbiesSection: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      setIsLoaded(true);
    }, []);
  
    useEffect(() => {
      if (isLoaded && sectionRef.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry?.isIntersecting) {
              // Component is visible, you can trigger any animations or additional loading here
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.1 }, // Trigger when 10% of the component is visible
        );
  
        observer.observe(sectionRef.current);
  
        return () => {
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        };
      }
    }, [isLoaded]);
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    return (
      <div ref={sectionRef}>
        <section className="bg-background py-16 dark:bg-background">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-0 text-center text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl`}
            >
              Currently
            </motion.h2>
            {hobbies.map((hobby, index) => (
              <HobbyGroup key={index} hobby={hobby} index={index} />
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default HobbiesSection;