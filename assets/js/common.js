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
    var SIZE = 150;
    var HALF = SIZE / 2;

    // Create droplet element
    var droplet = document.createElement('div');
    droplet.id = 'liquid-droplet';
    droplet.innerHTML = '<div class="droplet-shine"></div><div class="droplet-ring"></div>';
    document.body.appendChild(droplet);

    var mouseX = -500, mouseY = -500;
    var posX = -500, posY = -500;
    var isOverCard = false;
    var visible = false;
    var currentCard = null;
    var hideTimer = null;

    function loop() {
        // Smooth easing
        posX += (mouseX - posX) * 0.13;
        posY += (mouseY - posY) * 0.13;
        droplet.style.left = (posX - HALF) + 'px';
        droplet.style.top = (posY - HALF) + 'px';
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function show() {
        if (visible) return;
        visible = true;
        clearTimeout(hideTimer);
        droplet.classList.add('active');
    }

    function hide() {
        if (!visible) return;
        visible = false;
        currentCard = null;
        hideTimer = setTimeout(function() {
            droplet.classList.remove('active');
        }, 60);
    }

    function findCard(x, y) {
        // Temporarily hide droplet so elementFromPoint finds actual content beneath
        var prev = droplet.style.display;
        droplet.style.display = 'none';
        var el = document.elementFromPoint(x, y);
        droplet.style.display = prev;
        if (!el) return null;
        var card = el.closest('.glass-card');
        if (card && !card.closest('.navbar') && !card.closest('.modal')) {
            return card;
        }
        return null;
    }

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        var card = findCard(e.clientX, e.clientY);
        if (card) {
            currentCard = card;
            show();
        } else {
            hide();
        }
    });

    document.addEventListener('mouseleave', function() {
        hide();
    });
}
