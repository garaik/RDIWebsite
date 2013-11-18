"use strict";

var RDI_CONTENT = (function() {
    var rdi;
    var current = 'r';
    var delay = 400;

    function setHeightAndInit(x, p) {
        x.css({
            display: 'block',
            position: 'fixed',
            left: -8000,
            width: p.width()
        });
        x.attr('data-height', x.height());
        x.css({
            height: 0,
            opacity: 0,
            position: 'static',
            left: 0,
            overflow: 'hidden'
        });
    }

    function show(w) {
        var rdiw = rdi[w];
        rdiw.q.css({
            display: 'block'
        }, delay);
        rdiw.d.animate({
            height: rdiw.d.attr('data-height'),
            opacity: 1
        }, delay);
        current = w;
    }

    function hide() {
        var rdic = rdi[current];
        rdic.q.css({ display: 'none' }, delay);
        rdic.d.animate({ height: 0, opacity: 0 }, delay);
        if (rdic.mctx) {
            closeMore(rdic.mctx);
        }
    }

    function openMore(mctx) {
        if (!(mctx.animating || mctx.opened)) {
            mctx.animating = true;
            mctx.mc.animate({height: mctx.mch}, delay);
            mctx.d.animate({height: '+=' + mctx.mch}, delay);
            if (mctx.aside) {
                mctx.aside.animate({
                    height: mctx.aside.attr('data-height'),
                    opacity: 1
                }, delay);
            }
            mctx.o.css({'z-index' : 49}).animate({opacity: 0}, delay);
            mctx.c.css({'z-index' : 50}).animate({opacity: 1}, delay, function() {
                mctx.opened = true;
                mctx.animating = false;
            });
        }
    }

    function closeMore(mctx) {
        if (!mctx.animating && mctx.opened) {
            mctx.animating = true;
            mctx.mc.animate({height: 0}, delay);
            mctx.d.animate({height: '-=' +  mctx.mch}, delay);
            if (mctx.aside) {
                mctx.aside.animate({ height: 0, opacity: 0 }, delay);
            }
            mctx.o.css({'z-index' : 50}).animate({opacity: 1}, delay);
            mctx.c.css({'z-index' : 49}).animate({opacity: 0}, delay, function() {
                mctx.opened = false;
                mctx.animating = false;
            });
        }
    }

    function initMore(d) {
        var mctx = (function() {
            var m = d.find('.more');
            var mc = m.find('.more-content');
            return {
                d: d,
                m: m,
                mc: mc,
                mch: mc.height(),
                o: m.find('.open'),
                c: m.find('.close') ,
                opened: false,
                animating: false
            };
        }());
        mctx.mc.css({height: 0});
        mctx.o.click(function() {
            openMore(mctx);
            return false;
        });
        mctx.c.click(function() {
            closeMore(mctx);
            return false;
        });
        return mctx;
    }

    $(function() {
        var g = $('.gear');
        var q = g.find('.quotation');
        var d = g.find('.division-content');
        var a = g.find('.division-aside');
        rdi = {
            r: {
                q: q.find('.research'),
                d: d.find('.research'),
                dm: d.find('.research').find('.more-content'),
                a: a.find('.research')
            },
            d: {
                q: q.find('.development'),
                d: d.find('.development'),
                dm: d.find('.development').find('.more-content'),
                a: a.find('.development')
            },
            i: {
                q: q.find('.innovation'),
                d: d.find('.innovation')
            }
        };

        [rdi.r.q, rdi.d.q, rdi.i.q].forEach(function(x) {
            x.css({display: 'none'})
        });

        rdi.r.mctx = initMore(rdi.r.d);
        rdi.r.mctx.aside = rdi.r.a;
        rdi.d.mctx = initMore(rdi.d.d);
        rdi.d.mctx.aside = rdi.d.a;

        [rdi.r.d, rdi.d.d, rdi.i.d].forEach(function(x) {
            setHeightAndInit(x, d);
        });

        setHeightAndInit(rdi.r.a, a);
        setHeightAndInit(rdi.d.a, a);

        show(current);
    });

    return {
        switchResearch: function() { hide(); show('r'); },
        switchDevelopment: function() { hide(); show('d'); },
        switchInnovation: function() { hide(); show('i'); }
    }
})();

