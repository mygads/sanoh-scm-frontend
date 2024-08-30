tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
}


async function handleLogout() {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      redirectToLogin();
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: token }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        displayNotification('User successfully logged out!', 'success');
        clearSession();
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 1500);
      } else {
        displayNotification('Logout failed: ' + result.message, 'error');
        clearSession();
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 1500);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      displayNotification('Logout failed, Server Error.', 'error');

      clearSession();
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
      displayNotification('User Dummy successfully logged out!', 'success');
    }
}
  
function clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    localStorage.removeItem('bpCode');
    localStorage.removeItem('userRole');
}

function redirectToLogin() {
    displayNotification('Session expired, redirecting to login...', 'error');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500);
}
  
function displayNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ';
    notification.className += type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 3000);
}
  
// Function to check token expiration
function isTokenExpired() {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  if (tokenExpiry) {
    const now = new Date().getTime();
    return now > parseInt(tokenExpiry);
  }
  return true;
}

