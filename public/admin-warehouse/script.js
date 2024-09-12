// let deliveryNote = [];
// let filteredDnData = [];
// let currentPage = 1;
// let rowsPerPage = 10; // Adjust based on screen size

// document.addEventListener('DOMContentLoaded', () => {
//     const name = localStorage.getItem('name');
//     const bpCode = localStorage.getItem('bpCode');
//     const token = localStorage.getItem('accessToken'); // Ambil token dari localStorage

//     if (!token) {
//         console.error('No access token found');
//         return;
//     }

//     const userInfoElement = document.getElementById('user-info');
//     if (userInfoElement) {
//         userInfoElement.textContent = `${name} - ${bpCode}`;
//     }

//     const supplierDropdown = document.getElementById('supplier_id'); // Updated to match the correct id

//     if (supplierDropdown) {
//         supplierDropdown.addEventListener('change', async () => {
//             const selectedSupplierCode = supplierDropdown.value;
//             if (!selectedSupplierCode) {
//                 console.log('No supplier selected.');
//                 // Clear table or show a message when no supplier is selected
//                 filteredDnData = [];
//                 displayTableData(1);
//                 updatePagination();
//                 return;
//             }
//             await fetchDeliveryNotesBySupplier(selectedSupplierCode, token);
//         });
//     } else {
//         console.error('Element with id "supplier_id" not found.'); // Updated to match the correct id
//     }

//     adjustRowsPerPage(); // Adjust rows per page based on screen size

//     window.addEventListener('resize', () => {
//         adjustRowsPerPage(); // Adjust rows per page when window is resized
//         displayTableData(currentPage); // Re-render table data
//         updatePagination(); // Re-render pagination
//     });

//     // Fetch DN number from URL and display in "dnNumber" element
//     const urlParams = new URLSearchParams(window.location.search);
//     const noDN = urlParams.get('noDN');
//     const dnNumberElement = document.getElementById('dnNumber');
   
// });


// // Populate supplier dropdown
// function populateSupplierDropdown(suppliers) {
//     const supplierDropdown = document.getElementById('supplier_id');
//     if (supplierDropdown) {
//         supplierDropdown.innerHTML = suppliers.map(supplier => `
//             <option value="${supplier.bp_code}">${supplier.bp_name}</option>
//         `).join('');
//     } else {
//         console.error('Element with id "supplier_id" not found.');
//     }
// }

// // Fetch delivery notes by supplier
// async function fetchDeliveryNotesBySupplier(supplierCode, token) {
//     try {
//         console.log('Fetching delivery notes for supplier:', supplierCode);

//         const response = await fetch(`${baseURL}/indexdnheader2?supplier_code=${supplierCode}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             }
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(`Data fetched for supplier ${supplierCode}:`, data);

//         if (data.success && Array.isArray(data.data)) {
//             deliveryNote = data.data.map(dn => ({
//                 noDN: dn.no_dn,
//                 noPO: dn.po_no,
//                 planDNDate: dn.plan_delivery_date,
//                 statusDN: dn.status_desc
//             }));
//             filteredDnData = deliveryNote;
//             displayTableData(1);
//             updatePagination();
//         } else {
//             console.error('Failed to fetch delivery notes:', data.message);
//         }
//     } catch (error) {
//         console.error(`Error fetching delivery notes for supplier ${supplierCode}:`, error);
//     }
// }

// // Adjust the number of rows per page based on screen size
// function adjustRowsPerPage() {
//     if (window.innerWidth <= 1280) {
//         rowsPerPage = 6;
//     } else if (window.innerWidth <= 1600) {
//         rowsPerPage = 8;
//     } else {
//         rowsPerPage = 10;
//     }
// }

// // Display table data
// function displayTableData(page) {
//     const tableBody = document.getElementById('table-body');
//     tableBody.innerHTML = '';

//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     const paginatedData = filteredDnData.slice(start, end);

