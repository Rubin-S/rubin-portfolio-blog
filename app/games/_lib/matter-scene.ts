import type { MutableRefObject } from "react";
import Matter from "matter-js";

interface MatterSceneRefs {
  engineRef: MutableRefObject<Matter.Engine | null>;
  renderRef: MutableRefObject<Matter.Render | null>;
  runnerRef: MutableRefObject<Matter.Runner | null>;
}

interface InitializeMatterSceneOptions extends MatterSceneRefs {
  element: HTMLDivElement;
}

function createDebrisBody(
  x: number,
  y: number,
  options: {
    frictionAir: number;
    lineWidth: number;
  }
) {
  const Bodies = Matter.Bodies;
  const size = Math.random() * 30 + 10;
  const isCircle = Math.random() > 0.5;

  return isCircle
    ? Bodies.circle(x, y, size / 2, {
        restitution: 0.9,
        friction: 0.005,
        frictionAir: options.frictionAir,
        render: {
          fillStyle: "transparent",
          strokeStyle: Math.random() > 0.5 ? "#ff00ff" : "#00ffff",
          lineWidth: options.lineWidth,
        },
      })
    : Bodies.polygon(x, y, 3, size, {
        restitution: 0.9,
        friction: 0.005,
        frictionAir: options.frictionAir,
        render: {
          fillStyle: "transparent",
          strokeStyle: Math.random() > 0.5 ? "#ff00ff" : "#00ffff",
          lineWidth: options.lineWidth,
        },
      });
}

export function spawnDebris(engine: Matter.Engine | null, x: number, y: number) {
  if (!engine) {
    return;
  }

  const Composite = Matter.Composite;
  const body = createDebrisBody(x, y, {
    frictionAir: 0.01,
    lineWidth: 2,
  });

  Matter.Body.setVelocity(body, {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
  });

  Composite.add(engine.world, body);
}

export function purgeDebris(engine: Matter.Engine | null) {
  if (!engine) {
    return;
  }

  Matter.Composite.clear(engine.world, false);

  const bodies = Matter.Composite.allBodies(engine.world);
  bodies.forEach((body) => {
    if (!body.isStatic && body.label !== "COMING SOON") {
      Matter.Composite.remove(engine.world, body);
    }
  });
}

export function initializeMatterScene({
  element,
  engineRef,
  renderRef,
  runnerRef,
}: InitializeMatterSceneOptions) {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;
  const Bodies = Matter.Bodies;
  const Composite = Matter.Composite;
  const Constraint = Matter.Constraint;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  const Events = Matter.Events;

  const engine = Engine.create();
  const world = engine.world;
  engineRef.current = engine;

  const render = Render.create({
    element,
    engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "transparent",
      pixelRatio: window.devicePixelRatio,
    },
  });
  renderRef.current = render;

  const text = "COMING SOON";
  const startX = window.innerWidth / 2 - (text.length * 60) / 2;
  const startY = window.innerHeight / 3;

  text.split("").forEach((char, index) => {
    if (char === " ") {
      return;
    }

    const x = startX + index * 60;
    const y = startY + Math.random() * 50;

    const letterBody = Bodies.rectangle(x, y + 100, 50, 50, {
      restitution: 0.8,
      friction: 0.1,
      frictionAir: 0.01,
      render: {
        fillStyle: "#00ff9d",
        strokeStyle: "#ffffff",
        lineWidth: 2,
      },
      label: char,
    });

    const anchor = Bodies.circle(x, startY, 5, {
      isStatic: true,
      render: { visible: false },
    });

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

  for (let i = 0; i < 15; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const body = createDebrisBody(x, y, {
      frictionAir: 0.02,
      lineWidth: 1,
    });

    Composite.add(world, body);
  }

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });
  Composite.add(world, mouseConstraint);

  render.mouse = mouse;

  Events.on(render, "afterRender", () => {
    const context = render.context;
    context.font = "bold 30px 'Courier New', monospace";
    context.fillStyle = "#000000";
    context.textAlign = "center";
    context.textBaseline = "middle";

    Composite.allBodies(world).forEach((body) => {
      if (body.label && body.label.length === 1) {
        const { x, y } = body.position;
        context.save();
        context.translate(x, y);
        context.rotate(body.angle);
        context.fillText(body.label, 0, 0);
        context.restore();
      }
    });
  });

  Render.run(render);
  const runner = Runner.create();
  runnerRef.current = runner;
  Runner.run(runner, engine);

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
}
