# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/



do ->
  $(document).ready ->
    navbarHeight = $('nav').outerHeight()
    $('a.nav-link').click (event) ->
      event.preventDefault()
      history.pushState(null, null, event.target["href"]);
      target = this.hash
      $('html,body').animate { scrollTop: $(target).offset().top - navbarHeight }, 500
