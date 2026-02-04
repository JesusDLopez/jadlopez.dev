import { useEffect, useRef } from 'react';

const ParticleCanvas = ({ side = 'left', width = 200, height = 60 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with device pixel ratio for sharp rendering
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Particle class
    class Particle {
      constructor(x, y, side) {
        this.x = x;
        this.y = y;
        this.side = side;
        this.size = Math.random() * 1.8 + 0.6; // 0.6-2.4px variety

        if (side === 'left') {
          // Decomposition - drift left away from tube
          this.speedX = -(Math.random() * 1.5 + 0.8); // -0.8 to -2.3
          this.speedY = (Math.random() - 0.5) * 0.6; // Slight vertical wobble
          this.alpha = 0.85; // Start visible
        } else {
          // Integration - start with random velocity, will converge
          this.speedX = (Math.random() - 0.5) * 2; // Random initial direction
          this.speedY = (Math.random() - 0.5) * 2;
          this.alpha = 0.2; // Start faint
          this.targetX = width - 10; // Converge toward tube edge (right side of canvas)
          this.targetY = y;
        }

        this.life = 0;
        this.maxLife = side === 'left' ? 120 : 100; // Longer lifetime
      }

      update() {
        this.life++;
        const progress = this.life / this.maxLife;

        if (this.side === 'left') {
          // Decomposition - drift away and fade out
          this.x += this.speedX;
          this.y += this.speedY;
          // Add slight acceleration leftward (pulled away from tube)
          this.speedX -= 0.01;
          // Fade out progressively
          this.alpha = Math.max(0, 0.85 * (1 - progress));
        } else {
          // Integration - converge toward tube edge and fade in
          if (progress < 0.6) {
            // Early stage - random motion
            this.x += this.speedX;
            this.y += this.speedY;
            // Gradually reduce random motion
            this.speedX *= 0.98;
            this.speedY *= 0.98;
          } else {
            // Late stage - strong convergence toward tube
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            this.x += dx * 0.15; // Accelerate toward target
            this.y += dy * 0.15;
          }

          // Fade in as particles converge
          this.alpha = Math.min(0.85, progress * 1.5);
        }

        return this.life < this.maxLife;
      }

      draw(ctx) {
        ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`; // Black particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Spawn particles continuously
    const spawnParticles = () => {
      const spawnCount = side === 'left' ? 4 : 5; // More particles for reparticulation

      for (let i = 0; i < spawnCount; i++) {
        let x, y;

        if (side === 'left') {
          // Decomposition - spawn near tube edge (right side of canvas)
          x = width - 30 + Math.random() * 30; // Near right edge of left canvas
          y = Math.random() * height;
        } else {
          // Integration - spawn scattered across zone
          x = Math.random() * width; // Anywhere in right canvas
          y = Math.random() * height;
        }

        particlesRef.current.push(new Particle(x, y, side));
      }

      // Limit particle count for performance
      if (particlesRef.current.length > 150) {
        particlesRef.current = particlesRef.current.slice(-150);
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Spawn new particles every few frames
      if (Math.random() < 0.3) {
        spawnParticles();
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        const alive = particle.update();
        if (alive) {
          particle.draw(ctx);
        }
        return alive;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [side, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas particle-canvas-${side}`}
    />
  );
};

export default ParticleCanvas;
