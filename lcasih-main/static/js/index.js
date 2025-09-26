// Item animation system
class AluminumItemsAnimation {
    constructor() {
        this.activeItems = 0;
        this.maxItems = 10;
        this.itemQueue = [];
        this.container = document.getElementById('itemsContainer');
        this.isRunning = false;
        
        // Define exact quantities for each item type
        this.itemTypes = {
            can: 2,
            frame: 1,
            rod: 2,
            rock: 2,
            screw: 2,
            utensil: 1
        };
        
        // Aluminum color variations
        this.aluminumShades = [
            'linear-gradient(135deg, #F5F5F5 0%, #DCDCDC 25%, #C0C0C0 50%, #A9A9A9 75%, #808080 100%)',
            'linear-gradient(135deg, #E8E8E8 0%, #D3D3D3 25%, #C0C0C0 50%, #B8B8B8 75%, #A0A0A0 100%)',
            'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 25%, #D8D8D8 50%, #C0C0C0 75%, #A8A8A8 100%)',
            'linear-gradient(135deg, #F8F8FF 0%, #E6E6FA 25%, #D3D3D3 50%, #B0B0B0 75%, #909090 100%)',
            'linear-gradient(135deg, #F5F5DC 0%, #E0E0E0 25%, #C8C8C8 50%, #B0B0B0 75%, #989898 100%)'
        ];
        
        this.initializeQueue();
    }
    
    initializeQueue() {
        this.itemQueue = [];
        // Create queue with exact quantities
        for (const [itemType, quantity] of Object.entries(this.itemTypes)) {
            for (let i = 0; i < quantity; i++) {
                this.itemQueue.push(itemType);
            }
        }
        this.shuffleQueue();
    }
    
    shuffleQueue() {
        for (let i = this.itemQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.itemQueue[i], this.itemQueue[j]] = [this.itemQueue[j], this.itemQueue[i]];
        }
    }
    
    createItem() {
        if (this.activeItems >= this.maxItems) return;
        
        // Reset queue if empty
        if (this.itemQueue.length === 0) {
            this.initializeQueue();
        }
        
        this.activeItems++;
        const item = document.createElement('div');
        const itemType = this.itemQueue.shift();
        
        // Configure item based on type
        this.configureItem(item, itemType);
        
        // Determine layering: 70-80% chance for front (7-8 items), 20-30% chance for behind (1-2 items)
        const layerChance = Math.random();
        if (layerChance < 0.25) {
            // 25% chance to go behind the form
            item.classList.add('behind-form');
        } else {
            // 75% chance to go in front of the form
            item.classList.add('front-form');
        }
        
        // Position with less spawning in center (form area) and more on left/right sides
        const spawnChoice = Math.random();
        if (spawnChoice < 0.4) {
            // 40% chance - spawn on left side (0-25%)
            item.style.left = Math.random() * 25 + '%';
        } else if (spawnChoice < 0.8) {
            // 40% chance - spawn on right side (75-100%)
            item.style.left = (75 + Math.random() * 25) + '%';
        } else {
            // 20% chance - spawn in center area (25-75%)
            item.style.left = (25 + Math.random() * 50) + '%';
        }
        
        // Random fall duration (3-5 seconds)
        const duration = 3 + Math.random() * 2;
        item.style.animationDuration = duration + 's';
        
        // Add to container
        this.container.appendChild(item);
        
        // Remove after animation completes
        setTimeout(() => {
            if (item.parentNode) {
                item.parentNode.removeChild(item);
                this.activeItems--;
            }
        }, duration * 1000);
    }
    
    configureItem(item, itemType) {
        switch (itemType) {
            case 'rock':
                this.configureRock(item);
                break;
            case 'screw':
                item.className = 'screw';
                break;
            case 'rod':
                item.className = 'rod';
                break;
            case 'frame':
                item.className = 'frame';
                break;
            case 'can':
                item.className = 'can';
                break;
            case 'utensil':
                item.className = 'utensil';
                break;
        }
    }
    
    configureRock(item) {
        const sizes = ['small', 'medium', 'large', 'extra-large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        item.className = `rock rock-${randomSize}`;
        
        // Apply random aluminum color
        const randomColor = this.aluminumShades[Math.floor(Math.random() * this.aluminumShades.length)];
        item.style.background = randomColor;
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.createItem();
        
        // Schedule next item (400-1000ms delay)
        const nextDelay = 400 + Math.random() * 600;
        setTimeout(() => this.animate(), nextDelay);
    }
    
    stop() {
        this.isRunning = false;
    }
}

