// gsap-animation.js

gsap.config({ trialWarn: false });

let select = s => document.querySelector(s),
    toArray = s => gsap.utils.toArray(s),
    mainSVG = select('#mainSVG'),
    container = select('#container'),
    colorTab = select('.colorTab'),
    visibleArea = {
      value: 160,
      offset: 0
    },
    pt = mainSVG.createSVGPoint(),
    mousePos = { x: 0, y: 0 },
    colorArray = [
      "001219","005f73","0a9396","94d2bd",
      "e9d8a6","ee9b00","ca6702","bb3e03",
      "ae2012","9b2226"
    ],
    extendedColorArray = [
      {"name":"Rich black","hex":"001219"},
      {"name":"Midnight green","hex":"005f73"},
      {"name":"Dark cyan","hex":"0a9396"},
      {"name":"Tiffany Blue","hex":"94d2bd"},
      {"name":"Vanilla","hex":"e9d8a6"},
      {"name":"Gamboge","hex":"ee9b00"},
      {"name":"Alloy orange","hex":"ca6702"},
      {"name":"Rust","hex":"bb3e03"},
      {"name":"Rufous","hex":"ae2012"},
      {"name":"Auburn","hex":"9b2226"}
    ],
    spacerX = 66,
    colorTabArr = [];

// Renklerin başına # ekliyoruz
colorArray = colorArray.map(x => (Array.from(x)[0] === '#') ? x : `#${x}`);

gsap.set('svg', { visibility: 'visible' });

// Orijinal colorTab'ı klonlayıp container'a ekleyelim
colorArray.forEach((hex, i) => {
  let clone = colorTab.cloneNode(true);
  container.appendChild(clone);
  
  gsap.set(clone, { x: i * spacerX });
  gsap.set(clone.children[0], { fill: hex, y: 100 });

  // extendedColorArray[i].name varsa, text etiketine basalım
  if (extendedColorArray[i]) {
    clone.children[1].textContent = extendedColorArray[i].name;
  }

  colorTabArr.push(clone);
});

function cursorPoint(evt) {
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(mainSVG.getScreenCTM().inverse());
}

mainSVG.onpointermove = e => {
  mousePos.x = cursorPoint(e).x;
  mousePos.y = cursorPoint(e).y - visibleArea.offset;
};

function update() {
  colorTabArr.forEach(i => {
    let value = Math.hypot(
      gsap.getProperty(i, 'x') - mousePos.x + visibleArea.offset,
      0
    );
    gsap.to(i, {
      y: mapPosY(value)
    });
    gsap.to(i.children[1], {
      opacity: mapOpacity(value),
      transformOrigin: '4% 2%'
    });
  });
}

let mapOpacity = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.mapRange(0, 100, 100, 0)
);

let mapPosY = gsap.utils.pipe(
  gsap.utils.clamp(0, visibleArea.value),
  gsap.utils.mapRange(0, visibleArea.value, 100, 200)
);

// Her frame'de update fonksiyonunu çalıştırıyoruz
gsap.ticker.add(update);
