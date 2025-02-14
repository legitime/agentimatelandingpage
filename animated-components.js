export class AnimatedComponents {
    constructor(container) {
        this.container = container;
        this.components = [];
    }

    createComponent(type) {
        const component = document.createElement('div');
        component.className = 'animated-component';
        component.style.cssText = `
            position: absolute;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.5s ease-out;
        `;

        let svg;
        switch (type) {
            case 'design':
                svg = this.createDesignSVG();
                break;
            case 'code':
                svg = this.createCodeSVG();
                break;
            case 'animation':
                svg = this.createAnimationSVG();
                break;
        }

        component.appendChild(svg);
        this.container.appendChild(component);
        this.components.push(component);
        return component;
    }

    createDesignSVG() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.width = '80px';
        svg.style.height = '80px';

        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.id = 'designGradient';
        gradient.innerHTML = `
            <stop offset="0%" stop-color="#FF6B6B"/>
            <stop offset="100%" stop-color="#4ECDC4"/>
        `;
        svg.appendChild(gradient);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M20,20 L80,20 L80,80 L20,80 Z');
        path.style.stroke = 'url(#designGradient)';
        path.style.fill = 'none';
        path.style.strokeWidth = '2';
        svg.appendChild(path);

        return svg;
    }

    createCodeSVG() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.width = '80px';
        svg.style.height = '80px';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M30,40 L10,50 L30,60 M70,40 L90,50 L70,60');
        path.style.stroke = '#4ECDC4';
        path.style.fill = 'none';
        path.style.strokeWidth = '2';
        svg.appendChild(path);

        return svg;
    }

    createAnimationSVG() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.width = '80px';
        svg.style.height = '80px';

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '30');
        circle.style.stroke = '#FF6B6B';
        circle.style.fill = 'none';
        circle.style.strokeWidth = '2';
        svg.appendChild(circle);

        return svg;
    }

    async animateComponent(component, delay = 0, position = { x: 0, y: 0 }) {
        await new Promise(resolve => setTimeout(resolve, delay));
        
        component.style.transform = `translate(${position.x}px, ${position.y}px) scale(1)`;
        component.style.opacity = '1';
        
        return new Promise(resolve => {
            component.addEventListener('transitionend', resolve, { once: true });
        });
    }

    async createAnimation() {
        const design = this.createComponent('design');
        const code = this.createComponent('code');
        const animation = this.createComponent('animation');

        await this.animateComponent(design, 0, { x: -100, y: 0 });
        await this.animateComponent(code, 300, { x: 0, y: 50 });
        await this.animateComponent(animation, 600, { x: 100, y: 0 });

        // Add continuous animation
        this.components.forEach(comp => {
            comp.style.animation = 'float 3s infinite alternate ease-in-out';
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px); }
                100% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
} 