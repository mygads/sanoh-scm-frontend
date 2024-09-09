function generateRandomPassword(maxLength = 8) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Koreksi charset
  const selectedSupplierId = $('#supplier_id').val(); // Ambil bp_code yang dipilih
  
  // Ambil 4 huruf pertama dari supplier ID
  const supplierPart = selectedSupplierId.substring(0, 4); // Mengambil maksimal 4 huruf
  
  // Hitung sisa panjang setelah 4 huruf supplier ID
  const remainingLength = maxLength - supplierPart.length;
  
  let randomPart = '';
  
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomPart += charset[randomIndex];
  }

  return supplierPart + randomPart; // Password akan dihasilkan berdasarkan 4 huruf supplier ID + karakter random
}



function handleErrorsPassword(errors) {
  if (errors.password) {
    displayNotification(errors.password, 'error');
  } else {
    displayNotification('An unknown error occurred.', 'error');
  }
}

