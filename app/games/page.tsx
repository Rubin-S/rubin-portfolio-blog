"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";
import Link from "next/link";

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

  // Terminal typing effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < TERMINAL_LOGS.length) {
        setLogs((prev) => [...prev.slice(-4), TERMINAL_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        // Randomly add new logs after initial sequence
        if (Math.random() > 0.9) {
          const randomLog = `Process ID: ${Math.floor(Math.random() * 9999)} - OK`;
          setLogs((prev) => [...prev.slice(-4), randomLog]);
        }
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Spawn Debris Function
  const spawnDebris = useCallback((x: number, y: number) => {
    if (!engineRef.current) return;

    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    const size = Math.random() * 30 + 10;
    const isCircle = Math.random() > 0.5;

    const body = isCircle
      ? Bodies.circle(x, y, size / 2, {
        restitution: 0.9,
        friction: 0.005,
        frictionAir: 0.01,
        render: {
          fillStyle: "transparent",
          strokeStyle: Math.random() > 0.5 ? "#ff00ff" : "#00ffff",
          lineWidth: 2
        }
      })
      : Bodies.polygon(x, y, 3, size, {
        restitution: 0.9,
        friction: 0.005,
        frictionAir: 0.01,
        render: {
          fillStyle: "transparent",
          strokeStyle: Math.random() > 0.5 ? "#ff00ff" : "#00ffff",
          lineWidth: 2
        }
      });

    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10
    });

    Composite.add(engineRef.current.world, body);
    setLogs(prev => [...prev.slice(-4), `Spawned entity at {${Math.floor(x)}, ${Math.floor(y)}}`]);
  }, []);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      if (!engine) return;

      switch (e.key.toLowerCase()) {
        case 'g':
          const newGravity = !engine.world.gravity.y;
          engine.world.gravity.y = newGravity ? 1 : 0;
          setGravityEnabled(newGravity);
          setLogs(prev => [...prev.slice(-4), `Gravity: ${newGravity ? "ON" : "OFF"}`]);
          break;
        case 'r':
          Matter.Composite.clear(engine.world, false);
          // Re-add static bodies if we cleared everything, but for now let's just clear debris
          // Actually, a full reset is complex, let's just clear non-static bodies
          const bodies = Matter.Composite.allBodies(engine.world);
          bodies.forEach(body => {
            if (!body.isStatic && body.label !== "COMING SOON") { // Keep text
              Matter.Composite.remove(engine.world, body);
            }
          });
          setLogs(prev => [...prev.slice(-4), "System Purge Initiated..."]);
          break;
        case ' ':
          spawnDebris(mousePos.x, mousePos.y);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mousePos, spawnDebris]);

  // Scroll Interaction (Time Dilation)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!engineRef.current) return;

      // Zoom in/out affects time scale
      let newScale = engineRef.current.timing.timeScale + (e.deltaY * -0.001);
      newScale = Math.min(Math.max(newScale, 0.1), 3); // Clamp between 0.1 and 3

      engineRef.current.timing.timeScale = newScale;
      setTimeScale(newScale);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // Create "COMING SOON" letters attached to strings
    const text = "COMING SOON";
    const startX = window.innerWidth / 2 - (text.length * 60) / 2;
    const startY = window.innerHeight / 3;

    text.split("").forEach((char, index) => {
      if (char === " ") return; // Skip spaces

      const x = startX + index * 60;
      const y = startY + Math.random() * 50;

      // Create the letter body (a box)
      const letterBody = Bodies.rectangle(x, y + 100, 50, 50, {
        restitution: 0.8,
        friction: 0.1,
        frictionAir: 0.01,
        render: {
          fillStyle: "#00ff9d", // Neon green
          strokeStyle: "#ffffff",
          lineWidth: 2,
        },
        label: char,
      });

      // Create the anchor point (static)
      const anchor = Bodies.circle(x, startY, 5, {
        isStatic: true,
        render: { visible: false },
      });

      // Create the string (constraint)
      const string = Constraint.create({
        bodyA: anchor,
        bodyB: letterBody,
        stiffness: 0.1,
        damping: 0.05,
        length: 150,
        render: {
          strokeStyle: "rgba(255, 255, 255, 0.3)",
          lineWidth: 1,
        },
      });

      Composite.add(world, [anchor, letterBody, string]);
    });

    // Add "Data Debris" (Random shapes)
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 20 + 10;

      const isCircle = Math.random() > 0.5;
      const body = isCircle
        ? Bodies.circle(x, y, size / 2, {
          restitution: 0.9,
          friction: 0.005,
          frictionAir: 0.02,
          render: {
            fillStyle: "transparent",
            strokeStyle: Math.random() > 0.5 ? "#ff00ff" : "#00ffff",
            lineWidth: 1
          }
        })
        : Bodies.polygon(x, y, 3, size, {
          restitution: 0.9,
          friction: 0.005,
          frictionAir: 0.02,
          render: {
            fillStyle: "transparent",
            strokeStyle: Math.random() > 0.5 ? "#ff00ff" : "#00ffff",
            lineWidth: 1
          }
        });

      Composite.add(world, body);
    }

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Custom rendering for text
    Events.on(render, "afterRender", () => {
      const context = render.context;
      context.font = "bold 30px 'Courier New', monospace";
      context.fillStyle = "#000000";
      context.textAlign = "center";
      context.textBaseline = "middle";

      Composite.allBodies(world).forEach((body) => {
        if (body.label && body.label.length === 1) { // Single char labels are our text
          const { x, y } = body.position;
          context.save();
          context.translate(x, y);
          context.rotate(body.angle);
          context.fillText(body.label, 0, 0);
          context.restore();
        }
      });
    });

    // Run the engine
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Handle resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-mono selection:bg-neon-green selection:text-black cursor-crosshair">
      {/* Reactive Background Grid Animation */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 157, 0.1), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 pointer-events-none">
        <header className="flex justify-between items-center p-8">
          <div
            className="text-xs uppercase tracking-[0.2em] text-neutral-500 pointer-events-auto cursor-pointer hover:text-[#00ff9d] transition-colors"
            onClick={() => setSystemStatus(prev => prev === "Online" ? "Offline" : "Online")}
          >
            System Status: <span className={`text-[#00ff9d] ${systemStatus === "Online" ? "animate-pulse" : "text-red-500"}`}>{systemStatus}</span>
          </div>
          <div
            className="text-xs uppercase tracking-[0.2em] text-neutral-500 pointer-events-auto cursor-pointer hover:text-[#ff00ff] transition-colors"
            onClick={() => setProtocol(prev => prev === "V.2.0.4" ? "V.3.0.0-BETA" : "V.2.0.4")}
          >
            Protocol: <span className="text-[#ff00ff]">{protocol}</span>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center mt-20">
          <div className="relative">
            <h1 className="glitch-text text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 mb-4 mix-blend-difference" data-text="GAMES">
              GAMES
            </h1>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md text-center tracking-wide uppercase mb-8">
            Advanced simulations loading...
          </p>

          {/* Controls Hint */}
          <div className="mt-8 text-[10px] text-neutral-600 flex gap-4">
            <span>[G] Gravity: {gravityEnabled ? "ON" : "OFF"}</span>
            <span>[SPACE] Spawn</span>
            <span>[R] Purge</span>
            <span>[SCROLL] Time Dilation: {timeScale.toFixed(1)}x</span>
          </div>
        </main>
      </div>

      {/* Physics Canvas */}
      <div ref={sceneRef} className="absolute inset-0 z-20" />

      {/* System Terminal */}
      <div className="absolute top-1/3 right-10 w-64 font-mono text-[10px] text-[#00ff9d] opacity-70 z-10 pointer-events-none hidden md:block">
        <div className="border-b border-[#00ff9d]/30 mb-2 pb-1">TERMINAL_OUTPUT</div>
        {logs.map((log, i) => (
          <div key={i} className="mb-1">&gt; {log}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>

      {/* Back Button - Fixed Position & High Z-Index */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <Link
          href="/"
          className="px-6 py-2 border border-neutral-800 bg-black/80 backdrop-blur-md text-neutral-400 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full"
        >
          Back to Portfolio
        </Link>
      </div>

      {/* Footer / Dashboard Elements */}
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
            0% { width: 0% }
            50% { width: 70% }
            100% { width: 40% }
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
    </div >
  );
}
