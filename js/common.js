$(function() {
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				var $svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: "xml",
					success: function (data) {
						var $svg = $(data).find('svg');
		
						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
		
						$svg = $svg.removeAttr('xmlns:a');
		
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
						}
		
						imgSvgArray[imgURL] = $svg[0].outerHTML;
		
						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on("DOMNodeInserted", function() {
		imgSvg();
	});

	// Анимации при скроле
	var COFF = 0.7; // Коэффициент смещения вьюпорта до элемента для начала анимации
	var vh = $(window).height(); // Высота вьюпорта

	// Вторая секция
	var $sect2 = $('.sect-2'); // Анимируемый элемент
	var sect2Top = $sect2.offset().top; // Расстояние от верха документа до эл-та
	var isSect2Anim = false; // Анимация уже была воспроизведена

	function checkSect2(st) {
		if( st >= sect2Top - (vh * COFF) ) {
			if( !isSect2Anim ) {
				$sect2.addClass('anim');
				isSect2Anim = true;
			}
		}
	}

	// Вторая секция
	var $sect3 = $('.sect-3'); // Анимируемый элемент
	var sect3Top = $sect3.offset().top; // Расстояние от верха документа до эл-та
	var isSect3Anim = false; // Анимация уже была воспроизведена

	function checkSect3(st) {
		if( st >= sect3Top - (vh * COFF) ) {
			if( !isSect3Anim ) {
				$sect3.addClass('anim');
				isSect3Anim = true;
			}
		}
	}

	// Кнопка на 3м экране
	var $s3Btn = $('.s3-anim__btn'); // Анимируемый элемент
	var s3BtnTop = $s3Btn.offset().top; // Расстояние от верха документа до эл-та
	var isS3BtnAnim = false; // Анимация уже была воспроизведена

	function checkS3Btn(st) {
		if( st >= s3BtnTop - (vh * COFF) ) {
			if( !isS3BtnAnim ) {
				$s3Btn.addClass('anim');
				isS3BtnAnim = true;
			}
		}
	}

	// Стрелки между 3м и 4м экраном
	var $s3Arrows = {
		1: $('.s3-arrow-anim__arrow.s3-arrow-anim__arrow_1'),
		2: $('.s3-arrow-anim__arrow.s3-arrow-anim__arrow_2'),
		3: $('.s3-arrow-anim__arrow.s3-arrow-anim__arrow_3'),
		4: $('.s3-arrow-anim__arrow.s3-arrow-anim__arrow_4')
	}; // Анимируемые элементы
	var s3ArrowTop = $s3Arrows[1].offset().top; // Расстояние от верха документа до эл-та
	var isS3ArrowAnim = false; // Анимация уже была воспроизведена

	function checkArrows(st) {
		if( st >= s3ArrowTop - (vh * COFF) ) {
			if( !isS3ArrowAnim ) {
				for( var id in $s3Arrows ) {
					$s3Arrows[id].addClass('anim');
				}
				isS3ArrowAnim = true;
			}
		}
	}

	// Галочка на 4м экране
	var $s4Btn = $('.s4-anim__btn'); // Анимируемый элемент
	var s4BtnTop = $s4Btn.offset().top; // Расстояние от верха документа до эл-та
	var isS4BtnAnim = false; // Анимация уже была воспроизведена

	function checkS4Btn(st) {
		if( st >= s4BtnTop - (vh * COFF) ) {
			if( !isS4BtnAnim ) {
				$s4Btn.addClass('anim');
				isS4BtnAnim = true;
			}
		}
	}

	// При загрузке страницы
	$(document).ready(function() {
		var st = $(window).scrollTop();

		checkSect2(st);
		checkSect3(st);
		checkS3Btn(st);
		checkArrows(st);
		checkS4Btn(st);
	});

	// При скроле
	$(window).on('scroll', function() {
		var st = $(this).scrollTop();

		checkSect2(st);
		checkSect3(st);
		checkS3Btn(st);
		checkArrows(st);
		checkS4Btn(st);
	});

});

