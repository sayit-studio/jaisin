const SAMPLES = {
  shengmei: {
    projectName: "勝美珺專屬",
    brandLogo: "./assets/brand-mark.png",
    qrImage: "./assets/qrcode.png",
    projectImage: "./assets/shengmei-project.jpg",
    thresholds: ["開團優惠價", "預約滿10戶", "預約滿30戶"],
    prices: [
      { room: "二房", values: [7800, 7300, 6800] },
      { room: "三房", values: [8800, 8300, 7800] },
      { room: "四房", values: [10800, 10300, 9800] }
    ],
    notes: [
      "費用內已含<strong>驗屋電子報告</strong>，假日驗屋不<br>加價，詳細檢驗項目可加官方LINE索取。",
      "透天及中古屋專案報價。"
    ],
    phone: "0971-866797",
    lineId: "@301thssm"
  },
  aipue: {
    projectName: "鉑金愛悅專屬",
    brandLogo: "./assets/brand-mark.png",
    qrImage: "./assets/qrcode.png",
    projectImage: "./assets/aipue-project.jpg",
    thresholds: ["開團優惠價", "預約滿5戶", "預約滿20戶"],
    prices: [
      { room: "三房", values: [9800, 9300, 8800] },
      { room: "四房", values: [11800, 11300, 10800] }
    ],
    notes: [
      "費用內已含驗屋電子報告，假日驗屋不<br>加價，複驗費用另計。",
      "透天及中古屋專案報價。"
    ],
    phone: "0971-866797",
    lineId: "@301thssm"
  }
};

const DEFAULT_DATA = SAMPLES.shengmei;

function formatPrice(value) {
  if (typeof value === "string") {
    return value.startsWith("$") ? value : `$${value}`;
  }

  return `$${Number(value).toLocaleString("en-US")}`;
}

function getDataFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const sample = params.get("sample");
  const encodedData = params.get("data");

  if (encodedData) {
    try {
      return JSON.parse(decodeURIComponent(encodedData));
    } catch (error) {
      console.error("Invalid data parameter", error);
    }
  }

  return SAMPLES[sample] || window.OFFER_DATA || DEFAULT_DATA;
}

function setImage(image, fallback, url) {
  if (!image) return;
  if (!url) {
    image.classList.add("is-hidden");
    fallback?.classList.remove("is-hidden");
    return;
  }

  image.src = url;
  image.classList.remove("is-hidden");
  fallback?.classList.add("is-hidden");
}

function renderPriceTable(data) {
  const table = document.querySelector("#priceTable");
  if (!table) return;
  table.innerHTML = "";

  table.append(document.createElement("div"));

  for (const label of data.thresholds || []) {
    const header = document.createElement("div");
    header.className = "price-header";
    header.textContent = label;
    table.append(header);
  }

  for (const row of data.prices || []) {
    const room = document.createElement("div");
    room.className = "room-label";
    room.textContent = row.room;
    table.append(room);

    for (const value of row.values || []) {
      const price = document.createElement("div");
      price.className = "price-value";
      price.textContent = formatPrice(value);
      table.append(price);
    }
  }
}

function renderNotes(data) {
  const list = document.querySelector("#noteList");
  if (!list) return;
  list.innerHTML = "";

  for (const note of data.notes || []) {
    const item = document.createElement("p");
    item.className = "note-item";
    item.innerHTML = note;
    list.append(item);
  }
}

function renderPoster(data) {
  const q = (sel) => document.querySelector(sel);
  if (q("#projectName")) q("#projectName").textContent = data.projectName || "建案專屬";
  if (q("#phoneText")) q("#phoneText").textContent = data.phone || "0971-866797";
  if (q("#lineText")) q("#lineText").textContent = data.lineId || "@301thssm";

  setImage(q("#brandLogo"), q("#logoFallback"), data.brandLogo || "./assets/brand-mark.png");
  setImage(q("#projectImage"), null, data.projectImage);
  setImage(q("#qrImage"), q("#qrFallback"), data.qrImage || "./assets/qrcode.png");

  renderPriceTable(data);
  renderNotes(data);
}

if (!window.OFFER_SKIP_AUTO_RENDER) {
  renderPoster(getDataFromUrl());
}
