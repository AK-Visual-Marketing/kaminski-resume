jQuery(document).ready(function() {
	"use strict";
	/* ========== Sticky on scroll ========== */
	function stickyNav() {
		var scrollTop = $(window).scrollTop(),
			noSticky = $('.no-sticky'),
			viewportSm = $('.viewport-sm'),
			viewportLg = $('.viewport-lg'),
			viewportLgBody = viewportLg.parent('body'),
			viewportLgNosticky = $('.viewport-lg.no-sticky'),
			viewportLgNostickyBody = viewportLgNosticky.parent('body'),
			viewportLgLogo = viewportLg.find('.logo img'),
			viewportLgNostickyLogo = viewportLgNosticky.find('.logo img'),
			headerTransparentLg = $('.viewport-lg.header-transparent'),
			headerTransparentLgNosticky = $('.viewport-lg.header-transparent.no-sticky'),
			headerTransparentLgBody = headerTransparentLg.parent('body'),
			headerOpacityLg = $('.viewport-lg.header-opacity'),
			headerOpacityLgNosticky = $('.viewport-lg.header-opacity.no-sticky'),
			headerOpacityLgBody = headerOpacityLg.parent('body');

		if (scrollTop > ndHeaderHeight) {
			ndHeader.addClass('sticky');
			viewportLgLogo.attr('src', stickyLogoSrc);
			viewportLgNostickyLogo.attr('src', logoSrc);
			headerTransparentLg.removeClass('header-transparent-on');
			headerOpacityLg.removeClass('header-opacity-on');
			headerTransparentLgNosticky.addClass('header-transparent-on');
			headerOpacityLgNosticky.addClass('header-opacity-on');
			viewportLgBody.css("margin-top", ndHeaderHeight);
			viewportLg.css("margin-top", -ndHeaderHeight);
		} else {
			ndHeader.removeClass('sticky');
			viewportLgLogo.attr('src', logoSrc);
			headerTransparentLg.addClass('header-transparent-on');
			headerOpacityLg.addClass('header-opacity-on');
			viewportLgBody.add(viewportLg).css("margin-top", "0");
		}

		noSticky.removeClass('sticky');
		viewportSm.removeClass('sticky');
        headerTransparentLg.add(headerTransparentLgBody).add(headerOpacityLg).add(headerOpacityLgBody).add(viewportLgNostickyBody).add(viewportLgNosticky).css("margin-top", "0");

		var logoCenterWidth = $('.logoCenter .logo img').width(),
			menuCenterOneWidth = $('.center-menu-1 .akvm-menu').width(),
			menuCenterOneListMenu = $('.center-menu-1 .akvm-menu > ul'),
			menuCenterOneListWidth = menuCenterOneWidth - logoCenterWidth;

		if ($(window).width() < 1200) {
			menuCenterOneListMenu.outerWidth( menuCenterOneWidth );
		} else {
			menuCenterOneListMenu.outerWidth( menuCenterOneListWidth / 2 );
		}

		$('.logoCenter').width(logoCenterWidth);

	}

	/* ========== Menu overlay transition ========== */
	function overlayMenuTransition() {
		var overlayMenuFirst = $('.akvm-menu-overlay > ul > li:first-child'),
			overlayMenuList = $('.akvm-menu-overlay > ul > li');

		overlayMenuFirst.attr('data-delay', '0');

		overlayMenuList.each(function(){
			var $this = $(this),
				overlayMenuNext = $this.next('li'),
				menuDataDelay = $this.attr('data-delay'),
				menuDataDelayNext = parseInt(menuDataDelay) + parseInt('100');

			overlayMenuNext.attr('data-delay', menuDataDelayNext);

			$this.delay(menuDataDelay).queue(function(next) {
				$(this).addClass("menuSlideIn");
				next();
			});
		});
	}

	/* ========== Horizontal navigation menu ========== */
	if ($('.akvm-header').length) {
		var ndHeader = $('.akvm-header'),
			ndHeaderHeight = ndHeader.height(),
			logo = ndHeader.find('.logo'),
			logoImg = logo.find('img'),
			logoSrc = logoImg.attr('src'),
			logoClone = logo.clone(),
			mobileLogoSrc = logo.data('mobile-logo'),
			stickyLogoSrc = logo.data('sticky-logo'),
			burgerMenu = ndHeader.find('.akvm-burger-menu'),
			akvmMenuListWrapper = $('.akvm-menu > ul'),
			akvmMenuListDropdown = $('.akvm-menu ul li:has(ul)'),
			headerShadow = $('.akvm-header.header-shadow'),
			headerTransparent = $('.akvm-header.header-transparent'),
			headerOpacity = $('.akvm-header.header-opacity'),
			megaMenuFullwidthContainer = $('.mega-menu-fullwidth .mega-menu-container');

		/* ========== Center menu 1 ========== */
		$('.center-menu-1 .akvm-menu > ul:first-child').after('<div class="logoCenter"></div>');
		$('.logoCenter').html(logoClone);

		/* ========== Mega menu fullwidth wrap container ========== */
		megaMenuFullwidthContainer.each(function(){
			$(this).children().wrapAll('<div class="mega-menu-fullwidth-container"></div>');
		});

		/* ========== Window resize ========== */
		$(window).on("resize", function() {

			var megaMenuContainer = $('.mega-menu-fullwidth-container');

			if ($(window).width() < 1200) {

				logoImg.attr('src', mobileLogoSrc);
				ndHeader.removeClass('viewport-lg');
				ndHeader.addClass('viewport-sm');
				headerTransparent.removeClass('header-transparent-on');
				headerOpacity.removeClass('header-opacity-on');
				megaMenuContainer.removeClass('container');

			} else {

				logoImg.attr('src', logoSrc);
				ndHeader.removeClass('viewport-sm');
				ndHeader.addClass('viewport-lg');
				headerTransparent.addClass('header-transparent-on');
				headerOpacity.addClass('header-opacity-on');
				megaMenuContainer.addClass('container');

			}

			stickyNav();

		}).resize();

		/* ========== Dropdown Menu Toggle ========== */
		burgerMenu.on("click", function(){
			$(this).toggleClass('akvm-menu-open');
			akvmMenuListWrapper.slideToggle(300);
		});

		akvmMenuListDropdown.each(function(){
			$(this).append( '<span class="dropdown-plus"></span>' );
			$(this).addClass('dropdown_menu');
		});

		$('.dropdown-plus').on("click", function(){
			$(this).prev('ul').slideToggle(300);
			$(this).toggleClass('dropdown-open');
		});

		$('.dropdown_menu a').append('<span></span>');

		/* ========== Added header shadow ========== */
		headerShadow.append('<div class="akvm-header-shadow-wrapper"></div>');

		/* ========== Sticky on scroll ========== */
		$(window).on("scroll", function() {
			stickyNav();
		}).scroll();

		/* ========== Menu hover transition ========== */
		var listMenuHover4 = $('.akvm-menu.menu-hover-4 > ul > li > a');
		listMenuHover4.append('<div class="hover-transition"></div>');

	}

	/* ========== Overlay navigation menu ========== */
	if ($('.akvm-header-overlay').length) {

		var ndHeaderOverlay = $('.akvm-header-overlay'),
			akvmMenuOverlay = $('.akvm-menu-overlay'),
			burgerMenuOverlay = ndHeaderOverlay.find('.akvm-burger-menu'),
			lineMenuOverlay = ndHeaderOverlay.find('.akvm-line-menu'),
			menuOverlayLogo = ndHeaderOverlay.find('.logo'),
			overlayLogoClone = menuOverlayLogo.clone(),
			menuWrapperLogoSrc = menuOverlayLogo.data('overlay-logo'),
			menuOverlayListDropdown = $('.akvm-menu-overlay > ul > li:has(ul)'),
			menuOverlayLink = $('.akvm-menu-overlay > ul > li > a'),
			menuSlide = $('.akvm-header-overlay.menu-slide'),
			menuSlideSubmenuLink = menuSlide.find('.akvm-menu-overlay > ul ul a'),
			menuSlideSubmenuDropdown = menuSlide.find('.akvm-menu-overlay > ul > li > ul li:has(ul)'),
			menuSocialMedia = akvmMenuOverlay.next('.akvm-menu-social-media'),
			submenuVerticalListItem = $('.submenu-vertical > ul > li > ul li:has(ul)'),
			submenuVerticalLink = $('.submenu-vertical > ul > li > ul a');

		lineMenuOverlay.wrapAll('<span></span>');
		menuOverlayLink.wrap('<div class="menu-overlay-link"></div>');
		submenuVerticalLink.wrap('<div class="menu-overlay-link"></div>');
		menuSlideSubmenuLink.wrap('<div class="menu-overlay-link"></div>');

		/* ========== Submenu Toggle ========== */
		menuOverlayListDropdown.each(function(){
			var menuOverlayDropdownLink = $(this).children('.menu-overlay-link');
			menuOverlayDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
			$(this).addClass('overlay_dropdown_menu');
		});

		submenuVerticalListItem.each(function(){
			var submenuVerticalDropdownLink = $(this).children('.menu-overlay-link');
			submenuVerticalDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
			$(this).addClass('overlay_dropdown_menu');
		});

		menuSlideSubmenuDropdown.each(function(){
			var submenuVerticalDropdownLink = $(this).children('.menu-overlay-link');
			submenuVerticalDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
			$(this).addClass('overlay_dropdown_menu');
		});

		$('.overlay_dropdown_menu > ul').addClass('overlay-submenu-close');

		$('.overlay-dropdown-plus').on("click", function(){
			var $thisParent = $(this).parent('.menu-overlay-link');
			$thisParent.next('ul').slideToggle(300).toggleClass('overlay-submenu-close');
			$(this).toggleClass('overlay-dropdown-open');
		});

		akvmMenuOverlay.add(menuSocialMedia).wrapAll('<div class="nav-menu-wrapper"></div>');

		var overlayNavMenuWrapper = $('.nav-menu-wrapper');

		overlayNavMenuWrapper.prepend(overlayLogoClone);
		overlayNavMenuWrapper.find('.logo img').attr('src', menuWrapperLogoSrc);

		var menuOverlayHover = $('.akvm-menu-overlay > ul > .overlay_dropdown_menu > ul');

		menuOverlayHover.each(function(){
			$(this).on("mouseenter", function () {
				$(this).parents("li").addClass("overlay-menu-hover");
			});
			$(this).on("mouseleave", function () {
				$(this).parents("li").removeClass("overlay-menu-hover");
			});
		});

		/* ========== Menu overlay open ========== */
		burgerMenuOverlay.on("click", function(){

			var overlayMenuList = $('.akvm-menu-overlay > ul > li');

			$(this).toggleClass('akvm-menu-open');
			overlayNavMenuWrapper.toggleClass('overlay-akvm-menu-open');
			overlayMenuList.removeClass("menuSlideIn");

			if ($(this).hasClass("akvm-menu-open")) {
				overlayMenuTransition();
				overlayMenuList.removeClass("menuSlideOut").addClass("menuFade");
			}

			if (!$(this).hasClass("akvm-menu-open")) {
				overlayMenuList.addClass("menuSlideOut").removeClass("menuFade");
			}

		});

		/* ========== Menu slide settings ========== */
		var menuSlideNavWrapper = menuSlide.find('.nav-menu-wrapper'),
			menuSlideNavLogo = menuSlideNavWrapper.find('.logo');

		if (ndHeaderOverlay.hasClass('menu-slide')){
			ndHeaderOverlay.removeClass('akvm-overlay-center-menu');
		}

		menuSlideNavLogo.remove();
		menuSlideNavWrapper.after('<div class="slidemenu-bg-overlay"></div>');

		$('.slidemenu-bg-overlay').on("click", function(){
			menuSlideNavWrapper.removeClass('overlay-akvm-menu-open');
			burgerMenuOverlay.removeClass('akvm-menu-open');
		});

	}

	/* ========== Fixed sidebar menu ========== */
	if ($('.akvm-fixed-sidebar').length) {
		var akvmFixedSidebar = $('.akvm-fixed-sidebar'),
			akvmMenuFixed = $('.akvm-menu-fixed'),
			akvmSideContent = $('.akvm-side-content'),
			logoFixedSidebar = akvmFixedSidebar.find('.logo'),
			logoClone = logoFixedSidebar.clone(),
			burgerMenuFixedSidebar = akvmFixedSidebar.find('.akvm-burger-menu'),
			burgerMenuDetach = burgerMenuFixedSidebar.detach(),
			akvmFixedDropdown = akvmMenuFixed.find('li:has(ul)');

		akvmFixedSidebar.parent('body').addClass('body-fixed-sidebar');
		akvmFixedSidebar.after('<div class="akvm-fixedsidebar-bg-overlay"></div>').after(burgerMenuDetach);
		akvmSideContent.prepend(logoClone);

		$('.akvm-fixed-sidebar .logo, .akvm-menu-fixed').wrapAll('<div class="akvm-fixed-menu-wrap"></div>');

		var burgerMenuMove = akvmFixedSidebar.next('.akvm-burger-menu'),
			fixedSidebarlineMenu = burgerMenuMove.find('.akvm-line-menu');

		fixedSidebarlineMenu.wrapAll('<span></span>');

		/* ========== Side menu open on mobile ========== */
		burgerMenuMove.on("click", function(){
			$(this).toggleClass('akvm-menu-open');
			akvmFixedSidebar.toggleClass('akvm-fixed-sidebar-open');
		});

		$('.akvm-fixedsidebar-bg-overlay').on("click", function(){
			akvmFixedSidebar.removeClass('akvm-fixed-sidebar-open');
			burgerMenuMove.removeClass('akvm-menu-open');
		});

		/* ========== Submenu collapse ========== */
		akvmFixedDropdown.each(function(){
			$(this).append( '<span class="overlay-dropdown-plus"></span>' );
		});

		$('.overlay-dropdown-plus').on("click", function(){
			$(this).prev('ul').slideToggle(300).toggleClass('submenu-collapse');
			$(this).toggleClass('overlay-dropdown-open');
		});
	}

	/* ========== Menu icon color ========== */
	$('.akvm-menu-icon').css('color', function () {
		var iconColorAttr = $(this).data('fa-color');
		return iconColorAttr;
	});

});
