// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    // Lazy loading
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        visibleOnly: true,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        }
    });

    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Fade-in animation on scroll
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .card.border-0, .row.mt-3 > .col > .card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // ========================================
    // iOS 26 Liquid Glass Droplet Lens Effect
    // ========================================
    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (window.innerWidth > 768 && !isTouchDevice) {
        initLiquidDroplet();
    }

    // Subtle mouse parallax on orbs
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 2;
            var y = (e.clientY / window.innerHeight - 0.5) * 2;
            var orbs = document.querySelectorAll('.floating-orbs .orb');
            orbs.forEach(function(orb, i) {
                var speed = (i + 1) * 8;
                orb.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
            });
        });
    }
});

function initLiquidDroplet() {
    var SIZE = 160;
    var HALF = SIZE / 2;
    var SCALE = 1.4;

    // Create droplet DOM
    var droplet = document.createElement('div');
    droplet.id = 'liquid-droplet';
    droplet.innerHTML = '' +
        '<div class="droplet-magnify"></div>' +
        '<div class="droplet-shine"></div>' +
        '<div class="droplet-ring"></div>';
    document.body.appendChild(droplet);

    var magnifyEl = droplet.querySelector('.droplet-magnify');
    var mouseX = -500, mouseY = -500;
    var posX = -500, posY = -500;
    var visible = false;
    var currentCard = null;
    var rafId = null;

    // Animation loop — smooth follow
    function loop() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        droplet.style.left = (posX - HALF) + 'px';
        droplet.style.top = (posY - HALF) + 'px';

        // Update magnified content position if over a card
        if (visible && currentCard) {
            updateMagnify();
        }

        rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    function updateMagnify() {
        if (!currentCard) return;
        var rect = currentCard.getBoundingClientRect();
        // Position of droplet center relative to the card
        var relX = posX - rect.left;
        var relY = posY - rect.top;

        // The magnified clone should show the content scaled around the cursor point
        // We position it so that the center of the droplet shows the scaled version of what's beneath
        var offsetX = -relX * SCALE + HALF;
        var offsetY = -relY * SCALE + HALF;
        magnifyEl.style.left = offsetX + 'px';
        magnifyEl.style.top = offsetY + 'px';
    }

    function showDroplet(card) {
        if (currentCard === card && visible) return;
        currentCard = card;
        visible = true;

        // Clone card content into magnifier
        var clone = card.cloneNode(true);
        var rect = card.getBoundingClientRect();

        // Style the clone to match original dimensions exactly
        clone.style.cssText = '' +
            'width:' + rect.width + 'px;' +
            'height:' + rect.height + 'px;' +
            'margin:0;padding:' + getComputedStyle(card).padding + ';' +
            'transform:scale(' + SCALE + ');' +
            'transform-origin:0 0;' +
            'pointer-events:none;' +
            'position:absolute;top:0;left:0;' +
            'background:transparent;' +
            'box-shadow:none;border:none;' +
            'backdrop-filter:none;-webkit-backdrop-filter:none;';

        // Remove glass card styles from clone so text is visible
        clone.classList.remove('glass-card');
        // Make all images in clone visible
        clone.querySelectorAll('img').forEach(function(img) {
            if (img.dataset.src) img.src = img.dataset.src;
        });

        magnifyEl.innerHTML = '';
        magnifyEl.style.width = rect.width + 'px';
        magnifyEl.style.height = rect.height + 'px';
        magnifyEl.appendChild(clone);

        droplet.classList.add('active');
    }

    function hideDroplet() {
        if (!visible) return;
        visible = false;
        currentCard = null;
        droplet.classList.remove('active');
    }

    function findCard(x, y) {
        // Temporarily hide droplet to detect what's beneath
        droplet.style.visibility = 'hidden';
        var el = document.elementFromPoint(x, y);
        droplet.style.visibility = '';
        if (!el) return null;
        var card = el.closest('.glass-card');
        if (card && !card.closest('.navbar') && !card.closest('.modal') && !card.closest('#liquid-droplet')) {
            return card;
        }
        return null;
    }

    // Throttle mousemove to ~60fps
    var lastMoveTime = 0;
    document.addEventListener('mousemove', function(e) {
        var now = Date.now();
        if (now - lastMoveTime < 16) return;
        lastMoveTime = now;

        mouseX = e.clientX;
        mouseY = e.clientY;

        var card = findCard(e.clientX, e.clientY);
        if (card) {
            showDroplet(card);
        } else {
            hideDroplet();
        }
    });

    document.addEventListener('mouseleave', function() {
        hideDroplet();
        mouseX = -500;
        mouseY = -500;
    });

    // Re-clone when card changes due to scroll
    var scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (visible && currentCard) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                if (visible && currentCard) showDroplet(currentCard);
            }, 100);
        }
    });
}
