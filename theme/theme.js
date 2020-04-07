var tempSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {{w}} {{h}}'/>"; // Simplest possible SVG

$('img.lazy').each(function(){
    var $this = $(this),
    data = $this.data(), // Get all the data attributes
    $img = $this.attr({
        width: data.width,
        height: data.height,
        src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(tempSVG.replace(/{{w}}/g,data.width).replace(/{{h}}/g,data.height)),
    }).appendTo($this)
});

$(document).ready(function(){
    
    $(".featured-post div").each(function(i) {
        $(this).addClass("item-" + (i+1));
    });
    
    getHeight();
    getFrontHeight();
    
    if ( $( "#gallery" ).length ) { 
        $('#gallery a').tosrus({
            pagination	: {
                add : false
            },
            infinite : true,
            keys : true,
            slides : {
                offset : 10,
                width : "80%"
            },
            caption : {
                add: true
            }
        });
    }; 

    if ( $( ".video" ).length ) { 
        fullScreenVideo();
    };
    
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });
        
    if ($("body").hasClass("projects")) {
        $(".menu_projects").addClass("active");
    }

    $(".anchorLink").click(function(e) {
        e.preventDefault();
        anchorScroll( $(this), $($(this).attr("href")), 100 );
    });
    
   var interval = setInterval(function() {
        var momentNow = moment();
       if ($(window).width() > 768) {
           $('#date-part').html(momentNow.format('DD.MM.YYYY'));
           $('#time-part').html(momentNow.format('HH:mm:ss'));
       } else {
           $('#date-part').html(momentNow.format('DD.MM.YY'));
           $('#time-part').html(momentNow.format('HH:mm:ss'));
       }
        
    }, 100);
    
    $('#fullpage').fullpage({
        paddingTop: 100,
		scrollBar: true,
		scrollingSpeed: 500,
        afterRender: function(){
            $(".masthead").addClass("shrink");
        },
        normalScrollElements: 'footer'
        
        /*onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
            var leavingSlide = $(this);

            //leaving the first slide of the 2nd Section to the right
            if( slideIndex == 0 && direction == 'right'){
                if ( $( ".active .studio-title" ).length ) { 
                    $(".active .studio-title").css({'z-index': '-1',});
                }
            }
            if( slideIndex == 1 && direction == 'left'){
                if ( $( ".active .studio-title" ).length ) { 
                    $(".active .studio-title").css({'z-index': '100',});
                }
            }
	   }*/
    });

    $("a.projects-index-item").hover(function () {
        var t = $(this).data("slug");
        $(".project-index-" + t).addClass("index-hovered-project");
        },function () {
        $(".project-index-images-item").removeClass("index-hovered-project")
    });
    
    
    
});
 
function anchorScroll(this_obj, that_obj, base_speed) {
    var this_offset = this_obj.offset();
    var that_offset = that_obj.offset();
    var offset_diff = Math.abs(that_offset.top - this_offset.top);
    var speed       = (offset_diff * base_speed) / 500;
 
    $("html,body").animate({
        scrollTop: that_offset.top -100
    }, {
        duration: speed,
        easing: "easeInOutCubic"
    });
}



$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    
    if ($(window).width() > 768) {
        $(".projects .logo, .meetingRoom .logo, .studio .logo").css({
            width: (178 - scroll/3)  + "px"
        });        
        $(".homepage .logo").css({
            width: (375 - scroll/3)  + "px"
        });
    } else {
        $(".homepage .mobile .logo").css({
            width: (100 - scroll/3)  + "%"
        });        
    }  
});

var stickyOffset = $('.sticky').offset().top;

$(window).scroll(function(){
  var sticky = $('.sticky'),
      scroll = $(window).scrollTop();
    
  if (scroll >= stickyOffset) sticky.addClass('affix');
  else sticky.removeClass('affix');
});




$(document).on("scroll", function(){
    if ($(document).scrollTop() > 50){
		$(".projects .masthead, .meetingRoom .masthead, .studio .masthead").addClass("shrink");
    }
	else {
		$(".projects .masthead, .meetingRoom .masthead, .studio .masthead").removeClass("shrink");
    }    
    
    if ($(document).scrollTop() > 1000){
        $(".project-info").addClass("hidden");
        $(".project-top").removeClass("hidden");
    }
	else {
        $(".project-info").removeClass("hidden");
        $(".project-top").addClass("hidden");
    }
});

