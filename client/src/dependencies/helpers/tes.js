function getFirstDayOfMonth(date) {
    // Pastikan input adalah objek Date
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    // Set tanggal pada objek Date ke 1 untuk mendapatkan awal bulan
    date.setDate(1);
  
    return date;
  }
  
  // Contoh penggunaan
  const currentDate = new Date(); // Tanggal saat ini
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  
  console.log(firstDayOfMonth); // Hasilnya akan berupa objek Date dengan tanggal awal bulan saat ini
  