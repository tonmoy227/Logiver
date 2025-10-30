/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";
	gsap.config({
		nullTargetWarn: false,
	});

// lenis-smooth-scroll
	const lenis = new Lenis({
		duration: .8, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		direction: 'vertical', 
		smooth: true, 
		smoothTouch: false, 
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);


	function TXTheaderSticky() {
		var $window = $(window);
		var lastScrollTop = 0;
		var $header = $('.txa_sticky_header');
		var headerHeight = $header.outerHeight() + 30;

		$window.scroll(function () {
			var windowTop = $window.scrollTop();

			if (windowTop >= headerHeight) {
				$header.addClass('txa_sticky');
			} else {
				$header.removeClass('txa_sticky');
				$header.removeClass('txa_sticky_show');
			}

			if ($header.hasClass('txa_sticky')) {
				if (windowTop < lastScrollTop) {
					$header.addClass('txa_sticky_show');
				} else {
					$header.removeClass('txa_sticky_show');
				}
			}

			lastScrollTop = windowTop;
		});
	}
	TXTheaderSticky();
	jQuery(window).on('scroll', function() {
		if (jQuery(window).scrollTop() > 250) {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').addClass('sticky-on')
		} else {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').removeClass('sticky-on')
		}
	});
	$('.open_mobile_menu').on("click", function() {
		$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
	});
	$('.open_mobile_menu').on('click', function () {
		$('body').toggleClass('mobile_menu_overlay_on');
	});
	jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fas fa-angle-down"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
	});
	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});
	jQuery(document).ready(function (o) {
		0 < o(".navSidebar-button").length &&
		o(".navSidebar-button").on("click", function (e) {
			e.preventDefault(), e.stopPropagation(), o(".info-group").addClass("isActive");
		}),
		0 < o(".close-side-widget").length &&
		o(".close-side-widget").on("click", function (e) {
			e.preventDefault(), o(".info-group").removeClass("isActive");
		}),
		o(".xs-sidebar-widget").on("click", function (e) {
			e.stopPropagation();
		})
	});

	$('.marquee-left').marquee({
		gap: 0,
		speed: 40,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});
	$('.marquee-right').marquee({
		gap: 28,
		speed: 40,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});

	gsap.registerPlugin(ScrollTrigger);
	
	// Animation
	if($('.wow').length){
		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		}
		);
		wow.init();
	};
	jQuery('.video_box').magnificPopup({
		disableOn: 200,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});
	gsap.utils.toArray(".lg-text p").forEach(paragraph => {
		let timeline = gsap.timeline({
			scrollTrigger: {
				trigger: paragraph,
				start: "top 90%",
				end: "bottom 60%",
				toggleActions: "play none none none"
			}
		});
		let splitText = new SplitText(paragraph, { type: "lines" });
		gsap.set(paragraph, { perspective: 400 });
		timeline.from(splitText.lines, {
			opacity: 0,
			rotationX: -80,
			transformOrigin: "top center -50",
			force3D: true,
			duration: 1,
			delay: 0.5,
			stagger: 0.1
		});
	});
	// windows-loaded-before-functions
	document.addEventListener("DOMContentLoaded", function () {
		window.addEventListener('load', function(){



			let preloader = document.querySelector("#preloader");
			if (preloader) {
				preloader.classList.add("preloaded");
				setTimeout(function () {
					preloader.remove();
				}, 1000 ) ;

			}
			
			setTimeout(function() {
				if($(".lg_hero_title").length) {
					var NXSECTITLE = $(".lg_hero_title");
					if(NXSECTITLE.length == 0) return; gsap.registerPlugin(SplitText); NXSECTITLE.each(function(index, el) {
						el.split = new SplitText(el, { 
							type: "lines,words,chars",
							linesClass: "split-line"
						});
						gsap.set(el, { perspective: 400 });
						if( $(el).hasClass('hero_title_2') ){
							gsap.set(el.split.words, {
								y: 100,
								opacity: 0,
							});
						}
						if( $(el).hasClass('hero_title_3') ){
							gsap.set(el.split.chars, {
								y: 100,
								opacity: 0,
								scaleX: 0,
								rotationX: 15,
							});
						}
						el.anim = gsap.to(el.split.chars, {
							scrollTrigger: {
								trigger: el,
								start: "top 90%",
								toggleActions: "play reverse play reverse",
								markers: false,
							},
							y: 0,
							scaleX: 1,
							opacity: 1,
							duration: 2,
							stagger: .05,
							delay: .1,
							ease: "bounce.out",
						});
						el.anim = gsap.to(el.split.words, {
							scrollTrigger: {
								trigger: el,
								start: "top 90%",
								toggleActions: "play reverse play reverse",
								markers: false,
							},
							y: 0,
							opacity: 1,
							duration: 1,
							stagger: .1,
							delay: .1,
							ease: "power3.inOut",
						});
						
					});
				}

				const LGHERO = gsap.timeline();
				LGHERO
				.from(".lg-hero-sec .lg-hero-bg", { scale: 1.2, rotate: 0,  x: -200, duration: 3, transformOrigin: "center",  ease: "power1.out" })
				.from(".lg-hero-sec .lg-hero-img2", { scale: 1.2, rotate: 0,  x: -200, duration: 3, transformOrigin: "center",  ease: "power1.out" },"<")

				if($('.lg-itm-title').length) {
					var txtheading = $(".lg-itm-title");
					if(txtheading.length == 0) return; gsap.registerPlugin(SplitText); txtheading.each(function(index, el) {
						el.split = new SplitText(el, { 
							type: "lines,words,chars",
							linesClass: "split-line"
						});
						if( $(el).hasClass('lg-itm-anim') ){
							gsap.set(el.split.chars, {
								opacity: .3,
							});
						}
						el.anim = gsap.to(el.split.chars, {
							scrollTrigger: {
								trigger: el,
								start: "top 92%",
								end: "top 60%",
								markers: false,
								scrub: 1,
							},

							x: "0",
							y: "0",
							opacity: 1,
							duration: .7,
							stagger: 0.2,
						});

					});
				}

			}, 700);
		})		
	});
	
	function updateServiceItemPositions() {
		const serviceItems = document.querySelectorAll('.lg-service-item');
		serviceItems.forEach((item, index) => {
			if (window.innerWidth >= 1200) {
				if (index >= 1) {
					const translateX = 25 * index; 
					item.style.transform = `translateX(${translateX}%)`;
				} else {
					item.style.transform = 'translateX(0)';
				}
			} else {
				item.style.transform = 'translateX(0)';
			}
		});
	}
	updateServiceItemPositions();
	window.addEventListener('resize', updateServiceItemPositions);


	if (window.matchMedia("(min-width: 1200px)").matches) { 
		var SerItem = gsap.timeline({
			scrollTrigger: {
				trigger: '.lg-service-item',
				start: "top 100%",
				end: "top -20%",
				scrub: 1,
				markers: false,
			}

		});
		SerItem
		.from( ".lg-service-item:nth-child(1) .inner-item" , {  y: -100,  opacity: 0,  duration: 1, transformOrigin: "top", ease: "power2.out"})
		.from( ".lg-service-item:nth-child(2) .inner-item" , {  y: -150, x: -132, opacity: 0,  duration: 1, transformOrigin: "top", ease: "power2.out"})
		.from( ".lg-service-item:nth-child(3) .inner-item" , {  y: -150, x: -132, opacity: 0,  duration: 1, transformOrigin: "top", ease: "power2.out"})
		.from( ".lg-service-item:nth-child(4) .inner-item" , {  y: -150, x: -132, opacity: 0,  duration: 1, transformOrigin: "top", ease: "power2.out"})
		.from( ".lg-service-item:nth-child(5) .inner-item" , {  y: -150, x: -132, opacity: 0,  duration: 1, transformOrigin: "top", ease: "power2.out"})
	};



	if (window.matchMedia("(min-width: 1200px)").matches) {
		const serials = gsap.utils.toArray(".lg-serial");

		var ATWORKPROCESS = gsap.timeline({
			scrollTrigger: {
				trigger: '.lg-cs-serial-wrap',
				start: "top 6%",
				end: "bottom 60%",
				endTrigger: ".lg-case-study-sec",
				scrub: 1,
				pin: true,
				pinSpacing: false,
				markers: false,
			}
		});

		ATWORKPROCESS.from(serials, {
			ease: "power2.out",
			stagger: 0.3, 
			onStart: function() {
				serials.forEach((el, i) => el.classList.remove("active")); 
			},
			onUpdate: function() {
				const progressIndex = Math.floor(ATWORKPROCESS.progress() * serials.length);
				serials.forEach((el, i) => {
					if (i === progressIndex) {
						el.classList.add("active");
					} else {
						el.classList.remove("active");
					}
				});
			}
		});

		const CaseStudy = gsap.utils.toArray(".lg-cs-item");
		const animateCard = (card, wrapper, index) => {
			gsap.to(card, {
				scrollTrigger: {
					trigger: wrapper,
					scrub: 1,
					start: `top ${50 + 45 * index}`, 
					endTrigger: ".lg-cs-content",
					end: "bottom 85%",
					pin: wrapper,
					pinSpacing: false,
					markers: false,
				},
			});
		};
		CaseStudy.forEach((wrapper, index) => animateCard([index], wrapper, index));
	}

	if ($('.lg-testi-slide').length > 0 ) {
		var slider = new Swiper('.lg-testi-slide', {
			slidesPerView: 5,
			loop: true,
			spaceBetween: 3,
			speed: 1000,
			navigation: {
				nextEl: ".lg-testi-next",
				prevEl: ".lg-testi-prev",
			},
			pagination: {
				el: ".lg-testi-pagi",
				clickable: true,
			},
			autoplay: {
				enabled: true,
				delay: 6000
			},
			breakpoints: {
				'1600': {
					slidesPerView: 5,
				},
				'1200': {
					slidesPerView: 4,
				},
				'992': {
					slidesPerView: 3,
				},
				'991': {
					slidesPerView: 2,
				},
				'768': {
					slidesPerView: 2,
				},
				'576': {
					slidesPerView: 1,
				},
				'0': {
					slidesPerView: 1,
				},
			},
		});
	};


	if ($("#slider-range").length) {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 3000,
			values: [ 0, 1500 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
	};
	if ($("#amount").length) {
		$( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
			" - " + $( "#slider-range" ).slider( "values", 1 ) );
	};
	$('.count').prop('disabled', true);
	$(document).on('click','.plus',function(){
		$('.count').val(parseInt($('.count').val()) + 1 );
	});
	$(document).on('click','.minus',function(){
		$('.count').val(parseInt($('.count').val()) - 1 );
		if ($('.count').val() == 0) {
			$('.count').val(1);
		}
	});


	if($('.ed-footer-1-menu').length) {
		document.querySelector('.ed-footer-1-menu').addEventListener('click', function(event) {
			const link = event.target.closest('li a');
			if (!link) return;
			event.preventDefault();
			const dropdown = link.nextElementSibling;
			if (!dropdown || !dropdown.classList.contains('has-dropdown')) return;
			document.querySelectorAll('.has-dropdown').forEach(ul => {
				if (ul !== dropdown) ul.style.display = 'none';
			});
			dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
		});
	}

	var LGFT = gsap.timeline({
		scrollTrigger: {
			trigger: ".lg-feat-item",
			start: "top 70%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "power1.out",
			duration: .5,
		},
	})

	LGFT
	.from(".lg-feat-item p", {
		opacity: 0,
		stagger: .3,
		yPercent: -100,
	})


	var LGFT = gsap.timeline({
		scrollTrigger: {
			trigger: ".lg-about-sec",
			start: "top 50%",
			toggleActions: "play none none reverse",
			markers: false,
		},
		defaults: {
			ease: "power1.out",
			duration: 1.5,
		},
	})

	LGFT
	.from(".lg-ab1-img2", {
		stagger: .3,
		yPercent: -20,
	})

	gsap.utils.toArray(' .top_view_3').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 80%",
				end: "top 90%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 0,  yPercent: 100}, {opacity: 1, x: 0, duration: 1, immediateRender: false})
	});

	$('.lg-counter-content').each(function () {
		var $wrap = $(this);
		var $items = $wrap.find('.lg-counter-item');

		$items.on('mouseover', function () {
			$items.removeClass('active');
			$(this).addClass('active');
		});
	});

	$('.lg-wc-ft-wrap').each(function () {
		var $wrap = $(this);
		var $items = $wrap.find('.lg-wc-ft-item');

		$items.on('mouseover', function () {
			$items.removeClass('active');
			$(this).addClass('active');
		});
	});

	$('.odometer').appear(function () {
		var $this = $(this); 
		var countNumber = $this.attr("data-count");
		$this.html(countNumber);
	});

	gsap.utils.toArray(".img-parallax").forEach(function(container) {
		let image = container.querySelector("img");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: true,
				pin: false,
			},
		}); 
		tl.from(image, {
			yPercent: -30,
			ease: "none",
		}).to(image, {
			yPercent: 30,
			ease: "none",
		}); 
	});

	gsap.utils.toArray(' .left_view').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				start: "top 80%",
				end: "top 10%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 0, scale: 1, x: "-300"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
	});

	gsap.utils.toArray(' .right_view').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				start: "top 70%",
				end: "top -5%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 0, scale: 1, x: "300"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
	});

	gsap.utils.toArray(' .sponsor_1').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				start: "top 80%",
				end: "top 30%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 1, scale: 1, x: "140"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
	});
	gsap.utils.toArray(' .sponsor_2').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				start: "top 80%",
				end: "top 30%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 1, scale: 1, x: "-140"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
	});

	gsap.utils.toArray(' .plane_land_5').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				end: "top 30%",
				start: "top 80%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'top'})
		.from(el, { opacity: 0, scale: 0.2,  y: -70,}, {opacity: 1, y: 0, rotate: "0", duration: 1, immediateRender: false})
	});


	gsap.utils.toArray(' .plane_land_6').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				end: "top 20%",
				start: "top 80%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'top'})
		.from(el, { opacity: 0, scale: 0.2,  x: 150,}, {opacity: 1, y: 0, rotate: "30deg", duration: 1, immediateRender: false})
	});

	const boxes = gsap.utils.toArray('.txt_item_active');
	boxes.forEach(svg => {
		gsap.to(svg, {
			scrollTrigger: {
				trigger: svg,
				start: "top 100%",
				end: "bottom bottom",
				toggleClass: "active",
				duration: 3,
				delay:1,
				toggleActions: "play play play reverse",
				once: true,
			}
		});
	});


	gsap.utils.toArray(' .lg-ftr-btm-text').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1.5,
				end: "top 40%",
				start: "top 70%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'bottom'})
		.from(el, { opacity: 0, scale: 0.2,  yPercent: -100})
	});


	$('.lg-s-top').on("click", function()  {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	});  
})(jQuery);