// Fireworks.js
class Firework {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.particles = [];
      this.isExploded = false;
    }
  
    draw(ctx) {
      if (!this.isExploded) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      } else {
        this.particles.forEach((particle) => particle.draw(ctx));
      }
    }
  
    explode() {
      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 1;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const particle = new Particle(this.x, this.y, vx, vy, this.color);
        this.particles.push(particle);
      }
      this.isExploded = true;
    }
  
    update() {
      if (!this.isExploded) {
        this.y -= 3;
        if (Math.random() < 0.02) {
          this.explode();
        }
      } else {
        this.particles.forEach((particle) => particle.update());
      }
    }
  }
  
  class Particle {
    constructor(x, y, vx, vy, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.alpha = 1;
      this.color = color;
    }
  
    draw(ctx) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      ctx.globalAlpha = 1;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.alpha -= 0.01;
    }
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '99999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const fireworks = [];
  
  function createFirework() {
    const xPos = Math.random() * canvas.width;
    const yPos = canvas.height;
    const size = Math.random() * 3 + 1;
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
  
    const firework = new Firework(xPos, yPos, size, color);
    fireworks.push(firework);
  }
  
  function showFireworks() {
    requestAnimationFrame(showFireworks);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (Math.random() < 0.05) {
      createFirework();
    }
  
    fireworks.forEach((
  