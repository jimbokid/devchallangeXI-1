'use strict';
if (!window.console)
    window.console = {};
if (!window.console.memory)
    window.console.memory = function() {};
if (!window.console.debug)
    window.console.debug = function() {};
if (!window.console.error)
    window.console.error = function() {};
if (!window.console.info)
    window.console.info = function() {};
if (!window.console.log)
    window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function() {
        var $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function() {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function() {
        var $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function() {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
    })();
}

$(function() {
    $('input[placeholder], textarea[placeholder]').placeholder();

    $('.js-testimonials').slick({
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    $('.js-partners').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 544,
                settings: {
                    slidesToShow: 1,
                }
            }

        ]
    })

    $('#contact-form').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                digits: true
            }
        },
        messages: {
            name: {
                required: 'please enter your name'
            },
            phone: {
                required: 'please enter your phone',
                digits: 'please enter only digits'
            }
        },
        submitHandler: function() {
            $('.questions__submit').fadeOut(300, function() {
                $('.questions__submit-confirm').fadeIn();
            });

        }
    })

});

var gallery = (function() {
    var $slider = $('.js-gallery');
    var $slideItem = $slider.find('.gallery__slider-item');
    var $currentSlide = $('.js-gallery-current');
    var $allSlides = $('.js-gallery-all');
    var $sliderBtn = $('.js-gallery-btns');

    $allSlides.html($slideItem.length)

    if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
        $slider.on('init', function() {
            //черно белые фото для ie11
            $('.gallery__slider-item').BlackAndWhite({
                hoverEffect: false,
                webworkerPath: false,
                invertHoverEffect: false,
                intensity: 1,
                crossOrigin: true,
            });
        })
    }

    $slider.slick({
        dots: true,
        centerMode: true,
        centerPadding: '50px',
        slidesToShow: 1,
        variableWidth: true,
        responsive: [{
            breakpoint: 767,
            settings: {
                variableWidth: false,
                centerMode: false,
                arrows: false
            }
        }]
    });
    $currentSlide.html($slider.slick('slickCurrentSlide') + 1);
    $slider.on('afterChange', function(event, slick, currentSlide) {
        console.log(currentSlide);
        $currentSlide.html(currentSlide + 1)
    });

    $sliderBtn.on('click', function(e) {
        e.preventDefault();
        $slider.slick($(this).attr('data-slider'));
    });

    $('.js-input').on('keyup', function() {
        if ($(this).val().length > 0) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    });
})();

var headerFixed = (function() {
    var header = document.getElementById('header');
    $(window).on('scroll load', function() {
        if ($('.js-mobile-menu').hasClass('active')) {
            return false
        }
        if ((document.documentElement.scrollTop || document.body.scrollTop) > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
})();

var programHeight = (function() {
    $(window).on('load resize', function() {
        if ($(window).outerWidth() > 767) {
            var $block = $('.programs__column-item-title');
            var height = 0;
            $block.each(function() {
                if ($(this).outerHeight() > height) {
                    height = $(this).outerHeight()
                }
            })
            $block.css('height', height)
        }
    })
})()

var tabs = (function() {
    var $tabLink = $('.js-tab-link')
    var $tabItem = $('.programs__tabs-item');
    var $line = $('.programs__tabs-head-line');

    $tabLink.on('click', function(e) {
        e.preventDefault()
        var indexLink = $(this).index();
        var target = $(this).attr('href');
        $tabLink.removeClass('active');
        $tabItem.removeClass('active').hide();
        $(this).addClass('active');
        $(target).show();
        setTimeout(function() {
            $(target).addClass('active');
        }, 10)
        $line.css({
            'transform': 'translateX(' + indexLink * 100 + '%)'
        })
    })
})()

var mobileMenu = (function() {
    var $btn = $('.js-mobile-menu');
    var $menu = $('.header__menu');
    var $header = $('.header');
    var $link = $('.js-scroll');

    $btn.on('click', function(e) {
        e.preventDefault();
        var $this = $(this)
        if ($(this).hasClass('active')) {
            mobileMenu.closeMenu()
        } else {
            if ((document.documentElement.scrollTop || document.body.scrollTop) < 100) {
                header.classList.add('scrolled');
            }
            setTimeout(function() {
                $this.addClass('active');
                $menu.slideDown()
            }, 200)

        }
    })

    $link.on('click', function(e) {
        e.preventDefault();
        var scrollTarget = $.attr(this, 'href')

        if ($(window).outerWidth() < 767) {
            mobileMenu.closeMenu()
            setTimeout(function() {
                scrollFn(scrollTarget)
            }, 450)
        } else {
            scrollFn(scrollTarget)
        }

        function scrollFn(scrollTarget) {
            $('html, body').animate({
                scrollTop: $(scrollTarget).offset().top - 100
            }, 800);
        }
    })

    return {
        closeMenu: function() {
            $menu.slideUp()
            $btn.removeClass('active');
            setTimeout(function() {
                if ((document.documentElement.scrollTop || document.body.scrollTop) < 100) {
                    header.classList.remove('scrolled');
                }
            }, 300)
        }
    }
})()
