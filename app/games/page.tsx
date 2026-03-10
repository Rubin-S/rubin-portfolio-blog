"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import Link from "next/link";
import {
  initializeMatterScene,
  purgeDebris,
  spawnDebris,
} from "./_lib/matter-scene";

const TERMINAL_LOGS = [
  "Initializing physics engine...",
  "Loading assets...",
  "Breach detected in sector 7G...",
  "Optimizing render pipeline...",
  "Decrypting game files...",
  "System stable.",
  "Waiting for user input...",
];

export default function GamesPage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  const [logs, setLogs] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [systemStatus, setSystemStatus] = useState("Online");
  const [protocol, setProtocol] = useState("V.2.0.4");
  const [gravityEnabled, setGravityEnabled] = useState(true);
  const [timeScale, setTimeScale] = useState(1);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < TERMINAL_LOGS.length) {
        setLogs((prev) => [...prev.slice(-4), TERMINAL_LOGS[currentIndex]]);
        currentIndex += 1;
      } else if (Math.random() > 0.9) {
        const randomLog = `Process ID: ${Math.floor(Math.random() * 9999)} - OK`;
        setLogs((prev) => [...prev.slice(-4), randomLog]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSpawnDebris = useCallback((x: number, y: number) => {
    spawnDebris(engineRef.current, x, y);
    setLogs((prev) => [...prev.slice(-4), `Spawned entity at {${Math.floor(x)}, ${Math.floor(y)}}`]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const engine = engineRef.current;
      if (!engine) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "g": {
          const nextGravityEnabled = !engine.world.gravity.y;
          engine.world.gravity.y = nextGravityEnabled ? 1 : 0;
          setGravityEnabled(nextGravityEnabled);
          setLogs((prev) => [...prev.slice(-4), `Gravity: ${nextGravityEnabled ? "ON" : "OFF"}`]);
          break;
        }
        case "r":
          purgeDebris(engine);
          setLogs((prev) => [...prev.slice(-4), "System Purge Initiated..."]);
          break;
        case " ":
          handleSpawnDebris(mousePos.x, mousePos.y);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSpawnDebris, mousePos]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!engineRef.current) {
        return;
      }

      let nextScale = engineRef.current.timing.timeScale + event.deltaY * -0.001;
      nextScale = Math.min(Math.max(nextScale, 0.1), 3);

      engineRef.current.timing.timeScale = nextScale;
      setTimeScale(nextScale);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }

    return initializeMatterScene({
      element: sceneRef.current,
      engineRef,
      renderRef,
      runnerRef,
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-mono selection:bg-neon-green selection:text-black cursor-crosshair">
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 157, 0.1), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <header className="flex justify-between items-center p-8">
          <div
            className="text-xs uppercase tracking-[0.2em] text-neutral-500 pointer-events-auto cursor-pointer hover:text-[#00ff9d] transition-colors"
            onClick={() => setSystemStatus((prev) => (prev === "Online" ? "Offline" : "Online"))}
          >
            System Status:{" "}
            <span className={`text-[#00ff9d] ${systemStatus === "Online" ? "animate-pulse" : "text-red-500"}`}>
              {systemStatus}
            </span>
          </div>
          <div
            className="text-xs uppercase tracking-[0.2em] text-neutral-500 pointer-events-auto cursor-pointer hover:text-[#ff00ff] transition-colors"
            onClick={() => setProtocol((prev) => (prev === "V.2.0.4" ? "V.3.0.0-BETA" : "V.2.0.4"))}
          >
            Protocol: <span className="text-[#ff00ff]">{protocol}</span>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center mt-20">
          <div className="relative">
            <h1
              className="glitch-text text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 mb-4 mix-blend-difference"
              data-text="GAMES"
            >
              GAMES
            </h1>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md text-center tracking-wide uppercase mb-8">
            Advanced simulations loading...
          </p>

          <div className="mt-8 text-[10px] text-neutral-600 flex gap-4">
            <span>[G] Gravity: {gravityEnabled ? "ON" : "OFF"}</span>
            <span>[SPACE] Spawn</span>
            <span>[R] Purge</span>
            <span>[SCROLL] Time Dilation: {timeScale.toFixed(1)}x</span>
          </div>
        </main>
      </div>

      <div ref={sceneRef} className="absolute inset-0 z-20" />

      <div className="absolute top-1/3 right-10 w-64 font-mono text-[10px] text-[#00ff9d] opacity-70 z-10 pointer-events-none hidden md:block">
        <div className="border-b border-[#00ff9d]/30 mb-2 pb-1">TERMINAL_OUTPUT</div>
        {logs.map((log, index) => (
          <div key={`${log}-${index}`} className="mb-1">
            &gt; {log}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <Link
          href="/"
          className="px-6 py-2 border border-neutral-800 bg-black/80 backdrop-blur-md text-neutral-400 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full"
        >
          Back to Portfolio
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-30 pointer-events-none">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-1 bg-neutral-800 overflow-hidden">
            <div className="h-full bg-[#00ff9d] animate-progress w-1/2" />
          </div>
          <span className="text-[10px] text-neutral-600 uppercase">Memory Usage: 42%</span>
        </div>

        <div className="text-[10px] text-neutral-600 uppercase text-right">
          <div>Coordinates: {`{ ${mousePos.x}, ${mousePos.y} }`}</div>
          <div>Sector: 7G</div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 40%;
          }
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }

        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #00fff9;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(30px, 9999px, 10px, 0); }
          5% { clip: rect(80px, 9999px, 90px, 0); }
          10% { clip: rect(10px, 9999px, 40px, 0); }
          15% { clip: rect(50px, 9999px, 20px, 0); }
          20% { clip: rect(20px, 9999px, 60px, 0); }
          25% { clip: rect(90px, 9999px, 30px, 0); }
          30% { clip: rect(10px, 9999px, 80px, 0); }
          35% { clip: rect(60px, 9999px, 10px, 0); }
          40% { clip: rect(40px, 9999px, 50px, 0); }
          45% { clip: rect(70px, 9999px, 20px, 0); }
          50% { clip: rect(20px, 9999px, 90px, 0); }
          55% { clip: rect(50px, 9999px, 10px, 0); }
          60% { clip: rect(10px, 9999px, 40px, 0); }
          65% { clip: rect(80px, 9999px, 20px, 0); }
          70% { clip: rect(30px, 9999px, 60px, 0); }
          75% { clip: rect(90px, 9999px, 10px, 0); }
          80% { clip: rect(40px, 9999px, 70px, 0); }
          85% { clip: rect(10px, 9999px, 30px, 0); }
          90% { clip: rect(60px, 9999px, 50px, 0); }
          95% { clip: rect(20px, 9999px, 80px, 0); }
          100% { clip: rect(70px, 9999px, 10px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(10px, 9999px, 80px, 0); }
          5% { clip: rect(60px, 9999px, 20px, 0); }
          10% { clip: rect(30px, 9999px, 50px, 0); }
          15% { clip: rect(90px, 9999px, 10px, 0); }
          20% { clip: rect(40px, 9999px, 70px, 0); }
          25% { clip: rect(20px, 9999px, 30px, 0); }
          30% { clip: rect(70px, 9999px, 60px, 0); }
          35% { clip: rect(10px, 9999px, 90px, 0); }
          40% { clip: rect(50px, 9999px, 20px, 0); }
          45% { clip: rect(80px, 9999px, 40px, 0); }
          50% { clip: rect(30px, 9999px, 10px, 0); }
          55% { clip: rect(60px, 9999px, 50px, 0); }
          60% { clip: rect(90px, 9999px, 20px, 0); }
          65% { clip: rect(20px, 9999px, 80px, 0); }
          70% { clip: rect(50px, 9999px, 30px, 0); }
          75% { clip: rect(10px, 9999px, 60px, 0); }
          80% { clip: rect(70px, 9999px, 10px, 0); }
          85% { clip: rect(40px, 9999px, 90px, 0); }
          90% { clip: rect(80px, 9999px, 20px, 0); }
          95% { clip: rect(30px, 9999px, 50px, 0); }
          100% { clip: rect(60px, 9999px, 10px, 0); }
        }
      `}</style>
    </div>
  );
}
