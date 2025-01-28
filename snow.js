// Basit bir kar tanesi animasyonu örneği
document.addEventListener("DOMContentLoaded", function () {
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❆"; // Kar tanesi sembolü
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(snowflake);

    // 5 saniye sonra DOM'dan kaldır
    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  // Her 300 milisaniyede bir yeni kar tanesi oluştur
  setInterval(createSnowflake, 300);
});