//     paginatedData.forEach((row) => {
//         const tableRow = document.createElement('tr');
//         tableRow.classList.add('odd:bg-white', 'even:bg-gray-50', 'border-b', 'dark:border-gray-100');
//         tableRow.innerHTML = `
//             <td class="px-2 py-4 text-center font-medium text-gray-900">
//                 <a href="delivery-note-detail.html?noDN=${row.noDN}" class="text-blue-600 underline">${row.noDN}</a>
//             </td>
//             <td class="px-2 py-4 text-center font-medium text-gray-900">
//                 <a href="purchase-order-detail.html?noPO=${row.noPO}" class="text-blue-600 underline">${row.noPO}</a>
//             </td>
//             <td class="px-2 py-4 text-center">${row.planDNDate}</td>
//             <td class="px-2 py-4 text-center">${row.statusDN}</td>
//         `;
//         tableBody.appendChild(tableRow);
//     });
// }

// // Update pagination
// function updatePagination() {
//     const paginationContainer = document.querySelector('.pagination');
//     paginationContainer.innerHTML = '';

//     const totalPages = Math.ceil(filteredDnData.length / rowsPerPage);
//     const maxPageNumbersToShow = 4;

//     const prevButton = document.createElement('button');
//     prevButton.className = 'px-3 py-3 2xl:px-4 2xl:py-4 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300';
//     prevButton.innerHTML = `
//         <svg class="2xl:w-4 2xl:h-4 w-3 h-3 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
//         <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
//         </svg>
//     `;
//     prevButton.disabled = currentPage === 1;
//     prevButton.addEventListener('click', () => {
//         if (currentPage > 1) {
//             currentPage--;
//             displayTableData(currentPage);
//             updatePagination();
//         }
//     });
//     paginationContainer.appendChild(prevButton);

//     const pageNumbers = [];
//     if (totalPages <= maxPageNumbersToShow) {
//         for (let i = 1; i <= totalPages; i++) {
//             pageNumbers.push(i);
//         }
//     } else {
//         pageNumbers.push(1);

//         const startPage = Math.max(2, currentPage - 1);
//         const endPage = Math.min(totalPages - 1, currentPage + 1);

//         if (startPage > 2) {
//             pageNumbers.push('...');
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(i);
//         }

//         if (endPage < totalPages - 1) {
//             pageNumbers.push('...');
//         }

//         pageNumbers.push(totalPages);
//     }

//     pageNumbers.forEach(number => {
//         const pageButton = document.createElement('button');
//         if (number === '...') {
//             pageButton.className = 'px-4 py-2 2xl:px-6 2xl:py-4 text-gray-900 bg-gray-200 rounded-md cursor-default';
//             pageButton.textContent = '...';
//         } else {
//             pageButton.className = `px-4 py-2 2xl:px-6 2xl:py-4 ${number === currentPage ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-900'} rounded-md hover:bg-gray-300`;
//             pageButton.textContent = number;
//             pageButton.addEventListener('click', () => {
//                 currentPage = number;
//                 displayTableData(currentPage);
//                 updatePagination();
//             });
//         }
//         paginationContainer.appendChild(pageButton);
//     });

//     const nextButton = document.createElement('button');
//     nextButton.className = '2xl:px-4 2xl:py-4 px-3 py-3 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300';
//     nextButton.innerHTML = `
//         <svg class="2xl:w-4 2xl:h-4 w-3 h-3 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
//         <path d="M1.234 15.434A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1A2 2 0 0 0 1 2.414v11.172a2 2 0 0 0 1.234 1.848Z" />
//         </svg>
//     `;
//     nextButton.disabled = currentPage === totalPages;
//     nextButton.addEventListener('click', () => {
//         if (currentPage < totalPages) {
//             currentPage++;
//             displayTableData(currentPage);
//             updatePagination();
//         }
//     });
//     paginationContainer.appendChild(nextButton);
// }

// // Function to display DN details
// function displayDNDetails(details) {
//     const tableBody = document.getElementById('table-body-detail');
//     tableBody.innerHTML = '';

//     details.forEach(detail => {
//         const tableRow = document.createElement('tr');
//         tableRow.innerHTML = `
//             <td class="px-2 py-4 text-center font-medium text-gray-900">${detail.part_no}</td>
//             <td class="px-2 py-4 text-center">${detail.item_desc_a}</td>
//             <td class="px-2 py-4 text-center">${detail.dn_unit}</td>
//             <td class="px-2 py-4 text-center">${detail.dn_qty}</td>
//             <td class="px-2 py-4 text-center">${detail.receipt_qty}</td>
//         `;
//         tableBody.appendChild(tableRow);
//     });
// }
