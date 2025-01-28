// Kar animasyon ayarları
const CANVAS_HEIGHT = 1.0; // 1.0 yaparsanız canvas tam ekran boyutunda olur
const SNOWFLAKE_AMOUNT = 50;
const SNOWFLAKE_SIZE = {
  min: 1,
  max: 4
};
const SNOWFLAKE_SPEED = {
  min: 0.2,
  max: 1.2
};
const CANVAS_SELECTOR = ".snowverlay";

let animationFrame;

// Canvas kurulumu
const setupCanvas = () => {
  const canvas = document.querySelector(CANVAS_SELECTOR);
  if (!canvas) return null;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Canvas boyutlarını ayarla
  const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * CANVAS_HEIGHT;
  };

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  return { canvas, ctx };
};

// Rastgele kar tanesi oluştur
const createSnowflake = (canvas, isAnimated = true, index = 0) => ({
  x: Math.random() * canvas.width,
  y: isAnimated
    ? -20 - (index * canvas.height) / SNOWFLAKE_AMOUNT
    : Math.random() * canvas.height,
  size:
    Math.random() * (SNOWFLAKE_SIZE.max - SNOWFLAKE_SIZE.min) +
    SNOWFLAKE_SIZE.min,
  speed:
    Math.random() * (SNOWFLAKE_SPEED.max - SNOWFLAKE_SPEED.min) +
    SNOWFLAKE_SPEED.min,
  // Eğer statik moddaysa opaklık rastgele olsun, animasyonda kademeli geçiş
  opacity: isAnimated ? null : Math.random() * 0.5 + 0.2
});

// Kar tanesini çiz
const drawSnowflake = (ctx, flake, canvas) => {
  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 255, 255, ${
    // Eğer opacity null ise animasyonla ilgileniyoruz (kar tanesi aşağı indikçe saydamlaşabilir)
    flake.opacity ?? (1 - flake.y / canvas.height)
  })`;
  ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
  ctx.fill();
};

// Statik (hareketsiz) kar görselleştirme
const renderStaticSnow = () => {
  const setup = setupCanvas();
  if (!setup) return;
  const { canvas, ctx } = setup;

  Array(SNOWFLAKE_AMOUNT)
    .fill(undefined)
    .map(() => createSnowflake(canvas, false))
    .forEach((flake) => drawSnowflake(ctx, flake, canvas));
};

// Kar animasyonunu başlat
const startSnowAnimation = () => {
  const setup = setupCanvas();
  if (!setup) return;

  const { canvas, ctx } = setup;
  const snowflakes = Array(SNOWFLAKE_AMOUNT)
    .fill(undefined)
    .map((_, index) => createSnowflake(canvas, true, index));

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((flake) => {
      flake.y += flake.speed;
      // Hafif sağa-sola sallanma (y konumuna göre sinus dalgası)
      flake.x += Math.sin(flake.y / 30) * 0.5;

      // Ekranın altına düşen kar tanelerini başa sarmak
      if (flake.y > canvas.height) {
        flake.y = 0;
        flake.x = Math.random() * canvas.width;
      }

      drawSnowflake(ctx, flake, canvas);
    });

    animationFrame = requestAnimationFrame(animate);
  };

  animate();

  // Gerekirse animasyonu durdurmak için döndür
  return () => {
    cancelAnimationFrame(animationFrame);
  };
};

// Kullanıcıda "prefers-reduced-motion" ayarı açıksa statik kar göster
const init = () => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleMotionPreference = (event) => {
    if (event.matches) {
      // Hareket kısıtlı, statik kar
      renderStaticSnow();
    } else {
      // Animasyonlu kar
      startSnowAnimation();
    }
  };

  mediaQuery.addEventListener("change", handleMotionPreference);
  // İlk açılışta kontrol et
  handleMotionPreference(mediaQuery);
};

// DOM yüklendikten sonra başlat
document.addEventListener("DOMContentLoaded", init);
