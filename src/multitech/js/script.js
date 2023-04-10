$(document).ready(function(){

    //Modal

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Validate form

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Веедите как минимум {0} символа!")
                },
                phone: "Пожалуйста, введите свой телефон",
                email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильный формат почты"
                }
            }
        });
    }

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-9999");


    // Sending email
    $('form').submit(function(e) {
        e.preventDefault();                 //відмінити стандартну поведінку браузера

        if(!$(this).valid()) {
            return;                         //заборона відправки пустої форми
        }

        $.ajax({                            //технологія обміну данними без перезавантаження сторінки
            type: "POST",                   //відправка
            url: "mailer/smart.php",        //файл для роботи з сервером
            data: $(this).serialize()       //вказуємо яку інформацію відправляємо на сервер
        }).done(function() {                //обробка відповіді від сервера
            $(this).find("input").val("");  //очистити поля форми
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');     //оновити форму
        });
        return false;                       //повторити, якщо помилка
    });

    //   Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();

});