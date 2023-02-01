$(document).ready(function() {
  console.log("The document is ready");

  const textarea = document.getElementById("tweet-text");
  const charLength = 140;

  textarea.addEventListener("input", function() {
    let textLength = $(this).val().length;
    let counterNode = $(this).parent().children(".tweet-info").children(".counter");
    if (textLength > charLength) {
      counterNode.css({'color': 'red'});
    } else {
      counterNode.css({'color': 'black'});
    }

    counterNode.text(charLength - textLength);
  });

});