function adjustRowsPerPage() {
    if (window.innerHeight < 768) {
      rowsPerPage = 4; // Atur menjadi 3 jika ukuran layar < 768
    } else if (window.innerHeight < 1280) {
      rowsPerPage = 5; // Atur menjadi 4 jika ukuran layar >= 768
    } else {
      rowsPerPage = 6;
    }
  }