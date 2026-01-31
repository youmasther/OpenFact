$(document).ready(() => {
  let rem = parseInt($("html").css("font-size"), 10);

  let buttonContainer = $(".button-container");
  let buttonMenu = $(".button-menu");
  let sendButton = $(".send-button");

  let buttonMenuWidth = buttonMenu.width();
  let buttonMenuHeight = buttonMenu.height();

  let buttonContainerWidth = buttonContainer.width();
  let buttonContainerHeight = buttonContainer.height();

  //after getting the width and height of the opened menu, set visibility to visible
  buttonMenu.css({
    visibility: "visible",
  });

  let menuOpenDuration = 1800 + (buttonMenu.find("li").length - 1) * 100;

  let menuTimeline = anime
    .timeline({})
    .add(
      {
        targets: ".button-menu",
        width: [buttonContainerWidth - 2 + "px", buttonMenuWidth + "px"],
        height: [buttonContainerHeight - 2 + "px", buttonMenuHeight + "px"],
        padding: "1.2rem",
        bottom: [0, "-1rem"],
        borderRadius: [buttonContainerWidth / 2 / rem + "rem", "1rem"],
        boxShadow: [
          "8px 8px 40px -12px rgba(0, 0, 0, 0)",
          "8px 8px 40px -12px rgba(0, 0, 0, 1)",
        ],
        easing: "easeInOutQuart",
        duration: 1600,
      },
      0
    )
    .add(
      {
        targets: ".button-menu li span",
        translateY: ["200%", 0],
        opacity: 1,
        easing: "easeInOutQuart",
        duration: 900,
        delay: function (el, i, l) {
          return i * 100;
        },
      },
      900
    )
    .add(
      {
        targets: ".path, .line",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutQuad",
        duration: 600,
        delay: function (el, i) {
          return i * 50;
        },
      },
      900
    )
    .add(
      {
        targets: ".send-button",
        bottom: -(buttonContainerHeight + 2 * rem),
        left: buttonMenuWidth / 2 - buttonContainerWidth / 2 + 1 * rem,
        easing: "easeInOutQuart",
        duration: 1600,
      },
      0
    )
    .add(
      {
        targets: ".send-button .arrow-icon",
        translateX: buttonContainerWidth,
        translateY: -buttonContainerWidth,
        easing: "easeInOutQuart",
        duration: 1600,
      },
      0
    )
    .add(
      {
        targets: ".send-button .plus-icon",
        width: [0, "30%"],
        rotate: ["-180deg", "45deg"],
        easing: "easeOutQuart",
        duration: 900,
      },
      600
    )
    .add(
      {
        targets: ".button-menu",
        width: buttonContainerWidth - 2 + "px",
        height: buttonContainerHeight - 2 + "px",
        padding: 0,
        bottom: 0,
        borderRadius: buttonContainerWidth / 2 / rem + "rem",
        boxShadow: [
          "8px 8px 40px -12px rgba(0, 0, 0, 1)",
          "8px 8px 40px -12px rgba(0, 0, 0, 0)",
        ],
        easing: "easeInOutQuart",
        duration: 1600,
      },
      menuOpenDuration
    )
    .add(
      {
        targets: ".button-menu li span, .button-menu li svg",
        opacity: [1, 0],
        easing: "easeInOutQuart",
        duration: 450,
      },
      menuOpenDuration
    )
    .add(
      {
        targets: ".send-button",
        bottom: 0,
        left: 0,
        easing: "easeInOutQuart",
        duration: 1600,
      },
      menuOpenDuration
    )
    .add(
      {
        targets: ".send-button .arrow-icon",
        translateX: [-buttonContainerWidth + "px", 0],
        translateY: [buttonContainerWidth + "px", 0],
        easing: "easeInOutQuart",
        duration: 1600,
      },
      menuOpenDuration
    )
    .add(
      {
        targets: ".send-button .plus-icon",
        width: ["30%", 0],
        rotate: ["45deg", "-180deg"],
        easing: "easeInOutQuart",
        duration: 1600,
      },
      menuOpenDuration
    );

  setTimeout(() => {
    buttonContainer.removeClass("play");
  }, menuTimeline.duration);

  let menuTimelineDuration = menuTimeline.duration;
  let menuCloseDuration = menuTimelineDuration - menuOpenDuration;

  let animationControl = {
    openAnimationEnd: 0,
    closeAnimationEnd: menuOpenDuration,
  };

  let openMenuAnimationControl = anime({
    targets: animationControl,
    autoplay: false,
    openAnimationEnd: 2100,
    easing: "linear",
    duration: menuOpenDuration,
    update: function (anim) {
      menuTimeline.seek(animationControl.openAnimationEnd);
    },
    complete: function (anim) {
      buttonContainer.removeClass("play");
    },
  });

  let closeMenuAnimationControl = anime({
    targets: animationControl,
    autoplay: false,
    closeAnimationEnd: menuTimelineDuration,
    easing: "linear",
    duration: menuCloseDuration,
    update: function (anim) {
      menuTimeline.seek(animationControl.closeAnimationEnd);
    },
    complete: function (anim) {
      buttonContainer.removeClass("play");
    },
  });

  sendButton.on("click", () => {
    if (!buttonContainer.hasClass("play")) {
      if (!buttonMenu.hasClass("open")) {
        openMenuAnimationControl.play();
        buttonContainer.addClass("play");
        buttonMenu.addClass("open");
      } else {
        closeMenuAnimationControl.play();
        buttonMenu.removeClass("open");
        buttonContainer.addClass("play");
      }
    }
  });
});