$('.projects .masthead, .meetingRoom .masthead, .studio .masthead').mouseenter(function(){ 
    if($(this).hasClass('shrink')){
        $(this).addClass('expand')
    }
})

$('.projects .masthead, .meetingRoom .masthead, .studio .masthead').mouseleave(function(){ 
    if($(this).hasClass('expand')){
        $(this).removeClass('expand')
    }
})

$(window).resize(function() {
	getHeight();
    getFrontHeight();
    if ($(window).width() < 768) {
        $('.logo').css('width', '');
    }
});

function getHeight (){
	var winHeight = $(window).height() ;
    $('.full-screen').css({'height': winHeight,});
}

function getFrontHeight (){
    var winHeight = $(window).height() *2 ;
    $('.featured-post').css({'height': winHeight,});
}


$(function(){
	$('.mobile-menu-open').on('click', function(e) {  
        $('.mobile-menu').show();
    }); 
    
    $('.mobile-menu-close').on('click', function(e) {  
        $('.mobile-menu').hide();
    });   
});

// Get the modal
var modal = document.getElementById('newsletter');
var btn = document.getElementById("newsletter-btn");
btn.onclick = function() {
    modal.style.display = "block";
    $( ".form-control" ).focus();
}
// When the user clicks anywhere outside of the modal, close it
$(document).mouseup(function(e) {
    var container = $("#newsletter");
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    { container.hide();}
});


$.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];
  
  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });
  
  window.onscroll = function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  }
}

var moveItItem = function(el){
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
  this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function(){
    $('[data-scroll-speed]').moveIt();
});

function fullScreenVideo (){
	var $player = $('.video');
    var player = $player.get(0);
    var $parent = $player.parent();
    var $win = $(window);
    var resizeTimeout = null;
    shouldResize = true;
    shouldPosition = false;

    var videoRatio = 16 / 9;

    player.volume = 0; // mute

    var resize = function() {
        if (!shouldResize) { return; }

        var height = $parent.height();
        var width = $parent.width();
        var viewportRatio = width / height;
        var scale = 1;

        if (videoRatio < viewportRatio) {
            // viewport more widescreen than video aspect ratio
            scale = viewportRatio / videoRatio;
        } else if (viewportRatio < videoRatio) {
            // viewport more square than video aspect ratio
            scale = videoRatio / viewportRatio;
        }

        var offset = positionVideo(scale, width, height);
        setVideoTransform(scale, offset);
    };

    var setVideoTransform = function(scale, offset) {
        offset = $.extend({ x: 0, y: 0 }, offset);
        var transform = 'translate(' + Math.round(offset.x) + 'px,' + Math.round(offset.y) + 'px) scale(' + scale  + ')';
        $player.css({
            '-webkit-transform': transform,
            'transform': transform
        });
    };

    // accounts for transform origins on scaled video
    var positionVideo = function(scale, width, height) {
        if (!shouldPosition) { return false; }

        var x = parseInt($player.data('origin-x'), 10);
        var y = parseInt($player.data('origin-y'), 10);
        setVideoOrigin(x, y);

        var viewportRatio = width / height;
        var scaledHeight = scale * height;
        var scaledWidth = scale * width;
        var percentFromX = (x - 50) / 100;
        var percentFromY = (y - 50) / 100;
        var offset = {};

        if (videoRatio < viewportRatio) {
            offset.x = (scaledWidth - width) * percentFromX;
        } else if (viewportRatio < videoRatio) {
            offset.y = (scaledHeight - height) * percentFromY;
        }

        return offset;
    };

    var setVideoOrigin = function(x, y) {
        var origin = x + '% ' + y + '%';
        $player.css({
            '-webkit-transform-origin': origin,
            'transform-origin': origin
        });
    };

    $win.on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 50);
    });
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
  $('[data-toggle="popover"]').popover()
})