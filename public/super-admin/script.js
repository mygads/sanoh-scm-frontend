function generateRandomPassword(maxLength = 10) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";
    const selectedSupplierId = $('#supplier_id').val(); // Ambil bp_code yang dipilih
    
    // Hitung sisa panjang setelah bp_code
    const remainingLength = maxLength - selectedSupplierId.length;
    
    let randomPart = '';
    
    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomPart += charset[randomIndex];
    }

    return selectedSupplierId + randomPart; // Password akan dihasilkan berdasarkan bp_code + karakter random
}


function handleErrorsPassword(errors) {
  if (errors.password) {
    displayNotification(errors.password, 'error');
  } else {
    displayNotification('An unknown error occurred.', 'error');
  }
}

