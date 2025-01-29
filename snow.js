document.addEventListener("DOMContentLoaded", function () {
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❆";
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(snowflake);


    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  setInterval(createSnowflake, 300);
});
