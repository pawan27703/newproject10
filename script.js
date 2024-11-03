const apiUrl = 'https://openapi.programming-hero.com/api/phones';
let phonesData = [];   // Store all fetched phones
let isShowAll = false; // Flag to control Show All state

async function fetchPhones(searchTerm) {
  document.getElementById('loading').style.display = 'flex';
  try {
    const response = await fetch(`${apiUrl}?search=${searchTerm}`);
    const data = await response.json();
    document.getElementById('loading').style.display = 'none';
    phonesData = data.data;  // Store all phones in global variable
    displayPhones();         // Call displayPhones without argument to use global data
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById('loading').style.display = 'none';
  }
}

function displayPhones() {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';

  // Toggle between displaying first 12 or all phones
  let phonesToDisplay = isShowAll ? phonesData : phonesData.slice(0, 12);

  phonesToDisplay.forEach((phone) => {
    const phoneCard = document.createElement('div');
    phoneCard.classList.add('card');
    phoneCard.innerHTML = `
      <img src="${phone.image}" alt="${phone.phone_name}">
      <h2>${phone.phone_name}</h2>
      <p>Brand: ${phone.brand}</p>
      <button class="btn btn-details" onclick="showPhoneDetails('${phone.slug}')">Show Details</button>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  // Show or hide "Show All" button based on the number of phones
  const showAllBtn = document.getElementById('showAllBtn');
  if (phonesData.length > 12 && !isShowAll) {
    showAllBtn.classList.remove('hidden');
  } else {
    showAllBtn.classList.add('hidden');
  }

  // Update button text
  showAllBtn.innerText = isShowAll ? 'Show Less' : 'Show All';
}

function toggleShowAll() {
  isShowAll = !isShowAll;
  displayPhones();  // Re-render phone list
}

// Function to show phone details in a modal
function showPhoneDetails(phoneSlug) {
  const phone = phonesData.find(p => p.slug === phoneSlug);
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <h2>${phone.phone_name}</h2>
    <p><strong>Brand:</strong> ${phone.brand}</p>
    <img src="${phone.image}" alt="${phone.phone_name}" />
    <p><strong>More Details:</strong></p>
    <p>${phone.description || 'No description available.'}</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Show the modal
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none'; // Hide the modal
}

// Initial search
fetchPhones('oppo');
