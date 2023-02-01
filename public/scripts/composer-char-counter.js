$(document).ready(function() {
  console.log("The document is ready");

  const textarea = document.getElementById("tweet-text");
  const charLength = 140;

  // Updates the character counter for the tweet form
  textarea.addEventListener("input", function() {
    let textLength = $(this).val().length;
    let counterNode = $(this).parent().children(".tweet-info").children(".counter");
    if (textLength > charLength) {
      counterNode.addClass("negative-counter");
    } else {
      counterNode.removeClass("negative-counter");
    }

    counterNode.text(charLength - textLength);
  });

});