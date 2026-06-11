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

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Theme toggle (initial theme is applied in <head> before first paint)
    $('.theme-toggle').on('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    // Navbar shadow + back-to-top visibility on scroll
    var $navbar = $('.navbar');
    var $backToTop = $('.back-to-top');
    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        $navbar.toggleClass('navbar-scrolled', y > 10);
        $backToTop.toggleClass('show', y > 400);
    }
    $(window).on('scroll', onScroll);
    onScroll();

    $backToTop.on('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    // Publication type filter (publications page)
    function applyPubFilter(type) {
        document.querySelectorAll('.pub-item').forEach(function (item) {
            var match = type === 'all' || item.getAttribute('data-pub-type') === type;
            item.classList.toggle('d-none', !match);
        });
        document.querySelectorAll('.pub-year-section').forEach(function (section) {
            var hasVisible = !!section.querySelector('.pub-item:not(.d-none)');
            section.classList.toggle('d-none', !hasVisible);
            var yearLink = document.querySelector('#navbar-year a[href="#year-' + section.getAttribute('data-year') + '"]');
            if (yearLink) yearLink.classList.toggle('d-none', !hasVisible);
        });
        document.querySelectorAll('.pub-year-section .glass-card').forEach(function (card) {
            card.querySelectorAll('.pub-item.pub-last-visible').forEach(function (el) {
                el.classList.remove('pub-last-visible');
            });
            var visible = card.querySelectorAll('.pub-item:not(.d-none)');
            if (visible.length) visible[visible.length - 1].classList.add('pub-last-visible');
        });
        try { $('body').scrollspy('refresh'); } catch (e) {}
    }

    var $filterBtns = $('.pub-filter-btn');
    if ($filterBtns.length) {
        $filterBtns.on('click', function () {
            $filterBtns.removeClass('active');
            $(this).addClass('active');
            applyPubFilter(this.getAttribute('data-filter'));
        });
        applyPubFilter('all');
    }

    // News card show more / show less
    $('.news-toggle').on('click', function () {
        var card = this.closest('.news-card');
        var expanded = card.classList.toggle('news-expanded');
        this.setAttribute('aria-expanded', expanded);
        this.querySelector('.news-toggle-label').textContent =
            expanded ? this.getAttribute('data-less-label') : this.getAttribute('data-more-label');
    });

    // Fade-in animation on scroll
    if (!prefersReducedMotion) {
        var fadeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.glass-card, .card.border-0, .row.mt-3 > .col > .card').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(12px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            fadeObserver.observe(el);
        });
    }
});
