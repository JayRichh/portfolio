import React, { useEffect, useRef, useState } from "react";

import {
  ChevronDown,
  Clipboard,
  DownloadCloud,
  Droplet,
  Eraser,
  Minus,
  Palette,
  Plus,
  Repeat,
  Scissors,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Textarea } from "../components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  value,
  onChange,
  className,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleDecrease = () => {
    onChange(Math.max(value - 1, min));
  };

  const handleIncrease = () => {
    onChange(Math.min(value + 1, max));
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newValue = Math.round(min + percentage * (max - min));
      onChange(Math.min(Math.max(newValue, min), max));
    }
  };

  const handleDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newValue = Math.round(min + percentage * (max - min));
      onChange(Math.min(Math.max(newValue, min), max));
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (sliderRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        onChange(Math.min(Math.max(value + Math.sign(-e.deltaY), min), max));
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [value, min, max, onChange]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Decrease brush size"
      >
        <Minus className="h-4 w-4 text-gray-600" />
      </button>
      <div
        ref={sliderRef}
        className="relative h-8 flex-grow cursor-pointer"
        onClick={handleSliderClick}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label="Brush Size"
      >
        <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 transform rounded-full bg-gray-200">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          ref={thumbRef}
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform cursor-grab rounded-full border-2 border-primary bg-white shadow transition-transform hover:scale-110 active:cursor-grabbing"
          style={{ left: `${percentage}%` }}
          onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
          onPointerMove={(e) =>
            e.currentTarget.hasPointerCapture(e.pointerId) && handleDrag(e)
          }
          onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
        />
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Increase brush size"
      >
        <Plus className="h-4 w-4 text-gray-600" />
      </button>
      <span className="w-6 text-center text-sm font-medium">{value}</span>
    </div>
  );
};

