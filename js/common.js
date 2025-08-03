
function mediaClick() {
	var checkWidth = $(window).width();
	if (checkWidth < 1200) {
		// mobile menu
		$('.btn-burger').on('click', function (e) {
			e.preventDefault();
			$('.overlay').fadeToggle();
			$(this).toggleClass('active');
			$('.nav-menu').fadeToggle();
		});

		$('.overlay').on('click', function () {
			$('.btn-burger').removeClass('active');
			$('.nav-menu').fadeOut();
			$(this).fadeOut();
		});

		$('.btn-search-mobile').on('click', function (e) {
			e.preventDefault();
			$('.overlay').fadeToggle();
			$(this).toggleClass('active');
			$('.form-search-header').fadeToggle();
		});
	}

}

mediaClick();
$(window).resize(mediaClick);

// mobile menu end




$('[name="phone"]').mask('+7 (999) 999-99-99');

// accordeon
function accordeon() {
	var panel = $('.panel-accordeon');

	if (panel.hasClass('in')) {
		$('.in').find('.panel-accordeon__body').slideDown();
	}

	$('.panel-accordeon .panel-accordeon__head').on('click', function () {
		$(this).parent().toggleClass('in').find('.panel-accordeon__body').slideToggle();
	});
}

accordeon();

// search 
$(function () {
	$('.btn-table-search').on('click', function (e) {
		e.preventDefault();
		$(this).parents('.table-search-wrapper').find('.form-search').fadeIn();
	});

	$(window).on('load resize', function () {
		if ($(window).width() > 1200) {
			$(document).click(function (e) {
				var div = $(".table-search-wrapper");
				if (!div.is(e.target)
					&& div.has(e.target).length === 0) {
					$(this).find('.table-search-wrapper .form-search').fadeOut();
				}
			});
		}
	});


});


// dropdown menu
$(function () {
	$('.dropdown-toggle').click(function (e) {
		e.preventDefault();

		let pd = $(this).parents('.dropdown');
		$('.dropdown').not(pd).find('.dropdown-toggle').removeClass('active').next('.dropdown-menu').slideUp(200);
		$(this).toggleClass('active').next('.dropdown-menu').slideToggle();
	});

	$(document).click(function (e) {
		var target = e.target;
		if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-menu')) {
			$('.dropdown-menu').slideUp();
			$('.dropdown-toggle').removeClass('active');
		}
	});
});




// модальные окна (несколько)
$(function () {
	let overlay = $('.overlay'),
		open_modal = $('.open_modal'),
		close = $('.modal__close, .overlay'),
		modal = $('.modal__div');

	open_modal.on('click', function (event) {
		event.preventDefault();

		modal.css('display', 'none').animate({
			opacity: 0,
			top: '45%'
		}, 200);

		let div = $(this).attr('href');
		overlay.fadeIn(400,
			function () {
				$(div)
					.css('display', 'flex')
					.animate({
						opacity: 1,
						top: '50%'
					}, 200);
			});
	});

	close.on('click', function () {
		modal
			.animate({
				opacity: 0,
				top: '45%'
			}, 200,
				function () {
					$(this).css('display', 'none');
					overlay.fadeOut(400);
				}
			);
	});
});
//end

$('.collections-name').on('click', function () {
	$('.collections-poppup').fadeIn();
});

$('.btn-close-poppup').on('click', function (e) {
	e.preventDefault();
	$('.collections-poppup').fadeOut();
});


// datepicker
$.datepicker.setDefaults({
	closeText: 'Закрыть',
	prevText: '',
	currentText: 'Сегодня',
	monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
		'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
	dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
	dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
	dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	weekHeader: 'Не',
	dateFormat: 'dd.mm.yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''
});

