$(document).ready(function() {
  const charLength = 140;

  // Updates the character counter for the tweet form
  $("#tweet-text").on("input", function() {
    let textLength = $(this).val().length;
    const $form = $(this).closest("form");
    const $counter = $form.find(".counter");
    if (textLength > charLength) {
      $counter.addClass("negative-counter");
    } else {
      $counter.removeClass("negative-counter");
    }

    $counter.text(charLength - textLength);
  });

});