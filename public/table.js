let rowsPerPage = 7;
let currentPage = 1;
let filteredData = [];
let originalData= [];

function sortTable(columnIndex) {
  const table = document.querySelector('table');
  const isAscending = table.querySelectorAll('th')[columnIndex].classList.toggle('asc');

  // Remove sorting classes from other headers
  table.querySelectorAll('th').forEach((th, index) => {
    if (index !== columnIndex) th.classList.remove('asc', 'desc');
  });

  // Sort the entire dataset
  filteredData.sort((a, b) => {
    const cellA = Object.values(a)[columnIndex].toString().trim();
    const cellB = Object.values(b)[columnIndex].toString().trim();

    return cellA.localeCompare(cellB, undefined, { numeric: true, sensitivity: 'base' });
  });

  // If not ascending, reverse the order
  if (!isAscending) {
    filteredData.reverse();
  }

  // Redisplay the sorted data with pagination
  currentPage = 1; // Reset to the first page after sorting
  displayTableData(currentPage);
  updatePagination();
}
  
function searchTable() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    if (searchInput === "") {
      // Jika input kosong, kembalikan data ke originalData
      filteredData = originalData;
    } else {
      // Filter data berdasarkan input
      filteredData = originalData.filter(row =>
        row.Username.toLowerCase().includes(searchInput) ||
        row.Name.toLowerCase().includes(searchInput) ||
        row.SupplierID.toLowerCase().includes(searchInput)
      );
    }
  
    currentPage = 1;
    displayTableData(currentPage);
    updatePagination();
}

  
function updatePagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
  
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const maxPageNumbersToShow = 4; // Number of page buttons to display (including current)
  
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'px-3 py-3  text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300';
    prevButton.innerHTML = `
      <svg class=" w-3 h-3 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
      <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
      </svg>
    `;
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
      currentPage--;
      displayTableData(currentPage);
      updatePagination();
      }
    });
    paginationContainer.appendChild(prevButton);
  
    // Calculate page numbers to show
    const pageNumbers = [];
    if (totalPages <= maxPageNumbersToShow) {
      // If total pages is less than or equal to maxPageNumbersToShow, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
      }
    } else {
      // Otherwise, calculate which page numbers to show
      pageNumbers.push(1); // Always show the first page
  
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
  
      if (startPage > 2) {
      pageNumbers.push('...');
      }
  
      for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
      }
  
      if (endPage < totalPages - 1) {
      pageNumbers.push('...');
      }
  
      pageNumbers.push(totalPages); // Always show the last page
    }
  
    // Page numbers buttons
    pageNumbers.forEach(number => {
      const pageButton = document.createElement('button');
      if (number === '...') {
      pageButton.className = 'px-4 py-2  text-gray-900 bg-gray-200 rounded-md cursor-default';
      pageButton.textContent = '...';
      } else {
      pageButton.className = `px-4 py-2  ${number === currentPage ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-900'} rounded-md hover:bg-gray-300`;
      pageButton.textContent = number;
      pageButton.addEventListener('click', () => {
          currentPage = number;
          displayTableData(currentPage);
          updatePagination();
      });
      }
      paginationContainer.appendChild(pageButton);
    });
  
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = ' px-3 py-3 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300';
    nextButton.innerHTML = `
      <svg class=" w-3 h-3 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
      <path d="M1.234 15.434A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1A2 2 0 0 0 1 2.414v11.172a2 2 0 0 0 1.234 1.848Z" />
      </svg>
    `;
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
      currentPage++;
      displayTableData(currentPage);
      updatePagination();
      }
    });
    paginationContainer.appendChild(nextButton);
}