(function ($) {
	function compareDates(startDate, endDate, format) {
		var temp, dateStart, dateEnd;
		try {
			dateStart = $.datepicker.parseDate(format, startDate);
			dateEnd = $.datepicker.parseDate(format, endDate);
			if (dateEnd < dateStart) {
				temp = startDate;
				startDate = endDate;
				endDate = temp;
			}
		} catch (ex) { }
		return { start: startDate, end: endDate };
	}

	$.fn.dateRangePicker = function (options) {
		options = $.extend(
			{
				changeMonth: false,
				changeYear: false,
				numberOfMonths: 1,
				rangeSeparator: " - ",
				useHiddenAltFields: false
			},
			options || {}
		);

		var myDateRangeTarget = $(this);
		var onSelect = options.onSelect || $.noop;
		var onClose = options.onClose || $.noop;
		var beforeShow = options.beforeShow || $.noop;
		var beforeShowDay = options.beforeShowDay;
		var lastDateRange;

		function storePreviousDateRange(dateText, dateFormat) {
			var start, end;
			dateText = dateText.split(options.rangeSeparator);
			if (dateText.length > 0) {
				start = $.datepicker.parseDate(dateFormat, dateText[0]);
				if (dateText.length > 1) {
					end = $.datepicker.parseDate(dateFormat, dateText[1]);
				}
				lastDateRange = { start: start, end: end };
			} else {
				lastDateRange = null;
			}
		}

		options.beforeShow = function (input, inst) {
			var dateFormat = myDateRangeTarget.datepicker("option", "dateFormat");
			storePreviousDateRange($(input).val(), dateFormat);
			beforeShow.apply(myDateRangeTarget, arguments);
		};

		options.beforeShowDay = function (date) {
			var out = [true, ""],
				extraOut;
			if (lastDateRange && lastDateRange.start <= date) {
				if (lastDateRange.end && date <= lastDateRange.end) {
					out[1] = "ui-datepicker-range";
				}
			}

			if (beforeShowDay) {
				extraOut = beforeShowDay.apply(myDateRangeTarget, arguments);
				out[0] = out[0] && extraOut[0];
				out[1] = out[1] + " " + extraOut[1];
				out[2] = extraOut[2];
			}
			return out;
		};

		options.onSelect = function (dateText, inst) {
			var textStart;
			if (!inst.rangeStart) {
				inst.inline = true;
				inst.rangeStart = dateText;
			} else {
				inst.inline = false;
				textStart = inst.rangeStart;
				if (textStart !== dateText) {
					var dateFormat = myDateRangeTarget.datepicker("option", "dateFormat");
					var dateRange = compareDates(textStart, dateText, dateFormat);
					myDateRangeTarget.val(
						dateRange.start + options.rangeSeparator + dateRange.end
					);
					inst.rangeStart = null;
					if (options.useHiddenAltFields) {
						var myToField = myDateRangeTarget.attr("data-to-field");
						var myFromField = myDateRangeTarget.attr("data-from-field");
						$("#" + myFromField).val(dateRange.start);
						$("#" + myToField).val(dateRange.end);
					}
				}
			}
			onSelect.apply(myDateRangeTarget, arguments);
		};

		options.onClose = function (dateText, inst) {
			inst.rangeStart = null;
			inst.inline = false;
			onClose.apply(myDateRangeTarget, arguments);
		};

		return this.each(function () {
			if (myDateRangeTarget.is("input")) {
				myDateRangeTarget.datepicker(options);
			}
			myDateRangeTarget.wrap('<div class="dateRangeWrapper"></div>');
		});
	};
})(jQuery);

$(document).ready(function () {
	$(".datepicker-2").dateRangePicker({
		showOn: "focus",
		rangeSeparator: " - ",
		dateFormat: "dd.mm.yy",
		useHiddenAltFields: true,
		constrainInput: true
	});

	$(".datepicker-2-1").dateRangePicker({
		showOn: "focus",
		rangeSeparator: " - ",
		dateFormat: "dd.mm.yy",
		useHiddenAltFields: true,
		constrainInput: true
	});

	$(".datepicker-2-2").datepicker({
		showOn: "focus",
		// rangeSeparator: " - ",
		dateFormat: "dd.mm.yy",
		useHiddenAltFields: true,
		constrainInput: true
	});
});


// file input
$.fileup({
	url: window.location.pathname + window.location.search,
	inputID: 'upload-demo',
	queueID: 'upload-demo-queue',
	dropzoneID: '',
	files: [],
	fieldName: 'filedata',
	extraFields: {},
	sizeLimit: 0,
	filesLimit: 0,
	method: 'post',
	// timeout: null,
	autostart: false,
});

// tabs


$(document).ready(function ($) {
	$('.tabs__caption li a').click(function (e) {
		e.preventDefault();
	});
	$('.tabs__caption li').click(function () {
		$('.tabs__caption li').removeClass('active');
		$(this).addClass('active').closest('.tabs').find('.tabs__content').removeClass('active');

		var selectTab = $(this).find('a').attr("href");

		$(selectTab).addClass('active');
	});
});

$(".product-image-min").click(function (e) {
	e.preventDefault();
	var id = $(this).attr('data-tab'),
		content = $('.product-image-max__img[data-tab="' + id + '"]');

	$('.product-image-min.active').removeClass('active'); // 1
	$(this).addClass('active'); // 2

	$('.product-image-max__img.active').removeClass('active'); // 3
	content.addClass('active'); // 4
});

// slick slider
$('.autographs-slider').slick({
	variableWidth: true,
	slidesToShow: 1,
	infinite: false,
	arrows: true,
	infinite: true,
	prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-left"></use></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-right"></use></svg></button>',
	dots: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				variableWidth: false,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				variableWidth: false,
				arrows: false
			}
		}
	]
});


// theme click
$('.btn-theme').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass('click');
	$('body').toggleClass('dark-theme');
});



// animate slider
$('.tabbar-link__burger').on('click', function (e) {
	e.preventDefault();
	$('.nav-menu-mobile').fadeToggle();
});

$('.nav-menu-mobile:not(.nav-menu-mobile__wrapper)').on('click', function () {
	$('.nav-menu-mobile').fadeOut();
});

// animate text scroll
$(function () {
  const $words = $('.scroll-text span');
  const total = $words.length;
  const headerHeight = $('header').outerHeight();

  $(window).on('scroll', function () {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const $block = $('.scroll-text');

    const blockTop = $block.offset().top;

    // Начало анимации — когда верх блока появится ниже нижней границы окна
    const startScroll = blockTop - windowHeight;

    // Конец анимации — когда верх блока дойдёт до верхней границы окна минус высота header
    const endScroll = blockTop - headerHeight - 100;

    // Вычисляем прогресс (от 0 до 1) в этом интервале
    const progress = (scrollTop - startScroll) / (endScroll - startScroll);
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    const currentIndex = Math.floor(clampedProgress * total);

    $words.each(function (index) {
      if (index <= currentIndex) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
});
