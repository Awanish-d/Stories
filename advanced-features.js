// Advanced Features for Dream Stories Website
// This file contains additional interactive features

// ==================== PARTICLE BACKGROUND ====================
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '0.3';
        
        document.querySelector('.hero').appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#6366f1';
            this.ctx.fill();
            
            // Connect nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = particle.x - this.particles[j].x;
                const dy = particle.y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem();

// ==================== READING PROGRESS BAR ====================
function createReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

createReadingProgressBar();

// ==================== STORY WORD COUNT & READING TIME ====================
function calculateReadingStats() {
    const storyContent = document.querySelector('.story-content');
    if (!storyContent) return;
    
    const text = storyContent.textContent;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min
    
    const statsDiv = document.createElement('div');
    statsDiv.className = 'reading-stats';
    statsDiv.style.cssText = `
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin: 1rem 0;
        padding: 1rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
        border-radius: 10px;
    `;
    statsDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-book" style="color: #6366f1;"></i>
            <span><strong>${words}</strong> shabd</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-clock" style="color: #8b5cf6;"></i>
            <span><strong>${readingTime}</strong> minute padhne ka samay</span>
        </div>
    `;
    
    const storyHeader = document.querySelector('.story-header');
    if (storyHeader) {
        storyHeader.appendChild(statsDiv);
    }
}

calculateReadingStats();

// ==================== SHARE STORY FEATURE ====================
function addShareButtons() {
    const shareDiv = document.createElement('div');
    shareDiv.className = 'share-story';
    shareDiv.style.cssText = `
        margin-top: 2rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        border-radius: 15px;
        text-align: center;
    `;
    shareDiv.innerHTML = `
        <h4 style="margin-bottom: 1rem; color: #0f172a;">
            <i class="fas fa-share-alt"></i> Is Story Ko Share Karein
        </h4>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="share-btn whatsapp" data-platform="whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </button>
            <button class="share-btn facebook" data-platform="facebook">
                <i class="fab fa-facebook"></i> Facebook
            </button>
            <button class="share-btn twitter" data-platform="twitter">
                <i class="fab fa-twitter"></i> Twitter
            </button>
            <button class="share-btn copy" data-platform="copy">
                <i class="fas fa-copy"></i> Copy Link
            </button>
        </div>
    `;
    
    const storyCard = document.querySelector('.story-card');
    const feedbackSection = document.querySelector('.feedback-section');
    if (storyCard && feedbackSection) {
        storyCard.insertBefore(shareDiv, feedbackSection);
    }
    
    // Add share button styles
    const shareStyle = document.createElement('style');
    shareStyle.textContent = `
        .share-btn {
            padding: 0.7rem 1.5rem;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            color: white;
        }
        .share-btn.whatsapp { background: #25d366; }
        .share-btn.facebook { background: #1877f2; }
        .share-btn.twitter { background: #1da1f2; }
        .share-btn.copy { background: #6366f1; }
        .share-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
    `;
    document.head.appendChild(shareStyle);
    
    // Share functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            const url = window.location.href;
            const title = 'Meri Dream Story - Ek Sapne Mein Mili Ladki';
            const text = 'Yeh amazing dream story padhiye!';
            
            switch(platform) {
                case 'whatsapp':
                    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`);
                    break;
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(() => {
                        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        setTimeout(() => {
                            btn.innerHTML = '<i class="fas fa-copy"></i> Copy Link';
                        }, 2000);
                        showNotification('Link copied to clipboard! 📋');
                    });
                    break;
            }
        });
    });
}

addShareButtons();

