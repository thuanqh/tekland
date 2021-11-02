(function($) {

  'use strict';

  var App = {

    /**
     * Init
     */
    init: function() {
      $(document).ready(function() {
        /* Toggle */
        var toggle = $('.toggle'),
            headerMenu = $('.header-menu'),
            body = $('body');
        if(toggle.length && headerMenu.length) {
          toggle.unbind('click').bind('click', function (e) {
            body.toggleClass('show-menu');
            e.preventDefault();
          });
        }

        var headerAction = headerMenu.find('li a');
        if (headerAction.length) {
          headerAction.click(function () {
            body.removeClass('show-menu');
          });
        }

        var headerLogo = $('.header-logo');
        if (headerLogo.length) {
          headerLogo.click(function () {
            body.removeClass('show-menu');
          });
        }

        /* Dropdown */
        var dropdown = $('.dropdown');
        if(dropdown.length) {
          var dropdownHeader = dropdown.find('.dropdown-header'),
              dropdownBody = dropdown.find('.dropdown-body');
          if(dropdownHeader.length && dropdownBody.length) {
            dropdownHeader.unbind('click').bind('click', function (e) {
              e.preventDefault();
              var currentDropdown = $(e.target).closest('.dropdown');
              if($(window).width() < 992) {
                if(dropdown.not(currentDropdown).hasClass("active")) {
                  dropdown.not(currentDropdown).removeClass('active');
                  setTimeout(function() {
                    currentDropdown.toggleClass('active');
                  },600);
                } else {
                  dropdown.not(currentDropdown).removeClass('active');
                  currentDropdown.toggleClass('active');
                }
              }
            });
          }
        }

        $(document).bind('click', function (e) {
          if($(window).width() < 992) {
            if ($(e.target).closest('.dropdown').length == 0) {
              if (dropdown.hasClass('active')) {
                dropdown.removeClass('active');
              }
            }
          }
        });

        /* Slide */
        function getTransforms(translate3d){
          return {
            '-webkit-transform': translate3d,
            '-moz-transform': translate3d,
            '-ms-transform':translate3d,
            'transform': translate3d
          };
        }

        function scrollPosition(item) {
          var sectionTop = $(item).position().top,
              translate3d = 'translate3d(0px, -' + Math.round(sectionTop) + 'px, 0px)',
              fullpage = $('.fullpage');
          if(fullpage.length) {
            fullpage.css(getTransforms(translate3d));
          }
        }

        var slideButton = $('.slider-button-item'),
            sectionItem = $('.section');
        if(slideButton.length && sectionItem.length) {
          //Click button slider
          slideButton.unbind('click').bind('click', function (e) {
            e.preventDefault();
            var sectionActive = $(this).attr('href');
            if($(sectionActive).length) {
              slideButton.removeClass('active');
              sectionItem.removeClass('active');
              $(this).addClass('active');
              $(sectionActive).addClass('active');
              scrollPosition(sectionActive);
            }
          });

          //Click arrow
          var scrollArrow = $('.section-scrolldown a');
          if(scrollArrow.length) {
            scrollArrow.unbind('click').bind('click', function (e) {
              var currentSection = $(this).closest('.section'),
                  activeId = parseFloat(currentSection.attr('id')) + 1;
              if(currentSection.length) {
                slideButton.removeClass('active');
                sectionItem.removeClass('active');
                slideButton.each(function(){
                  if($(this).attr('href') =="#" + activeId) {
                    $(this).addClass('active');
                  }
                });
                $("#"+activeId).addClass('active');
                scrollPosition("#" + activeId);
              }
            });
          }

          // Mouse scroll
          var timer;
          /*$(document.body).on('DOMMouseScroll mousewheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(!$('body').hasClass('show-menu')) {
              clearTimeout(timer);
              timer = setTimeout(function () {
                if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                  //scroll down
                  var activeItem = $('.section.active'),
                      activeId = parseFloat(activeItem.attr('id')) + 1;
                  if (activeId < 7) {
                    activeItem.removeClass('active');
                    slideButton.removeClass('active');
                    slideButton.each(function () {
                      if ($(this).attr('href') == "#" + activeId) {
                        $(this).addClass('active');
                      }
                    });
                    $("#"+activeId).addClass('active');
                    scrollPosition("#" + activeId);
                  }
                }
                else {
                  var activeItem = $('.section.active'),
                      activeId = parseFloat(activeItem.attr('id')) - 1;
                  if (activeId > 0) {
                    activeItem.removeClass('active');
                    slideButton.removeClass('active');
                    slideButton.each(function () {
                      if ($(this).attr('href') == "#" + activeId) {
                        $(this).addClass('active');
                      }
                    });
                    $("#"+activeId).addClass('active');
                    scrollPosition("#" + activeId);
                  }
                }
              }, 200);
            }
            return false;
          });*/

          $(document.body).on('DOMMouseScroll mousewheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(timer);
            timer = setTimeout(function () {
              if (!$('body').hasClass('show-menu') && !body.hasClass("scrolling")) {
                if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                  //scroll down
                  var activeItem = $('.section.active'),
                      activeId = parseFloat(activeItem.attr('id')) + 1;
                  if (activeId < 6) {
                    body.addClass("scrolling");
                    activeItem.removeClass('active');
                    slideButton.removeClass('active');
                    slideButton.each(function () {
                      if ($(this).attr('href') == "#" + activeId) {
                        $(this).addClass('active');
                      }
                    });
                    $("#" + activeId).addClass('active');
                    scrollPosition("#" + activeId);
                    setTimeout(function () {
                      body.removeClass('scrolling');
                    }, 1000);

                  }
                }
                else {
                  var activeItem = $('.section.active'),
                      activeId = parseFloat(activeItem.attr('id')) - 1;
                  if (activeId > 0) {
                    body.addClass("scrolling");
                    activeItem.removeClass('active');
                    slideButton.removeClass('active');
                    slideButton.each(function () {
                      if ($(this).attr('href') == "#" + activeId) {
                        $(this).addClass('active');
                      }
                    });
                    $("#" + activeId).addClass('active');
                    scrollPosition("#" + activeId);
                    setTimeout(function () {
                      body.removeClass('scrolling');
                    }, 1000);
                  }
                }
              }
            },10);
            return false;
          });

          // Touch scroll mobile
          var lastY;
          $(document.body).on("touchstart", function(e) {
            lastY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
          });

          $(document.body).on("touchmove", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if(!$('body').hasClass('show-menu') && !body.hasClass("scrolling")) {
              var currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
              if (Math.abs(currentY - lastY) < 50) {
                return;
              } else {
                if (currentY < lastY) {
                  //scroll down
                  var activeItem = $('.section.active'),
                      activeId = parseFloat(activeItem.attr('id')) + 1;
                  if (activeId < 6) {
                    activeItem.removeClass('active');
                    slideButton.removeClass('active');
                    slideButton.each(function () {
                      if ($(this).attr('href') == "#" + activeId) {
                        $(this).addClass('active');
                      }
                    });
                    $("#" + activeId).addClass('active');
                    scrollPosition("#" + activeId);
                    body.addClass("scrolling");
                    setTimeout(function () {
                      body.removeClass('scrolling');
                    },300);
                  }
                }
                else {
                  var activeItem = $('.section.active'),
                      activeId = parseFloat(activeItem.attr('id')) - 1;
                  if (activeId > 0) {
                    if (activeId == "1") {
                      sectionItem.removeClass('first-active');
                    }
                    activeItem.removeClass('active');
                    slideButton.removeClass('active');
                    slideButton.each(function () {
                      if ($(this).attr('href') == "#" + activeId) {
                        $(this).addClass('active');
                      }
                    });
                    $("#" + activeId).addClass('active');
                    scrollPosition("#" + activeId);
                    body.addClass("scrolling");
                    setTimeout(function () {
                      body.removeClass('scrolling');
                    },300);
                  }

                }
                return false;
              }
            }
          });

          $(window).resize(function() {
            var activeItem = $('.section.active'),
                activeId = parseFloat(activeItem.attr('id'));
              scrollPosition("#" + activeId);
          });
        }

        var contactForm = $("#contact_form");
        if(contactForm.length) {
          $("#contact_form").submit(function(e) {
            e.preventDefault();
            var name = $('#username'),
                email = $('#email'),
                content = $('#content'),
                captcha = grecaptcha.getResponse(),
                nameVal, emailVal, contentVal, data = {};
            if(name.length && email.length && content.length) {
              data.name = name.val();
              data.email = email.val();
              data.content = content.val();
              if(captcha.length == 0)
              {
                document.getElementById('form-error').innerHTML="Vui lòng xác thực Captcha";
                return false;
              }
              else
              {
                var jqxhr = $.get("http://localhost:3000/_internal/users/sendMailLungVang?data="+JSON.stringify(data), function(res) {
                  if(typeof res.send !== "undefined" && res.send){
                    $('#contact_form').hide();
                    document.getElementById('form-message').innerHTML="Cảm ơn bạn đã liên hệ với chúng tôi!";

                  }else{
                      $('#form-success').hide();
                      document.getElementById('form-error').innerHTML="Gửi email lỗi.";
                  }
                },'json');
                jqxhr.fail(function() {
                  $('#form-success').hide();
                  document.getElementById('form-error').innerHTML="Gửi email lỗi!";
                });
              }
            }
          });
        }
      });
      App.feature();
    },

    /**
     * Feature
     */
    feature: function() {
    }

  };

  $(function() {
    App.init();
  });

})(jQuery);
