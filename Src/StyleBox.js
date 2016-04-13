/* ##########################################################
 * StyleBox.js
 * @version 1.1
 * created by James S. Hackney
 * copyright 2016 by db6 Software
 * GIT URL - https://github.com/dbs6/stylebox
 */

/* StyleBox (our namespace name) and undefined are passed here
 * To ensure 1. Namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. The value of undefined is guaranteed as being truly
 * Undefined. This is to avoid issues with undefined being
 * Mutable pre-ES5.
 * ##########################################################
 */


var StyleBox = StyleBox || {};


(function (StyleBox, undefined) {
    'use strict';

    StyleBox.modal = function () {
        /* #####> GLOBAL STYLEBOX VARS <##### */
        var self = this,
            options = {},  //Object that holds the options set by user.
            set = {},  //Object that holds the settings for this instance.
            dlg = {},  //Object that holds the dialog objects initialized.
            ani = StyleBox.animation,  //Object that holds the animations available to this instance.
            btn = alertButtons,  //Object that defines the alert buttons.
            hlp = helper,  //Object that defines any helper functions used herein.
            sty = styles,  //Object that defines the default syles used herein.
            Sb,  //Constructor for StyleBox Objects.
            autoStyle = {},  //Object that defines the auto-styling available to certain animation callbacks.
            msg,
            n,
            start,  //=====> REMOVE <=====
            end,  //=====> REMOVE <=====
            time,  //=====> REMOVE <=====
            defaults = {
                alertType: ['none'], // [ 'none'||'warning'||'info'||'confirm'||'error'||'question'||'success'||'danger' , 'striped']
                borderRadius: [10], // [outer radius , button radius]
                buttons: [0], // [ 0-default||1-'OK'||2-'OK''CANCEL'||3-'YES''NO''CANCEL'||4-CUSTOM, [ ['Custom1','Custom1 Icon', 'Icon Color'],['Custom2','Custom2 Icon', 'Icon Color'] ]
                exitBtnStyle: 'circle', //'circle' or 'corner' or 'simpleX'
                icon: ['default'], // [ 'default'||'custom', 'fa fa-group' ]
                iconStyle: ['fa-lg'], // [size, color]
                keyboard: true,  //Whether or not pressing key on keyboard closes dialog.
                message: null, //Message text or callback to function with contents of message.  Use '|' for line break.
                overlayClose: true,  //Whether or not clicking on overlay closes dialog.
                overlayOpacity: .4,
                parent: document.body,  //parent object of dialog box and overlay.
                style: {  //Style overrides.  See website for possible values.
                    custom: false,
                    colorScheme: 'lite',
                    hasHeaderColor: false,
                    hasHeaderSep: false,
                    hasFooterColor: false,
                    hasFooterSep: false
                },
                textAlign: 'center',  //Text alignment of message.
                title: '',  //Title of message.
                width: 0,  //Automatic width override.
                onOverlay: null, //Animation callback for the overlay or reference to function in StyleBox.animation extension.  Takes 'element' as an argument.
                onShow: null, //Animation callback when the dialog appears or reference to function in StyleBox.animation extension.  Takes 'element' as an argument.
                onRenderMsg: null, //Animation callback when the message text is rendered or reference to function in StyleBox.animation extension.  Takes 'message' as an argument.
                onBtnHover: ani.onBtnHover.buttonHighlight, //Animation callback when the button(s) mouseEnter event is triggered or reference to function in StyleBox.animation extension.  Takes 'Button' element and data object as arguments.
                onCloseHover: ani.onCloseHover.buttonHighlight, //Animation callback when the close button mouseEnter event is triggered or reference to function in StyleBox.animation extension.  Takes 'Button' element and data object as arguments.
                onHide: null,  //Animation callback before the dialog is closed or reference to function in StyleBox.animation extension.  Takes 'dialog element' as an argument.
                onClose: null //callback after the dialog has been closed or reference to function in StyleBox.animation extension.  Takes 'caption' of button pressed as an argument.

            };

        /* =====> POPULATE INSTANCE OPTIONS <===== */
        if (typeof arguments[0] === 'string') {
            options.message = arguments[0];
        }
        if (typeof arguments[0] === 'object' || typeof arguments[1] === 'object') {
            options = hlp.extend(options, (typeof arguments[0] === 'object' ? arguments[0] : arguments[1]));
        }

        console.log("options");
        console.log(options);

        console.log("defaults");
        console.log(defaults);
        /* =====> CONSTRUCTOR FOR STYLEBOX OBJECTS <===== */
        Sb = function (type) {
            var self = this;
            this.type = (typeof arguments[0] === 'string') ? arguments[0] : "div";
            this.ele = document.createElement(self.type);
        };
        /* =====> METHODS FOR STYLEBOX OBJECTS <===== */
        Sb.prototype = {
            cls: function (name) {
                if (typeof name === 'string') {
                    this.ele.className = name;
                }
                return this;
            },
            id: function (name) {
                if (typeof name === 'string') {
                    this.ele.id = name;
                }
                return this;
            },
            css: function (obj) {
                var prop;
                if (typeof obj === 'object') {
                    for (prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            this.ele.style[prop] = obj[prop];
                        }
                    }
                }
                return this;
            },
            html: function (str) {
                if (typeof str === 'string') {
                    this.ele.innerHTML = str;
                }
                return this;
            },
            append: function (parent) {
                if (parent.nodeType === 1) {
                    parent.appendChild(this.ele);
                }
                return this.ele;
            }
        };

        /* =====> THIS.INIT PRIVILEGED METHOD <===== */
        this.init = function () {
            start = performance.now();  //=====> REMOVE <=====
            /* =====> POPULATE SETTINGS FROM DEFAULTS & OPTIONS <===== */
            set = hlp.extend(defaults, options);

            console.log("set:");
            console.log(set);

            /* =====> OVERLAY <===== */
            dlg.overlay = new Sb().cls("MsgOverlay").css({
                "opacity": set.overlayOpacity
            }).append(set.parent);

            if (set.overlayClose) {
                dlg.overlay.addEventListener("click", function () {
                    close();
                });
            }

            /* =====> DIALOG <===== */
            dlg.dialog = new Sb().cls("StyleBox").append(set.parent);
            dlg.top = new Sb().append(dlg.dialog);
            dlg.title = new Sb().cls("MsgTitle").append(dlg.top);
            dlg.xClose = new Sb().cls("MsgClose").append(dlg.top);
            dlg.body = new Sb().cls("MsgBody").append(dlg.dialog);
            dlg.bottom = new Sb().cls("MsgBottom").append(dlg.dialog);
            dlg.bbar = new Sb().cls("ButtonBar").append(dlg.bottom);

            /* =====> ALERTS <===== */
            if (set.alertType[0] !== 'none' && set.alertType[1] === 'striped') {
                hlp.addClass(dlg.top, "MsgAlert");
                generateAlert();
            } else {
                hlp.addClass(dlg.top, "MsgTop")
            }

            /* =====> ICON <===== */
            var myIcon = generateIcon();
            if (myIcon) {
                dlg.cssIcon = new Sb("i").id('msgIcon-' + set.alertType[0]).cls(myIcon + " MsgIcon").css(generateIconStyle()).append(dlg.title);
            }

            /* =====> TITLE <===== */
            if (set.title) {
                dlg.titleText = new Sb("span").css({"paddingLeft" : "4px"}).html(set.title).append(dlg.title);
            }

            /* =====> EXIT BUTTON <===== */
            if (set.exitBtnStyle) {
                hlp.addClass(dlg.xClose, set.exitBtnStyle);
            }
            if (set.exitBtnStyle === "corner") {
                dlg.xIcon = new Sb().html("<i class='fa fa-bars CloseIcon'></i>").append(dlg.xClose);
                dlg.dialog.style.overflow = "hidden";
            } else if (set.exitBtnStyle === "simpleX") {
                dlg.xIcon = new Sb().html("<i class='fa fa-times'></i>").append(dlg.xClose);
            } else {
                dlg.xIcon = new Sb().cls("CloseIcon").html("<i class='fa fa-times'></i>").append(dlg.xClose);
            }

            /* =====> MESSAGE <===== */
            if (typeof set.message === 'function') {
                msg = hlp.htmlEscape(set.message());
                console.log("msg:");
                console.log(msg);
                dlg.msgText = new Sb("span").cls("MsgText").html(hlp.htmlUnescape(msg)).append(dlg.body);

            } else {
                /* =====> TEXT MULTI-LINE? <===== */
                if (set.message.search("|") !== -1) {
                    var myMsg = set.message.split("|"),
                        tempTxt = '',
                        i = 0;
                    while (i < myMsg.length) {
                        tempTxt += myMsg[i] + '<br>';
                        i += 1;
                    }
                    dlg.msgText = new Sb("span").cls("MsgText").html(tempTxt).append(dlg.body);
                } else {
                    dlg.msgText = new Sb("span").cls("MsgText").html(set.message).append(dlg.body);
                }
            }

            /* =====> BUTTONS <===== */
            var myButtons = generateButtons();
            if (myButtons !== 'undefined') {
                dlg.buttons = [];
                myButtons.forEach(function (value, index) {
                    if (hlp.toType(value) === 'array') {
                        dlg.buttons[index] = new Sb().id('MsgBut-' + index).cls("MsgButton").append(dlg.bbar);
                        if (value.length === 3) {
                            new Sb("i").cls(value[1] + " MsgIcon").css({"color" : value[2]}).append(dlg.buttons[index]);
                        } else {
                            new Sb("i").cls(value[1] + " MsgIcon").append(dlg.buttons[index]);
                        }

                        new Sb("span").html(value[0]).append(dlg.buttons[index]);
                    } else {
                        dlg.buttons[index] = new Sb().id('MsgBut-' + index).cls("MsgButton").html(value).append(dlg.bbar);
                    }

                    dlg.buttons[index].addEventListener("click", function () {
                        if (undefined !== value.callback) {
                            value.callback(dlg.dialog);
                        }
                        close((hlp.toType(value) === 'array') ? value[0] : value );
                    });
                });

                //DIV CLEAR
                dlg.clear = new Sb().css({
                    "clear": "both"
                }).append(dlg.bbar);
            }

            /* =====> BORDER RADIUS <===== */
            n = parseInt(set.borderRadius[0], 10);
            if (!isNaN(n) && n === set.borderRadius[0] && n.toString() === set.borderRadius[0].toString() && n > 0) {
                var rad = set.borderRadius[0] + "px";
                hlp.setCSS(dlg.dialog, {
                    "borderRadius": rad
                });
                hlp.setCSS(dlg.top, {
                    "borderTopRightRadius": rad,
                    "borderTopLeftRadius": rad
                });
                hlp.setCSS(dlg.bottom, {
                    "borderBottomRightRadius": rad,
                    "borderBottomLeftRadius": rad
                });
                dlg.buttons.forEach(function (el) {
                    el.style.borderRadius = (set.borderRadius[1] !== undefined) ? set.borderRadius[1] + "px" : "5px";
                });
            }

            /* =====> EVENTS <===== */
            dlg.xClose.addEventListener("click", function (e) {
                e.preventDefault();
                close();
            });

            //EVENTS-RESIZE
            window.addEventListener("resize", centerChild());

            //EVENTS-ESC
            if (set.keyboard) {
                document.addEventListener("keyup", keyup);
            }

            /* =====> OVERRIDE WIDTH? <===== */
            n = parseInt(set.width, 10);
            if (!isNaN(n) && n === set.width && n.toString() === set.width.toString() && n > 0) {
                dlg.dialog.style.width = set.width;
            }

            /* =====> RENDER <===== */
            renderDialog();

            /* =====> RETURN THIS OBJECT <===== */
            return this;
        };

        /* #####> PRIVATE STYLEBOX VARS <##### */

        /* =====> beforeClose FUNCTION <===== */
        var beforeClose = function (callback) {
                console.log("beforeClose"); //=====> REMOVE <=====
                if (set.onHide && typeof set.onHide === "function") {
                    var animate = set.onHide(dlg.dialog);
                    animate.eventCallback("onComplete", function () {
                        callback(true);
                    });
                    console.log("beforeClose animation"); //=====> REMOVE <=====
                    console.log(animate); //=====> REMOVE <=====

                    animate.play();
                } else {
                    callback(true);
                }
            },

        /* =====> close FUNCTION <===== */
            close = function (caption) {

                beforeClose(function (canClose) {
                    console.log("callback called! " + canClose); //=====> REMOVE <=====
                    if (canClose) {
                        console.log("caption: " + caption); //=====> REMOVE <=====
                        dlg.overlay.parentNode.removeChild(dlg.overlay);
                        dlg.dialog.parentNode.removeChild(dlg.dialog);
                        if (set.onClose && typeof set.onClose === "function") {
                            set.onClose(undefined !== caption ? caption : 'Exit-Msg');
                        }

                        document.removeEventListener("keyup", keyup);
                        window.removeEventListener("resize", centerChild);
                    }
                });

            },

        /* =====> centerChild FUNCTION <===== */
            centerChild = function () {
                TweenLite.set(".StyleBox", {
                    xPercent: -50,
                    yPercent: -50,
                    autoAlpha: 1
                });
                if (set.exitBtnStyle === "circle" || "corner") {
                    TweenLite.set(".CloseIcon", {
                        xPercent: -50,
                        yPercent: -50,
                    });
                }
            },

        /* =====> generateAlert FUNCTION <===== */
            generateAlert = function () {
                var color = btn.getColor(set.alertType[0]);
                hlp.setCSS(dlg.top, {
                    "background-color": color,
                    "border-bottom-color": color
                });
            },

        /* =====> generateIcon FUNCTION <===== */
            generateIcon = function () {
                var icon,
                    iconSize = set.iconStyle[0],
                    alertType = set.alertType[0];

                if (iconSize.search(/px/i) !== -1) {
                    dlg.iSize = iconSize;
                    set.iconStyle[0] = '';
                }
                if (alertType !== 'none') {
                    set.title = btn.getTitle(alertType);
                    if (set.buttons[0] === 0) {
                        set.buttons[0] = btn.getButton(alertType);
                    }
                    icon = (btn.getIcon(alertType) + " " + set.iconStyle[0]).trim();
                }
                if (set.icon[0] === 'custom' && set.icon.length === 2) {
                    icon = (set.icon[1] + " " + set.iconStyle[0]).trim();
                }

                console.log("icon:");
                console.log(icon);

                return icon;
            },

        /* =====> generateIconStyle FUNCTION <===== */
            generateIconStyle = function () {
                var obj1 = {},
                    obj2 = {},
                    obj3 = {};
                if (dlg.iSize) {
                    obj1 = {
                        "fontSize" : dlg.iSize
                    };
                }
                if (set.iconStyle[1] !== undefined) {
                    obj2 = {
                        "color" : set.iconStyle[1]
                    };
                }
                obj3 = hlp.extend(obj1, obj2);

                console.log("generateIconStyle:");
                console.log(obj3);

                return obj3;
            },

        /* =====> generateButtons FUNCTION <===== */
            generateButtons = function () {
                var x;
                if (set.buttons[0] === 4) {
                    return set.buttons[1].reverse();
                } else {
                    switch (set.buttons[0]) {
                        case 1:
                            x = [["OK", "fa fa-check"]];
                            break;
                        case 2:
                            x = [["OK", "fa fa-check"], ["CANCEL", "fa fa-times"]];
                            break;
                        case 3:
                            x = ["YES", "NO", "CANCEL"];
                            break;
                        default:
                            x = [["OK", "fa fa-check"]];
                    }
                    return x.reverse();
                }
            },

        /* =====> keyup FUNCTION <===== */
            keyup = function (e) {
                if (e.which === 27) {
                    close();
                }
                return true;
            },

        /* =====> hasStyleProp FUNCTION <===== */
            hasStyleProp = function (prop) {
                if (set.style.hasOwnProperty(prop) && set.style[prop] !== '') {
                    return true;
                }
            },

        /* =====> INVOKE USER STYLE SETTINGS TO userStyles VAR <===== */
            userStyles = (function () {
                function _Styles() {

                    this.map = function () {
                        return {
                            hdrColor: {
                                MsgTop: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("headerColor"))
                                            return set.style.headerColor;
                                    })(),
                                    borderBottomColor: (function () {
                                        if (hasStyleProp("headerColor"))
                                            return set.style.headerColor;
                                    })()
                                }
                            },
                            hdrHsl: {
                                MsgTop: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("headerColorHsl"))
                                            return "hsl(+=0, +=0%, " + set.style.headerColorHsl + ")";
                                    })(),
                                    borderBottomColor: (function () {
                                        if (hasStyleProp("headerColorHsl"))
                                            return "hsl(+=0, +=0%, " + set.style.headerColorHsl + ")";
                                    })()
                                }
                            },
                            hdrSepColor: {
                                MsgTop: {
                                    borderBottomColor: (function () {
                                        if (hasStyleProp("headerSepColor"))
                                            return set.style.headerSepColor;
                                    })()
                                }
                            },
                            hdrSepHsl: {
                                MsgTop: {
                                    borderBottomColor: (function () {
                                        if (hasStyleProp("headerSepHsl"))
                                            return "hsl(+=0, +=0%, " + set.style.headerSepHsl + ")";
                                    })()
                                }
                            },
                            ftrColor: {
                                MsgBottom: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("footerColor"))
                                            return set.style.footerColor;
                                    })(),
                                    borderTopColor: (function () {
                                        if (hasStyleProp("footerColor"))
                                            return set.style.footerColor;
                                    })()
                                }
                            },
                            ftrHsl: {
                                MsgBottom: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("footerColorHsl"))
                                            return "hsl(+=0, +=0%, " + set.style.footerColorHsl + ")";
                                    })(),
                                    borderTopColor: (function () {
                                        if (hasStyleProp("footerColorHsl"))
                                            return "hsl(+=0, +=0%, " + set.style.footerColorHsl + ")";
                                    })()
                                }
                            },
                            ftrSepColor: {
                                MsgBottom: {
                                    borderTopColor: (function () {
                                        if (hasStyleProp("footerSepColor"))
                                            return set.style.footerSepColor;
                                    })()
                                }
                            },
                            ftrSepHsl: {
                                MsgBottom: {
                                    borderTopColor: (function () {
                                        if (hasStyleProp("footerSepHsl"))
                                            return "hsl(+=0, +=0%, " + set.style.footerSepHsl + ")";
                                    })()
                                }
                            },
                            bxSh: {
                                StyleBox: {
                                    boxShadow: (function () {
                                        if (hasStyleProp("bxSh"))
                                            return set.style.bxSh;
                                    })()
                                }
                            },
                            bgColor: {
                                StyleBox: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("bgColor"))
                                            return set.style.bgColor;
                                    })(),
                                    borderColor: (function () {
                                        if (hasStyleProp("bgColor"))
                                            return set.style.bgColor;
                                    })()
                                }
                            },
                            borderColor: {
                                StyleBox: {
                                    borderColor: (function () {
                                        if (hasStyleProp("borderColor"))
                                            return set.style.borderColor;
                                    })()
                                }
                            },
                            buttonColor: {
                                MsgButton: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("buttonColor"))
                                            return set.style.buttonColor;
                                    })()
                                },
                                MsgClose: {
                                    backgroundColor: (function () {
                                        if (hasStyleProp("buttonColor"))
                                            return set.style.buttonColor;
                                    })()
                                }
                            }
                        }
                    };

                    return this;
                }

                return new _Styles();
            })(),

        /* =====> checkHeaderFooter FUNCTION <===== */
            checkHeaderFooter = function () {
                var arr = [];
                if (set.style.hasHeaderColor) {
                    arr.push("hdrColorHsl");
                }
                if (set.style.hasFooterColor) {
                    arr.push("ftrColorHsl");
                }
                if (set.style.hasHeaderSep) {
                    arr.push("hdrSepHsl");
                }
                if (set.style.hasFooterSep) {
                    arr.push("ftrSepHsl");
                }
                return arr;
            },

        /* =====> checkSetStyle FUNCTION <===== */
            checkSetStyle = function () {
                var arr = [];
                if (hasStyleProp("headerColorHsl")) {
                    arr.push("hdrHsl");
                }
                if (hasStyleProp("headerSepHsl")) {
                    arr.push("hdrSepHsl");
                }
                if (hasStyleProp("footerColorHsl")) {
                    arr.push("ftrHsl");
                }
                if (hasStyleProp("footerSepHsl")) {
                    arr.push("ftrSepHsl");
                }
                if (hasStyleProp("headerColor")) {
                    arr.push("hdrColor");
                }
                if (hasStyleProp("headerSepColor")) {
                    arr.push("hdrSepColor");
                }
                if (hasStyleProp("footerColor")) {
                    arr.push("ftrColor");
                }
                if (hasStyleProp("footerSepColor")) {
                    arr.push("ftrSepColor");
                }
                if (hasStyleProp("bxSh")) {
                    arr.push("bxSh");
                }
                if (hasStyleProp("bgColor")) {
                    arr.push("bgColor");
                }
                if (hasStyleProp("borderColor")) {
                    arr.push("borderColor");
                }
                if (hasStyleProp("buttonColor")) {
                    arr.push("buttonColor");
                }
                return arr;
            },

        /* =====> renderTweens FUNCTION <===== */
            renderTweens = function (css) {
                for (var prop in css) {
                    if (!css.hasOwnProperty(prop))
                        continue;

                    var propVar = {};
                    var obj = css[prop];
                    for (var subProp in obj) {
                        if (!obj.hasOwnProperty(subProp))
                            continue;

                        propVar[subProp] = obj[subProp];
                    }
                    var selText = "." + prop;
                    TweenLite.set(selText, propVar);
                }
            },

        /* =====> setDialogColor FUNCTION <===== */
            setDialogColor = function (color) {
                // Must set the base color for every item using hsl% later on
                TweenLite.set('.MsgTop', {
                    backgroundColor: color,
                    borderBottomColor: color
                });
                TweenLite.set('.MsgBottom', {
                    backgroundColor: color,
                    borderTopColor: color
                });
                TweenLite.set('.MsgButton', {
                    backgroundColor: color,
                    borderColor: color
                });
                console.log("set MsgButton background color and border color to: " + color);
                TweenLite.set('.MsgClose', {
                    backgroundColor: color,
                    borderColor: color
                });

            },

        /* =====> renderStyle FUNCTION <===== */
            renderStyle = function () {
                // renderStyle local functions
                var setHeaderFooter = function (arr, scheme) {
                    var obj = {};
                    arr.forEach(function (value) {
                        obj = sty[scheme][value]; //.dark.hdrColorHsl
                        css = hlp.extend(css, obj);
                    });
                };

                // Assign default styling to css object
                var css = {};
                css = hlp.extend(css, sty.default);

                // set autostyle used by animations
                autoStyle = hlp.extend(autoStyle, sty.default.autostyle);

                // render custom style *********************
                if (set.style.custom) {
                    var hf = checkHeaderFooter();

                    // render dark style *********************
                    if (set.style.colorScheme === 'dark') {

                        // set the default changes to color scheme
                        css = hlp.extend(css, sty.darkDefault);

                        // set the related background colors for auto styling
                        if (!hasStyleProp("bgColor")) {
                            setDialogColor("#000000");
                        }

                        // set the correct footer & header colors if necessary
                        setHeaderFooter(hf, "dark");

                        // set autostyle used by animations
                        autoStyle = hlp.extend(autoStyle, sty.darkDefault.autostyle);

                        // render lite style *********************
                    } else {
                        // set the correct footer & header colors if necessary
                        setHeaderFooter(hf, "lite");
                    }

                    // render user specific styles *********************
                    var setStyle = {};
                    setStyle = userStyles.map.call(setStyle);
                    var setResult = checkSetStyle();

                    // Set color overrides set HSL
                    setResult.forEach(function (value) {
                        css = hlp.extend(css, setStyle[value]);
                    });

                    // Set background color override
                    if (hasStyleProp("bgColor")) {
                        setDialogColor(set.style.bgColor);
                    }

                    // Set highlight color override of MsgButton & MsgClose
                    if (hasStyleProp("buttonHighColor")) {
                        autoStyle.highColorButton = set.style.buttonHighColor;
                        autoStyle.highColorClose = set.style.buttonHighColor;

                    }

                }

                // Force style on simpleX Close Element
                if (set.exitBtnStyle === "simpleX" || set.exitBtnStyle === "corner") {
                    css.MsgClose.backgroundColor = "transparent";
                    css.MsgClose.boxShadow = "none";
                    autoStyle.textColorClose = autoStyle.highColorClose;
                    autoStyle.boxShadowClose = "none";
                    autoStyle.highColorClose = "transparent";

                }

                // return final css object
                console.log("css:");
                console.log(css);
                return css;
            },

        /* =====> renderDialog FUNCTION <===== */
            renderDialog = function () {
                var data,
                    animation;
                // Aligns dialog in center of parent ***do not remove***
                centerChild();

                // Aligns message text ***do not remove***
                if (set.textAlign == 'center' || set.textAlign == 'left' || set.textAlign == 'right') {
                    TweenLite.set(".MsgBody", {
                        textAlign: set.textAlign
                    });
                }

                // Render & Adjust Style
                renderTweens(renderStyle());

                //CALLBACKS ******************************
                // onOverlay sets element and data object as arguments.  Data object includes opacity setting and colorScheme setting.
                if (set.onOverlay && typeof set.onOverlay === "function") {
                    data = {
                        opacity: set.overlayOpacity,
                        colorScheme: set.style.colorScheme
                    };
                    set.onOverlay(dlg.overlay, data);
                }

                // onShow sets dialog element as argument.
                if (set.onShow && typeof set.onShow === "function") {
                    set.onShow(dlg.dialog);
                }

                // onBtnHover sets button element and data object as arguments.  Data object includes colorScheme setting and autoStyle settings.
                if (set.onBtnHover && typeof set.onBtnHover === "function") {
                    data = {
                        colorScheme: set.style.colorScheme,
                        autoStyle: autoStyle
                    };

                    dlg.buttons.forEach(function (el) {
                        var animate = set.onBtnHover(el, data);

                        el.addEventListener("mouseenter", function () {
                            animate.play();
                        });
                        el.addEventListener("mouseleave", function () {
                            animate.reverse();
                        });
                    });
                }

                // onCloseHover sets close button element and data object as arguments.  Data object includes colorScheme setting and autoStyle settings.
                if (set.onCloseHover && typeof set.onCloseHover === "function") {
                    data = {
                        colorScheme: set.style.colorScheme,
                        autoStyle: autoStyle
                    };

                    animation = set.onCloseHover(dlg.xClose, data);

                    dlg.xClose.addEventListener("mouseenter", function () {
                        animation.play();
                    });
                    dlg.xClose.addEventListener("mouseleave", function () {
                        animation.reverse();
                    });
                }

                // onRenderMsg sets message text element as argument.
                if (set.onRenderMsg && typeof set.onRenderMsg === "function") {
                    set.onRenderMsg(dlg.msgText);
                }

                // Set focus to first message button
                //dlg.bottom.focus();
                end = performance.now();
                time = end - start;
                console.log("Execution Time:");
                console.log(time);
            };

        return self.init();
    };

    /* =====> INVOKE ALERT BUTTON FUNCTIONS TO alertButtons VAR <===== */
    var alertButtons = (function () {
        function AlertButtons() {
            var data = [{
                    type: "warning",
                    icon: "fa fa-exclamation-triangle",
                    title: "Warning",
                    button: 2,
                    color: "#f58337"
                }, {
                    type: "info",
                    icon: "fa fa-info-circle",
                    title: "Information",
                    button: 1,
                    color: "#0000FF"
                }, {
                    type: "confirm",
                    icon: "fa fa-check-circle",
                    title: "Confirmation",
                    button: 2,
                    color: "#0e9e0e"
                }, {
                    type: "error",
                    icon: "fa fa-times-circle",
                    title: "Error",
                    button: 1,
                    color: "#f25858"
                }, {
                    type: "question",
                    icon: "fa fa-question-circle",
                    title: "Question",
                    button: 3,
                    color: "#0000FF"
                }, {
                    type: "success",
                    icon: "fa fa-check-circle",
                    title: "Success",
                    button: 1,
                    color: "#0e9e0e"
                }, {
                    type: "danger",
                    icon: "fa fa-exclamation",
                    title: "Danger",
                    button: 2,
                    color: "#f25858"
                }
                ],

                getIndex = function (alertType) {
                    var index = -1;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].type === alertType) {
                            index = i;
                            return index;
                        }
                    }
                };

            this.getColor = function (alertType) {
                return data[getIndex(alertType)].color;
            };

            this.getIcon = function (alertType) {
                return data[getIndex(alertType)].icon;
            };

            this.getTitle = function (alertType) {
                return data[getIndex(alertType)].title;
            };

            this.getButton = function (alertType) {
                return data[getIndex(alertType)].button;
            };

            return this;

        }

        return new AlertButtons();

    })();

    /* =====> INVOKE HELPER FUNCTIONS TO helper VAR <===== */
    var helper = (function () {
        function Helper() {
            // Private Vars
            var self = this;

            this.toType = function (obj) {
                return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            };

            // extend(objA, objB)
            this.extend = function (objA, objB) {
                objA = objA || {};

                var name,
                    src,
                    copy,
                    copyIsArray,
                    clone;

                // Handle case when target is a string or something
                if (typeof objA !== "object" && self.toType(objA) === 'function') {
                    objA = {};
                }
                if (objB != null) {
                    // Extend the base object
                    for (name in objB) {
                        src = objA[name];
                        copy = objB[name];
                        // Prevent never-ending loop
                        if (objA === copy) {
                            continue;
                        }
                        // Recurse if we're merging plain objects or arrays
                        if (copy && (self.toType(copy) === 'object' || (copyIsArray = self.toType(copy) === 'array'))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && self.toType(src) === 'array' ? src : [];
                            } else {
                                clone = src && self.toType(src) === 'object' ? src : {};
                            }
                            // Never move original objects, clone them
                            objA[name] = self.extend(clone, copy);

                        } else if (copy !== undefined) {
                            objA[name] = copy;
                        }
                    }
                }

                // Return the modified object
                return objA;
            };

            this.addClass = function (el, name) {
                if (el.classList)
                    el.classList.add(name);
                else
                    el.className += ' ' + name;
            };

            this.setCSS = function (el, obj) {
                var prop;
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        el.style[prop] = obj[prop];
                    }
                }
            };

            this.htmlEscape = function(str) {
                return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            };

            this.htmlUnescape = function(value) {
                return String(value)
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&');
            };

            return this;

        }

        return new Helper();

    })();

    /* =====> INVOKE DEFAULT STYLE SETTINGS TO styles VAR <===== */
    var styles = (function () {
        function Styles() {
            var self = this;

            // Default Auto Styling - General
            this.default = {};
            this.default.StyleBox = {};
            this.default.MsgButton = {};
            this.default.MsgClose = {};
            this.default.MsgTitle = {};
            this.default.MsgText = {};
            this.default.MsgOverlay = {};
            this.default.StyleBox.boxShadow = "rgba(0, 0, 0, 1) 0px 0px 6px -1px, rgba(0,0,0,0.5) 8px 8px 15px";
            this.default.MsgButton.boxShadow = "rgba(50,50,50,0.3) -2px -2px 2px inset, rgba(255,255,255,0.5) 2px 2px 2px inset, rgba(0,0,0,0.1) -1px -1px 1px";
            this.default.MsgButton.textShadow = "0px -1px 0px rgba(000,000,000,0.2),0px 1px 0px rgba(255,255,255,.8)";
            this.default.MsgButton.backgroundColor = "hsl(+=0, +=0%, -=10%)";
            this.default.MsgButton.highColor = "hsl(+=0, +=0%, -=15%)";
            this.default.MsgButton.borderColor = "hsl(+=0, +=0%, -=15%)";
            this.default.MsgButton.color = "#6A6A6A";
            this.default.MsgClose.boxShadow = "rgba(50,50,50,0.3) -1px -1px 1px inset, rgba(255,255,255,0.5) 1px 1px 1px inset, rgba(0,0,0,0.5) 8px 0px 15px, rgba(0,0,0,0.5) -1px 0px 6px";
            this.default.MsgClose.textShadow = "0px -1px 0px rgba(000,000,000,0.2),0px 1px 0px rgba(255,255,255,.8)";
            this.default.MsgClose.backgroundColor = "hsl(+=0, +=0%, -=5%)";
            this.default.MsgClose.borderColor = "hsl(+=0, +=0%, -=10%)";
            this.default.MsgClose.color = "#6A6A6A";
            this.default.MsgTitle.color = "#000000";
            this.default.MsgText.color = "#000000";
            this.default.MsgOverlay.background = "#000000";

            // Dark Auto Styling - General
            this.darkDefault = {};
            this.darkDefault.StyleBox = {};
            this.darkDefault.MsgButton = {};
            this.darkDefault.MsgClose = {};
            this.darkDefault.MsgTitle = {};
            this.darkDefault.MsgText = {};
            this.darkDefault.MsgOverlay = {};
            this.darkDefault.StyleBox.backgroundColor = "#000000";
            this.darkDefault.StyleBox.borderColor = "#000000";
            this.darkDefault.MsgButton.boxShadow = "rgba(50,50,50,0.5) -2px -2px 2px inset, rgba(255,255,255,0.3) 2px 2px 2px inset, rgba(255,255,255,0.1) 1px 1px 1px";
            this.darkDefault.MsgButton.textShadow = "0px -1px 0px rgba(255,255,255,0.2),0px 1px 0px rgba(000,000,000,.8)";
            this.darkDefault.MsgButton.backgroundColor = "hsl(+=0, +=0%, +=15%)";
            this.darkDefault.MsgButton.highColor = "hsl(+=0, +=0%, +=20%)";
            this.darkDefault.MsgButton.borderColor = "hsl(+=0, +=0%, +=20%)";
            this.darkDefault.MsgButton.color = "#F6F6F6";
            this.darkDefault.MsgClose.boxShadow = "rgba(50,50,50,0.5) -1px -1px 1px 0px inset, rgba(255,255,255,0.3) 1px 1px 1px 0px inset, rgba(0,0,0,0.5) 8px 0px 15px, rgba(0,0,0,0.5) -1px 0px 6px 0px";
            this.darkDefault.MsgClose.textShadow = "0px -1px 0px rgba(255,255,255,0.2),0px 1px 0px rgba(000,000,000,.8)";
            this.darkDefault.MsgClose.backgroundColor = "hsl(+=0, +=0%, +=15%)";
            this.darkDefault.MsgClose.borderColor = "hsl(+=0, +=0%, +=20%)";
            this.darkDefault.MsgClose.color = "#F6F6F6";
            this.darkDefault.MsgTitle.color = "#ffffff";
            this.darkDefault.MsgText.color = "#ffffff";
            this.darkDefault.MsgOverlay.background = "#ffffff";

            // Dark Auto Styling - Header & Footer
            this.dark = {};
            this.dark.hdrColorHsl = {};
            this.dark.hdrSepHsl = {};
            this.dark.ftrColorHsl = {};
            this.dark.ftrSepHsl = {};
            this.dark.hdrColorHsl.MsgTop = {};
            this.dark.hdrSepHsl.MsgTop = {};
            this.dark.hdrSepHsl.MsgBody = {};
            this.dark.ftrColorHsl.MsgBottom = {};
            this.dark.ftrSepHsl.MsgBottom = {};
            this.dark.ftrSepHsl.MsgBody = {};
            this.dark.hdrColorHsl.MsgTop.backgroundColor = "hsl(+=0, +=0%, +=10%)";
            this.dark.hdrColorHsl.MsgTop.borderBottomColor = "hsl(+=0, +=0%, +=10%)";
            this.dark.hdrSepHsl.MsgTop.borderBottomColor = "hsl(+=0, +=0%, +=15%)";
            this.dark.ftrColorHsl.MsgBottom.backgroundColor = "hsl(+=0, +=0%, +=10%)";
            this.dark.ftrColorHsl.MsgBottom.borderTopColor = "hsl(+=0, +=0%, +=10%)";
            this.dark.ftrSepHsl.MsgBottom.borderTopColor = "hsl(+=0, +=0%, +=15%)";

            // Lite Auto Styling - Header & Footer
            this.lite = {};
            this.lite.hdrColorHsl = {};
            this.lite.hdrSepHsl = {};
            this.lite.ftrColorHsl = {};
            this.lite.ftrSepHsl = {};
            this.lite.hdrColorHsl.MsgTop = {};
            this.lite.hdrSepHsl.MsgTop = {};
            this.lite.hdrSepHsl.MsgBody = {};
            this.lite.ftrColorHsl.MsgBottom = {};
            this.lite.ftrSepHsl.MsgBottom = {};
            this.lite.ftrSepHsl.MsgBody = {};
            this.lite.hdrColorHsl.MsgTop.backgroundColor = "hsl(+=0, +=0%, -=5%)";
            this.lite.hdrColorHsl.MsgTop.borderBottomColor = "hsl(+=0, +=0%, -=5%)";
            this.lite.hdrSepHsl.MsgTop.borderBottomColor = "hsl(+=0, +=0%, -=10%)";
            this.lite.ftrColorHsl.MsgBottom.backgroundColor = "hsl(+=0, +=0%, -=5%)";
            this.lite.ftrColorHsl.MsgBottom.borderTopColor = "hsl(+=0, +=0%, -=5%)";
            this.lite.ftrSepHsl.MsgBottom.borderTopColor = "hsl(+=0, +=0%, -=10%)";

            // Default Auto Styling - Animation Hover Effects
            this.default.autostyle = {};
            this.default.autostyle.textColorButton = "#FFFFFF";
            this.default.autostyle.textColorClose = "#FFFFFF";
            this.default.autostyle.textShadowButton = "0px -1px 0px rgba(255,255,255,.6),0px 1px 0px rgba(000,000,000,0.2)";
            this.default.autostyle.textShadowClose = "0px -1px 0px rgba(255,255,255,.6),0px 1px 0px rgba(000,000,000,0.2)";
            this.default.autostyle.boxShadowButton = "rgba(50,50,50,0.3) -1px -1px 1px inset, rgba(255,255,255,0.5) 1px 1px 1px inset, rgba(0,0,0,0.1) -1px -1px 1px";
            this.default.autostyle.boxShadowClose = "rgba(50,50,50,0.0) -1px -1px 1px 0px inset, rgba(50,50,50,0.3) 1px 1px 1px 0px inset, rgba(0,0,0,0.5) 4px 0px 10px, rgba(0,0,0,0.0) -1px 0px 6px 0px";
            this.default.autostyle.highColorButton = "hsl(+=0, +=0%, -=15%)";
            this.default.autostyle.highColorClose = "hsl(+=0, +=0%, -=15%)";

            // Dark Auto Styling - Animation Hover Effects
            this.darkDefault.autostyle = {};
            this.darkDefault.autostyle.textColorButton = "#000000";
            this.darkDefault.autostyle.textColorClose = "#000000";
            this.darkDefault.autostyle.textShadowButton = "0px -1px 0px rgba(000,000,000,.6),0px 1px 0px rgba(255,255,255,0.2)";
            this.darkDefault.autostyle.textShadowClose = "0px -1px 0px rgba(000,000,000,.6),0px 1px 0px rgba(255,255,255,0.2)";
            this.darkDefault.autostyle.boxShadowButton = "rgba(50,50,50,0.5) -1px -1px 1px inset, rgba(255,255,255,0.3) 1px 1px 1px inset, rgba(255,255,255,0.1) 1px 1px 1px";
            this.darkDefault.autostyle.boxShadowClose = "rgba(50,50,50,0.0) -1px -1px 1px 0px inset, rgba(50,50,50,0.5) 1px 1px 1px 0px inset, rgba(0,0,0,0.5) 4px 0px 10px, rgba(0,0,0,0.0) -1px 0px 6px 0px";
            this.darkDefault.autostyle.highColorButton = "hsl(+=0, +=0%, +=20%)";
            this.darkDefault.autostyle.highColorClose = "hsl(+=0, +=0%, +=20%)";

            return this;
        }

        return new Styles();

    })();

    // Check to evaluate whether StyleBox exists in the global namespace - if not, assign window.StyleBox an object literal
}(StyleBox = StyleBox || {}));

console.log("StyleBox");
console.log(StyleBox);

console.log(window.navigator.userAgent);

