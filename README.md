# Scholar DOI Scraper - Chrome Extension

![Extension Icon](images/icon128.png)

An efficient Chrome extension designed for researchers, students, and academics to automate the process of collecting Digital Object Identifiers (DOIs) from Google Scholar search results.

## 🚀 Features

-   **Automated Scraping**: Programmatically navigates through multiple pages of Google Scholar search results.
-   **Custom Search Queries**: Define your search term, start year, and end year directly from the extension's popup.
-   **DOI Extraction**: For each search result, it intelligently queries the CrossRef API to find the correct DOI.
-   **Configurable Control**: Set the number of pages to process (up to 100) and the delay between requests to avoid overwhelming the server.
-   **Local Storage**: All collected DOIs are saved directly in your browser, with options to view and clear the list at any time.
-   **User-Friendly Interface**: A simple and intuitive popup UI to control the scraping process and manage your data.

## 🛠️ Installation

You can install this extension in developer mode directly from the source code.

1.  **Download the Repository**: Clone or download this repository as a ZIP file and unzip it to a local folder.
    ```bash
    git clone [https://github.com/your-username/scholar-doi-scraper.git](https://github.com/your-username/scholar-doi-scraper.git)
    ```
2.  **Open Chrome Extensions**: Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode**: In the top-right corner, toggle the "Developer mode" switch on.
4.  **Load the Extension**: Click the "Load unpacked" button that appears on the top-left.
5.  **Select the Folder**: In the file selection dialog, choose the folder where you cloned or unzipped the repository.

The Scholar DOI Scraper icon should now appear in your Chrome toolbar!

## 📖 How to Use

1.  **Click the Icon**: Click on the extension's icon in the Chrome toolbar to open the control panel.
2.  **Fill the Form**:
    -   Enter your **Query** (e.g., "artificial intelligence in healthcare").
    -   Optionally, specify a **Start Year** and **End Year**.
    -   Set the number of **Pages to process** (1 to 100).
    -   Adjust the **delays** if needed (the defaults are recommended).
3.  **Start Scraping**: Click the "Start Scraping" button. The extension will open a new tab or use the current one to navigate to Google Scholar and begin the process.
4.  **Monitor Progress**: The popup will show the current status, including which page is being scraped and how many DOIs have been found.
5.  **View and Manage DOIs**: The collected DOIs will appear in the text area. You can refresh the list or clear all saved data using the buttons provided.

## ⚠️ Disclaimer

This tool is intended for personal and academic use. Please be respectful of Google's and CrossRef's terms of service. The use of delays is implemented to minimize server load. The developers are not responsible for any misuse of this extension.