// ==================== LIKE/LOVE REACTION ====================
function addReactionSystem() {
    const reactionDiv = document.createElement('div');
    reactionDiv.className = 'story-reactions';
    reactionDiv.style.cssText = `
        margin-top: 2rem;
        padding: 1.5rem;
        background: white;
        border-radius: 15px;
        text-align: center;
        border: 2px solid #e2e8f0;
    `;
    reactionDiv.innerHTML = `
        <h4 style="margin-bottom: 1rem; color: #0f172a;">
            <i class="fas fa-heart"></i> Story Kaisi Lagi?
        </h4>
        <div class="reactions" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="reaction-btn" data-reaction="love">
                <span class="reaction-emoji">❤️</span>
                <span class="reaction-count">0</span>
            </button>
            <button class="reaction-btn" data-reaction="wow">
                <span class="reaction-emoji">😮</span>
                <span class="reaction-count">0</span>
            </button>
            <button class="reaction-btn" data-reaction="sad">
                <span class="reaction-emoji">😢</span>
                <span class="reaction-count">0</span>
            </button>
            <button class="reaction-btn" data-reaction="laugh">
                <span class="reaction-emoji">😂</span>
                <span class="reaction-count">0</span>
            </button>
            <button class="reaction-btn" data-reaction="fire">
                <span class="reaction-emoji">🔥</span>
                <span class="reaction-count">0</span>
            </button>
        </div>
    `;
    
    const storyRating = document.querySelector('.story-rating');
    if (storyRating) {
        storyRating.parentNode.insertBefore(reactionDiv, storyRating);
    }
    
    // Reaction styles
    const reactionStyle = document.createElement('style');
    reactionStyle.textContent = `
        .reaction-btn {
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            min-width: 80px;
        }
        .reaction-emoji {
            font-size: 2rem;
        }
        .reaction-count {
            font-weight: bold;
            color: #64748b;
        }
        .reaction-btn:hover {
            transform: scale(1.1);
            border-color: #6366f1;
            box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
        }
        .reaction-btn.active {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-color: #6366f1;
            transform: scale(1.1);
        }
        .reaction-btn.active .reaction-emoji {
            animation: bounce-reaction 0.5s ease;
        }
        .reaction-btn.active .reaction-count {
            color: white;
        }
        @keyframes bounce-reaction {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
    `;
    document.head.appendChild(reactionStyle);
    
    // Reaction functionality
    const reactions = {};
    document.querySelectorAll('.reaction-btn').forEach(btn => {
        const type = btn.dataset.reaction;
        reactions[type] = 0;
        
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            
            // Remove active from all
            document.querySelectorAll('.reaction-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            if (!wasActive) {
                btn.classList.add('active');
                reactions[type]++;
                btn.querySelector('.reaction-count').textContent = reactions[type];
                
                // Create floating emoji
                createFloatingEmoji(btn.querySelector('.reaction-emoji').textContent, btn);
            }
        });
    });
}

addReactionSystem();

function createFloatingEmoji(emoji, button) {
    const floatingEmoji = document.createElement('div');
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.cssText = `
        position: fixed;
        font-size: 3rem;
        pointer-events: none;
        z-index: 9999;
        animation: float-up 2s ease-out;
    `;
    
    const rect = button.getBoundingClientRect();
    floatingEmoji.style.left = rect.left + rect.width / 2 - 25 + 'px';
    floatingEmoji.style.top = rect.top + 'px';
    
    document.body.appendChild(floatingEmoji);
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);
    
    setTimeout(() => floatingEmoji.remove(), 2000);
}

// ==================== BOOKMARK FEATURE ====================
function addBookmarkFeature() {
    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.className = 'bookmark-btn';
    bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
    bookmarkBtn.style.cssText = `
        position: fixed;
        right: 30px;
        bottom: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
        z-index: 998;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(bookmarkBtn);
    
    let isBookmarked = false;
    bookmarkBtn.addEventListener('click', () => {
        isBookmarked = !isBookmarked;
        if (isBookmarked) {
            bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
            bookmarkBtn.style.background = 'linear-gradient(135deg, #ec4899, #f43f5e)';
            showNotification('Story bookmark ho gayi! 📖');
        } else {
            bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            bookmarkBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
            showNotification('Bookmark remove ho gaya');
        }
    });
    
    bookmarkBtn.addEventListener('mouseenter', () => {
        bookmarkBtn.style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    bookmarkBtn.addEventListener('mouseleave', () => {
        bookmarkBtn.style.transform = 'scale(1) rotate(0deg)';
    });
}

addBookmarkFeature();

// ==================== SCROLL TO TOP BUTTON ====================
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        right: 30px;
        bottom: 110px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
        z-index: 998;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

addScrollToTop();

// ==================== TEXT SELECTION POPUP ====================
function addTextSelectionPopup() {
    let popup = null;
    
    document.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        if (text.length > 0) {
            if (popup) popup.remove();
            
            popup = document.createElement('div');
            popup.className = 'selection-popup';
            popup.style.cssText = `
                position: fixed;
                background: linear-gradient(135deg, #0f172a, #1e293b);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                display: flex;
                gap: 1rem;
                animation: popIn 0.3s ease;
            `;
            popup.innerHTML = `
                <button class="popup-btn" id="copy-text" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="popup-btn" id="share-text" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
            `;
            
            const popupStyle = document.createElement('style');
            popupStyle.textContent = `
                .popup-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 1.1rem;
                    padding: 0.3rem 0.5rem;
                    transition: all 0.2s ease;
                }
                .popup-btn:hover {
                    color: #ec4899;
                    transform: scale(1.2);
                }
                @keyframes popIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `;
            document.head.appendChild(popupStyle);
            
            document.body.appendChild(popup);
            
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            popup.style.left = rect.left + (rect.width / 2) - (popup.offsetWidth / 2) + 'px';
            popup.style.top = rect.top - popup.offsetHeight - 10 + window.scrollY + 'px';
            
            document.getElementById('copy-text').addEventListener('click', () => {
                navigator.clipboard.writeText(text);
                showNotification('Text copied! 📋');
                popup.remove();
            });
            
            document.getElementById('share-text').addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Dream Story',
                        text: text
                    });
                }
                popup.remove();
            });
            
            setTimeout(() => {
                if (popup) popup.remove();
            }, 5000);
        }
    });
}

addTextSelectionPopup();

console.log('Advanced features loaded! 🚀✨');