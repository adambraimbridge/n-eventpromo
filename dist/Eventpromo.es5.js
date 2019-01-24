'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@financial-times/x-engine');
var xInteraction = require('@financial-times/x-interaction');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var styles = {"cta-container":"Footer_cta-container__C5LkX","btn-block":"Footer_btn-block__3cuse","btn":"Footer_btn__3DpWY","o-typography--loading-sans":"Footer_o-typography--loading-sans__1L8h1","brand":"Footer_brand__2Hfgt","visually-hidden":"Footer_visually-hidden__2yVS2"};

var Footer = function Footer(_ref) {
  var url = _ref.url;
  return xEngine.h("div", {
    className: styles['cta-container']
  }, xEngine.h("div", {
    className: styles['btn-block']
  }, xEngine.h("a", {
    href: url,
    className: styles['btn'],
    "data-trackable": "event-promo"
  }, "Register now")), xEngine.h("div", {
    className: styles['brand']
  }, "Presented by", xEngine.h("span", {
    className: styles['visually-hidden']
  }, "FT live")));
};

var styles$1 = {"meta":"Meta_meta__3-7m8","o-typography--loading-sans":"Meta_o-typography--loading-sans__1iWp9"};

var Meta = function Meta(_ref) {
  var location = _ref.location,
      dates = _ref.dates;
  return xEngine.h("div", {
    className: styles$1.meta
  }, xEngine.h("p", null, location), xEngine.h("p", null, dates));
};

var styles$2 = {"block":"Details_block__14eq5","details":"Details_details__1C_NT","strapline":"Details_strapline__1w2yH","o-typography--loading-sans":"Details_o-typography--loading-sans__3B421","title":"Details_title__3bl5n","o-typography--loading-displayBold":"Details_o-typography--loading-displayBold__2IGEu"};

var Details = function Details(_ref) {
  var link = _ref.link,
      title = _ref.title,
      strapline = _ref.strapline,
      props = _objectWithoutProperties(_ref, ["link", "title", "strapline"]);

  return xEngine.h("div", {
    className: styles$2.block,
    "aria-labelledby": "details-header"
  }, xEngine.h("div", {
    id: "details-header",
    hidden: true
  }, "Event details and information"), xEngine.h("div", {
    className: styles$2.details
  }, xEngine.h("a", {
    href: link,
    className: styles$2.title,
    "data-trackable": "event-promo"
  }, title), xEngine.h(Meta, props), xEngine.h("div", {
    className: styles$2.strapline
  }, xEngine.h("p", null, strapline)), xEngine.h(Footer, {
    url: link
  })));
};

var styles$3 = {"img":"Image_img__1fhJX","fade-0":"Image_fade-0__2PGZn","fade-1":"Image_fade-1__PfqXo","fade":"Image_fade__v9XSe","fade-2":"Image_fade-2__1eKgV","paused":"Image_paused__1yDsJ"};

var Image = function Image(_ref) {
  var fadeIndex = _ref.fadeIndex,
      imageUrl = _ref.imageUrl,
      linkUrl = _ref.linkUrl,
      isPaused = _ref.isPaused;
  var baseSrc = "https://www.ft.com/__origami/service/image/v2/images/raw/".concat(imageUrl, "?source=next&amp;fit=cover&amp;compression=best&amp;");
  var imgSrc = "".concat(baseSrc, "width=340 340w,").concat(baseSrc, "width=400 740w");
  var classNames = "".concat(styles$3.img, " ").concat(styles$3['fade-' + fadeIndex]);

  if (isPaused) {
    classNames = classNames + ' ' + styles$3['paused'];
  }

  return xEngine.h("a", {
    href: linkUrl,
    "data-trackable": "event-promo",
    "aria-hidden": "true",
    tabIndex: "-1"
  }, xEngine.h("img", {
    className: classNames,
    srcSet: imgSrc,
    alt: "",
    sizes: "(max-width: 46.24em) 100vw, 45vw"
  }));
};

var styles$4 = {"img-block":"ImagesContainer_img-block__24OUD","pause-button":"ImagesContainer_pause-button__2YGze","pause-button--paused":"ImagesContainer_pause-button--paused__3tP7g"};

var withPauseActions = xInteraction.withActions(function () {
  return {
    togglePause: function togglePause() {
      return function (_ref) {
        var isPaused = _ref.isPaused;
        return {
          isPaused: !isPaused
        };
      };
    }
  };
});

var BaseImagesContainer = function BaseImagesContainer(_ref2) {
  var isPaused = _ref2.isPaused,
      togglePause = _ref2.actions.togglePause,
      images = _ref2.images,
      link = _ref2.link;
  var classNames = styles$4['pause-button'];

  if (isPaused) {
    classNames = classNames + ' ' + styles$4['pause-button--paused'];
  }

  return xEngine.h("div", {
    className: styles$4['img-block']
  }, xEngine.h("button", {
    className: classNames,
    "aria-label": "control animation",
    onClick: togglePause
  }), images.map(function (image, index) {
    return xEngine.h(Image, {
      key: index,
      linkUrl: link,
      imageUrl: image,
      fadeIndex: index,
      isPaused: isPaused
    });
  }));
};

var ImagesContainer = withPauseActions(BaseImagesContainer);

var styles$5 = {"eventpromo":"Eventpromo_eventpromo__2UtVQ"};

var Eventpromo = function Eventpromo(props) {
  return xEngine.h("div", {
    className: styles$5.eventpromo,
    "data-event-focus": "",
    "data-focus-concept": props.id
  }, xEngine.h(Details, props), xEngine.h(ImagesContainer, props));
};

exports.Eventpromo = Eventpromo;
