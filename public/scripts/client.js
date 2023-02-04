// Client Side Javascript

// Creates the tweet post object
const createTweetElement = function(tweetObj) {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="tweet-header">
        <img src="${tweetObj.user.avatars}" alt="face sketch">
        <h3>${tweetObj.user.name}</h3>
      </div>
      <h3>${tweetObj.user.handle}</h3>
    </header>
    <p>${escapeText(tweetObj.content.text)}</p>
    <footer class="tweet-footer">
      <p>${timeago.format(tweetObj.created_at)}</p>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
}

// Displays all the tweet post
const renderTweets = function(tweets) {
  // takes return value and appends it to the tweets container
  for (let i = tweets.length - 1; i >= 0; i--) {
    const tweetData = tweets[i];
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  }
}

// Escapes text to prevent XSS
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Events occuring after page has finished loading
$(document).ready(function() {
  const maxCharacterLength = 140;
  $newTweet = $('form').on('submit', function (event) {
    event.preventDefault();

    const queryString = $(this).serialize();
    const inputText = $(this).children("#tweet-text").val();

    // Error: No input in tweet form
    if (inputText === "" || inputText === null) {
      const errorText = "Please enter a description";
      $("#error").text(errorText);
      $("#error").slideDown();
    
      // Error: Input is over character limit
    } else if(inputText.length > maxCharacterLength) {
      const errorText = "maximum message length exceeded.";
      $("#error").text(errorText);
      $("#error").slideDown();

      // Post and retrieve newly created post
    } else {
      $("#error").slideUp();
      this.reset();
      $(this).children(".tweet-info").children(".counter").text(140);
      $.ajax('/tweets/', { method: 'POST' , data:queryString})
      .then(function () {
        $.ajax('/tweets/', { method: 'GET' })
        .then(function (res) {
          const $tweet = createTweetElement(res[res.length-1]);
          $('#tweets-container').prepend($tweet);
        });
      });
    }
  });

  // Loads all post
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (res) {
      renderTweets(res);
    });
  }

  loadTweets();

  // Displays and hides new tweet form on click
  $(".open-form-button").click(function() {
    if (!$(".new-tweet").is(":visible")) {
      $(".new-tweet").slideDown("normal", function() {
        $("#tweet-text").focus();
      });
    } else {
      $(".new-tweet").slideUp("normal", function() {
        $(".counter").removeClass("negative-counter");
        $("#tweet-text").val("");
        $("#error").text("");
        $(".counter").text(140);
    });
    }
  });

});