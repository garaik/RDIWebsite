$(function() {
    var startSlogenAnim = function() {
        var dur = 400;
        var st = $('#slogen-title-1');
        var sd = $('#slogen-description-1');
        var defaultCss = {
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
        var i = 1;
        window.setInterval(function() {
            st = $('#slogen-title-' + i);
            sd = $('#slogen-description-' + i);
            st.animate({
                top: 0,
                opacity: 0
            }, {
                duration: dur,
                ease: 'ease-in',
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            sd.animate({
                left: 200,
                opacity: 0
            }, {
                duration: dur,
                ease: 'ease-in',
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            if (++i == 4) {
               i = 1;
            }
            st = $('#slogen-title-' + i);
            sd = $('#slogen-description-' + i);
            st.css(defaultCss.st);
            sd.css(defaultCss.sd);
            st.animate({
                opacity: 1
            }, dur, 'ease-in');
            sd.animate({
                opacity: 1
            }, dur, 'ease-in');
        }, 3000);
    };

    var initTopMenu = function() {
        var pos;
        var current = 144;
        var target;
        var $w = $(window);
        var mb = $('#menubar');
        var mbimg = mb.find('.logo img');
        $w.scroll(function() {
            pos = $w.scrollTop();
            target = pos > 84 ? 60 : 144 - pos;
        });
        window.setInterval(function() {
            if (current < target) {
                current += 5;
                if (current > target) {
                    current = target;
                }
            }
            else if (current > target) {
                current -= 5;
                if (current < target) {
                    current = target;
                }
            }
            mb.css({ height: current });
            mbimg.css({ maxHeight: current });
        }, 5);
    };

    var initProducts = function() {
        $('.products').css({
            display: 'none'
        });
    };

    var initReferences = function() {
        var refs = [];
        var $refItemsUl = $('#reference-items').find('>ul:first-child');
        $refItemsUl.find('li').each(function() {
            var $this = $(this);
            refs.push($this);
            $this.detach();
        });
        var pos = 0;
        var refmod = function(n) {
            return ((n % refs.length) + refs.length) % refs.length;
        };
        for (var i = 0; i <= 6; ++i) {
            var c = refs[refmod(pos + i)].clone();
            $refItemsUl.append(c);
            c.css({
                left: 6 + i * 110
            });
        }
        var scrolling = false;
        $('#references-arrow-right').click(function() {
            if (!scrolling) {
                scrolling = true;
                for (var i = 7; i <= 9; ++i) {
                    var c = refs[refmod(pos + i)].clone();
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
                    var c = refs[refmod(pos + i)].clone();
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
    };

    var RDIContent = (function() {
        var g = $('.gear');
        var q = g.find('.quotation');
        var d = g.find('.division-content');
        var a = g.find('.division-aside');
        var rdi = {
            r: {
                q: q.find('.research'),
                d: d.find('.research'),
                a: a.find('.research')
            },
            d: {
                q: q.find('.development'),
                d: d.find('.development'),
                a: a.find('.development')
            },
            i: {
                q: q.find('.innovation'),
                d: d.find('.innovation')
            }
        };

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

        var current = 'r';
        var delay = 400;

        function show(w) {
            var rdiw = rdi[w];
            rdiw.q.css({
                display: 'block'
            }, delay);
            rdiw.d.animate({
                height: rdiw.d.attr('data-height'),
                opacity: 1
            }, delay);
            if (rdiw.a) {
                rdiw.a.animate({
                    height: rdiw.a.attr('data-height'),
                    opacity: 1
                }, delay);
            }
            current = w;
        }

        function hide() {
            var rdic = rdi[current];
            rdic.q.css({ display: 'none' }, delay);
            rdic.d.animate({ height: 0, opacity: 0 }, delay);
            if (rdic.a) {
                rdic.a.animate({ height: 0, opacity: 0 }, delay);
            }
        }

        [rdi.r.d, rdi.d.d, rdi.i.d].forEach(function(x) {
            setHeightAndInit(x, d);
        });
        setHeightAndInit(rdi.r.a, a);
        setHeightAndInit(rdi.d.a, a);

        show(current);

        return {
            switchResearch: function() { hide(); show('r'); },
            switchDevelopment: function() { hide(); show('d'); },
            switchInnovation: function() { hide(); show('i'); }
        }
    })();

//    startSlogenAnim();
//    initTopMenu();
    initProducts();
    initReferences();

    $('#menu-research').click(function() {
        RDIContent.switchResearch(); return false;
    });
    $('#menu-development').click(function() {
        RDIContent.switchDevelopment(); return false;
    });
    $('#menu-innovation').click(function() {
        RDIContent.switchInnovation(); return false;
    });
});

// http://www.1stwebdesigner.com/wp-content/uploads/2010/06/nagging-menu-with-css3-and-jquery/index.html
