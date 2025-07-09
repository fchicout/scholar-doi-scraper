// A simple sleep helper function
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startScraping") {
    console.log("Background script received startScraping message.");
    runScrapingLoop(message.baseUrl, message.delays, message.numPages);
  }
});

async function runScrapingLoop(baseUrl, delays, numPages) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    console.error("No active tab found.");
    return;
  }

  for (let page = 0; page < numPages; page++) {
    const start = page * 10;
    const pageUrl = `${baseUrl}&start=${start}`;
    
    chrome.runtime.sendMessage({ action: "updateStatus", status: `Loading page ${page + 1} of ${numPages}...` });
    console.log(`Navigating to: ${pageUrl}`);

    await navigateAndLoad(tab.id, pageUrl);

    chrome.runtime.sendMessage({ action: "updateStatus", status: `Scraping page ${page + 1} of ${numPages}...` });
    const scrapeResult = await injectAndScrape(tab.id);
    
    // On the first page, if we get the total results, send it to the popup
    if (page === 0 && scrapeResult.totalResults) {
      chrome.runtime.sendMessage({ action: "updateTotalResults", count: scrapeResult.totalResults });
    }

    if (scrapeResult.foundDois && scrapeResult.foundDois.length > 0) {
      await saveDois(scrapeResult.foundDois, numPages, page);
    }

    // Apply delays
    const isLastPage = page === numPages - 1;
    if (!isLastPage) {
        if ((page + 1) % 10 === 0) {
            chrome.runtime.sendMessage({ action: "updateStatus", status: `Batch of 10 complete. Waiting ${delays.batch / 1000}s...` });
            await sleep(delays.batch);
        } else {
            chrome.runtime.sendMessage({ action: "updateStatus", status: `Page ${page + 1} scraped. Waiting ${delays.page / 1000}s...` });
            await sleep(delays.page);
        }
    }
  }
  
  chrome.runtime.sendMessage({ action: "updateStatus", status: `Scraping complete! Processed ${numPages} pages.`, refresh: true });
  console.log("Scraping loop finished.");
}

function navigateAndLoad(tabId, url) {
  return new Promise(resolve => {
    chrome.tabs.update(tabId, { url }, () => {
      const listener = (updatedTabId, changeInfo) => {
        if (updatedTabId === tabId && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    });
  });
}

function injectAndScrape(tabId) {
  return new Promise(resolve => {
    const listener = (message, sender) => {
      if (message.action === "scrapedData" && sender.tab.id === tabId) {
        chrome.runtime.onMessage.removeListener(listener);
        resolve(message.data);
      }
    };
    chrome.runtime.onMessage.addListener(listener);

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  });
}

async function saveDois(newDois, numPages, currentPage) {
  const { doiList = [] } = await chrome.storage.local.get('doiList');
  let newDoiCount = 0;
  for (const doi of newDois) {
    if (!doiList.includes(doi)) {
      doiList.push(doi);
      newDoiCount++;
    }
  }
  await chrome.storage.local.set({ doiList });
  console.log(`${newDoiCount} new DOIs saved. Total: ${doiList.length}`);
  chrome.runtime.sendMessage({ action: "updateStatus", status: `Page ${currentPage + 1}/${numPages}: Found ${newDoiCount} new DOIs. Total: ${doiList.length}`, refresh: true });
}