var REFERENCES = (function() {
    var refs = [];

    $(function() {
        var $refItemsUl = $('#reference-items').find('>ul:first-child');
        var refTitle = $('#references-title');
        var pos = 0;
        var scrolling = false;
        var d = 400;
        var $defaultTop;
        var refmod = function(n) {
            return ((n % refs.length) + refs.length) % refs.length;
        };
        var fadeSpanIn = function($s) {
            $s.stop();
            var t = parseInt($s.css('top'), 10);
            $s.css({'z-index' : 50}).animate({top : 0}, d * t / $defaultTop);
        };
        var fadeSpanOut = function($s) {
            $s.stop();
            var t = parseInt($s.css('top'), 10);
            $s.css({'z-index' : 49}).animate({top : $defaultTop}, d * ($defaultTop - t) / $defaultTop);
        };
        var refMouseIn = function(e) { fadeSpanIn($(e.target).data('span')); };
        var refMouseOut = function(e) { fadeSpanOut($(e.target).data('span')) };
        var spanMouseIn = function(e) { fadeSpanIn($(e.target)); };
        var spanMouseOut = function(e) { fadeSpanOut($(e.target)); };

        $refItemsUl.find('li').each(function() {
            var $this = $(this);
            var span = $this.find('span');
            span.detach();
            refTitle.append(span);
            span.hover(spanMouseIn, spanMouseOut);
            $this.data('span', span);
            refs.push($this);
            $this.detach();
        });
        $defaultTop = parseInt(refs[0].data('span').css('top'), 10);
        for (var i = 0; i <= 6; ++i) {
            var c = refs[refmod(pos + i)].clone(true);
            $refItemsUl.append(c);
            c.css({
                left: 6 + i * 110
            });
            c.hover(refMouseIn, refMouseOut);
        }
        $('#references-arrow-right').click(function() {
            if (!scrolling) {
                scrolling = true;
                for (var i = 7; i <= 9; ++i) {
                    var c = refs[refmod(pos + i)].clone(true);
                    c.hover(refMouseIn, refMouseOut);
                    $refItemsUl.append(c);
                    c.css({
                        left: 6 + i * 110
                    });
                }
                $refItemsUl.find('li').each(function (i) {
                    $(this).delay(i * 50).animate({ left: '-=330' }, 500, 'swing', function () {
                        if (i < 3) {
                            $(this).remove();
                        }
                        else if (i == 9) {
                            scrolling = false;
                        }
                    });
                });
                pos += 3;
            }
            return false;
        });
        $('#references-arrow-left').click(function() {
            if (!scrolling) {
                scrolling = true;
                for (var i = -1; i >= -3; --i) {
                    var c = refs[refmod(pos + i)].clone(true);
                    c.hover(refMouseIn, refMouseOut);
                    $refItemsUl.prepend(c);
                    c.css({
                        left: 6 + i * 110
                    });
                }
                $refItemsUl.find('li').each(function (i) {
                    $(this).delay((9 - i) * 50).animate({ left: '+=330' }, 500, 'swing', function () {
                        if (i > 6) {
                            $(this).remove();
                        }
                        else if (i == 0) {
                            scrolling = false;
                        }
                    });
                });
                pos -= 3;
            }
            return false;
        });
    });
})();

