export class TypingAnimation {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            cursorColor: '#4ECDC4',
            backgroundColor: 'rgba(30, 32, 35, 0.95)',
            textColor: '#fff',
            fontSize: '1.2rem',
            height: '200px',
            ...options
        };
        this.init();
    }

    init() {
        // Create the input container
        this.inputContainer = document.createElement('div');
        this.inputContainer.className = 'typing-container';
        this.inputContainer.style.cssText = `
            background: ${this.options.backgroundColor};
            border-radius: 12px;
            padding: 1.5rem;
            position: relative;
            width: 100%;
            height: ${this.options.height};
            margin-bottom: 2rem;
            font-family: 'Inter', monospace;
            font-size: ${this.options.fontSize};
            color: ${this.options.textColor};
            overflow: hidden;
        `;

        // Create the text area
        this.textArea = document.createElement('div');
        this.textArea.className = 'typing-text';
        this.textArea.style.cssText = `
            position: relative;
            white-space: pre-wrap;
            margin: 0;
            padding: 0;
        `;

        // Create the cursor
        this.cursor = document.createElement('span');
        this.cursor.className = 'typing-cursor';
        this.cursor.innerHTML = '|';
        this.cursor.style.cssText = `
            color: ${this.options.cursorColor};
            margin-left: 2px;
            font-weight: 100;
            animation: blink 1s infinite;
        `;

        // Add cursor animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Assemble the components
        this.textArea.appendChild(this.cursor);
        this.inputContainer.appendChild(this.textArea);
        this.container.appendChild(this.inputContainer);
    }

    async typeText(text, speed = 50) {
        const chars = text.split('');
        let currentText = '';
        
        for (const char of chars) {
            await new Promise(resolve => setTimeout(resolve, speed + Math.random() * 50));
            currentText += char;
            this.textArea.textContent = currentText;
            this.textArea.appendChild(this.cursor);
        }
    }

    async typeAndAnimate(text, animationCallback) {
        await this.typeText(text);
        if (animationCallback) {
            await animationCallback();
        }
    }
} 