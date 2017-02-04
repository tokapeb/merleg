!function(t){function e(t){return"object"==typeof t?t:{top:t,left:t}}var n=t.scrollTo=function(e,n,i){t(window).scrollTo(e,n,i)};n.defaults={axis:"xy",duration:parseFloat(t.fn.jquery)>=1.3?0:1,limit:!0},n.window=function(e){return t(window)._scrollable()},t.fn._scrollable=function(){return this.map(function(){var e=this,n=!e.nodeName||-1!=t.inArray(e.nodeName.toLowerCase(),["iframe","#document","html","body"]);if(!n)return e;var i=(e.contentWindow||e).document||e.ownerDocument||e;return/webkit/i.test(navigator.userAgent)||"BackCompat"==i.compatMode?i.body:i.documentElement})},t.fn.scrollTo=function(i,o,r){return"object"==typeof o&&(r=o,o=0),"function"==typeof r&&(r={onAfter:r}),"max"==i&&(i=9e9),r=t.extend({},n.defaults,r),o=o||r.duration,r.queue=r.queue&&r.axis.length>1,r.queue&&(o/=2),r.offset=e(r.offset),r.over=e(r.over),this._scrollable().each(function(){function s(t){c.animate(u,o,r.easing,t&&function(){t.call(this,i,r)})}if(null!=i){var a,l=this,c=t(l),f=i,u={},d=c.is("html,body");switch(typeof f){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(f)){f=e(f);break}if(f=t(f,this),!f.length)return;case"object":(f.is||f.style)&&(a=(f=t(f)).offset())}t.each(r.axis.split(""),function(t,e){var i="x"==e?"Left":"Top",o=i.toLowerCase(),h="scroll"+i,g=l[h],v=n.max(l,e);if(a)u[h]=a[o]+(d?0:g-c.offset()[o]),r.margin&&(u[h]-=parseInt(f.css("margin"+i))||0,u[h]-=parseInt(f.css("border"+i+"Width"))||0),u[h]+=r.offset[o]||0,r.over[o]&&(u[h]+=f["x"==e?"width":"height"]()*r.over[o]);else{var p=f[o];u[h]=p.slice&&"%"==p.slice(-1)?parseFloat(p)/100*v:p}r.limit&&/^\d+$/.test(u[h])&&(u[h]=u[h]<=0?0:Math.min(u[h],v)),!t&&r.queue&&(g!=u[h]&&s(r.onAfterFirst),delete u[h])}),s(r.onAfter)}}).end()},n.max=function(e,n){var i="x"==n?"Width":"Height",o="scroll"+i;if(!t(e).is("html,body"))return e[o]-t(e)[i.toLowerCase()]();var r="client"+i,s=e.ownerDocument.documentElement,a=e.ownerDocument.body;return Math.max(s[o],a[o])-Math.min(s[r],a[r])}}(jQuery),function(t){function e(e,n,i){var o=n.hash.slice(1),r=document.getElementById(o)||document.getElementsByName(o)[0];if(r){e&&e.preventDefault();var s=t(i.target);if(!(i.lock&&s.is(":animated")||i.onBefore&&i.onBefore(e,r,s)===!1)){if(i.stop&&s._scrollable().stop(!0),i.hash){var a=r.id==o?"id":"name",l=t("<a> </a>").attr(a,o).css({position:"absolute",top:t(window).scrollTop(),left:t(window).scrollLeft()});r[a]="",t("body").prepend(l),location=n.hash,l.remove(),r[a]=o}s.scrollTo(r,i).trigger("notify.serialScroll",[r])}}}var n=location.href.replace(/#.*/,""),i=t.localScroll=function(e){t("body").localScroll(e)};i.defaults={duration:1e3,axis:"y",event:"click",stop:!0,target:window,reset:!0},i.hash=function(n){if(location.hash){if(n=t.extend({},i.defaults,n),n.hash=!1,n.reset){var o=n.duration;delete n.duration,t(n.target).scrollTo(0,n),n.duration=o}e(0,location,n)}},t.fn.localScroll=function(o){function r(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,"")==n&&(!o.filter||t(this).is(o.filter))}return o=t.extend({},i.defaults,o),o.lazy?this.bind(o.event,function(n){var i=t([n.target,n.target.parentNode]).filter(r)[0];i&&e(n,i,o)}):this.find("a,area").filter(r).bind(o.event,function(t){e(t,this,o)}).end().end()}}(jQuery),function(t){var e=".serialScroll",n=t.serialScroll=function(e){return t(window).serialScroll(e)};n.defaults={duration:1e3,axis:"x",event:"click",start:0,step:1,lock:!0,cycle:!0,constant:!0},t.fn.serialScroll=function(i){return this.each(function(){function o(t){t.data+=w,r(t,this)}function r(t,e){isNaN(e)&&(e=t.data);var n,i=t.type,o=d.exclude?l().slice(0,-d.exclude):l(),r=o.length-1,f=o[e],h=d.duration;if(i&&t.preventDefault(),x&&(a(),u=setTimeout(s,d.interval)),!f){if(n=0>e?0:r,w!==n)e=n;else{if(!d.cycle)return;e=r-n}f=o[e]}!f||d.lock&&m._scrollable().is(":animated")||i&&d.onBefore&&d.onBefore(t,f,m,l(),e)===!1||(d.stop&&m._scrollable().stop(!0),d.constant&&(h=Math.abs(h/g*(w-e))),m.scrollTo(f,h,d),c("notify",e))}function s(){c("next")}function a(){clearTimeout(u)}function l(){return t(y,b)}function c(t){m.trigger(t+e,[].slice.call(arguments,1))}function f(t){if(!isNaN(t))return t;for(var e,n=l();-1===(e=n.index(t))&&t!==b;)t=t.parentNode;return e}var u,d=t.extend({},n.defaults,i),h=d.event,g=d.step,v=d.lazy,p=d.target?this:document,m=t(d.target||this,p),b=m[0],y=d.items,w=d.start,x=d.interval,$=d.navigation;b&&(v||(y=l()),(d.force||x)&&r({},w),t(d.prev||[],p).bind(h,-g,o),t(d.next||[],p).bind(h,g,o),b.ssbound||m.bind("prev"+e,-g,o).bind("next"+e,g,o).bind("goto"+e,r),x&&m.bind("start"+e,function(t){x||(a(),x=!0,s())}).bind("stop"+e,function(){a(),x=!1}),m.bind("notify"+e,function(t,e){var n=f(e);n>-1&&(w=n)}),b.ssbound=!0,d.jump&&(v?m:l()).bind(h,function(t){r(t,f(t.target))}),$&&($=t($,p).bind(h,function(t){t.data=Math.round(l().length/$.length)*$.index(this),r(t,this)})))})}}(jQuery),function(t,e,n,i){var o=function(i,o){this.elem=i,this.$elem=t(i),this.options=o,this.metadata=this.$elem.data("plugin-options"),this.$nav=this.$elem.find("a"),this.$win=t(e),this.sections={},this.didScroll=!1,this.$doc=t(n),this.docHeight=this.$doc.height()};o.prototype={defaults:{currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollOffset:0,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){var e=this;return e.config=t.extend({},e.defaults,e.options,e.metadata),""!==e.config.filter&&(e.$nav=e.$nav.filter(e.config.filter)),e.$nav.on("click.onePageNav",t.proxy(e.handleClick,e)),e.getPositions(),e.bindInterval(),e.$win.on("resize.onePageNav",t.proxy(e.getPositions,e)),this},adjustNav:function(t,e){t.$elem.find("."+t.config.currentClass).removeClass(t.config.currentClass,500),e.addClass(t.config.currentClass,500)},bindInterval:function(){var t,e=this;e.$win.on("scroll.onePageNav",function(){e.didScroll=!0}),e.t=setInterval(function(){t=e.$doc.height(),e.didScroll&&(e.didScroll=!1,e.scrollChange()),t!==e.docHeight&&(e.docHeight=t,e.getPositions())},250)},getHash:function(t){return t.attr("href").split("#")[1]},getPositions:function(){var e,n,i,o=this;o.$nav.each(function(){e=o.getHash(t(this)),i=t("#"+e),i.length&&(n=i.offset().top,o.sections[e]=Math.round(n)-o.config.scrollOffset)})},getSection:function(t){var e=null,n=Math.round(this.$win.height()*this.config.scrollThreshold);for(var i in this.sections)this.sections[i]-n<t&&(e=i);return e},handleClick:function(n){var i=this,o=t(n.currentTarget),r=o.parent(),s="#"+i.getHash(o);r.hasClass(i.config.currentClass)||(i.config.begin&&i.config.begin(),i.adjustNav(i,r),i.unbindInterval(),t.scrollTo(s,i.config.scrollSpeed,{axis:"y",easing:i.config.easing,offset:{top:-i.config.scrollOffset},onAfter:function(){i.config.changeHash&&(e.location.hash=s),i.bindInterval(),i.config.end&&i.config.end()}})),n.preventDefault()},scrollChange:function(){var t,e=this.$win.scrollTop(),n=this.getSection(e);null!==n&&(t=this.$elem.find('a[href$="#'+n+'"]').parent(),t.hasClass(this.config.currentClass)||(this.adjustNav(this,t),this.config.scrollChange&&this.config.scrollChange(t)))},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},o.defaults=o.prototype.defaults,t.fn.onePageNav=function(t){return this.each(function(){new o(this,t).init()})}}(jQuery,window,document);