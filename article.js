$('select[name=\'recurring_id\'], input[name="quantity"]').change(function () {
  $.ajax({
    url: 'index.php?route=product/product/getRecurringDescription',
    type: 'post',
    data: $('input[name=\'product_id\'], input[name=\'quantity\'], select[name=\'recurring_id\']'),
    dataType: 'json',
    beforeSend: function () {
      $('#recurring-description').html('');
    },
    success: function (json) {
      $('.alert, .text-danger').remove();

      if (json['success']) {
        $('#recurring-description').html(json['success']);
      }
    }
  });
});
$('#button-cart').on('click', function () {
  $.ajax({
    url: 'index.php?route=extension/soconfig/cart/add',
    type: 'post',
    data: $(
      '#product input[type=\'text\'], #product input[type=\'hidden\'], #product input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, #product select, #product textarea'
    ),
    dataType: 'json',
    beforeSend: function () {
      $('#button-cart').button('loading');
    },
    complete: function () {
      $('#button-cart').button('reset');
    },
    success: function (json) {
      $('.alert, .text-danger').remove();
      $('.form-group').removeClass('has-error');

      if (json['error']) {
        if (json['error']['option']) {
          for (i in json['error']['option']) {
            var element = $('#input-option' + i.replace('_', '-'));

            if (element.parent().hasClass('input-group')) {
              element.parent().after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
            } else {
              element.after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
            }
          }
        }

        if (json['error']['recurring']) {
          $('select[name=\'recurring_id\']').after('<div class="text-danger">' + json['error']['recurring'] +
            '</div>');
        }

        // Highlight any found errors
        $('.text-danger').parent().addClass('has-error');
      }

      if (json['success']) {
        addProductNotice(json['title'], json['thumb'], json['success'], 'success');
        // Need to set timeout otherwise it wont update the total
        setTimeout(function () {
          $('#cart  .total-shopping-cart').html(json['total']);
          $('.text-danger').remove();
        }, 100);
        $('#cart > ul').load('index1e1c.html?route=common/cart/info%20ul%20li');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
    }
  });
});

$('.date').datetimepicker({
  pickTime: false
});

$('.datetime').datetimepicker({
  pickDate: true,
  pickTime: true
});

$('.time').datetimepicker({
  pickDate: false
});

$('button[id^=\'button-upload\']').on('click', function () {
  var node = this;

  $('#form-upload').remove();

  $('body').prepend(
    '<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>'
  );

  $('#form-upload input[name=\'file\']').trigger('click');
  if (typeof timer != 'undefined') {
    clearInterval(timer);
  }
  timer = setInterval(function () {
    if ($('#form-upload input[name=\'file\']').val() != '') {
      clearInterval(timer);

      $.ajax({
        url: 'index.php?route=tool/upload',
        type: 'post',
        dataType: 'json',
        data: new FormData($('#form-upload')[0]),
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
          $(node).button('loading');
        },
        complete: function () {
          $(node).button('reset');
        },
        success: function (json) {
          $('.text-danger').remove();

          if (json['error']) {
            $(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
          }

          if (json['success']) {
            alert(json['success']);

            $(node).parent().find('input').attr('value', json['code']);
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
      });
    }
  }, 500);
});
$('#review').delegate('.pagination a', 'click', function (e) {
  e.preventDefault();
  $('#review').fadeOut('slow');
  $('#review').load(this.href);
  $('#review').fadeIn('slow');
});

$('#review').load('index7230.html?route=product/product/review&amp;product_id=76');

$('#button-review').on('click', function () {
  $.ajax({
    url: 'index.php?route=product/product/write&product_id=76',
    type: 'post',
    dataType: 'json',
    data: 'name=' + encodeURIComponent($('input[name=\'name\']').val()) + '&text=' + encodeURIComponent($(
      'textarea[name=\'text\']').val()) + '&rating=' + encodeURIComponent($('input[name=\'rating\']:checked').val() ?
      $('input[name=\'rating\']:checked').val() : ''),
    beforeSend: function () {
      $('#button-review').button('loading');
    },
    complete: function () {
      $('#button-review').button('reset');
    },
    success: function (json) {
      $('.alert-success, .alert-danger').remove();

      if (json['error']) {
        $('#review').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json[
          'error'] + '</div>');
      }

      if (json['success']) {
        $('#review').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] +
          '</div>');

        $('input[name=\'name\']').val('');
        $('textarea[name=\'text\']').val('');
        $('input[name=\'rating\']:checked').prop('checked', false);
      }
    }
  });
});



$(document).ready(function () {
  $('.product-options li.radio').click(function () {
    $(this).addClass(function () {
      if ($(this).hasClass("active")) return "";
      return "active";
    });
    $(this).siblings("li").removeClass("active");
    $(this).parent().find('.selected-option').html('<span class="label label-success">' + $(this).find('img').data(
      'original-title') + '</span>');
  })

  if (!$('.slider').hasClass('slick-initialized')) {
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      slideMargin: 10,
      arrows: false,
      infinite: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      slideMargin: 10,
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,

    });
  }
});

var ajax_price = function () {
  $.ajax({
    type: 'POST',
    url: 'index.php?route=extension/soconfig/liveprice/index',
    data: $(
      '.product-info input[type=\'text\'], .product-info input[type=\'hidden\'], .product-info input[type=\'radio\']:checked, .product-info input[type=\'checkbox\']:checked, .product-info select, .product-info textarea'
    ),
    dataType: 'json',
    success: function (json) {
      if (json.success) {
        change_price('#price-special', json.new_price.special);
        change_price('#price-tax', json.new_price.tax);
        change_price('#price-old', json.new_price.price);
      }
    }
  });
}

var change_price = function (id, new_price) {
  $(id).html(new_price);
}
$(
  '.product-info input[type=\'text\'], .product-info input[type=\'hidden\'], .product-info input[type=\'radio\'], .product-info input[type=\'checkbox\'], .product-info select, .product-info textarea, .product-info input[name=\'quantity\']'
).on('change', function () {
  ajax_price();
});
