function getHeight(){
    var winHeight = $(window).height();
    
    if ($(".full-image").length) {          
        $('.full-image').css({'height': winHeight,});
    }
    if ($(".full-screen").length) {          
        $('.full-screen').css({'height': winHeight+17,});
    }
    if ($(".full-carousel").length) {          
        $('.full-carousel, .carousel-item').css({'height': winHeight+17});
    }

};

function frontPage(){
    if ($(".featured-post").length) {
        var imgHeight = $('.item-4 img').height(),
            imgPosition = $('.item-4 img').offset().top,
            boxHeight = imgHeight + imgPosition -250;
        $('.featured-post').css({'height': boxHeight }); 
        Waypoint.refreshAll(); 
    };
};

$(document).ready(function(){
    getHeight();
    init_videos();
    init_sticky();
    
    if ( $( "#carousel" ).length ) {
        $('.carousel-inner > div').first().addClass('active');
    }
        
    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });
    
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('img[src$=".gif"]').addClass('gif_animata');
        $('.gif_animata').each(function(i, obj) {                    
            var gifSource = $(this).attr('src'); //get the source in the var
            $(this).attr('src', ""); //erase the source 
            $(this).attr('src', gifSource+"?"+new Date().getTime()); //add the date to the source
            $(this).onload=function(){$('.gif_animata').fadeIn(500);}                   
        });   
     };
    
    $(".full-screen div").each(function(i) {
        $(this).addClass("item-" + (i+1));
    }); 
        
    if ( $( "#gallery" ).length ) { 
        $('#gallery a').tosrus({
            pagination	: {
                add : false
            },
            infinite : true,
            keys : true,
            caption : {
                add: true
            }
        });
    }; 
    
    if ($(".match").length) { 
        $('.match').matchHeight();
    };  
    
    if ($("body").hasClass("work")) {
        $(".menu_work").addClass("active");
    }    
    if ($("body").hasClass("spin360")) {
        $(".menu_spin360").addClass("active");
    }

    $("img.lazy").lazyload({
        effect : "fadeIn",
        load : function() {
            $(this).removeClass("lazy");
            Waypoint.refreshAll();          
        }
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


    $("a.projects-index-item").hover(function () {
        var t = $(this).data("slug");
        $(".project-index-" + t).addClass("index-hovered-project");
        },function () {
        $(".project-index-images-item").removeClass("index-hovered-project")
    });
    
    $('.project-list div').each(function() {
        $this = $(this); // cache $(this)
        if ($this.is(':first-child')) {
            $this.addClass('first'); 
        } 
        if ($this.is(':last-child')) {
            $this.addClass('last'); 
        }
    });    
    
    $(".col-6.pack-shot").filter(function(index, element){
        return index % 2 == 1;
    }).addClass("second");
    
    if ( $( ".first video" ).length ) {
        $('.first video')[0].play();
    };   
    
    // Get media - with autoplay disabled (audio or video)
    var media = $('video').not("[autoplay='autoplay']");
    var tolerancePixel = 50;

    function checkMedia(){
        // Get current browser top and bottom
        var scrollTop = $(window).scrollTop() + tolerancePixel;
        var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

        media.each(function(index, el) {
            var yTopMedia = $(this).offset().top;
            var yBottomMedia = $(this).height() + yTopMedia;

            if(scrollTop < yBottomMedia && scrollBottom > yTopMedia){ //view explaination in `In brief` section above
                $(this).get(0).play();
            } else {
                $(this).get(0).pause();
            }
        });
    }
    $(document).on('scroll', checkMedia);
        
    $('#newsletter-btn').click(function(event){
        event.stopPropagation();
        $("#newsletter").toggle();     
        $("#newsletter-btn").toggle();
        $('#inputEmail').focus();
    });
    $("#inputEmail").on("click", function (event) {
        event.stopPropagation();
    });
});

/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(s){this.options=e.extend({},i.defaults,t.defaults,s),this.element=this.options.element,this.$element=e(this.element),this.createWrapper(),this.createWaypoint()}var e=window.jQuery,i=window.Waypoint;t.prototype.createWaypoint=function(){var t=this.options.handler;this.waypoint=new i(e.extend({},this.options,{element:this.wrapper,handler:e.proxy(function(e){var i=this.options.direction.indexOf(e)>-1,s=i?this.$element.outerHeight(!0):"";this.$wrapper.height(s),this.$element.toggleClass(this.options.stuckClass,i),t&&t.call(this,e)},this)}))},t.prototype.createWrapper=function(){this.options.wrapper&&this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},t.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass),this.options.wrapper&&this.$element.unwrap())},t.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},i.Sticky=t}();

