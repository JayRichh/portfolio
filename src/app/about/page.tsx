"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Book,
  Code,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Server,
  Zap,
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ActiveShape } from "recharts/types/util/types";

import { Button } from "../../components/ui/button";

import HobbiesSection from "./_components/about-hobbies";

const ScrollDownIndicator = dynamic(
  () => import("./_components/scroll-down-indicator"),
  { ssr: false },
);

const distributionData = [
  { name: "TypeScript", value: 59.49 },
  { name: "JavaScript", value: 20.64 },
  { name: "Vue", value: 12.15 },
  { name: "CSS", value: 4.27 },
  { name: "HTML", value: 2.41 },
  { name: "SCSS", value: 1.03 },
];

const COLORS = [
  "#A3B1F7",
  "#FDBBA9",
  "#C1E5D7",
  "#F2E1C1",
  "#F7D6E0",
  "#B9C0DA",
];

const timelineData = [
  {
    year: "2022 - Present",
    title: "Software Developer",
    description:
      "Developing scalable software for project and operations management, collaborating with teams to deliver user-centric tools.",
    icon: Code,
  },
  {
    year: "2022",
    title: "Web Developer",
    description:
      "Built full-stack applications using HTML, CSS, JavaScript, and the MERN stack, focusing on best practices for robust solutions.",
    icon: Rocket,
  },
  {
    year: "2020 - 2022",
    title: "Estimator",
    description:
      "Quoted and designed control systems, improved internal processes, and delivered tailored solutions through strong client relationships.",
    icon: Cpu,
  },
  {
    year: "2020",
    title: "Industrial Electrician",
    description:
      "Led electrical installations in the dairy industry, mentoring apprentices and ensuring accurate equipment calibration.",
    icon: Zap,
  },
  {
    year: "2019",
    title: "Electrical Apprentice",
    description:
      "Certified in instrumentation while maintaining systems, with a focus on improving reliability and process efficiency.",
    icon: Server,
  },
  {
    year: "2013 - 2018",
    title: "Fire Systems Engineer",
    description:
      "Managed fire detection system installations, ensuring compliance with NZ codes and training apprentices on safety protocols.",
    icon: Book,
  },
];

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  name: string;
  value: number;
}

const CustomLabel: React.FC<CustomLabelProps> = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 60;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? "start" : "end";

  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="central"
        className="fill-foreground text-2xl font-semibold dark:fill-foreground"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 20}
        textAnchor={textAnchor}
        dominantBaseline="central"
        className="fill-muted-foreground text-base text-xl dark:fill-muted-foreground"
      >
        {`${value.toFixed(1)}%`}
      </text>
    </g>
  );
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const TopSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center overflow-visible px-4 md:px-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-screen-xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 pt-24 text-center text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl"
        >
          Technology
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 w-full overflow-visible"
        >
          {isMobile ? (
            <div className="space-y-4">
              {distributionData.map((entry, index) => (
                <div key={`bar-${index}`} className="flex items-center">
                  <div
                    className="h-12"
                    style={{
                      width: `${entry.value}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="ml-4 text-lg font-semibold text-foreground dark:text-foreground">
                    {entry.name}: {entry.value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={600}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="50%"
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false}
                  onMouseEnter={onPieEnter}
                  label={CustomLabel}
                  labelLine={false}
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
};

const SocialLinks: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mt-12 flex justify-center space-x-6"
  >
    <motion.a
      href="https://github.com/jayrichh"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Github size={32} />
    </motion.a>
    <motion.a
      href="https://linkedin.com/in/jaydenrichardson"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Linkedin size={32} />
    </motion.a>
    <motion.a
      href="mailto:web@jayrich.dev"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Mail size={32} />
    </motion.a>
  </motion.div>
);

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState("auto");
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getLineHeightProgress = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return [0.1, 0.9];
      } else if (window.innerWidth < 1024) {
        return [0.12, 0.95];
      } else {
        return [0.15, 0.95];
      }
    }
    return [0.15, 0.95];
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, getLineHeightProgress(), [
    "0%",
    "100%",
  ]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ minHeight: containerHeight }}
    >
      <motion.div
        className="absolute left-1/2 top-0 hidden w-0.5 rounded-full bg-gray-300 dark:bg-gray-600 md:block"
        style={{
          height: lineHeight,
          transformOrigin: "top",
          left: "calc(50% - 1px)",
          top: "150px",
          bottom: "150px",
        }}
      />
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          item={item}
          index={index}
          total={timelineData.length}
        />
      ))}
    </div>
  );
};

const TimelineCard: React.FC<{ item: any; index: number; total: number }> = ({
  item,
  index,
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className={`flex ${index % 2 === 0 ? "justify-end md:justify-start" : "justify-start md:justify-end"} relative mb-12 w-full items-center`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className={`w-full rounded-lg bg-card p-6 text-left text-card-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card dark:text-card-foreground md:w-5/12 ${index % 2 === 0 ? "border-r-2 md:text-right" : "border-l-2 md:text-left"} border-primary`}
      >
        <div className="mb-4 flex items-center md:hidden">
          <item.icon className="mr-2 h-8 w-8 text-primary dark:text-primary" />
          <h3 className="text-xl font-semibold tracking-tight text-foreground dark:text-foreground">
            {item.title}
          </h3>
        </div>
        <h3 className="hidden text-xl font-semibold tracking-tight text-foreground dark:text-foreground md:block">
          {item.title}
        </h3>
        <span className="mt-1 block text-sm font-medium text-muted-foreground dark:text-muted-foreground">
          {item.year}
        </span>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground">
          {item.description}
        </p>
      </div>
      <div
        className="absolute left-1/2 hidden h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-card shadow-lg dark:bg-card dark:shadow-primary/20 md:flex"
        style={{ top: "50%" }}
      >
        <motion.div
          className="absolute flex h-16 w-16 transform items-center justify-center rounded-full bg-card shadow-lg dark:bg-card dark:shadow-primary/20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <item.icon className="h-8 w-8 text-primary dark:text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={scrollRef}
      className="min-h-screen overflow-x-hidden text-gray-900 dark:text-gray-100"
    >
      <div className="container mx-auto flex flex-col px-4 py-16 sm:px-6 lg:px-8">
        <TopSection />
        <motion.section className="relative mb-20 flex-grow">
          <HobbiesSection />
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative flex-grow"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-40 text-center text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl"
          >
            Experience
          </motion.h2>
          <Timeline />
        </motion.section>
        <section className="relative z-10 mt-40 flex flex-col items-center justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-60 text-center"
          >
            <Link href="/code" passHref legacyBehavior>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary px-6 py-6 text-lg text-primary-foreground hover:bg-primary/90">
                  View Projects
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <SocialLinks />
        </section>
      </div>
      <ScrollDownIndicator />
    </div>
  );
};

export default AboutPage;
