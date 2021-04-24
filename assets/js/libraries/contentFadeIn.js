const stepImg = document.querySelectorAll(".fade_in_top_image");
const stepTxt = document.querySelectorAll(".fade_in_top_text");
const expandedMedia = document.querySelectorAll(".expanded__media");
const expandedTitle = document.querySelectorAll(".expanded__title");
const expandedText = document.querySelectorAll(".expanded_text");
const screenshotMedia = document.querySelectorAll(".screenshot__media");
const screenshotTxt = document.querySelectorAll(".screenshot__text");

var Options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.85
};

var TextOptions= {
  root: null,
  rootMargin: '0px',
  threshold: 0.85
};

if($(window).width()<400){
  var Options = {
    root: null,
    rootMargin: '20px 0px 0px 0px',
    threshold: 0.45
  };
  var TextOptions= {
    root: null,
    rootMargin: '5px',
    threshold: 0.25
  };
}

//
const img = new IntersectionObserver(function(entries, afterHero){
  entries.forEach( entry => {
    if (!entry.isIntersecting) {
      return;
    }
    else {
      entry.target.classList.add("active__fade");
      img.unobserve(entry.target);
      console.log(entry.target);
    }
  });
},Options)
//
const txt = new IntersectionObserver(function(entries, afterHero){
  entries.forEach( entry => {
    if (!entry.isIntersecting) {
      return;
    }
    else {
      entry.target.classList.add("active_fade_txt");
      txt.unobserve(entry.target);
    }
  });
},TextOptions)
//
stepImg.forEach(stepImg => {
  img.observe(stepImg)
});
//
stepTxt.forEach(stepTxt => {
  txt.observe(stepTxt)
});
//
expandedMedia.forEach(expandedMedia => {
  img.observe(expandedMedia)
});
//
expandedTitle.forEach(expandedTitle => {
  txt.observe(expandedTitle)
});
//
expandedText.forEach(expandedText => {
  txt.observe(expandedText)
});
//
screenshotMedia.forEach(screenshotMedia => {
  img.observe(screenshotMedia)
});
//
screenshotTxt.forEach(screenshotTxt => {
  txt.observe(screenshotTxt)
});
