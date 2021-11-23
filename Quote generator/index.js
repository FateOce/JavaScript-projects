const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show new quote
function newQuote(){
    loading();
    // To pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
     (!quote.author) ? authorText.textContent = 'Unknown' :
        authorText.textContent = quote.author;
    //  Check quote length to determine styling
    (quote.text.length > 120) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    // Set quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
       const response = await fetch(apiUrl) ;
       apiQuotes = await response.json();
      newQuote();
    }
    catch (error){
        //Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//  Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load 
getQuotes();