// Form validation and submission
class FormHandler {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.username = document.getElementById('username');
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        const userData = {
            username: this.username.value.trim(),
            email: this.email.value.trim(),
            password: this.password.value.trim()
        };
        
        if (this.validateForm(userData)) {
            this.processSignup(userData);
        }
    }
    
    validateForm({ username, email, password }) {
        // Basic validation
        if (!username) {
            this.showError('Username is required');
            return false;
        }
        
        if (!email || !email.includes('@')) {
            this.showError('Valid email is required');
            return false;
        }
        
        if (!password || password.length < 6) {
            this.showError('Password must be at least 6 characters');
            return false;
        }
        
        return true;
    }
    
    processSignup(userData) {
        // Simulate signup process
        this.showSuccess('Account created successfully!');
        
        // Reset form
        setTimeout(() => {
            this.form.reset();
        }, 2000);
    }
    
    showError(message) {
        alert(`Error: ${message}`);
    }
    
    showSuccess(message) {
        alert(message);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize aluminum items animation
    const itemsAnimation = new AluminumItemsAnimation();
    itemsAnimation.start();
    
    // Initialize form handler
    const formHandler = new FormHandler();
    
    // Optional: Add visibility API to pause/resume animation when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            itemsAnimation.stop();
        } else {
            itemsAnimation.start();
        }
    });
});

const productType = document.getElementById('productType');
const pipeDimensions = document.getElementById('pipeDimensions');
const sheetDimensions = document.getElementById('sheetDimensions');
const route = document.getElementById('route');
const bauxiteGroup = document.getElementById('bauxiteGroup');

productType.addEventListener('change', () => {
    if (productType.value === 'pipe') {
        pipeDimensions.style.display = 'block';
        sheetDimensions.style.display = 'none';
    } else if (productType.value === 'sheet') {
        sheetDimensions.style.display = 'block';
        pipeDimensions.style.display = 'none';
    } else {
        pipeDimensions.style.display = 'none';
        sheetDimensions.style.display = 'none';
    }
});

route.addEventListener('change', () => {
    if (route.value === 'conventional') {
        bauxiteGroup.style.display = 'block';
    } else {
        bauxiteGroup.style.display = 'none';
    }
});

// Logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Send logout request to server
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to login page or reload
                    window.location.href = '/login';
                }
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Fallback: redirect to login page
                window.location.href = '/login';
            });
        });
    }
});

// Form submission to save data to MongoDB
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    
    if (productForm) {
        productForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                productType: document.getElementById('productType').value,
                units: document.getElementById('units').value,
                route: document.getElementById('route').value,
                bauxiteGrade: document.getElementById('bauxiteGrade').value,
                energySource: document.getElementById('energySource').value,
                endOfLife: document.getElementById('endOfLife').value,
                outerRadius: document.getElementById('outerRadius').value,
                innerRadius: document.getElementById('innerRadius').value,
                lengthPipe: document.getElementById('lengthPipe').value,
                thickness: document.getElementById('thickness').value,
                width: document.getElementById('width').value,
                lengthSheet: document.getElementById('lengthSheet').value,
                timestamp: new Date().toISOString()
            };
            
            // Send data to server
            fetch('/save-form-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Data saved successfully!');
                    productForm.reset();
                    // Hide dimension sections
                    document.getElementById('pipeDimensions').style.display = 'none';
                    document.getElementById('sheetDimensions').style.display = 'none';
                    document.getElementById('bauxiteGroup').style.display = 'none';
                } else {
                    alert('Error saving data: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error saving data');
            });
        });
    }
});