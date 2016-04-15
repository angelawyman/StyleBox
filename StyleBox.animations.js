var StyleBox = StyleBox || {};

(function (StyleBox, undefined) {
    'use strict';

    StyleBox.animation = (function () {
        function Animations() {
            // Private Vars
            var self = this,
                tween,
                animate;

            this.onOverlay = {};
            this.onShow = {};
            this.onHide = {};
            this.onRenderMsg = {};
            this.onBtnHover = {};
            this.onCloseHover = {};

            //onOverlay *********************************************
            this.onOverlay.pulse = function (el, data) {
                var color,
                    opacity;
                if (data.colorScheme === 'dark') {
                    color = '#ffffff';
                } else {
                    color = '#000000';
                }
                opacity = data.opacity;

                animate = new TimelineMax({
                    repeat: -1,
                    yoyo: true
                });

                animate.to(el, 1, {
                    opacity: opacity / 4

                });

            };


            //onShow *********************************************
            this.onShow.slideTop = function (el) {
                tween = TweenLite.from(el, 1, {
                    autoAlpha: 1,
                    top: "-=100px",
                    ease: Back.easeOut

                });

                return tween;
            };

            this.onShow.slideBottom = function (el) {
                tween = TweenLite.from(el, .75, {
                    autoAlpha: 1,
                    bottom: "-=100px",
                    ease: Back.easeOut

                });

                return tween;
            };

            this.onShow.slideLeft = function (el) {
                tween = TweenLite.from(el, .75, {
                    autoAlpha: 1,
                    left: "-=100px",
                    ease: Back.easeOut

                });

                return tween;
            };

            this.onShow.slideRight = function (el) {
                tween = TweenLite.from(el, .75, {
                    autoAlpha: 1,
                    right: "-=100px",
                    ease: Back.easeOut

                });

                return tween;
            };

            //onRenderMsg *********************************************
            /*  If you would like to use SplitText as demonstrated on our examples page, you must obtain a license at "http://greensock.com/club/" */
            this.onRenderMsg.splitRoll = function (el) {
                var
                    split = new SplitText(el, {
                        type: "chars"
                    }),
                    numChars = split.chars.length,
                    tl = new TimelineMax({
                        delay: 0.05
                    });

                TweenLite.set(el, {
                    visibility: "visible"
                });
                tl.staggerFrom(split.chars, 0.8, {
                    ease: Back.easeOut,
                    x: 100,
                    cycle: {
                        y: curve
                    },
                    opacity: 0
                }, 0.01);

                function curve(i) {
                    var n = i / numChars * 4.24;
                    return (Math.cos(n)) * -30;
                }

            };

            //onBtnHover *********************************************
            this.onBtnHover.buttonHighlight = function (el, data) {
                tween = TweenLite.to(el, 0.3, {
                    css: {
                        color: data.autoStyle.textColorButton,
                        backgroundColor: data.autoStyle.highColorButton,
                        boxShadow: data.autoStyle.boxShadowButton,
                        textShadow: data.autoStyle.textShadowButton
                    },
                    ease: Linear.easeNone,
                    paused: true
                });

                return tween;
            };

            //onCloseHover *********************************************
            this.onCloseHover.buttonHighlight = function (el, data) {
                tween = TweenLite.to(el, 0.3, {
                    css: {
                        color: data.autoStyle.textColorClose,
                        backgroundColor: data.autoStyle.highColorClose,
                        boxShadow: data.autoStyle.boxShadowClose,
                        textShadow: data.autoStyle.textShadowClose
                    },
                    ease: Linear.easeNone,
                    paused: true
                });
                console.log("Data");
                console.log(data);
                return tween;
            };

            //onHide *********************************************
            this.onHide.slideDown = function (el) {
                tween = TweenLite.to(el, .5, {
                    autoAlpha: 0,
                    y: "100px",
                    ease: Linear.easeNone,
                    paused: true
                });

                return tween;

            };

            return this;

        }

        return new Animations();
    })();
})(StyleBox = StyleBox || {});