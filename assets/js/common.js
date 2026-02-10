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

    // Apply fade-in to cards
    document.querySelectorAll('.glass-card, .card.border-0, .row.mt-3 > .col > .card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // ========================================
    // iOS 26 Liquid Glass Droplet Lens Effect
    // ========================================
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
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
    var DROPLET_SIZE = 160;
    var MAGNIFY = 1.35;

    // Create the droplet DOM
    var droplet = document.createElement('div');
    droplet.id = 'liquid-droplet';
    droplet.innerHTML = '<div class="droplet-content"></div><div class="droplet-shine"></div><div class="droplet-ring"></div>';
    document.body.appendChild(droplet);

    var dropletContent = droplet.querySelector('.droplet-content');
    var isVisible = false;
    var mouseX = -500, mouseY = -500;
    var currentX = -500, currentY = -500;
    var rafId = null;
    var activeCard = null;

    // All glass-card elements that react to the droplet
    var cards = document.querySelectorAll('.glass-card, .card.border-0, .card-body');

    // Smooth follow loop
    function animate() {
        // Ease towards mouse
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        droplet.style.transform = 'translate(' + (currentX - DROPLET_SIZE / 2) + 'px, ' + (currentY - DROPLET_SIZE / 2) + 'px)';

        // Update the magnified clone position
        if (activeCard && isVisible) {
            updateMagnifiedContent(activeCard);
        }

        rafId = requestAnimationFrame(animate);
    }

    function updateMagnifiedContent(card) {
        var cardRect = card.getBoundingClientRect();

        // Where the droplet center is relative to the card
        var relX = currentX - cardRect.left;
        var relY = currentY - cardRect.top;

        // The magnified view origin (offset so it centers on cursor position)
        var originX = (relX / cardRect.width) * 100;
        var originY = (relY / cardRect.height) * 100;

        dropletContent.style.transformOrigin = originX + '% ' + originY + '%';
        dropletContent.style.transform = 'scale(' + MAGNIFY + ')';

        // Position the cloned content so the magnified area aligns with cursor
        var offsetX = -(relX * MAGNIFY - DROPLET_SIZE / 2);
        var offsetY = -(relY * MAGNIFY - DROPLET_SIZE / 2);

        dropletContent.style.left = offsetX + 'px';
        dropletContent.style.top = offsetY + 'px';
        dropletContent.style.width = cardRect.width + 'px';
        dropletContent.style.height = cardRect.height + 'px';
    }

    function showDroplet(card) {
        if (activeCard === card && isVisible) return;
        activeCard = card;
        isVisible = true;

        // Clone the card content into the droplet
        dropletContent.innerHTML = '';
        var clone = card.cloneNode(true);
        clone.style.cssText = 'width:100%;height:100%;margin:0;padding:' + 
            window.getComputedStyle(card).padding + 
            ';background:transparent !important;border:none !important;box-shadow:none !important;' +
            'backdrop-filter:none !important;-webkit-backdrop-filter:none !important;' +
            'overflow:visible;position:relative;border-radius:0 !important;pointer-events:none;';
        
        // Fix text colors in clone for readability
        clone.querySelectorAll('*').forEach(function(el) {
            el.style.pointerEvents = 'none';
        });

        dropletContent.appendChild(clone);
        droplet.classList.add('active');
    }

    function hideDroplet() {
        isVisible = false;
        activeCard = null;
        droplet.classList.remove('active');
        dropletContent.innerHTML = '';
    }

    // Event listeners
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if hovering over a card
        var target = document.elementFromPoint(e.clientX, e.clientY);
        if (!target) { hideDroplet(); return; }

        var card = target.closest('.glass-card, .card.border-0');
        if (card && !card.closest('.navbar') && !card.closest('.modal')) {
            showDroplet(card);
        } else {
            hideDroplet();
        }
    });

    document.addEventListener('mouseleave', function() {
        hideDroplet();
    });

    // Start animation loop
    rafId = requestAnimationFrame(animate);
}
