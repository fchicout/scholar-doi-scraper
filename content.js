// This script is injected on demand by the background script.

console.log("Content script injected and running.");

async function findAndSendData() {
  const results = document.querySelectorAll('h3.gs_rt a');
  const foundDois = [];

  // 1. Scrape for DOIs
  if (results.length > 0) {
    for (const result of results) {
      let rawTitle = result.innerText;
      let cleanedTitle = rawTitle.replace(/\[(PDF|HTML)\]/gi, '').trim();

      if (!cleanedTitle) continue;

      const encodedTitle = encodeURIComponent(cleanedTitle);
      const apiUrl = `https://api.crossref.org/works?query.title=${encodedTitle}&select=title,DOI&rows=1`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const doi = data.message?.items?.[0]?.DOI;

        if (doi) {
          foundDois.push(doi);
        }
      } catch (error) {
        console.error(`Error fetching CrossRef data for "${cleanedTitle}":`, error);
      }
    }
  }

  // 2. Find the total number of results for the query
  let totalResults = null;
  const resultsCountElement = document.querySelector('#gs_ab_md .gs_ab_mdw');
  if (resultsCountElement) {
    // Example text: "About 1,480,000 results"
    const match = resultsCountElement.textContent.match(/[\d,]+/);
    if (match) {
      totalResults = match[0];
    }
  }

  // 3. Send all collected data back to the background script
  console.log("Sending data to background script:", { foundDois, totalResults });
  chrome.runtime.sendMessage({
    action: "scrapedData",
    data: {
      foundDois: foundDois,
      totalResults: totalResults
    }
  });
}

findAndSendData();
