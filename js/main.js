$(document).ready(function(){

	/* Members pagination */

	var member_pages = Math.ceil($(".slider-wrapper .member").length / 3);

	var member_width = $(".slider-wrapper").width();
	for (i=0;i<member_pages;i++) {
		$('.team-wrapper .slider-navigation').append('<div><a href="javascript:void(0)"></a></div>');	
	} 
	$(".team-wrapper .slider-navigation div:eq(0)").addClass("active");

	function memberChangePage(page,width) {
		var left = parseInt(page*width);
		$(".team-wrapper .posts-container").animate({ left: -left+'px' });
	}

	$(".team-wrapper .slider-navigation div a").click(function(){
		var page = parseInt($(this).parent().index());
		$(".team-wrapper .slider-navigation div").removeClass('active');
		$(this).parent().addClass('active');
		memberChangePage(page,member_width);
	});

	/* Categories pagination */
	
	var category_pages = Math.ceil($(".single-category .category-post").length / 3);

	var category_width = $(".slider-wrapper").width();
	for (i=0;i<category_pages;i++) {
		$('.references-wrapper .slider-navigation').append('<div><a href="javascript:void(0)"></a></div>');	
	} 
	$(".references-wrapper .slider-navigation div:eq(0)").addClass("active");

	function categoryChangePage(page,width) {
		var left = parseInt(page*width);
		$(".references-wrapper .posts-container").animate({ left: -left+'px' });
	}

	$(".references-wrapper .slider-navigation div a").click(function(){
		var page = parseInt($(this).parent().index());
		$(".references-wrapper .slider-navigation div").removeClass('active');
		$(this).parent().addClass('active');
		categoryChangePage(page,category_width);
	});

	var windowWidth = $(window).width();
	if (windowWidth <= 940) {

		var categoryCount = $('.references .category-post').length;

		function loadMoreCategories(from) {
			var post;
			for(i=from;i<from+3;i++) {
				if(i<categoryCount) {
					post = $('.references .posts-container .category-post').eq(i);
					$('.references .slider-wrapper').append('<a class="category-post" rel="cat" href="'+ post.attr('href') +'" data-slug="'+post.attr('data-slug')+'">' + post.html() + '</a>');	
				}	
			}
			if ($('.references .slider-wrapper > .category-post').length < categoryCount) {
				$('.references .load-more').css('display','inline-block');
			}
			else {
				$('.references .load-more').css('display','none');
			}
		}
		loadMoreCategories(0);
		

		$('.references .load-more').click(function(){
			var currentCount = $('.references .slider-wrapper > .category-post').length;
			loadMoreCategories(currentCount);
		});
	}

	$('.category-post').click(function(){
		window.location.hash = '#references/'+ $(this).parent().parent().parent().attr('data-slug') + '/' + $(this).attr('data-slug');
	});

	
	

	$(".blog-post a").fancybox({
		padding 	: 0,
        fitToView   : false,
        width       : 'auto',
        height      : 'auto',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none',
        beforeClose : function() { window.location.hash = '#blog'; },
        afterLoad: function(current, previous) {
        	
        	var post = $('.blog-post').eq(current.index).attr('data-slug');
        	window.location.hash = '#blog/' + post;
	    }
	});
	$("a.category-post").fancybox({
		padding 	: 0,
        fitToView   : false,
        width       : 'auto',
        height      : 'auto',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none',
        beforeClose : function() { window.location.hash = '#references'; },
        afterLoad: function(current, previous) {
        	
        	var post = $('.blog-post').eq(current.index).attr('data-slug');
        	window.location.hash = '#references/' + post;
	    }
	});
	$(".member").fancybox({
		padding 	: 0,
        fitToView   : false,
        width       : 'auto',
        height      : 'auto',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none',
        beforeClose : function() { window.location.hash = '#references'; },
        afterLoad: function(current, previous) {
        	
        	
	    }
	});


	
	function parseHashSingle() {
		var hash = new String(window.location.hash); 
		var params = hash.split('/');
		if (params[2] != '') {
			if (params[0] == '#references') {
				$('.category-post').each(function(){
					if ($(this).attr('data-slug') == params[2]) {
						$(this).trigger('click');
					}
				});
			}
		}
	}
	parseHashSingle();

	$('.category-container').click(function(){

		if (windowWidth > 940) {
			$('.references .slider-navigation').hide('400');
			$('.references .slider-navigation').show('400');
		}

		var src = $(this).find('.category-icon img').attr('src');
		
		$('.single-category').hide('400', function(){
			$('.single-category .category-icon img').attr('src', src);
		});
		
		$('.single-category').show('400');
		
	    $('html, body').animate({
			scrollTop: $(".single-category").offset().top - 60
		}, 500);

	});

	$('a[href*="about"]').parent().addClass('current-menu-item');

	$('#site-navigation a, #second-menu a').click(function(e){
		e.preventDefault();
		$('#second-menu a, #site-navigation a').parent().removeClass('current-menu-item');	
		var href = $(this).attr('href');
		$('html, body').animate({
	        scrollTop: $($(this).attr('href')).offset().top
	    }, 1000, function(){
	    	window.location.hash = href;
	    });
	});


	$(".dropdown-menu-mobile").change(function() {
	    var href = $(this).find("option:selected").val();
		$('html, body').animate({
	        scrollTop: $(href).offset().top
	    }, 1000, function(){
	    	window.location.hash = href;
	    });
	});

	jQuery(document).ready(function(){
		jQuery('.contact-validate').validate();
	});

	var scrollTop;

   	$(window).scroll(function() {
	  	scrollTop = $(window).scrollTop();
	  	var about = $('#about').offset().top;
	  	var about_height = $('#about').height();
	  	var team = $('#team').offset().top;
	  	var team_height = $('#team').height();
	  	var references = $('#references').offset().top; 
	  	var references_height = $('#references').height(); 
	  	var blog = $('#blog').offset().top; 
	  	var blog_height = $('#blog').height();
	  	var contact = $('#contact').offset().top; 
	  	var contact_height = $('#contact').height();    
		if (scrollTop >= $('#main').offset().top) {
			$('#site-navigation').addClass('fixed');
			$('.dropdown-menu-wrapper').addClass('fixed');
		} else {
			$('#site-navigation').removeClass('fixed');
			$('.dropdown-menu-wrapper').removeClass('fixed');
		}
		$('#second-menu a, #site-navigation a').parent().removeClass('current-menu-item');		
		if (scrollTop >= 0 && scrollTop < about + about_height) {
			$('#site-navigation a[href*="about"]').parent().addClass('current-menu-item');
		} 
		if (scrollTop >= team && scrollTop < team + team_height) {
			$('#site-navigation a[href*="team"]').parent().addClass('current-menu-item');
		}
		if (scrollTop >= references && scrollTop < references + references_height) {
			$('#site-navigation a[href*="references"]').parent().addClass('current-menu-item');
		} 
		if (scrollTop >= blog && scrollTop < blog + blog_height) {
			$('#site-navigation a[href*="blog"]').parent().addClass('current-menu-item');
		}
		if (scrollTop >= contact && scrollTop < contact + contact_height) {
			$('#site-navigation a[href*="contact"]').parent().addClass('current-menu-item');
		} 	 		 		
	}); 

	
	// Create default option "Go to..."
	$("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : "Go to..."
	}).appendTo(".dropdown-menu-mobile");

	// Populate dropdown with menu items
	$("#site-navigation a").each(function() {
	 var el = $(this);
	 $("<option />", {
	     "value"   : el.attr("href"),
	     "text"    : el.text()
	 }).appendTo(".dropdown-menu-mobile");
	});

	var windowWidth = $(window).width();

	function lt1200() {
		$('.soundcloud iframe').attr('width', 300);
		$('.video iframe').attr('width', 300);
		$('.blog-posts-container').masonry({
		  itemSelector: '.blog-post',
		  columnWidth: 320

		});
	}
	function gt1200() {
		$('.blog-posts-container').masonry({
		  itemSelector: '.blog-post',
		  columnWidth: 414

		});
	}
	function lt940() {
		$('.soundcloud iframe').attr('width', 280);
		$('.video iframe').attr('width', 280);
		$('.logo img').attr('width', '280');

		var memberCount = $('.posts-container .member').length;

		function loadMore(from) {
			for(i=from;i<from+3;i++) {
				if(i<memberCount) {
					$('#team .slider-wrapper').append('<a class="member" href="#lightbox">' + $('.posts-container .member').eq(i).html() + '</a>');	
				}	
			}
			if ($('#team .slider-wrapper > .member').length < memberCount) {
				$('#team .load-more').css('display','inline-block');
			}
			else {
				$('#team .load-more').css('display','none');
			}
		}
		if ($('#team .slider-wrapper > .member').length == 0) {
			loadMore(0);
		}
		

		$('#team .load-more').click(function(){
			var currentCount = $('#team .slider-wrapper > .member').length;
			loadMore(currentCount);
		});

		var blogCount = $('.blog-posts-container .blog-post').length;

		function loadMoreBlog(from) {
			var post;
			for(i=from;i<from+6;i++) {
				if(i<blogCount) {
					post = $('.blog .blog-posts-container .blog-post').eq(i);
					$('.blog .blog-posts-wrapper').append('<div class="'+post.attr('class')+'" data-slug="'+post.attr('data-slug')+'">' + post.html() + '</div>');	
				}	
			}
			if ($('.blog .blog-posts-wrapper > .blog-post').length < blogCount) {
				$('.blog .load-more').css('display','inline-block');
			}
			else {
				$('.blog .load-more').css('display','none');
			}
		}
		if ($('.blog .blog-posts-wrapper > .blog-post').length == 0) {
			loadMoreBlog(0);
		}
		

		$('.blog .load-more').click(function(){
			var currentCount = $('.blog .blog-posts-wrapper > .blog-post').length;
			loadMoreBlog(currentCount);
		});
	}

	$(window).resize(function() {
  		var newWindowWidth = $(window).width();
  		if ((newWindowWidth < 1200 && windowWidth >= 1200) || (newWindowWidth >= 1200 && windowWidth < 1200)) {
			document.location.reload();
		} 
		if ((newWindowWidth <= 940 && windowWidth > 940) || (newWindowWidth > 940 && windowWidth <= 940)) {
			document.location.reload();
		} 
	});

	if (windowWidth < 1200) {
		lt1200();
	} 
	if (windowWidth >= 1200) {
		gt1200();
	}
	if (windowWidth <= 940) {
		lt940();
	} 

	


	/* Blog gallery */

	$('.gallery-wrapper').each(function(){

		var count = $(this).find('.image').length;
		var width = $(this).width();
		
		if(count == 1) $(this).find('.gallery-navigation').hide();

		$(this).find('.right').click(function() {
			
			var left = parseInt($(this).parent().parent().find('.gallery-content').css('left'));
			if(left > -width*(count-1)) {
				$(this).parent().parent().find('.gallery-content').animate({left: '-='+width});
			}
			else {
				$(this).parent().parent().find('.gallery-content').animate({left: '0px'});
			}

		});
		$(this).find('.left').click(function() {
			
			var left = parseInt($(this).parent().parent().find('.gallery-content').css('left'));
			if(left < 0) {
				$(this).parent().parent().find('.gallery-content').animate({left: '+='+width});
			}
			else {
				$(this).parent().parent().find('.gallery-content').animate({left: -width*(count-1)+'px'});
			}

		});

	});




	/* Blog pagination */

	var wrapperHeight = parseInt($('.blog-posts-wrapper').height()) +31;
	var containerHeight = $('.blog-posts-container').height();
	var blogPages = Math.ceil(containerHeight / wrapperHeight);
	console.log('Pages: '+blogPages);

	for (i=0;i<blogPages;i++) {
		$('.blog-wrapper .slider-navigation').append('<div><a href="#blog"></a></div>');	
	} 

	$(".blog-wrapper .slider-navigation div:eq(0)").addClass("active");

	function blogChangePage(page,height) {
		var top = parseInt(page*height);
		var newHeight = containerHeight - top;
		$(".blog-wrapper .blog-posts-container").animate({ top: -top+'px' },0);
		$('.blog-posts-wrapper').css('height', newHeight);
		$('html, body').animate({
	        scrollTop: $('#blog').offset().top
	    },1000);
	}

	$(".blog-wrapper .slider-navigation div a").click(function(){
		var page = parseInt($(this).parent().index());
		$(".blog-wrapper .slider-navigation div").removeClass('active');
		$(this).parent().addClass('active');
		blogChangePage(page,wrapperHeight);
	});

	
	
	
	

});


