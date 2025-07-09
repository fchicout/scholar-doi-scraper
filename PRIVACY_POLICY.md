# Privacy Policy for Scholar DOI Scraper
**Last Updated**: July 9, 2025

## 1. Our Commitment to Privacy
The "Scholar DOI Scraper" Chrome extension ("the Extension") is designed with user privacy as a fundamental principle. This policy outlines how we handle data. Our core commitment is simple: **we do not collect, store, transmit, or sell any of your personal information**. The Extension does not track your browsing history, IP address, or any other personally identifiable information (PII).

## 2. Information the Extension Handles
To function, the Extension temporarily handles the following data exclusively within your browser:

**Search Parameters**: The query, start year, and end year you provide. This information is used only to construct the necessary Google Scholar search URLs and is discarded after the search is complete.

**Article Titles**: The Extension reads the titles of academic papers from the Google Scholar search results page. This is done to fetch the corresponding DOI.

**Digital Object Identifiers (DOIs)**: The list of DOIs collected from the CrossRef API based on the article titles.

## 3. Data Storage and Security
All DOIs you collect are stored locally on your computer using the standard `chrome.storage.local` browser API.

**No Cloud Storage**: Your data is never sent to, or stored on, any remote server controlled by us or a third party. We have no access to your search history or the list of DOIs you collect.

**Local-Only**: The data remains within your browser's secure storage until you choose to remove it.

## 4. Your Rights and Control
You have complete control over the data stored by the Extension. You can, at any time:

View all stored DOIs in the extension's popup interface.

Permanently delete all stored DOIs by using the "Clear All Saved DOIs" button.

## 5. Third-Party Services
The Extension interacts with the following third-party services as part of its core functionality:

**Google Scholar** (`scholar.google.com`): To perform the searches you initiate. Your interaction with Google Scholar is subject to Google's own Privacy Policy.

**CrossRef API** (`api.crossref.org`): To convert article titles into DOIs. No personal information is sent during this process. This interaction is subject to CrossRef's Privacy Policy.

## 6. Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in the Extension's functionality or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated "Last Updated" date.

## 7. Contact Us
If you have any questions or concerns about this Privacy Policy, please feel free to open an issue on our [GitHub repository](https://github.com/fchicout/scholar-doi-scraper/issues).