var $showGallery = $('.show-gallery'),
    $hideGallery = $('.hide-gallery'),
    $galleryOverlay = $('#gallery');


function showGalleryHandler() {

    var $this = $(this),
        $gallery = getGallery($this.data('slug'));

    $gallery.siblings().hide();
    $gallery.show();
    $galleryOverlay.show();
}


function hideGalleryHandler() {

    var $this = $(this);

    $galleryOverlay.children().hide();
    $galleryOverlay.hide();
}


function sendMailHandler(form) {

    var $form = $(form),
        backend = $form.attr('action'),
        payload = $form.serialize(),
        $message = $('#contact-response'),
        $request = $.ajax({
            type: "POST",
            url: backend,
            data: payload
        });

    $request
        .done(function(response){
            $message.html('done');
        })
        .fail(function(response){
            $message.html('failed');
        })
        .success(function(response){
            $message.html('success');
        });

}


function getGallery(slug) {

    return $('#gallery-'+slug);
}


function setContactForm() {

    // config for form validation
    $('form').validate({
        rules: {
            email: {
                minlength: 3,
                maxlength: 30,
                required: true
            },
            name: {
                minlength: 3,
                maxlength: 30,
                required: true
            }
        },
        highlight: function(element) {
            $(element).removeClass('naked').addClass('form-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('form-error').addClass('naked');
        },
        submitHandler: sendMailHandler,
        errorPlacement: function(error, element) {
            // do nothing: we don't want error messages
        }
    });
}


function bootstrapUI() {
    // what we need to get started
    setContactForm();
}


$showGallery.on('click', showGalleryHandler);
$hideGallery.on('click', hideGalleryHandler);

bootstrapUI();
