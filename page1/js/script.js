const form = document.querySelector("form");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
  const ismInput = document.getElementById("ism");
  const raqamInput = document.getElementById("raqam");
  const roziCheckbox = document.getElementById("rozi");

  const ism = ismInput.value;
  const raqam = raqamInput.value;
  const rozi = roziCheckbox.checked;

  const malumotlar = {
    ism: ism,
    raqam: raqam,
    rozi: rozi,
  };

  // Ma'lumotlarni serverga jo'natish
  const yubor = new XMLHttpRequest();
  yubor.open("POST", "/ma'lumotlarni-yuborish", true);
  yubor.setRequestHeader("Content-Type", "application/json");
  yubor.onload = function () {
    if (yubor.status >= 200 && yubor.status < 400) {
      const response = JSON.parse(yubor.responseText);
      // Ma'lumotlar to'g'ri kiritilgan va qayta so'rov muvaffaqiyatli amalga oshirildi
      console.log("Ma'lumotlar muvaffaqiyatli qayta so'raldi:", response);
    } else {
      // Xatolik yuz berdi
      console.error("So'rovda xatolik yuz berdi.");
    }
  };
  yubor.onerror = function () {
    // So'rov amalga oshmadi
    console.error("So'rovda xatolik yuz berdi.");
  };
  yubor.send(JSON.stringify(malumotlar));
  // Foydalanuvchi ma'lumotlarini konsolga chiqarish
  console.log("Foydalanuvchi ma'lumotlari:", malumotlar);
});
