// script.js


let suppliers = [
  { id: '1', name: 'Supplier A', code: 'A123' },
  { id: '2', name: 'Supplier B', code: 'B456' },
  { id: '3', name: 'Supplier C', code: 'C789' },
];

let purchaseOrders = {
  '1': [
    { noPO: 'PO001', poDate: '2023-12-01', status: 'Active' },
    { noPO: 'PO002', poDate: '2023-11-15', status: 'Completed' },
  ],
  '2': [
    { noPO: 'PO101', poDate: '2023-12-05', status: 'Active' },
    { noPO: 'PO102', poDate: '2023-11-20', status: 'Completed' },
  ],
  '3': [
    { noPO: 'PO201', poDate: '2023-12-10', status: 'Active' },
    { noPO: 'PO202', poDate: '2023-11-25', status: 'Completed' },
  ],
};

let performanceReports = {
  '1': [
    { no: 1, periode: 'July 2023', attachedFile: 'file1.pdf' },
    { no: 2, periode: 'June 2023', attachedFile: 'file2.pdf' },
  ],
  '2': [
    { no: 1, periode: 'August 2023', attachedFile: 'file3.pdf' },
    { no: 2, periode: 'July 2023', attachedFile: 'file4.pdf' },
  ],
  '3': [
    { no: 1, periode: 'September 2023', attachedFile: 'file5.pdf' },
    { no: 2, periode: 'August 2023', attachedFile: 'file6.pdf' },
  ],
};

const supplierSelect = $('#Supplier');
const submitBtn = $('#submitBtn');
const poActiveCount = $('#po-active-count');
const poInProgressCount = $('#po-in-progress-count');
const dnActiveCount = $('#dn-active-count');
const dnInProgressCount = $('#dn-in-progress-count');
const selectSupplierText = $('#select-supplier-text');


// Populate supplier select options
suppliers.forEach(supplier => {
  const option = new Option(`${supplier.name} (${supplier.code})`, supplier.id, false, false);
  supplierSelect.append(option);
});

// Initialize Select2
// supplierSelect.select2({
//   placeholder: 'Cari Supplier',
//   allowClear: true
// });

// Change event for select
supplierSelect.on('change', function () {
  if ($(this).val()) {
    submitBtn.prop('disabled', false).removeClass('bg-zinc-400').addClass('bg-blue-600');
  } else {
    submitBtn.prop('disabled', true).removeClass('bg-blue-600').addClass('bg-zinc-400');
  }
});

function selectSupplier(supplierId) {
  if (supplierId) {
    const selectedSupplier = suppliers.find(supplier => supplier.id === supplierId);
    if (selectedSupplier) {
      // Save selected supplier to localStorage
      localStorage.setItem('selectedSupplierId', supplierId);
      localStorage.setItem('selectedSupplierName', selectedSupplier.name);

      // Redirect to Purchase Order page
      window.location.href = 'purchase-order.html';
    }
  } else {
    alert('Please select a supplier');
  }
}

function loadSupplierData() {
  const supplierId = localStorage.getItem('selectedSupplierId');
  const supplierName = localStorage.getItem('selectedSupplierName');
  if (supplierId && supplierName) {
    document.getElementById('select-supplier-text').textContent = supplierName;
    loadPurchaseOrders(supplierId);
    loadPerformanceReports(supplierId);
  } else {
    alert('No supplier selected. Please select a supplier.');
    window.location.href = 'select-supplier.html';
  }
}

function loadPurchaseOrders(supplierId) {
  const poTableBody = document.getElementById('table-body');
  const poData = purchaseOrders[supplierId] || [];
  poTableBody.innerHTML = '';
  poData.forEach((po, index) => {
    const row = `<tr>
      <td class="px-2 py-4 text-center font-medium text-gray-900"><a href="#">${po.noPO}</a></td>
      <td class="px-2 py-4 text-center">${po.poDate}</td>
      <td class="px-2 py-4 text-center">${po.status}</td>
    </tr>`;
    poTableBody.insertAdjacentHTML('beforeend', row);
  });
}

function loadPerformanceReports(supplierId) {
  const prTableBody = document.getElementById('table-body-detail');
  const prData = performanceReports[supplierId] || [];
  prTableBody.innerHTML = '';
  prData.forEach((pr, index) => {
    const row = `<tr>
      <td class="px-2 py-4 text-center font-medium text-gray-900">${pr.no}</td>
      <td class="px-2 py-4 text-center">${pr.periode}</td>
      <td class="px-1 py-2 text-center flex items-center justify-center"><a href="${pr.attachedFile}" target="_blank"><img src="./assets/icon_pdf.svg" alt="PDF Icon" class="w-6 h-6"></a></td>
    </tr>`;
    prTableBody.insertAdjacentHTML('beforeend', row);
  });
}

function checkInputs() {
  const monthPicker = document.getElementById('month-picker');
  const fileUpload = document.getElementById('file-upload');
  const uploadButton = document.getElementById('upload-button');

  if (monthPicker.value && fileUpload.files.length > 0) {
    uploadButton.disabled = false;
    uploadButton.classList.remove('bg-gray-400');
    uploadButton.classList.add('bg-blue-500');
  } else {
    uploadButton.disabled = true;
    uploadButton.classList.add('bg-gray-400');
    uploadButton.classList.remove('bg-blue-500');
  }
}

function addPerformanceReport() {
  const supplierId = localStorage.getItem('selectedSupplierId');
  if (!supplierId) return;

  const monthPicker = document.getElementById('month-picker');
  const fileUpload = document.getElementById('file-upload');
  const uploadButton = document.getElementById('upload-button');

  const newReport = {
    no: performanceReports[supplierId].length + 1,
    periode: new Date(monthPicker.value).toLocaleString('default', { month: 'long', year: 'numeric' }),
    attachedFile: fileUpload.files[0].name, // Simulate file upload
  };

  performanceReports[supplierId].push(newReport);
  loadPerformanceReports(supplierId);

  // Reset input fields
  monthPicker.value = '';
  fileUpload.value = '';
  checkInputs();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('upload-button')) {
    document.getElementById('upload-button').addEventListener('click', addPerformanceReport);
    document.getElementById('month-picker').addEventListener('change', checkInputs);
    document.getElementById('file-upload').addEventListener('change', checkInputs);
  }

  if (localStorage.getItem('selectedSupplierId')) {
    loadSupplierData();
  }
});
