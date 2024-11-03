# Phone Catalog Project

## Overview

This project is a simple phone catalog web application that fetches phone data from the [Programming Hero API](https://openapi.programming-hero.com/api/phones?search=oppo) and displays it in an interactive user interface. Users can search for phones, view details, and toggle between displaying all or a limited number of phone entries.

## Features

- Search for phones using a search bar.
- View a list of phone cards with basic details.
- Click on "Show Details" to view a popup with detailed information about each phone.
- Toggle between showing all phones and a limited number of phone entries.
- Responsive design for various screen sizes.
- Footer with social media icons.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API for data retrieval

## JavaScript Functionalities Used

### 1. **Fetching Data from API**

The application utilizes the Fetch API to retrieve phone data asynchronously. The following function demonstrates how data is fetched based on user input:

```javascript
async function fetchPhones(searchTerm) {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTerm}`);
    const data = await response.json();
    return data.data; // Returns the phone data array
}
