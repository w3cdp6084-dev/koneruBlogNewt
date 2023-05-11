window.addEventListener("load", function () {
  setTimeout(function() {
      document.querySelector(".drag").classList.add("off");
  }, 4000);
});

document.querySelector(".cover-content").addEventListener("touchstart", function () {
  document.querySelector(".drag").classList.add("off");
});

document.querySelector(".cover-content").addEventListener("click", function () {
  document.querySelector(".drag").classList.add("off");
});

document.querySelector(".nav_trigger").addEventListener("click", function(e){      
  e.preventDefault();
  document.querySelector("#navigation").classList.toggle('nav_active');
  document.querySelector(".nav_trigger").parentElement.classList.toggle('nav_active');
});

function cover_drag() {
  var cover_w = document.querySelector('.inner-content').clientWidth;

  var init_x = Math.floor(document.querySelector('.inner-content').offsetWidth * 0.5 - window.innerWidth * 0.5);
  var init_y = Math.floor(document.querySelector('.inner-content').offsetHeight * 0.5 - window.innerHeight * 0.5);
  document.querySelector('.js--cover').scrollLeft = init_x;
}

cover_drag();

function mousedragscrollable(element) {
  let isMouseDown = false;
  let startX, startY, scrollLeft, scrollTop;

  element.addEventListener('mousedown', function (e) {
      isMouseDown = true;
      startX = e.pageX - this.offsetLeft;
      startY = e.pageY - this.offsetTop;
      scrollLeft = this.scrollLeft;
      scrollTop = this.scrollTop;
  });

  element.addEventListener('mouseleave', function () {
      isMouseDown = false;
  });

  element.addEventListener('mouseup', function () {
      isMouseDown = false;
  });

  element.addEventListener('mousemove', function (e) {
      if(!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;
      const walkX = x - startX;
      const walkY = y - startY;
      this.scrollLeft = scrollLeft - walkX;
      this.scrollTop = scrollTop - walkY;
  });
}

mousedragscrollable(document.querySelector('.js--cover'));

window.addEventListener('load', adjustBodyHeight);
window.addEventListener('resize', adjustBodyHeight);

function adjustBodyHeight() {
  var w = window.innerWidth;
  var x = 768;
  if (w < x) {
      document.body.style.height = window.innerHeight + 'px';
  } else{
      document.body.style.height = '100vh';
  }
}
