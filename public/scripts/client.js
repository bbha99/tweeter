/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  <p>${tweetObj.content.text}</p>
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
  tweets.forEach(tweetData => {
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  });
}

$(document).ready(function() {

  $newTweet = $('form').submit(function (event) {
    event.preventDefault();
    const queryString = $(this).serialize();
    $.ajax('/tweets/', { method: 'POST' , data:queryString})
  });

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (res) {
      renderTweets(res);
    });
  }

  loadTweets();

});