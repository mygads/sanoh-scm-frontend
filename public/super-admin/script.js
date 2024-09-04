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

function initializeForm() {

    const roleSelect = document.getElementById('role');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle_password');


    // Email validation
    emailInput.addEventListener('input', () => {
      if (!emailInput.value.includes('@')) {
        document.getElementById('email_error').classList.remove('hidden');
      } else {
        document.getElementById('email_error').classList.add('hidden');
      }
    });

    // Toggle Password Visibility
    togglePasswordButton.addEventListener('click', () => {
      const isPasswordVisible = passwordInput.type === 'text';
      passwordInput.type = isPasswordVisible ? 'password' : 'text';
      togglePasswordButton.src = isPasswordVisible ? '../assets/icon_see.svg' : '../assets/icon_hide.svg';
    });

    // Generate Random Password
    const generatePasswordButton = document.getElementById('generate_password');

    generatePasswordButton.addEventListener('click', () => {
      const password = generateRandomPassword();
      passwordInput.value = password;
    });


    // Form Validation on Submit
    const form = document.getElementById('user-form');

    form.addEventListener('submit', (e) => {
      let valid = true;


      // Role must be selected
      if (!roleSelect.value) {
        valid = false;
      }

      // Email must contain "@" symbol
      if (!emailInput.value.includes('@')) {
        document.getElementById('email_error').classList.remove('hidden');
        valid = false;
      } else {
        document.getElementById('email_error').classList.add('hidden');
      }

      if (!valid) {
        e.preventDefault(); // Prevent form submission if validation fails
      } else {

      }
    });

};

function handleErrorsPassword(errors) {
  if (errors.password) {
    displayNotification(errors.password, 'error');
  } else {
    displayNotification('An unknown error occurred.', 'error');
  }
}