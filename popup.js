document.addEventListener('DOMContentLoaded', function() {
  const scrapeForm = document.getElementById('scrapeForm');
  const showDoiBtn = document.getElementById('showDoiBtn');
  const clearDoiBtn = document.getElementById('clearDoiBtn');
  const doiListArea = document.getElementById('doiList');
  const statusDiv = document.getElementById('status');
  const resultsContainer = document.getElementById('results-count-container');
  const totalResultsSpan = document.getElementById('totalResults');

  function refreshDoiList() {
    chrome.storage.local.get(['doiList'], (result) => {
      const dois = result.doiList || [];
      doiListArea.value = dois.join('\n');
    });
  }

  refreshDoiList();

  scrapeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const query = document.getElementById('query').value;
    const startYear = document.getElementById('startYear').value;
    const endYear = document.getElementById('endYear').value;
    const numPages = document.getElementById('numPages').value;
    const pageDelay = document.getElementById('pageDelay').value;
    const batchDelay = document.getElementById('batchDelay').value;

    let baseUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
    if (startYear) baseUrl += `&as_ylo=${startYear}`;
    if (endYear) baseUrl += `&as_yhi=${endYear}`;

    resultsContainer.classList.add('hidden'); // Hide previous results
    statusDiv.textContent = 'Starting scrape...';
    
    chrome.runtime.sendMessage({ 
      action: "startScraping", 
      baseUrl: baseUrl,
      numPages: parseInt(numPages, 10),
      delays: {
        page: parseInt(pageDelay, 10) * 1000, // Convert to ms
        batch: parseInt(batchDelay, 10) * 1000 // Convert to ms
      }
    });
  });

  showDoiBtn.addEventListener('click', refreshDoiList);

  clearDoiBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all saved DOIs?')) {
      chrome.storage.local.remove('doiList', () => {
        refreshDoiList();
        statusDiv.textContent = 'All DOIs have been cleared.';
        resultsContainer.classList.add('hidden');
      });
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateStatus") {
      statusDiv.textContent = message.status;
      if (message.refresh) {
        refreshDoiList();
      }
    } else if (message.action === "updateTotalResults") {
      totalResultsSpan.textContent = message.count;
      resultsContainer.classList.remove('hidden');
    }
  });
});
