/**
* PHP Email Form Validation - v2.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
!(function($) {
  "use strict";

  $('form.php-email-form').submit(function(e) {
    e.preventDefault();
    
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    if ( $(this).data('recaptcha-site-key') ) {
      var recaptcha_site_key = $(this).data('recaptcha-site-key');
      grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha_site_key, {action: 'php_email_form_submit'}).then(function(token) {
          sendMail(this_form.serialize() + '&recaptcha-response=' + token,this_form);
        });
      });
    } else {
      sendMail(this_form.serialize(),this_form
      );
    }
    
    return true;
  });


  function sendMail(data,this_form){

    const sendData = data.split("&");
    const name=(sendData[0].split("=")[1]).replace('%20',' ');
    const from=(sendData[1].split("=")[1]).replace('%40','@');
    const subject=(sendData[3].split("=")[1]).replace('%20',' ');
    const mobile=sendData[2].split("=")[1];
    const message=(sendData[4].split("=")[1]).replace('%20',' ');
    let body=`${name} from ${subject} had contacted you from your website kindly revert them at ${from} or call them at ${mobile} Message :- ${message}`;
    Email.send({
      Host: "email-smtp.ap-south-1.amazonaws.com",
      Username: "",
      Password: "",
      To: "dmrpvt2000@gmail.com",
      From: "dmrpvt2000@gmail.com",
      Subject: "New Contact From Website",
      Body: body,
    }).then((message) => php_email_form_submit(message, this_form));
  }

  function php_email_form_submit(data,this_form) {
        if (data == "OK") {
          this_form.find(".loading").slideUp();
          this_form.find(".sent-message").slideDown();
          this_form.find("input:not(input[type=submit]), textarea").val("");
        } else {
          this_form.find(".loading").slideUp();
          if (data != "OK") {
             var error_msg = "Form submission failed!<br>";
             if (data.statusText || data.status) {
               error_msg += "Status:";
               if (data.statusText) {
                 error_msg += " " + data.statusText;
               }
               if (data.status) {
                 error_msg += " " + data.status;
               }
               error_msg += "<br>";
             }
             if (data.responseText) {
               error_msg += data.responseText;
             }
             this_form.find(".loading").slideUp();
             this_form.find(".error-message").slideDown().html(error_msg);
          
          }
         
        }
    
     

       
      
  }

})(jQuery);
