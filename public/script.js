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
    checkSession()
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
  localStorage.clear();
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
      displayNotification(`User "${name}" successfully logged out!`, 'success');
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



function displayNotification(message, type) {
  const notification = document.createElement('div');
  if (Array.isArray(message)) {
    message = message.join(' ');
  }

  notification.textContent = message;
  notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ';
  notification.className += type === 'success' ? 'bg-green-500' : 'bg-red-500';

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
  

