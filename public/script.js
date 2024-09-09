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
    redirectToLogin();
    return;
  }
}
  
function checkSession() {
  if (isTokenExpired()) {
    displayNotification('Session expired. Please log in again.');
    clearSession(); // Hapus token dan informasi sesi lainnya
    redirectToLogin();
    return;
  }
  else {
    document.getElementById('user-info').textContent = `${name} - ${bpCode}`;
  }
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

function clearSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('name');
  localStorage.removeItem('bpCode');
  localStorage.removeItem('userRole');
  localStorage.removeItem('APIlogout');
  // localStorage.clear();
}

async function handleLogout() {
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
      displayNotification(`User successfully logged out!`, 'success');
      clearSession();  // Hapus token dari localStorage 
      console.log(result)
      setTimeout(() => {
        window.location.href = '../index.html';  // Arahkan ke halaman login atau halaman utama
      }, 1500);
    } else {
      displayNotification('Logout failed: ' + result.message, 'error');
      clearSession();  // Hapus token dari localStorage
      setTimeout(() => {
        window.location.href = '../index.html';  // Arahkan ke halaman login atau halaman utama
      }, 1500);
    }
  } catch (error) {
    console.error('Error during logout:', error);
    displayNotification('Logout failed, Server Error.', 'error');
    clearSession();  // Hapus token dari localStorage
    setTimeout(() => {
      window.location.href = '../index.html';  // Arahkan ke halaman login atau halaman utama
    }, 1500);
  }
}


// function displayNotification(message, type) {
//   const notification = document.createElement('div');
//   if (Array.isArray(message)) {
//     message = message.join(' ');
//   }

//   notification.textContent = message;
//   notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ';
//   notification.className += type === 'success' ? 'bg-green-600' : 'bg-red-600';

//   document.body.appendChild(notification);

//   setTimeout(() => {
//     notification.remove();
//   }, 3000);
// }
  

function displayNotification(message, type = 'error') {
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
  icon.setAttribute('class', 'w-5 h-5');
  icon.setAttribute('viewBox', '0 0 20 20');
  icon.setAttribute('fill', 'currentColor');
  
  // Kelas dasar notifikasi
  notification.className = 'flex items-center fixed top-4 right-4 w-full max-w-xs p-4 mb-4 text-white rounded-lg shadow ';
  textContainer.className = 'ms-3 text-sm font-normal';
  iconContainer.className = 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg';

  // Memilih ikon dan warna berdasarkan tipe notifikasi
  if (type === 'success') {
    iconContainer.className += ' text-green-500 bg-green-100';
    notification.className += ' bg-green-500'; // Background hijau untuk success
    path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z');
  } else if (type === 'error') {
    iconContainer.className += ' text-red-500 bg-red-100';
    notification.className += ' bg-red-500'; // Background merah untuk error
    path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z');
  } else if (type === 'warning') {
    iconContainer.className += ' text-yellow-500 bg-yellow-100';
    notification.className += ' bg-yellow-500'; // Background kuning untuk warning
    path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z');
  }

  // Menyusun elemen notifikasi
  icon.appendChild(path);
  iconContainer.appendChild(icon);
  notification.appendChild(iconContainer);
  notification.appendChild(textContainer);

  // Menambahkan notifikasi ke body
  document.body.appendChild(notification);

  // Menghapus notifikasi setelah 3 detik
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Contoh penggunaan:
// displayNotification('Item moved successfully', 'success');
// displayNotification('Item has been deleted', 'error');
// displayNotification('Improve password difficulty', 'warning');



