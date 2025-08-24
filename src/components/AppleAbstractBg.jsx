import { useEffect, useRef } from "react";

export default function AppleAbstractBg() {
  const svgRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);
  const targetScroll = useRef(0);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    };
    
    const handleScroll = () => {
      targetScroll.current = window.scrollY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
  mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
  mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;
  scrollPos.current += (targetScroll.current - scrollPos.current) * 0.08;
      
      if (svgRef.current) {
        const blur1 = svgRef.current.querySelector("#blur1");
        const blur2 = svgRef.current.querySelector("#blur2");
        const blur3 = svgRef.current.querySelector("#blur3");
        const blur4 = svgRef.current.querySelector("#blur4");
        const blur5 = svgRef.current.querySelector("#blur5");
        
        if (blur1 && blur2 && blur3 && blur4 && blur5) {
          const s = scrollPos.current;
          blur1.setAttribute('cx', `${900 - mousePos.current.x * 30 + Math.sin(s * 0.02) * 20}`);
          blur1.setAttribute('cy', `${300 - mousePos.current.y * 20 - s * 0.5}`);

          blur2.setAttribute('cx', `${500 + mousePos.current.x * 40 + Math.cos(s * 0.01) * 15}`);
          blur2.setAttribute('cy', `${650 - mousePos.current.y * 30 - s * 0.7}`);

          blur3.setAttribute('cx', `${1150 - mousePos.current.x * 20 + Math.sin(s * 0.03) * 10}`);
          blur3.setAttribute('cy', `${700 - mousePos.current.y * 40 - s * 0.3}`);

          blur4.setAttribute('cx', `${300 + mousePos.current.x * 50 + Math.cos(s * 0.015) * 25}`);
          blur4.setAttribute('cy', `${250 - mousePos.current.y * 25 - s * 0.6}`);

          blur5.setAttribute('cx', `${750 - mousePos.current.x * 15 + Math.sin(s * 0.025) * 30}`);
          blur5.setAttribute('cy', `${500 + mousePos.current.y * 35 - s * 0.4}`);
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div 
      style={{
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4eaf0 100%)"
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: 'block'
        }}
      >
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a18cd1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbc2eb" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84fab0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8fd3f4" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6d365" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fda085" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9a9e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fecfef" stopOpacity="0.3" />
          </linearGradient>
          
          <filter id="liquidGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="liquid" />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
          
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
        </defs>
        
        <g filter="url(#softBlur)">
          <circle id="blur1" cx="900" cy="300" r="300" fill="url(#blueGradient)" opacity="0.9" />
          <circle id="blur2" cx="500" cy="650" r="250" fill="url(#purpleGradient)" opacity="0.85" />
          <circle id="blur3" cx="1150" cy="700" r="220" fill="url(#greenGradient)" opacity="0.8" />
          <circle id="blur4" cx="300" cy="250" r="180" fill="url(#orangeGradient)" opacity="0.75" />
          <circle id="blur5" cx="750" cy="500" r="200" fill="url(#pinkGradient)" opacity="0.7" />
        </g>
        
        <rect width="100%" height="100%" fill="rgba(255,255,255,0.3)" />
      </svg>
      
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')"
        }}
      />
    </div>
  );
}
