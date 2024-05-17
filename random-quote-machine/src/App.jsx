/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure this is the correct path to your CSS file

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

const QuoteApp = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [color, setColor] = useState('#16a085');

  useEffect(() => {
    fetchQuotes().then(() => getQuote());
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      const data = await response.json();
      setQuotesData(data.quotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const getRandomQuote = () => {
    return quotesData[
      Math.floor(Math.random() * quotesData.length)
    ];
  };

  const getQuote = () => {
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);

    // Update tweet and tumblr links
    const tweetLink = document.getElementById('tweet-quote');
    if (tweetLink) {
      tweetLink.href =
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author);
    }

    const tumblrLink = document.getElementById('tumblr-quote');
    if (tumblrLink) {
      tumblrLink.href =
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(randomQuote.author) +
        '&content=' +
        encodeURIComponent(randomQuote.quote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
    document.body.style.color = color;
  }, [color]);

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div className="quote-text">
          <span id="text"><i className="fa fa-quote-left"></i> {currentQuote}</span>
        </div>
        <div className="quote-author"><span id="author">- {currentAuthor}</span></div>
        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_top"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
          >
            <i className="fa fa-tumblr"></i>
          </a>
          <button
            className="button"
            id="new-quote"
            onClick={getQuote}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteApp;