var SLOGEN = (function() {
    var dur = 500;
    var defaultCss;
    var i = 1;

    $(function() {
        var st = $('#slogen-title-1');
        var sd = $('#slogen-description-1');
        defaultCss = {
           st: {
               left: st.css('left'),
               top: st.css('top'),
               opacity: 0,
               display: "block"
           },
           sd: {
               left: sd.css('left'),
               top: sd.css('top'),
               opacity: 0,
               display: "block"
           }
        };

        window.setInterval(function() {
            $('#slogen-title-' + i).animate({
                top: 0,
                opacity: 0
            }, {
                duration: dur,
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            $('#slogen-description-' + i).animate({
                left: 200,
                opacity: 0
            }, {
                duration: dur,
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            if (++i == 4) { i = 1; }
            $('#slogen-title-' + i).css(defaultCss.st).animate({ opacity: 1 }, dur);
            $('#slogen-description-' + i).css(defaultCss.sd).animate({ opacity: 1 }, dur);
        }, 10000);
    });
})();

var TOP_MENU = (function() {
    var pos;
    var current = 144;
    var target = 144;

    $(function() {
        $(window).scroll(function() {
            pos = $(this).scrollTop();
            target = pos > 84 ? 60 : 144 - pos;
        });
        var $ml = $('#menu-logo');
        var dih = $ml.height();
        window.setInterval(function() {
            if (current < target) {
                current += 10;
                if (current > target) {
                    current = target;
                }
            }
            else if (current > target) {
                current -= 10;
                if (current < target) {
                    current = target;
                }
            }
            $('#menubar').css({height: current});
            $ml.css({maxHeight: current});
            var r = (1 - ($ml.height() - 60) / (dih - 60));
            $ml.css({
                marginLeft: r * 9
            });
        }, 20);
    });
})();

var PRODUCTS = (function() {
    $(function() {
        var $ps = $('.products'),
            delay = 1000;
        $ps.find('.product-boxes').find('.box').each(function(i, e) {
            var $b = $(e),
                $bp = $b.parent(),
                cn = $b.attr('class').split(' ')[1],
                $p = $('.product.' + cn);
            console.log($bp);
            var ctx = {
                section: $ps,
                content: $p,
                start: {
                    section: {
                        height: $ps.height()
                    },
                    content: {
                        left: 0,
                        top: 0,
                        width: $ps.width(),
                        height: 0,
                        opacity: 1
                    }
                },
                target: {
                    section: {
                        height: $p.height()
                    },
                    content: {
                        left: 0,
                        top: 0,
                        height: $p.height(),
                        width: $ps.width(),
                        opacity: 1
                    }
                }
            };
            $p.css({'z-index': -1}).css(ctx.start.content);
            $b.click(function() {
                SCROLL.toProducts();
                ctx.content.css({'z-index': 2});
                ctx.section.animate(ctx.target.section, delay);
                ctx.content.animate(ctx.target.content, delay);
            });
            $p.find('.handler').find('.close').click(function() {
                ctx.content.animate(ctx.start.content, delay);
                ctx.section.animate(ctx.start.section, delay, function() {
                    ctx.content.css({'z-index': -1});
                });
                SCROLL.toProducts();
                return false;
            });
        });
    });
})();

var SCROLL = (function() {
    var delay = 500;
    var scrollTo = function($e) {
        $('html, body').animate({scrollTop: $e.offset().top - 67}, delay);
    };
    return {
        toRDI: function() {
            scrollTo($('.gear'));
        },
        toProducts: function() {
            scrollTo($('.products'));
        },
        toReferences: function() {
            scrollTo($('.references'));
        },
        toContacts: function() {
            scrollTo($('.contact'));
        }
    };
}());

$(function() {
    $('#menu-research').click(function() {
        SCROLL.toRDI();
        PIZZA_SVG.switchResearch();
        return false;
    });
    $('#menu-development').click(function() {
        SCROLL.toRDI();
        PIZZA_SVG.switchDevelopment();
        return false;
    });
    $('#menu-innovation').click(function() {
        SCROLL.toRDI();
        PIZZA_SVG.switchInnovation();
        return false;
    });
    $('#menu-products').click(function() {
        SCROLL.toProducts();
        return false;
    });
    $('#menu-references').click(function() {
        SCROLL.toReferences();
        return false;
    });
    $('#menu-contacts').click(function() {
        SCROLL.toContacts();
        return false;
    });
    PIZZA_SVG.setCallback(function(slice) {
        switch (slice) {
            case 'R':
                SCROLL.toRDI();
                RDI_CONTENT.switchResearch(); break;
            case 'D':
                SCROLL.toRDI();
                RDI_CONTENT.switchDevelopment(); break;
            case 'I':
                SCROLL.toRDI();
                RDI_CONTENT.switchInnovation(); break;
        }
    });
});
