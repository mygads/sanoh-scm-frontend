tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
}

const token = localStorage.getItem('accessToken');
const name = localStorage.getItem('name');
const bpCode = localStorage.getItem('bpCode');


function cekToken() {
  if (token) {
    checkSession();
  } 
  else {
    saveCurrentUrl();  // Simpan URL sebelum diarahkan ke login
    redirectToLogin();
    return;
  }
}
  
function checkSession() {
  if (isTokenExpired()) {
    displayNotification('Session expired. Please log in again.');
    saveCurrentUrl();  // Simpan URL sebelum sesi habis
    clearSession(); // Hapus token dan informasi sesi lainnya
    redirectToLogin();
    return;
  }
  else {
    document.getElementById('user-info').textContent = `${name} - ${bpCode}`;
  }
}

function saveCurrentUrl() {
  const lastRole = localStorage.getItem('userRole');
  const currentUrl = window.location.href; // Dapatkan URL saat ini
  localStorage.setItem('lastUrl', currentUrl); // Simpan ke localStorage
  localStorage.setItem('lastRole', lastRole); // Simpan ke localStorage
}

// Function to check token expiration
function isTokenExpired() {
  const expiryDate = localStorage.getItem('tokenExpiry');
  if (!expiryDate) {
    return true; // Jika tidak ada waktu kedaluwarsa, anggap token sudah kedaluwarsa
  }
  
  return new Date() > new Date(expiryDate); // Cek apakah waktu sekarang melebihi waktu kedaluwarsa
}

function redirectToLogin() {
  displayNotification('Session expired, redirecting to login...', 'error');
  setTimeout(() => {
      window.location.href = '../index.html';
      clearSession();
  }, 1500);
}

function clearLocalStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('name');
  localStorage.removeItem('bpCode');
  localStorage.removeItem('userRole');
  localStorage.removeItem('APIlogout');
  localStorage.removeItem('lastUrl'); 
  localStorage.removeItem('lastRole'); 
  localStorage.removeItem('editUserId'); 
  localStorage.removeItem('selectedSupplierId'); 
}

function clearSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('name');
  localStorage.removeItem('bpCode');
  localStorage.removeItem('userRole');
  localStorage.removeItem('APIlogout');
  localStorage.removeItem('editUserId'); 
  localStorage.removeItem('selectedSupplierId'); 
  // localStorage.clear();
}

function handleLogout() {
  // Use SweetAlert2 for confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to log out?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, proceed with logout
      displayNotification('Waiting save history to logout','warning')
      logout();
    } else {
      // If canceled, log a message or do nothing
      console.log('Logout canceled');
    }
  });
}

async function logout() {
  const APIlogout = localStorage.getItem('APIlogout');
  
  cekToken()

  try {
    const response = await fetch(APIlogout, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: token }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      displayNotification(result.message, 'success');
      clearLocalStorage();  // Hapus token dari localStorage 
      setTimeout(() => {
        window.location.href = '../index.html';  // Arahkan ke halaman login atau halaman utama
      }, 500);
    } else {
      displayNotification('Logout failed: ' + result.message, 'error');
      clearLocalStorage();  // Hapus token dari localStorage
      setTimeout(() => {
        window.location.href = '../index.html';  // Arahkan ke halaman login atau halaman utama
      }, 1500);
    }
  } catch (error) {
    console.error('Error during logout:', error);
    displayNotification('Logout failed, Server Error.', 'error');
    clearLocalStorage();  // Hapus token dari localStorage
    setTimeout(() => {
      window.location.href = '../index.html';  // Arahkan ke halaman login atau halaman utama
    }, 1500);
  }
}
  

function displayNotification(message, type = 'success') {
  // Membuat elemen notifikasi
  const notification = document.createElement('div');
  const iconContainer = document.createElement('div');
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const textContainer = document.createElement('div');

  // Menggabungkan message jika berupa array
  if (Array.isArray(message)) {
    message = message.join(' ');
  }

  // Set konten teks
  textContainer.textContent = message;

  // Set atribut dasar untuk SVG
  icon.setAttribute('class', 'w-6 h-6');
  icon.setAttribute('viewBox', '0 0 20 20');
  icon.setAttribute('fill', 'currentColor');
  
  // Kelas dasar notifikasi
  notification.className = 'flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-md border border-gray-300';
  textContainer.className = 'ml-3 mr-1 text-sm font-normal';
  iconContainer.className = 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg';

  // Memilih ikon dan warna berdasarkan tipe notifikasi
  if (type === 'success') {
    iconContainer.className += ' text-green-500 bg-green-100';
    notification.className += ' bg-white'; // Background hijau untuk success
    path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z');
  } else if (type === 'error') {
    iconContainer.className += ' text-red-500 bg-red-100';
    notification.className += ' bg-white'; // Background merah untuk error
    path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z');
  } else if (type === 'warning') {
    iconContainer.className += ' text-yellow-500 bg-yellow-100';
    notification.className += ' bg-white'; // Background kuning untuk warning
    path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z');
  }

  // Menyusun elemen notifikasi
  icon.appendChild(path);
  iconContainer.appendChild(icon);
  
  // Membuat tombol close
  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.className = 'ml-auto p-1 text-gray-400 hover:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300';

  // Membuat ikon close (SVG)
  const closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  closeIcon.setAttribute('class', 'w-5 h-5');
  closeIcon.setAttribute('fill', 'currentColor');
  closeIcon.setAttribute('viewBox', '0 0 20 20');
  
  const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  closePath.setAttribute('fill-rule', 'evenodd');
  closePath.setAttribute('d', 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z');
  closePath.setAttribute('clip-rule', 'evenodd');
  
  closeIcon.appendChild(closePath);
  closeButton.appendChild(closeIcon);
  
  // Menambahkan event listener untuk tombol close
  closeButton.addEventListener('click', () => {
    notification.remove();
    // Jika tidak ada notifikasi lagi, hapus container
    if (notificationContainer.children.length === 0) {
      notificationContainer.remove();
    }
  });

  // Menyusun elemen notifikasi
  notification.appendChild(iconContainer);
  notification.appendChild(textContainer);
  notification.appendChild(closeButton);

  // Mencari atau membuat container notifikasi
  let notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.setAttribute('id', 'notification-container');
    notificationContainer.className = 'fixed top-4 right-4 flex flex-col items-end space-y-2';
    document.body.appendChild(notificationContainer);
  }

  // Menambahkan notifikasi ke container
  notificationContainer.appendChild(notification);

  // Menghapus notifikasi setelah 3 detik
  setTimeout(() => {
    notification.remove();
    // Jika tidak ada notifikasi lagi, hapus container
    if (notificationContainer.children.length === 0) {
      notificationContainer.remove();
    }
  }, 2000);
}

// Contoh penggunaan:
// displayNotification('Item moved successfully', 'success');
// displayNotification('Item has been deleted', 'error');
// displayNotification('Improve password difficulty', 'warning');



