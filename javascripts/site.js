'use strict';

document.addEventListener("DOMContentLoaded", function() {
  var projects = document.querySelectorAll('.list-inner-text');

  for (var i = 0; i < projects.length; i++) {
    projects[i].addEventListener('click', function(event) {
      hideAllImages(projects)
      event.currentTarget.parentElement.classList.add('active');
      event.currentTarget.parentElement.querySelectorAll('.project-details')[0].classList.remove('hide');
    });
  }
});

function hideAllImages(projects) {
  for (var i = 0; i < projects.length; i++) {
    if (projects) {
      projects[i].parentElement.classList.remove('active');
      projects[i].parentElement.querySelectorAll('.project-details')[0].classList.add('hide');
    }
  }
}

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
  if (!document.getElementsByClassName) {
    // IE8 support
    var getElementsByClassName = function(node, classname) {
      var a = [];
      var re = new RegExp('(^| )'+classname+'( |$)');
      var els = node.getElementsByTagName("*");
      for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
      return a;
    }
    var videos = getElementsByClassName(document.body,"youtube");
  } else {
    var videos = document.getElementsByClassName("youtube");
  }

  var nb_videos = videos.length;
  for (var i=0; i<nb_videos; i++) {
    // Based on the YouTube ID, we can easily find the thumbnail image
    videos[i].style.backgroundImage = 'url(/images/' + videos[i].getAttribute("data-name") + '_vid.jpg)';

    // Overlay the Play icon to make it look like a video player
    var play = document.createElement("div");
    play.setAttribute("class","play");
    videos[i].appendChild(play);

    videos[i].onclick = function() {
      // Create an iFrame with autoplay set to true
      var iframe = document.createElement("iframe");
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
      iframe.setAttribute("src",iframe_url);
      iframe.setAttribute("frameborder",'0');

      // Replace the YouTube thumbnail with YouTube Player
      this.parentNode.replaceChild(iframe, this);
    }
  }
});
