

var StyleBoxWebPage = function (nTimes) {
    /* =========> GLOBAL VARS <========= */
    var self = this,
        options = {},
        data = [],
        iTime = 0,
        t1 = new TimelineLite();

    /* =====> THIS.INIT PRIVILEGED METHOD <===== */
    this.init = function () {
        options.scheme = ["lite", "dark"];
        options.color = ["auto", "auto", "ran"];
        options.lite = ["#ffffff", "hsl(240, 100%, 95%)", "hsl(0, 0%, 93%)","hsl(120, 37%, 89%)","hsl(54, 65%, 83%)","hsl(180, 23%, 77%)","hsl(34, 44%, 77%)","hsl(300, 48%, 87%)","hsl(39, 100%, 89%)"];
        options.hslLite5 = ["hsl(0,0%,95%)", "hsl(240, 100%, 90%)", "hsl(0, 0%, 88%)","hsl(120, 37%, 84%)","hsl(54, 65%, 78%)","hsl(180, 23%, 72%)","hsl(34, 44%, 72%)","hsl(300, 48%, 82%)","hsl(39, 100%, 84%)"];
        options.hslLite10 = ["hsl(0,0%,90%)", "hsl(240, 100%, 85%)", "hsl(0, 0%, 83%)","hsl(120, 37%, 79%)","hsl(54, 65%, 73%)","hsl(180, 23%, 67%)","hsl(34, 44%, 67%)","hsl(300, 48%, 77%)","hsl(39, 100%, 79%)"];
        options.hslLite15 = ["hsl(0,0%,85%)", "hsl(240, 100%, 80%)", "hsl(0, 0%, 78%)","hsl(120, 37%, 74%)","hsl(54, 65%, 68%)","hsl(180, 23%, 62%)","hsl(34, 44%, 62%)","hsl(300, 48%, 72%)","hsl(39, 100%, 74%)"];
        options.hslDark10 = ["hsl(0,0%,10%)", "hsl(5, 13%, 47%)", "hsl(214, 55%, 35%)","hsl(0, 0%, 41%)","hsl(85, 50%, 36%)","hsl(54, 86%, 36%)","hsl(180, 86%, 27%)","hsl(0, 100%, 27%)","hsl(25, 72%, 41%)"];
        options.hslDark15 = ["hsl(0,0%,15%)", "hsl(5, 13%, 52%)", "hsl(214, 55%, 40%)","hsl(0, 0%, 46%)","hsl(85, 50%, 41%)","hsl(54, 86%, 41%)","hsl(180, 86%, 32%)","hsl(0, 100%, 32%)","hsl(25, 72%, 46%)"];
        options.hslDark20 = ["hsl(0,0%,20%)", "hsl(5, 13%, 57%)", "hsl(214, 55%, 45%)","hsl(0, 0%, 51%)","hsl(85, 50%, 46%)","hsl(54, 86%, 46%)","hsl(180, 86%, 37%)","hsl(0, 100%, 37%)","hsl(25, 72%, 51%)"];
        options.dark = ["#000000", "hsl(5, 13%, 37%)", "hsl(214, 55%, 25%)","hsl(0, 0%, 31%)","hsl(85, 50%, 26%)","hsl(54, 86%, 26%)","hsl(180, 86%, 17%)","hsl(0, 100%, 17%)","hsl(25, 72%, 31%)"];
        options.hasHeader = [true, false];
        options.hasFooter = [true, false];
        options.radiusVal = [0, 8, 12];
        options.butRadius = [0, 4, 6];
        options.hasIcon = [true, false];
        options.hasbutIcon = [true, false];
        options.iconColor = ["auto", "auto", "ran"];
        options.butIconColor = ["auto", "auto", "ran"];
        options.icons = ['fa fa-glass', 'fa fa-music', 'fa fa-search', 'fa fa-envelope-o', 'fa fa-heart', 'fa fa-star', 'fa fa-star-o', 'fa fa-user', 'fa fa-film', 'fa fa-th-large', 'fa fa-th', 'fa fa-th-list', 'fa fa-check', 'fa fa-times', 'fa fa-search-plus', 'fa fa-search-minus', 'fa fa-power-off', 'fa fa-signal', 'fa fa-cog', 'fa fa-trash-o', 'fa fa-home', 'fa fa-file-o', 'fa fa-clock-o', 'fa fa-road', 'fa fa-download', 'fa fa-arrow-circle-o-down', 'fa fa-arrow-circle-o-up', 'fa fa-inbox', 'fa fa-play-circle-o', 'fa fa-repeat', 'fa fa-refresh', 'fa fa-list-alt', 'fa fa-lock', 'fa fa-flag', 'fa fa-headphones', 'fa fa-volume-off', 'fa fa-volume-down', 'fa fa-volume-up', 'fa fa-qrcode', 'fa fa-barcode', 'fa fa-tag', 'fa fa-tags', 'fa fa-book', 'fa fa-bookmark', 'fa fa-print', 'fa fa-camera', 'fa fa-font', 'fa fa-bold', 'fa fa-italic', 'fa fa-text-height', 'fa fa-text-width', 'fa fa-align-left', 'fa fa-align-center', 'fa fa-align-right', 'fa fa-align-justify', 'fa fa-list', 'fa fa-outdent', 'fa fa-indent', 'fa fa-video-camera', 'fa fa-picture-o', 'fa fa-pencil', 'fa fa-map-marker', 'fa fa-adjust', 'fa fa-tint', 'fa fa-pencil-square-o', 'fa fa-share-square-o', 'fa fa-check-square-o', 'fa fa-arrows', 'fa fa-step-backward', 'fa fa-fast-backward', 'fa fa-backward', 'fa fa-play', 'fa fa-pause', 'fa fa-stop', 'fa fa-forward', 'fa fa-fast-forward', 'fa fa-step-forward', 'fa fa-eject', 'fa fa-chevron-left', 'fa fa-chevron-right', 'fa fa-plus-circle', 'fa fa-minus-circle', 'fa fa-times-circle', 'fa fa-check-circle', 'fa fa-question-circle', 'fa fa-info-circle', 'fa fa-crosshairs', 'fa fa-times-circle-o', 'fa fa-check-circle-o', 'fa fa-ban', 'fa fa-arrow-left', 'fa fa-arrow-right', 'fa fa-arrow-up', 'fa fa-arrow-down', 'fa fa-share', 'fa fa-expand', 'fa fa-compress', 'fa fa-plus', 'fa fa-minus', 'fa fa-asterisk', 'fa fa-exclamation-circle', 'fa fa-gift', 'fa fa-leaf', 'fa fa-fire', 'fa fa-eye', 'fa fa-eye-slash', 'fa fa-exclamation-triangle', 'fa fa-plane', 'fa fa-calendar', 'fa fa-random', 'fa fa-comment', 'fa fa-magnet', 'fa fa-chevron-up', 'fa fa-chevron-down', 'fa fa-retweet', 'fa fa-shopping-cart', 'fa fa-folder', 'fa fa-folder-open', 'fa fa-arrows-v', 'fa fa-arrows-h', 'fa fa-bar-chart', 'fa fa-twitter-square', 'fa fa-facebook-square', 'fa fa-camera-retro', 'fa fa-key', 'fa fa-cogs', 'fa fa-comments', 'fa fa-thumbs-o-up', 'fa fa-thumbs-o-down', 'fa fa-star-half', 'fa fa-heart-o', 'fa fa-sign-out', 'fa fa-linkedin-square', 'fa fa-thumb-tack', 'fa fa-external-link', 'fa fa-sign-in', 'fa fa-trophy', 'fa fa-github-square', 'fa fa-upload', 'fa fa-lemon-o', 'fa fa-phone', 'fa fa-square-o', 'fa fa-bookmark-o', 'fa fa-phone-square', 'fa fa-twitter', 'fa fa-facebook', 'fa fa-github', 'fa fa-unlock', 'fa fa-credit-card', 'fa fa-rss', 'fa fa-hdd-o', 'fa fa-bullhorn', 'fa fa-bell', 'fa fa-certificate', 'fa fa-hand-o-right', 'fa fa-hand-o-left', 'fa fa-hand-o-up', 'fa fa-hand-o-down', 'fa fa-arrow-circle-left', 'fa fa-arrow-circle-right', 'fa fa-arrow-circle-up', 'fa fa-arrow-circle-down', 'fa fa-globe', 'fa fa-wrench', 'fa fa-tasks', 'fa fa-filter', 'fa fa-briefcase', 'fa fa-arrows-alt', 'fa fa-users', 'fa fa-link', 'fa fa-cloud', 'fa fa-flask', 'fa fa-scissors', 'fa fa-files-o', 'fa fa-paperclip', 'fa fa-floppy-o', 'fa fa-square', 'fa fa-bars', 'fa fa-list-ul', 'fa fa-list-ol', 'fa fa-strikethrough', 'fa fa-underline', 'fa fa-table', 'fa fa-magic', 'fa fa-truck', 'fa fa-pinterest', 'fa fa-pinterest-square', 'fa fa-google-plus-square', 'fa fa-google-plus', 'fa fa-money', 'fa fa-caret-down', 'fa fa-caret-up', 'fa fa-caret-left', 'fa fa-caret-right', 'fa fa-columns', 'fa fa-sort', 'fa fa-sort-desc', 'fa fa-sort-asc', 'fa fa-envelope', 'fa fa-linkedin', 'fa fa-undo', 'fa fa-gavel', 'fa fa-tachometer', 'fa fa-comment-o', 'fa fa-comments-o', 'fa fa-bolt', 'fa fa-sitemap', 'fa fa-umbrella', 'fa fa-clipboard', 'fa fa-lightbulb-o', 'fa fa-exchange', 'fa fa-cloud-download', 'fa fa-cloud-upload', 'fa fa-user-md', 'fa fa-stethoscope', 'fa fa-suitcase', 'fa fa-bell-o', 'fa fa-coffee', 'fa fa-cutlery', 'fa fa-file-text-o', 'fa fa-building-o', 'fa fa-hospital-o', 'fa fa-ambulance', 'fa fa-medkit', 'fa fa-fighter-jet', 'fa fa-beer', 'fa fa-h-square', 'fa fa-plus-square', 'fa fa-angle-double-left', 'fa fa-angle-double-right', 'fa fa-angle-double-up', 'fa fa-angle-double-down', 'fa fa-angle-left', 'fa fa-angle-right', 'fa fa-angle-up', 'fa fa-angle-down', 'fa fa-desktop', 'fa fa-laptop', 'fa fa-tablet', 'fa fa-mobile', 'fa fa-circle-o', 'fa fa-quote-left', 'fa fa-quote-right', 'fa fa-spinner', 'fa fa-circle', 'fa fa-reply', 'fa fa-github-alt', 'fa fa-folder-o', 'fa fa-folder-open-o', 'fa fa-smile-o', 'fa fa-frown-o', 'fa fa-meh-o', 'fa fa-gamepad', 'fa fa-keyboard-o', 'fa fa-flag-o', 'fa fa-flag-checkered', 'fa fa-terminal', 'fa fa-code', 'fa fa-reply-all', 'fa fa-star-half-o', 'fa fa-location-arrow', 'fa fa-crop', 'fa fa-code-fork', 'fa fa-chain-broken', 'fa fa-question', 'fa fa-info', 'fa fa-exclamation', 'fa fa-superscript', 'fa fa-subscript', 'fa fa-eraser', 'fa fa-puzzle-piece', 'fa fa-microphone', 'fa fa-microphone-slash', 'fa fa-shield', 'fa fa-calendar-o', 'fa fa-fire-extinguisher', 'fa fa-rocket', 'fa fa-maxcdn', 'fa fa-chevron-circle-left', 'fa fa-chevron-circle-right', 'fa fa-chevron-circle-up', 'fa fa-chevron-circle-down', 'fa fa-html5', 'fa fa-css3', 'fa fa-anchor', 'fa fa-unlock-alt', 'fa fa-bullseye', 'fa fa-ellipsis-h', 'fa fa-ellipsis-v', 'fa fa-rss-square', 'fa fa-play-circle', 'fa fa-ticket', 'fa fa-minus-square', 'fa fa-minus-square-o', 'fa fa-level-up', 'fa fa-level-down', 'fa fa-check-square', 'fa fa-pencil-square', 'fa fa-external-link-square', 'fa fa-share-square', 'fa fa-compass', 'fa fa-caret-square-o-down', 'fa fa-caret-square-o-up', 'fa fa-caret-square-o-right', 'fa fa-eur', 'fa fa-gbp', 'fa fa-usd', 'fa fa-inr', 'fa fa-jpy', 'fa fa-rub', 'fa fa-krw', 'fa fa-btc', 'fa fa-file', 'fa fa-file-text', 'fa fa-sort-alpha-asc', 'fa fa-sort-alpha-desc', 'fa fa-sort-amount-asc', 'fa fa-sort-amount-desc', 'fa fa-sort-numeric-asc', 'fa fa-sort-numeric-desc', 'fa fa-thumbs-up', 'fa fa-thumbs-down', 'fa fa-youtube-square', 'fa fa-youtube', 'fa fa-xing', 'fa fa-xing-square', 'fa fa-youtube-play', 'fa fa-dropbox', 'fa fa-stack-overflow', 'fa fa-instagram', 'fa fa-flickr', 'fa fa-adn', 'fa fa-bitbucket', 'fa fa-bitbucket-square', 'fa fa-tumblr', 'fa fa-tumblr-square', 'fa fa-long-arrow-down', 'fa fa-long-arrow-up', 'fa fa-long-arrow-left', 'fa fa-long-arrow-right', 'fa fa-apple', 'fa fa-windows', 'fa fa-android', 'fa fa-linux', 'fa fa-dribbble', 'fa fa-skype', 'fa fa-foursquare', 'fa fa-trello', 'fa fa-female', 'fa fa-male', 'fa fa-gittip', 'fa fa-sun-o', 'fa fa-moon-o', 'fa fa-archive', 'fa fa-bug', 'fa fa-vk', 'fa fa-weibo', 'fa fa-renren', 'fa fa-pagelines', 'fa fa-stack-exchange', 'fa fa-arrow-circle-o-right', 'fa fa-arrow-circle-o-left', 'fa fa-caret-square-o-left', 'fa fa-dot-circle-o', 'fa fa-wheelchair', 'fa fa-vimeo-square', 'fa fa-try', 'fa fa-plus-square-o', 'fa fa-space-shuttle', 'fa fa-slack', 'fa fa-envelope-square', 'fa fa-wordpress', 'fa fa-openid', 'fa fa-university', 'fa fa-graduation-cap', 'fa fa-yahoo', 'fa fa-google', 'fa fa-reddit', 'fa fa-reddit-square', 'fa fa-stumbleupon-circle', 'fa fa-stumbleupon', 'fa fa-delicious', 'fa fa-digg', 'fa fa-pied-piper', 'fa fa-pied-piper-alt', 'fa fa-drupal', 'fa fa-joomla', 'fa fa-language', 'fa fa-fax', 'fa fa-building', 'fa fa-child', 'fa fa-paw', 'fa fa-spoon', 'fa fa-cube', 'fa fa-cubes', 'fa fa-behance', 'fa fa-behance-square', 'fa fa-steam', 'fa fa-steam-square', 'fa fa-recycle', 'fa fa-car', 'fa fa-taxi', 'fa fa-tree', 'fa fa-spotify', 'fa fa-deviantart', 'fa fa-soundcloud', 'fa fa-database', 'fa fa-file-pdf-o', 'fa fa-file-word-o', 'fa fa-file-excel-o', 'fa fa-file-powerpoint-o', 'fa fa-file-image-o', 'fa fa-file-archive-o', 'fa fa-file-audio-o', 'fa fa-file-video-o', 'fa fa-file-code-o', 'fa fa-vine', 'fa fa-codepen', 'fa fa-jsfiddle', 'fa fa-life-ring', 'fa fa-circle-o-notch', 'fa fa-rebel', 'fa fa-empire', 'fa fa-git-square', 'fa fa-git', 'fa fa-hacker-news', 'fa fa-tencent-weibo', 'fa fa-qq', 'fa fa-weixin', 'fa fa-paper-plane', 'fa fa-paper-plane-o', 'fa fa-history', 'fa fa-circle-thin', 'fa fa-header', 'fa fa-paragraph', 'fa fa-sliders', 'fa fa-share-alt', 'fa fa-share-alt-square', 'fa fa-bomb', 'fa fa-futbol-o', 'fa fa-tty', 'fa fa-binoculars', 'fa fa-plug', 'fa fa-slideshare', 'fa fa-twitch', 'fa fa-yelp', 'fa fa-newspaper-o', 'fa fa-wifi', 'fa fa-calculator', 'fa fa-paypal', 'fa fa-google-wallet', 'fa fa-cc-visa', 'fa fa-cc-mastercard', 'fa fa-cc-discover', 'fa fa-cc-amex', 'fa fa-cc-paypal', 'fa fa-cc-stripe', 'fa fa-bell-slash', 'fa fa-bell-slash-o', 'fa fa-trash', 'fa fa-copyright', 'fa fa-at', 'fa fa-eyedropper', 'fa fa-paint-brush', 'fa fa-birthday-cake', 'fa fa-area-chart', 'fa fa-pie-chart', 'fa fa-line-chart', 'fa fa-lastfm', 'fa fa-lastfm-square', 'fa fa-toggle-off', 'fa fa-toggle-on', 'fa fa-bicycle', 'fa fa-bus', 'fa fa-ioxhost', 'fa fa-angellist', 'fa fa-cc', 'fa fa-ils', 'fa fa-meanpath'];

        console.log("options:");
        console.log(options);

        generateStyles();
        ready(animation);

        return this
    };

    /* =========> PRIVATE VARS <========= */

    /* =========> randomInteger FUNCTION <========= */
    var randomInteger = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

    /* =========> isOdd FUNCTION <========= */
        isOdd = function (num) {
            return num % 2;
        },

    /* =========> randomColor FUNCTION <========= */
        randomColor = function (style) {
            var n = randomInteger(1, 17),
                colorNum = n * 20,
                hsl;

            if (style) {
                if (style === 'dark') {
                    hsl = "hsl(" + colorNum + ",100%,25%)";
                } else {
                    hsl = "hsl(" + colorNum + ",100%,75%)";
                }
            } else {
                hsl = "hsl(" + colorNum + ",100%,50%)";
            }
            return hsl;
        },

    /* =========> ready FUNCTION <========= */
        ready = function (fn) {
            if (document.readyState != 'loading') {
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }

        },

    /* =========> generateStyles FUNCTION <========= */
        generateStyles = function () {
            var i,
                style,
                rad,
                color,
                colorType,
                colorNum;

            for (i = 0; i < nTimes; i += 1) {
                style = {};

                if (!isOdd(i)) {
                    style.scheme = "lite";
                } else {
                    style.scheme = "dark";
                }

                style.hasHeader = options.hasHeader[randomInteger(0, 1)];
                style.hasFooter = options.hasFooter[randomInteger(0, 1)];
                style.hasIcon = options.hasIcon[randomInteger(0, 1)];

                rad = randomInteger(0, 2);
                style.radius = options.radiusVal[rad];
                style.buttonRadius = options.butRadius[rad];
                style.headerRadius = options.radiusVal[rad];
                style.footerRadius = options.radiusVal[rad];

                colorNum = randomInteger(1, 8);

                if (style.scheme === 'dark') {
                    style.bgColor = "#000000";
                    style.borderColor = "#000000";
                    style.headerColor = "#000000";
                    style.headerBorderColor = "#000000";
                    style.footerColor = "#000000";
                    style.footerBorderColor = "#000000";
                    style.titleColor = "#ffffff";
                    style.iconColor = "#ffffff";
                    style.closeTextColor = "#F6F6F6";
                    style.textColor = "#ffffff";
                    style.buttonTextColor = "#F6F6F6";
                    style.buttonColor = options.hslDark10[0];
                    style.closeColor = options.hslDark10[0];

                    if (style.hasHeader) {
                        style.headerColor = options.hslDark10[0];
                        style.headerBorderColor = options.hslDark15[0];
                        style.buttonColor = options.hslDark20[0];
                        style.closeColor = options.hslDark20[0];
                    }
                    if (style.hasFooter) {
                        style.footerColor = options.hslDark10[0];
                        style.footerBorderColor = options.hslDark15[0];
                        style.buttonColor = options.hslDark20[0];
                        style.closeColor = options.hslDark20[0];
                    }

                } else {
                    style.bgColor = "#ffffff";
                    style.borderColor = "#ffffff";
                    style.headerColor = "#ffffff";
                    style.headerBorderColor = "#ffffff";
                    style.footerColor = "#ffffff";
                    style.footerBorderColor = "#ffffff";
                    style.titleColor = "#000000";
                    style.iconColor = "#000000";
                    style.closeTextColor = "#6A6A6A";
                    style.textColor = "#000000";
                    style.buttonTextColor = "#6A6A6A";
                    style.buttonColor = options.hslLite5[0];
                    style.closeColor = options.hslLite5[0];

                    if (style.hasHeader) {
                        style.headerColor = options.hslLite5[0];
                        style.headerBorderColor = options.hslLite10[0];
                        style.buttonColor = options.hslLite15[0];
                        style.closeColor = options.hslLite15[0];
                    }
                    if (style.hasFooter) {
                        style.footerColor = options.hslLite5[0];
                        style.footerBorderColor = options.hslLite10[0];
                        style.buttonColor = options.hslLite15[0];
                        style.closeColor = options.hslLite15[0];
                    }
                }

                if (options.color[randomInteger(0, 2)] === "ran") {

                    if (style.scheme === 'dark') {
                        color = options.dark[colorNum];

                        style.bgColor = color;
                        style.borderColor = color;
                        style.headerColor = color;
                        style.headerBorderColor = color;
                        style.footerColor = color;
                        style.footerBorderColor = color;
                        style.buttonColor = options.hslDark10[colorNum];
                        style.closeColor = options.hslDark10[colorNum];

                        if (style.hasHeader) {
                            style.headerColor = options.hslDark10[colorNum];
                            style.headerBorderColor = options.hslDark15[colorNum];
                            style.buttonColor = options.hslDark20[colorNum];
                            style.closeColor = options.hslDark20[colorNum];
                        }
                        if (style.hasFooter) {
                            style.footerColor = options.hslDark10[colorNum];
                            style.footerBorderColor = options.hslDark15[colorNum];
                            style.buttonColor = options.hslDark20[colorNum];
                            style.closeColor = options.hslDark20[colorNum];
                        }

                    } else {
                        color = options.lite[colorNum];

                        style.bgColor = color;
                        style.borderColor = color;
                        style.headerColor = color;
                        style.headerBorderColor = color;
                        style.footerColor = color;
                        style.footerBorderColor = color;
                        style.buttonColor = options.hslLite5[colorNum];
                        style.closeColor = options.hslLite5[colorNum];

                        if (style.hasHeader) {
                            style.headerColor = options.hslLite5[colorNum];
                            style.headerBorderColor = options.hslLite10[colorNum];
                            style.buttonColor = options.hslLite15[colorNum];
                            style.closeColor = options.hslLite15[colorNum];
                        }
                        if (style.hasFooter) {
                            style.footerColor = options.hslLite5[colorNum];
                            style.footerBorderColor = options.hslLite10[colorNum];
                            style.buttonColor = options.hslLite15[colorNum];
                            style.closeColor = options.hslLite15[colorNum];
                        }

                    }

                }

                if (style.hasIcon) {
                    style.icon = options.icons[randomInteger(0, 478)] + " fa-lg MsgIcon"; //css icon
                    colorType = options.iconColor[randomInteger(0, 2)];
                    if (colorType === "ran") {
                        if (style.scheme === 'dark') {
                            style.iconColor = randomColor('lite');
                        } else {
                            style.iconColor = randomColor('dark');
                        }
                    }
                } else {
                    style.icon = "MsgIcon";
                }

                data.push(style);

            }

            console.log("data:");
            console.log(data);
        },

        renderTweens = function (index) {
            var d = data[index],
                timeLine = new TimelineLite();

            timeLine.add( TweenLite.to(".StyleBoxDemo", 1, {
                css : {
                    backgroundColor : d.bgColor,
                    borderColor : d.borderColor,
                    borderRadius : d.radius
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to(".MsgTop", 1, {
                css : {
                    backgroundColor : d.headerColor,
                    borderBottomColor : d.headerBorderColor,
                    borderTopRightRadius : d.headerRadius,
                    borderTopLeftRadius : d.headerRadius
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to(".MsgBottom", 1, {
                css : {
                    backgroundColor : d.footerColor,
                    borderTopColor : d.footerBorderColor,
                    borderBottomRightRadius : d.footerRadius,
                    borderBottomLeftRadius : d.footerRadius
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to(".MsgClose", 1, {
                css : {
                    backgroundColor : d.closeColor,
                    color : d.closeTextColor
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to(".MsgButton", 1, {
                css : {
                    backgroundColor : d.buttonColor,
                    color : d.buttonTextColor,
                    borderRadius : d.buttonRadius
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to(".MsgTitle", 1, {
                css : {
                    color : d.titleColor
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to(".MsgText", 1, {
                css : {
                    color : d.textColor
                },
                ease : Linear.easeNone
            }), 0 );

            timeLine.add( TweenLite.to("#MsgIcon", 1, {
                css : {
                    color : d.iconColor
                },
                className : d.icon,
                ease : Linear.easeNone
            }), 0 );

            return timeLine;

        },

        animation = function () {
            var i, timeLine;
            for (i = 0; i < 50; i += 1) {
                timeLine = renderTweens(i);
                t1.add(timeLine, "+=3");
            }

            t1.play();
        };

    self.init();
    console.log("t1:");
    console.log(t1);
    return t1;
};