/**
* jquery.matchHeight-min.js master
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(c){var n=-1,f=-1,g=function(a){return parseFloat(a)||0},r=function(a){var b=null,d=[];c(a).each(function(){var a=c(this),k=a.offset().top-g(a.css("margin-top")),l=0<d.length?d[d.length-1]:null;null===l?d.push(a):1>=Math.floor(Math.abs(b-k))?d[d.length-1]=l.add(a):d.push(a);b=k});return d},p=function(a){var b={byRow:!0,property:"height",target:null,remove:!1};if("object"===typeof a)return c.extend(b,a);"boolean"===typeof a?b.byRow=a:"remove"===a&&(b.remove=!0);return b},b=c.fn.matchHeight=
function(a){a=p(a);if(a.remove){var e=this;this.css(a.property,"");c.each(b._groups,function(a,b){b.elements=b.elements.not(e)});return this}if(1>=this.length&&!a.target)return this;b._groups.push({elements:this,options:a});b._apply(this,a);return this};b._groups=[];b._throttle=80;b._maintainScroll=!1;b._beforeUpdate=null;b._afterUpdate=null;b._apply=function(a,e){var d=p(e),h=c(a),k=[h],l=c(window).scrollTop(),f=c("html").outerHeight(!0),m=h.parents().filter(":hidden");m.each(function(){var a=c(this);
a.data("style-cache",a.attr("style"))});m.css("display","block");d.byRow&&!d.target&&(h.each(function(){var a=c(this),b=a.css("display");"inline-block"!==b&&"inline-flex"!==b&&(b="block");a.data("style-cache",a.attr("style"));a.css({display:b,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"})}),k=r(h),h.each(function(){var a=c(this);a.attr("style",a.data("style-cache")||"")}));c.each(k,function(a,b){var e=c(b),
f=0;if(d.target)f=d.target.outerHeight(!1);else{if(d.byRow&&1>=e.length){e.css(d.property,"");return}e.each(function(){var a=c(this),b=a.css("display");"inline-block"!==b&&"inline-flex"!==b&&(b="block");b={display:b};b[d.property]="";a.css(b);a.outerHeight(!1)>f&&(f=a.outerHeight(!1));a.css("display","")})}e.each(function(){var a=c(this),b=0;d.target&&a.is(d.target)||("border-box"!==a.css("box-sizing")&&(b+=g(a.css("border-top-width"))+g(a.css("border-bottom-width")),b+=g(a.css("padding-top"))+g(a.css("padding-bottom"))),
a.css(d.property,f-b+"px"))})});m.each(function(){var a=c(this);a.attr("style",a.data("style-cache")||null)});b._maintainScroll&&c(window).scrollTop(l/f*c("html").outerHeight(!0));return this};b._applyDataApi=function(){var a={};c("[data-match-height], [data-mh]").each(function(){var b=c(this),d=b.attr("data-mh")||b.attr("data-match-height");a[d]=d in a?a[d].add(b):b});c.each(a,function(){this.matchHeight(!0)})};var q=function(a){b._beforeUpdate&&b._beforeUpdate(a,b._groups);c.each(b._groups,function(){b._apply(this.elements,
this.options)});b._afterUpdate&&b._afterUpdate(a,b._groups)};b._update=function(a,e){if(e&&"resize"===e.type){var d=c(window).width();if(d===n)return;n=d}a?-1===f&&(f=setTimeout(function(){q(e);f=-1},b._throttle)):q(e)};c(b._applyDataApi);c(window).bind("load",function(a){b._update(!1,a)});c(window).bind("resize orientationchange",function(a){b._update(!0,a)})})(jQuery);

var tempSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {{w}} {{h}}'/>"; // Simplest possible SVG

$('img.lazy').each(function () {
    var $this = $(this),
        data = $this.data(), // Get all the data attributes
        $img = $this.attr({
            width: data.width,
            height: data.height,
            src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(tempSVG.replace(/{{w}}/g,data.width).replace(/{{h}}/g,data.height)),
        })
        .appendTo($this)
});



$(function(){
	$('.mobile-menu-open').on('click', function(e) {  
        $('.mobile-menu').show();
    }); 
    
    $('.mobile-menu-close').on('click', function(e) {  
        $('.mobile-menu').hide();
    });   
    
    $('[data-scroll-speed]').moveIt();
});


// Initialization
$(function(){
    // Add smooth scrolling to all links
    $('.anchorLink').click(function() {
        var offset = -65; // <-- change the value here
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top + offset
                }, 3000, 'easeInOutQuad');
                return false;
            }
        }
    });
    
});

function init_videos() {
    $('.play').each(function() {
        var $parent = $(this).parent();
        var $img = $parent.find('img');

        var vimeo_id = $(this).data('video-id');
        var vimeo_width = $parent.width();
        var vimeo_height = $parent.height();

        $(this).click(function() {
            var $video = $('<div class="intrinsic-container vimeo"/>');            

            var $iframe = $('<iframe src="//player.vimeo.com/video/' + vimeo_id + '?title=0&amp;byline=0&amp;portrait=0&amp;color=EA8BBC&amp;autoplay=1" width="' + vimeo_width + '" height="' + vimeo_height + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

            $video.append($iframe);

            $img.fadeOut('', function() {
                $parent.append($video);
            })

        });
    })
};

function init_sticky() {
    if ($(window).width() > 768) {
        var sticky = new Waypoint.Sticky({
            element: $('.sticky')[0]
        })

        $('#info').waypoint(function(direction) {
            $('.sticky').toggleClass('stuck', direction === 'up');
            $('.sticky').toggleClass('sticky-surpassed', direction === 'down');
        }, {
            offset: function() {
                return $('.sticky').outerHeight()+50;                
            },
            
        });
    }
};



$(window).load(function () {
    frontPage();
    $('.project-info').fadeIn();
});

var resizeTimer;

$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {

    getHeight();
    init_sticky();
    frontPage();
 
      
    if ($(window).width() < 768) {
        $('.logo').css('width', '');
    }
            
  }, 250);    
    
});

$(document).on("click", function () {
    $("#newsletter").toggle();     
    $("#newsletter-btn").toggle();
});

$(document).on("scroll", function(){   
    var scroll = $(window).scrollTop();
    
    if ($(window).width() > 768) {
        $(".work .logo, .spin360 .logo, .studio .logo").css({
            width: (178 - scroll/3)  + "px"
        });        
        $(".homepage .logo").css({
            width: (375 - scroll/3)  + "px"
        });
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




