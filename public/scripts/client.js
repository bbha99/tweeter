/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const $tweetImg = $("<img>").text(tweetObj.user.avatars).text();
// const $tweetHeader = $("<h3>").text(tweetObj.user.name).text();
// const $tweetText = $("<p>").text(tweetObj.content.text).text();
// const $tweetHandle = $("<h3>").text(tweetObj.user.handle).text();
// const $tweetTime = $("<p>").text(timeago.format(tweetObj.created_at)).text();

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let i = tweets.length - 1; i >= 0; i--) {
    const tweetData = tweets[i];
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  }
}

// Events occuring after page has finished loading
$(document).ready(function() {
  const maxCharacterLength = 140;
  $newTweet = $('form').submit(function (event) {
    event.preventDefault();

    const queryString = $(this).serialize();
    const inputText = $(this).children("#tweet-text").val();

    if (inputText === "" || inputText === null) {
      alert("No tweet description has been entered.")
    } else if(inputText.length > maxCharacterLength) {
      alert("maximum message length exceeded.")
    } else {
      this.reset();
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

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (res) {
      renderTweets(res);
    });
  }

  loadTweets();

});