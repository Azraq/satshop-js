
  jQuery(document).ready(function ($) {
    var $tag_id = $('#so_listing_tabs_19'),
      $element = $tag_id,
      $extraslider = $('.wap-listing-tabs', $element),
      parent_active = $('.items-category-sell', $tag_id),
      total_product = parent_active.data('total'),
      tab_active = $('.ltabs-items-inner', parent_active),
      nb_column0 = 4,
      nb_column1 = 4,
      nb_column2 = 3,
      nb_column3 = 2,
      nb_column4 = 2;

    tab_active.on("initialized.owl.carousel2", function () {
      setTimeout(function () {
        $extraslider.parent().find('.loading-placeholder').hide();
      }, 1000);

    });

    tab_active.owlCarousel2({
      rtl: false,
      nav: true,
      dots: false,

      margin: 10,
      loop: true,
      autoplay: false,

      autoplayHoverPause: false,
      autoplayTimeout: 5000,
      autoplaySpeed: 1000,
      mouseDrag: true,
      touchDrag: true,
      navRewind: true,
      navText: ['', ''],
      rtl: false,
      responsive: {
        0: {
          items: nb_column4,
          nav: total_product <= nb_column4 ? false : ((true) ? true : false),
        },
        480: {
          items: nb_column3,
          nav: total_product <= nb_column3 ? false : ((true) ? true : false),
        },
        768: {
          items: nb_column2,
          nav: total_product <= nb_column2 ? false : ((true) ? true : false),
        },
        992: {
          items: nb_column1,
          nav: total_product <= nb_column1 ? false : ((true) ? true : false),
        },
        1200: {
          items: nb_column0,
          nav: total_product <= nb_column0 ? false : ((true) ? true : false),
        },
      }
    });


  });
