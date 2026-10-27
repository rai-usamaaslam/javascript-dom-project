
const filterContainer = document.querySelector(".filters");
const presetContainer = document.querySelector(".presets");
const imageCanvas = document.querySelector(".image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const reset = document.querySelector("#Resetbtn");
const Download = document.querySelector("#DownloadBTn");

let image = null;

const defaultFilters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  exposure: { value: 100, min: 0, max: 200, unit: "%" },
  saturation: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" }
};

let filters = structuredClone(defaultFilters);

// PRESETS
const presets = {
  Original: {
    brightness: 100,
    contrast: 100,
    exposure: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Vintage: {
    brightness: 105,
    contrast: 110,
    exposure: 100,
    saturation: 80,
    hueRotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 35,
    opacity: 100,
    invert: 0
  },

  "Black & White": {
    brightness: 100,
    contrast: 115,
    exposure: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Warm: {
    brightness: 105,
    contrast: 105,
    exposure: 100,
    saturation: 115,
    hueRotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0
  },

  Cool: {
    brightness: 100,
    contrast: 105,
    exposure: 100,
    saturation: 110,
    hueRotation: 185,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Dramatic: {
    brightness: 95,
    contrast: 150,
    exposure: 100,
    saturation: 115,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Faded: {
    brightness: 115,
    contrast: 80,
    exposure: 100,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 10,
    opacity: 100,
    invert: 0
  }
};

// CREATE FILTER SLIDERS
function createFilterElement(name, config) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const label = document.createElement("label");
  label.htmlFor = name;
  label.textContent = name;

  const input = document.createElement("input");
  input.type = "range";
  input.id = name;
  input.min = config.min;
  input.max = config.max;
  input.value = config.value;

  const output = document.createElement("span");
  output.textContent = `${config.value}${config.unit}`;

  input.addEventListener("input", () => {
    filters[name].value = Number(input.value);
    output.textContent = `${input.value}${config.unit}`;

    applyFilters();
  });

  div.append(label, input, output);
  filterContainer.appendChild(div);
}

// CREATE ALL FILTERS
function createFilters() {
  filterContainer.innerHTML = "";
  Object.entries(filters).forEach(([name, config]) => {
    createFilterElement(name, config);
  });
}

// DYNAMIC FILTER APPLICATION
function applyFilters() {
  if (!image) return;

  const f = filters;

  canvasCtx.clearRect(
    0,
    0,
    imageCanvas.width,
    imageCanvas.height
  );

  canvasCtx.filter = [
    `brightness(${f.brightness.value}%)`,
    `brightness(${f.exposure.value}%)`,
    `contrast(${f.contrast.value}%)`,
    `saturate(${f.saturation.value}%)`,
    `hue-rotate(${f.hueRotation.value}deg)`,
    `blur(${f.blur.value}px)`,
    `grayscale(${f.grayscale.value}%)`,
    `sepia(${f.sepia.value}%)`,
    `opacity(${f.opacity.value}%)`,
    `invert(${f.invert.value}%)`
  ].join(" ");

  canvasCtx.drawImage(image, 0, 0);

  // Reset the context for any later drawing operations.
  canvasCtx.filter = "none";
}

// CREATE PRESET BUTTONS
function createPresets() {
  presetContainer.innerHTML = "";

  Object.keys(presets).forEach((presetName) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = presetName;

    button.addEventListener("click", () => {
      applyPreset(presetName);
    });

    presetContainer.appendChild(button);
  });
}

// APPLY A PRESET
function applyPreset(presetName) {
  const selectedPreset = presets[presetName];

  if (!selectedPreset) return;

  Object.keys(filters).forEach((name) => {
    filters[name].value = selectedPreset[name];
  });

  // Update every slider and its displayed value.
  Object.entries(filters).forEach(([name, config]) => {
    const input = document.getElementById(name);

    if (input) {
      input.value = config.value;

      const output = input.parentElement.querySelector("span");

      if (output) {
        output.textContent = `${config.value}${config.unit}`;
      }
    }
  });

  applyFilters();
}

// UPLOAD IMAGE
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file || !file.type.startsWith("image/")) return;

  const img = new Image();
  const objectURL = URL.createObjectURL(file);

  img.onload = () => {
    image = img;

    imageCanvas.width = img.naturalWidth;
    imageCanvas.height = img.naturalHeight;

    imageCanvas.style.display = "block";

    const placeholder = document.querySelector(".placeholder");

    if (placeholder) {
      placeholder.style.display = "none";
    }

    applyFilters();
    URL.revokeObjectURL(objectURL);
  };

  img.onerror = () => {
    URL.revokeObjectURL(objectURL);
    alert("Unable to load this image.");
  };

  img.src = objectURL;
});

// RESET FILTERS
reset.addEventListener("click", () => {
  filters = structuredClone(defaultFilters);

  createFilters();
  applyFilters();
});

// DOWNLOAD EDITED IMAGE
Download.addEventListener("click", () => {
  if (!image) {
    alert("Please upload an image first.");
    return;
  }

  const link = document.createElement("a");

  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL("image/png");
  link.click();
});

// INITIALIZE EDITOR
createFilters();
createPresets();
