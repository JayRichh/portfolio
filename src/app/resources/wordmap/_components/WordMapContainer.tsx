import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "../../../../utils/cn";
import { processWords, generateDatasetStats, STOP_WORDS, FileBreakdown, SAMPLING_METHODS } from "./wordUtils";
import { CATEGORIES } from "./wordUtils";
import { 
  InfoIcon, 
  FileIcon, 
  CodeIcon, 
  FileTextIcon, 
  TestTubeIcon, 
  WrenchIcon, 
  FileTypeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
  RefreshCwIcon,
  BarChart3Icon
} from "lucide-react";

export interface Position {
  x: number;
  y: number;
  radius: number;
}

export function WordMapContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showInfo, setShowInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wordmap-show-info');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [showRegenTooltip, setShowRegenTooltip] = useState(false);
  const [showSamplingTooltip, setShowSamplingTooltip] = useState(false);
  const [showFileBreakdown, setShowFileBreakdown] = useState(false);
  const [showCategories, setShowCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wordmap-show-info');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const [samplingMethod, setSamplingMethod] = useState<keyof typeof SAMPLING_METHODS>('balanced');
  const [key, setKey] = useState(0);
  const [stats] = useState(generateDatasetStats());
  const [words, setWords] = useState(() => processWords(samplingMethod));
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const fileTypeIcons = {
    components: CodeIcon,
    styles: FileTextIcon,
    tests: TestTubeIcon,
    config: WrenchIcon,
    utils: FileIcon,
    types: FileTypeIcon
  };

  const fileTypeLabels = {
    components: "Components",
    styles: "Stylesheets",
    tests: "Test Files",
    config: "Config Files",
    utils: "Utilities",
    types: "Type Definitions"
  };

  const reloadMap = useCallback(() => {
    const newWords = processWords(samplingMethod);
    setWords(newWords);
    setKey(prev => prev + 1);
  }, [samplingMethod]);

  const toggleInfo = useCallback(() => {
    setShowInfo(prev => {
      const newValue = !prev;
      localStorage.setItem('wordmap-show-info', JSON.stringify(newValue));
      return newValue;
    });
    setShowCategories(prev => {
      const newValue = !prev;
      return newValue;
    });
  }, []);

  const calculateSpiralPosition = useCallback((index: number, totalWords: number, width: number, height: number) => {
    // Further increase spacing by reducing density
    const maxRadius = Math.min(width, height) * 0.48; // Increased from 0.45
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angle = index * goldenRatio * 2.4 * Math.PI; // Increased from 2.2
    const radius = maxRadius * Math.pow(index / totalWords, 1/2.2); // Changed from 1/2.5 for even better distribution
    
    const centerX = width / 2;
    const centerY = height / 2;
    const x = centerX + (Math.cos(angle) * radius);
    const y = centerY + (Math.sin(angle) * radius);
    
    // Further reduced random offset for more predictable positioning
    const randomOffset = Math.min(15, radius * 0.08);
    return {
      x: x + (Math.random() - 0.5) * randomOffset,
      y: y + (Math.random() - 0.5) * randomOffset
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = containerRef.current!.clientWidth;
      canvas.height = containerRef.current!.clientHeight;
    };
    updateCanvasSize();

    const renderWords = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Enhanced gradient for better contrast
      const gradient = ctx.createRadialGradient(
        width/2, height/2, 0,
        width/2, height/2, Math.max(width, height)/1.5
      );

      if (isDark) {
        gradient.addColorStop(0, 'rgba(17, 24, 39, 1)');
        gradient.addColorStop(0.6, 'rgba(17, 24, 39, 0.98)');
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0.97)');
      } else {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.6, 'rgba(249, 250, 251, 0.98)');
        gradient.addColorStop(1, 'rgba(243, 244, 246, 0.97)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Reduced noise texture opacity
      ctx.globalAlpha = 0.01;
      for (let i = 0; i < width; i += 4) {
        for (let j = 0; j < height; j += 4) {
          if (Math.random() > 0.5) {
            ctx.fillStyle = isDark ? '#ffffff' : '#000000';
            ctx.fillRect(i, j, 2, 2);
          }
        }
      }
      ctx.globalAlpha = 1;

      words.sort((a, b) => b.importance - a.importance);
      
      const usedPositions: Position[] = [];
      
      words.forEach((word, index) => {
        // Adjusted size calculation for better readability
        const size = Math.max(20, Math.min(120, Math.pow(word.importance, 1.8) * 14));
        const position = calculateSpiralPosition(index, words.length, width, height);

        // Increased spacing between words
        const overlap = usedPositions.some(pos => {
          const dx = pos.x - position.x;
          const dy = pos.y - position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < (pos.radius + size/2) * 1.4; // Increased from 1.2
        });

        if (!overlap) {
          usedPositions.push({
            x: position.x,
            y: position.y,
            radius: size/2
          });

          ctx.save();
          
          // Adjusted weight calculation for better readability
          const weight = Math.min(700, 600 + (word.importance * 100));
          ctx.font = `${weight} ${size}px Montserrat`;

          const categoryColor = CATEGORIES[word.group]?.color;
          ctx.fillStyle = categoryColor;
          
          // Adjusted opacity for better contrast
          ctx.globalAlpha = isDark ? 
            0.98 + (word.importance * 0.02) : 
            0.95 + (word.importance * 0.05);
          
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Minimal rotation for better readability
          const rotation = (Math.random() - 0.5) * 0.03;
          ctx.translate(position.x, position.y);
          ctx.rotate(rotation);
          
          // Enhanced outline effect for better contrast
          const outlineColor = isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
          const outlineWidth = word.importance > 4 ? 6 : 4;
          
          // Draw multiple outline strokes for stronger effect
          for (let i = 0; i < 3; i++) {
            ctx.strokeStyle = outlineColor;
            ctx.lineWidth = outlineWidth - i;
            ctx.strokeText(word.text, 0, 0);
          }

          // Add glow effect for important words
          if (word.importance > 4) {
            const category = CATEGORIES[word.group];
            ctx.shadowColor = category?.glow;
            ctx.shadowBlur = 25;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          } else {
            // Subtle shadow for other words
            ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
          }
          
          // Draw the text
          ctx.fillText(word.text, 0, 0);

          ctx.restore();
        }
      });
    };

    renderWords();

    const handleResize = () => {
      updateCanvasSize();
      renderWords();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [key, isDark, words, calculateSpiralPosition]);

  return (
    <div className={cn(
      "relative h-full w-full",
      isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-br from-white via-gray-50 to-white"
    )} ref={containerRef}>
      <canvas ref={canvasRef} className="cursor-default" />
      
      <AnimatePresence mode="sync">
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute left-6 top-6 z-10 max-w-sm rounded-xl border shadow-lg backdrop-blur-sm p-4",
              isDark ? "border-gray-800 bg-gray-900/95" : "border-gray-200/50 bg-white/95"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={cn(
                  "text-lg font-semibold",
                  isDark ? "text-gray-100" : "text-gray-900"
                )}>Tech Stack Visualization</h3>
                <p className={cn(
                  "mt-2 text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  An interactive visualization of technologies and concepts from my GitHub projects and learning journey.
                </p>
                <div className={cn(
                  "mt-3 space-y-3 border-t pt-3",
                  isDark ? "border-gray-800" : "border-gray-100"
                )}>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className={cn(
                        "text-xs font-medium",
                        isDark ? "text-gray-500" : "text-gray-500"
                      )}>Projects Analyzed</div>
                      <div className={cn(
                        "mt-1 font-semibold",
                        isDark ? "text-gray-100" : "text-gray-900"
                      )}>{stats.projectCount}</div>
                    </div>
                    <div>
                      <div className={cn(
                        "text-xs font-medium",
                        isDark ? "text-gray-500" : "text-gray-500"
                      )}>Learning Entries</div>
                      <div className={cn(
                        "mt-1 font-semibold",
                        isDark ? "text-gray-100" : "text-gray-900"
                      )}>{stats.learningCount}</div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setShowFileBreakdown(!showFileBreakdown)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <div>
                        <div className={cn(
                          "flex items-center gap-1.5 text-xs font-medium",
                          isDark ? "text-gray-500" : "text-gray-500"
                        )}>
                          <FileIcon className="h-3.5 w-3.5" />
                          Files Scanned
                        </div>
                        <div className={cn(
                          "mt-1 font-semibold",
                          isDark ? "text-gray-100" : "text-gray-900"
                        )}>{formatNumber(stats.filesAnalyzed)}</div>
                      </div>
                      {showFileBreakdown ? (
                        <ChevronUpIcon className={cn(
                          "h-4 w-4",
                          isDark ? "text-gray-600" : "text-gray-400"
                        )} />
                      ) : (
                        <ChevronDownIcon className={cn(
                          "h-4 w-4",
                          isDark ? "text-gray-600" : "text-gray-400"
                        )} />
                      )}
                    </button>

                    <AnimatePresence>
                      {showFileBreakdown && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <div className={cn(
                            "space-y-1.5 rounded-lg p-2 text-sm",
                            isDark ? "bg-gray-800/50" : "bg-gray-50/50"
                          )}>
                            {(Object.keys(stats.fileBreakdown) as Array<keyof FileBreakdown>).map(type => {
                              const Icon = fileTypeIcons[type];
                              return (
                                <div key={type} className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <Icon className={cn(
                                      "h-3.5 w-3.5",
                                      isDark ? "text-gray-400" : "text-gray-500"
                                    )} />
                                    <span className={cn(
                                      "text-xs",
                                      isDark ? "text-gray-400" : "text-gray-600"
                                    )}>{fileTypeLabels[type]}</span>
                                  </div>
                                  <span className={cn(
                                    "text-xs font-medium",
                                    isDark ? "text-gray-300" : "text-gray-700"
                                  )}>
                                    {stats.fileBreakdown[type]}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <div className={cn(
                      "text-xs font-medium",
                      isDark ? "text-gray-500" : "text-gray-500"
                    )}>Lines of Code</div>
                    <div className={cn(
                      "mt-1 font-semibold",
                      isDark ? "text-gray-100" : "text-gray-900"
                    )}>{formatNumber(stats.linesOfCode)}</div>
                  </div>
                </div>
              </div>

              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={cn(
                  "ml-2 p-1 transition-colors",
                  isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <FilterIcon className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className={cn(
                    "absolute right-0 top-8 z-50 w-72 rounded-lg border shadow-lg backdrop-blur-sm p-3",
                    isDark ? "border-gray-800 bg-gray-900/95" : "border-gray-200/50 bg-white/95"
                  )}
                >
                  <p className={cn(
                    "text-xs font-medium mb-2",
                    isDark ? "text-gray-500" : "text-gray-400"
                  )}>Filtered Common Words:</p>
                  <div className="relative h-24 overflow-hidden">
                    <div className={cn(
                      "absolute inset-x-0 top-0 h-4 bg-gradient-to-b z-10",
                      isDark ? "from-gray-900/95" : "from-white/95",
                      "to-transparent"
                    )} />
                    <motion.div
                      animate={{ y: [-240, 0] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute flex flex-wrap gap-1 px-0.5"
                    >
                      {[...STOP_WORDS, ...STOP_WORDS].map((word, i) => (
                        <span
                          key={i}
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                            isDark ? "bg-gray-800/50 text-gray-400" : "bg-gray-100/50 text-gray-400"
                          )}
                        >
                          {word}
                        </span>
                      ))}
                    </motion.div>
                    <div className={cn(
                      "absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t z-10",
                      isDark ? "from-gray-900/95" : "from-white/95",
                      "to-transparent"
                    )} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 flex items-center gap-4">
        <button
          onClick={toggleInfo}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium",
            "shadow-sm backdrop-blur-sm",
            "transition-all duration-200",
            "border",
            isDark ? (
              "bg-gray-900/90 hover:bg-gray-800 border-gray-800"
            ) : (
              "bg-white/90 hover:bg-white border-gray-200/50"
            )
          )}
        >
          {showInfo ? "Hide Info" : "Show Info"}
        </button>

        <div className="relative">
          <button
            onMouseEnter={() => setShowSamplingTooltip(true)}
            onMouseLeave={() => setShowSamplingTooltip(false)}
            onClick={() => {
              const methods = Object.keys(SAMPLING_METHODS) as Array<keyof typeof SAMPLING_METHODS>;
              const currentIndex = methods.indexOf(samplingMethod);
              const nextIndex = (currentIndex + 1) % methods.length;
              setSamplingMethod(methods[nextIndex]);
              reloadMap();
            }}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium",
              "shadow-sm backdrop-blur-sm",
              "transition-all duration-200",
              "border flex items-center gap-2",
              isDark ? (
                "bg-gray-900/90 hover:bg-gray-800 border-gray-800"
              ) : (
                "bg-white/90 hover:bg-white border-gray-200/50"
              )
            )}
          >
            <BarChart3Icon className="h-4 w-4" />
            {samplingMethod === 'balanced' ? 'Balanced' : 
             samplingMethod === 'frequency' ? 'Frequency' : 'Impact'}
          </button>
          <AnimatePresence>
            {showSamplingTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className={cn(
                  "absolute -top-8 right-0 z-50",
                  "rounded-md px-2 py-1 text-xs",
                  "shadow-sm backdrop-blur-sm whitespace-nowrap",
                  isDark ? "bg-gray-900/95 text-gray-300" : "bg-white/95 text-gray-600"
                )}
              >
                {SAMPLING_METHODS[samplingMethod]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <button
            onClick={reloadMap}
            onMouseEnter={() => setShowRegenTooltip(true)}
            onMouseLeave={() => setShowRegenTooltip(false)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium",
              "shadow-sm backdrop-blur-sm",
              "transition-all duration-200",
              "border flex items-center gap-2",
              isDark ? (
                "bg-gray-900/90 hover:bg-gray-800 border-gray-800"
              ) : (
                "bg-white/90 hover:bg-white border-gray-200/50"
              )
            )}
          >
            <RefreshCwIcon className="h-4 w-4" />
            Regenerate
          </button>
          <AnimatePresence>
            {showRegenTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className={cn(
                  "absolute -top-8 right-0 z-50",
                  "rounded-md px-2 py-1 text-xs",
                  "shadow-sm backdrop-blur-sm whitespace-nowrap",
                  isDark ? "bg-gray-900/95 text-gray-300" : "bg-white/95 text-gray-600"
                )}
              >
                Reshuffle with slight randomness in filter calculations.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showCategories && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute bottom-20 right-6",
              "w-64 rounded-xl border shadow-lg backdrop-blur-sm p-4",
              isDark ? "border-gray-800 bg-gray-900/95" : "border-gray-200/50 bg-white/95"
            )}
          >
            <h3 className={cn(
              "text-sm font-semibold mb-2",
              isDark ? "text-gray-100" : "text-gray-900"
            )}>Categories</h3>
            <div className="space-y-1.5">
              {Object.entries(CATEGORIES).map(([key, { name, color }]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full ring-2 ring-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className={cn(
                    "text-sm",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>{name}</span>
                </div>
              ))}
            </div>
            <p className={cn(
              "mt-3 text-xs",
              isDark ? "text-gray-500" : "text-gray-500"
            )}>
              Size indicates frequency and importance across projects and learnings.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