interface BrushType {
  type: "normal" | "rainbow" | "symmetry" | "pattern" | "eraser";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const brushTypes: BrushType[] = [
  { type: "normal", icon: Droplet, label: "Normal" },
  { type: "rainbow", icon: Sparkles, label: "Rainbow" },
  { type: "symmetry", icon: Repeat, label: "Symmetry" },
  { type: "pattern", icon: Scissors, label: "Pattern" },
  { type: "eraser", icon: Eraser, label: "Eraser" },
];

interface FormStatus {
  success: boolean;
  message: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const StreamlinedContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(2);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [isOverCanvas, setIsOverCanvas] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [brushType, setBrushType] = useState<BrushType["type"]>("normal");
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [canvasUsed, setCanvasUsed] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const showMessage = (msg: string): void => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const copyToClipboard = (): void => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]).then(
            () => showMessage("Image copied to clipboard!"),
            () => showMessage("Failed to copy image."),
          );
        }
      });
    }
  };

  const downloadImage = (): void => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
      showMessage("Image downloaded successfully!");
    }
  };

  const clearCanvas = (): void => {
    if (ctxRef.current && canvasRef.current) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      localStorage.removeItem("savedDrawing");
      showMessage("Canvas cleared!");
    }
  };

  const saveDrawing = (): void => {
    if (canvasRef.current) {
      localStorage.setItem("savedDrawing", canvasRef.current.toDataURL());
    }
  };

  const loadDrawing = (): void => {
    const savedDrawing = localStorage.getItem("savedDrawing");
    if (savedDrawing && ctxRef.current && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        ctxRef.current?.drawImage(img, 0, 0);
      };
      img.src = savedDrawing;
    }
  };
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        ctxRef.current = context;
      }
    }
    loadDrawing();
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = brushColor;
      ctxRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const response = await fetch("/api/verify-human");
      const data = await response.json();
      setChallenge(data.challenge);
      setCorrectAnswer(data.answer);
    } catch (error) {
      console.error("Error fetching challenge:", error);
      setStatus({
        success: false,
        message: "Failed to load verification challenge. Please try again.",
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    let drawing: string | null = null;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      drawing = canvas.toDataURL("image/png");
    }

    const isCanvasEmpty = drawing === canvasRef.current?.toDataURL();

    if (!canvasUsed && isCanvasEmpty) {
      if (!formData.name || !formData.email || !formData.message) {
        setStatus({
          success: false,
          message: "Please fill in all required fields or draw something.",
        });
        return;
      }
    }

    if (!userAnswer) {
      setStatus({
        success: false,
        message: "Please answer the verification question.",
      });
      return;
    }

    try {
      const verifyResponse = await fetch("/api/verify-human", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAnswer: parseInt(userAnswer),
          correctAnswer,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Human verification failed");
      }

      // If verification passes, send the email
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          drawing: drawing ? drawing.split(",")[1] : null, // Send base64 data without the data URL prefix
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setStatus({ success: true, message: "Message sent successfully!" });
      clearForm();
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    }
  };

  const clearForm = (): void => {
    setFormData({ name: "", email: "", message: "" });
    clearCanvas();
    setCanvasUsed(false);
    setUserAnswer("");
    fetchChallenge(); // Fetch a new challenge after clearing the form
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    setIsDrawing(true);
    setCanvasUsed(true);
    draw(e);
  };

  const stopDrawing = (): void => {
    setIsDrawing(false);
    if (ctxRef.current) {
      ctxRef.current.beginPath();
    }
    saveDrawing();
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    if (!isDrawing || !ctxRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    switch (brushType) {
      case "normal":
        drawNormal(x, y);
        break;
      case "rainbow":
        drawRainbow(x, y);
        break;
      case "symmetry":
        drawSymmetry(x, y);
        break;
      case "pattern":
        drawPattern(x, y);
        break;
      case "eraser":
        erase(x, y);
        break;
      default:
        drawNormal(x, y);
    }
  };

  const drawNormal = (x: number, y: number): void => {
    if (!ctxRef.current) return;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const drawRainbow = (x: number, y: number): void => {
    if (!ctxRef.current) return;
    const hue = (x + y) % 360;
    ctxRef.current.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const drawSymmetry = (x: number, y: number): void => {
    if (!ctxRef.current || !canvasRef.current) return;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(centerX - (x - centerX), y);
    ctxRef.current.lineTo(centerX - (x - centerX), y);
    ctxRef.current.stroke();

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, centerY - (y - centerY));
    ctxRef.current.lineTo(x, centerY - (y - centerY));
    ctxRef.current.stroke();

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(centerX - (x - centerX), centerY - (y - centerY));
    ctxRef.current.lineTo(centerX - (x - centerX), centerY - (y - centerY));
    ctxRef.current.stroke();
  };

  const drawPattern = (x: number, y: number): void => {
    if (!ctxRef.current) return;
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      ctxRef.current.beginPath();
      ctxRef.current.arc(
        x + offsetX,
        y + offsetY,
        brushSize / 2,
        0,
        Math.PI * 2,
      );
      ctxRef.current.fill();
    }
  };

  const erase = (x: number, y: number): void => {
    if (!ctxRef.current) return;
    ctxRef.current.globalCompositeOperation = "destination-out";
    ctxRef.current.beginPath();
    ctxRef.current.arc(x, y, brushSize * 2, 0, Math.PI * 2);
    ctxRef.current.fill();
    ctxRef.current.globalCompositeOperation = "source-over";
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handlePointerEnter = (): void => setIsOverCanvas(true);
  const handlePointerLeave = (): void => {
    setIsOverCanvas(false);
    stopDrawing();
  };

  const getCursorStyle = (): React.CSSProperties => {
    if (!isOverCanvas) return {};
    const angle =
      Math.atan2(cursorPosition.y - 10, cursorPosition.x - 10) *
      (180 / Math.PI);
    return {
      cursor: "none",
      "--x": `${cursorPosition.x + 14}px`,
      "--y": `${cursorPosition.y}px`,
      "--angle": `${angle}deg`,
    } as React.CSSProperties;
  };
  return (
    <TooltipProvider>
      <section
        className="mx-auto mb-16 max-w-7xl select-none px-2 md:px-6"
        id="contact"
      >
        <h2 className="mb-16 text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
          👋
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 px-4 md:px-0"
          id="contact-form"
          method="POST"
          data-netlify="true"
          name="contact"
          netlify-honeypot="bot-field"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex h-full flex-col space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-background p-4 text-lg text-foreground"
                aria-label="Your Name"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-background p-4 text-lg text-foreground"
                aria-label="Your Email"
                required
              />
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="flex-grow resize-none bg-background p-4 text-lg text-foreground"
                aria-label="Your Message"
                required
              />
              <div className="flex items-center">
                <div className="flex items-center text-foreground">
                  <span className="mr-2">Verification:</span>
                  <span className="font-medium">{challenge}</span>
                  <span className="mx-2">=</span>
                </div>
                {/* Updated Input Field */}
                <Input
                  id="challenge"
                  type="number"
                  placeholder="?"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-24 h-10 text-center bg-white text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  min="0"
                  max="100"
                  aria-label="Verification Answer"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div
                ref={canvasContainerRef}
                className="relative touch-none"
                onPointerMove={handlePointerMove}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                style={getCursorStyle()}
              >
                <canvas
                  ref={canvasRef}
                  onPointerDown={startDrawing}
                  onPointerUp={stopDrawing}
                  onPointerMove={draw}
                  onPointerLeave={stopDrawing}
                  className="aspect-video w-full rounded-md border border-gray-300 bg-white"
                  aria-label="Drawing Canvas"
                />
                {isOverCanvas && (
                  <div
                    className="paintbrush-cursor"
                    style={{
                      position: "absolute",
                      left: "var(--x)",
                      top: "var(--y)",
                      transform: "translate(-50%, -50%) rotate(var(--angle))",
                      pointerEvents: "none",
                      fontSize: "24px",
                    }}
                  >
                    🖌️
                  </div>
                )}
                {alertMessage && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-md bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
                    {alertMessage}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-md p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <Droplet className="h-5 w-5" />
                      <span className="hidden sm:inline">Brush</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {brushTypes.map(({ type, icon: Icon, label }) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => setBrushType(type)}
                        className={
                          brushType === type
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      aria-label="Choose Brush Color"
                    >
                      <Palette className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {[
                        "#000000",
                        "#FF0000",
                        "#00FF00",
                        "#0000FF",
                        "#FFFF00",
                        "#FF00FF",
                        "#00FFFF",
                        "#FFFFFF",
                      ].map((color) => (
                        <button
                          key={color}
                          className="h-8 w-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                          style={{ backgroundColor: color }}
                          onClick={() => setBrushColor(color)}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                    <Input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="h-10 w-full"
                      aria-label="Choose custom brush color"
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex-grow">
                  <CustomSlider
                    min={1}
                    max={20}
                    value={brushSize}
                    onChange={setBrushSize}
                    className="w-full"
                    aria-label="Brush Size Slider"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={clearCanvas}
                        variant="outline"
                        className="p-2"
                        aria-label="Clear Canvas"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear Canvas</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={downloadImage}
                        variant="outline"
                        className="p-2"
                        aria-label="Download Image"
                      >
                        <DownloadCloud className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Image</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="p-2"
                        aria-label="Copy to Clipboard"
                      >
                        <Clipboard className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to Clipboard</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Got an idea? Add a sketch to your message.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              type="button"
              variant="outline"
              onClick={clearForm}
              className="flex w-full items-center justify-center py-6 text-lg sm:w-auto"
              aria-label="Clear All"
            >
              <X className="mr-2 h-5 w-5" /> Clear All
            </Button>
            <Button
              type="submit"
              className="flex w-full items-center justify-center bg-primary py-6 text-lg text-primary-foreground sm:w-auto"
              aria-label="Send Message"
            >
              <Send className="mr-2 h-5 w-5" /> Send Message
            </Button>
          </div>

          {status && (
            <div
              className={`mt-4 text-center ${
                status.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </section>
    </TooltipProvider>
  );
};

export default StreamlinedContactForm;
