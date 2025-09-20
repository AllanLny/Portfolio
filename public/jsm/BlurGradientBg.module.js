class BlurGradientBg {
    constructor(params = {}) {
        this.params = params;
        this.options = {};
        this.loop = params.loop || false;
        this.speed = params.speed || 0.3;
        this.scrollFactor = params.scrollFactor || 0.001;
        this.opacity = params.opacity || 0.8;
        this.noise = params.noise || 0.05;
        this.colors_num = 4;
        this.colors_init = params.colors || [
            "#6e8efb", // Bleu clair
            "#a777e3", // Violet clair
            "#c4b5fd", // Lavande
            "#8b5cf6"  // Violet moyen
        ];
        this.palette = [];
        this.colors(this.colors_init);
        
        // Setup
        this.parentDom = params.dom ? document.getElementById(params.dom) : document.body;
        if (window.getComputedStyle(this.parentDom).position === 'static') {
            this.parentDom.style.position = 'relative';
        }

        const rect = this._getParentRect(this.parentDom);
        this.canvasW = this.originW = rect.w;
        this.canvasH = this.originH = rect.h;
        
        // Initialisation du canvas
        this._initCanvas();
        
        // Ajouter l'écouteur de scroll
        this._bindScrollListener();
        
        // Démarrer l'animation
        this.start();
    }

    _initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.opacity = this.opacity.toString();
        this.canvas.style.transition = 'opacity 0.3s ease';
        this.canvas.style.zIndex = '-1';
        this.parentDom.appendChild(this.canvas);

        // Ajouter willReadFrequently pour optimiser getImageData
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.canvas.width = this.canvasW;
        this.canvas.height = this.canvasH;
    }

    _bindScrollListener() {
        this._handleScroll = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrollY / maxScroll;
            this.scrollOffset = scrollProgress * this.scrollFactor;
        };
        window.addEventListener('scroll', this._handleScroll);
    }

    update(type, value) {
        switch(type) {
            case 'speed':
                this.speed = parseFloat(value);
                break;
            case 'noise':
                this.noise = parseFloat(value);
                break;
            case 'opacity':
                this.opacity = parseFloat(value);
                this.canvas.style.opacity = this.opacity.toString();
                break;
        }
    }

    _getParentRect(parentDom) {
        const rect = parentDom.getBoundingClientRect();
        return {
            w: rect.width,
            h: rect.height
        };
    }

    colors(colors) {
        this.palette = colors.length ? colors : [
            "#6e8efb", // Bleu clair
            "#a777e3", // Violet clair
            "#c4b5fd", // Lavande
            "#8b5cf6"  // Violet moyen
        ];
        this._resetColors();
    }

    _resetColors() {
        this.currentColorIndex = 0;
        this.nextColorIndex = 1;
        this.transitionProgress = 0;
    }

    start() {
        this.frame = 0;
        this._resetColors();
        this._animate();
    }

    _animate = () => {
        if (!this.canvas) return;

        this.frame++;
        const ease = t => t * t * (3 - 2 * t);
        this.transitionProgress += this.speed * (0.01 + (this.scrollOffset || 0));
        const easedProgress = ease(this.transitionProgress % 1);

        if (this.transitionProgress >= 1) {
            this.transitionProgress = 0;
            this.currentColorIndex = (this.currentColorIndex + 1) % this.palette.length;
            this.nextColorIndex = (this.currentColorIndex + 1) % this.palette.length;
        }

        const currentColor = this._hexToRgb(this.palette[this.currentColorIndex]);
        const nextColor = this._hexToRgb(this.palette[this.nextColorIndex]);
        
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        
        // Créer plusieurs gradients pour l'effet liquide
        const numGradients = 3;
        for (let i = 0; i < numGradients; i++) {
            const offsetX = Math.sin(this.frame * 0.01 + i * Math.PI * 2 / numGradients) * 50;
            const offsetY = Math.cos(this.frame * 0.01 + i * Math.PI * 2 / numGradients) * 50;
            
            const gradient = this.ctx.createRadialGradient(
                this.canvasW / 2 + offsetX, 
                this.canvasH / 2 + offsetY, 
                0,
                this.canvasW / 2 + offsetX, 
                this.canvasH / 2 + offsetY, 
                Math.max(this.canvasW, this.canvasH)
            );
            
            const r = this._lerp(currentColor.r, nextColor.r, easedProgress);
            const g = this._lerp(currentColor.g, nextColor.g, easedProgress);
            const b = this._lerp(currentColor.b, nextColor.b, easedProgress);
            
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.8 / numGradients})`);
            gradient.addColorStop(1, `rgba(${nextColor.r}, ${nextColor.g}, ${nextColor.b}, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
        }
        
        // Ajouter du bruit pour plus de texture
        this._addNoise();
        
        if (this.loop) {
            requestAnimationFrame(this._animate);
        }
    }

    _addNoise() {
        // Optimisation de la méthode _addNoise
        const imageData = this.ctx.getImageData(0, 0, this.canvasW, this.canvasH);
        const data = imageData.data;
        const noise = this.noise;
        const length = data.length;

        // Utiliser une boucle optimisée
        for (let i = 0; i < length; i += 4) {
            const random = (Math.random() - 0.5) * noise * 255;
            data[i] = Math.min(255, Math.max(0, data[i] + random));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + random));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + random));
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    _hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    _lerp(start, end, t) {
        return Math.round(start + (end - start) * t);
    }

    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('scroll', this._handleScroll);
        this.canvas = null;
        this.ctx = null;
    }
}

export { BlurGradientBg };