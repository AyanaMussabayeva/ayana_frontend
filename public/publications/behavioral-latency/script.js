"use strict";
document.documentElement.classList.add("js");
if (window.lucide) window.lucide.createIcons();
const $ = (selector) => document.querySelector(selector);
const colors = { ink: "#20232a", muted: "#5b6371", line: "#cbd5e1", blue: "#365dc5", cyan: "#0b7285", pink: "#b52b7b" };

// Table 5: reported seed means and sample SDs, not confidence intervals.
const backboneData = {
  unet: [[0.8917, 0.0046], [0.8753, 0.0039], [0.8745, 0.0053]],
  tcn: [[0.8842, 0.0045], [0.8730, 0.0038], [0.8722, 0.0021]],
  inception: [[0.8886, 0.0044], [0.8717, 0.0036], [0.8746, 0.0028]],
  attention: [[0.9052, 0.0300], [0.8780, 0.0082], [0.8752, 0.0050]],
};
const objectiveNames = ["RT-only soft-argmax", "CE", "Mixture EventNLL"];
const objectiveColors = [colors.muted, colors.blue, colors.cyan];
// Table 7: each pair is [fixed training, shift-jitter training].
const shiftData = {
  mixture: [[0.8745, 0.8734], [0.8663, 0.8576], [0.6021, 0.6249], [0.7730, 0.7925]],
  ce: [[0.8753, 0.8749], [0.8679, 0.8569], [0.5810, 0.5831], [0.7780, 0.7924]],
  event: [[0.8772, 0.8771], [0.8685, 0.8593], [0.5842, 0.6174], [0.7739, 0.7937]],
  hazard: [[0.8778, 0.8806], [0.8692, 0.8609], [0.5618, 0.5891], [0.7694, 0.7925]],
  rt: [[0.8917, 0.8836], [0.8857, 0.8613], [0.5381, 0.5775], [0.7592, 0.7951]],
  wasserstein: [[0.8896, 0.8922], [0.8932, 0.8774], [0.6684, 0.6852], [0.7830, 0.8026]],
};

function prepareCanvas(canvas) {
  const { width, height } = canvas.getBoundingClientRect();
  if (!width || !height) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
  ctx.textBaseline = "middle";
  return { ctx, width, height };
}
function line(ctx, x1, y1, x2, y2, color, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}
const backboneCanvas = document.createElement("canvas");
$("#backbone-chart").append(backboneCanvas);
function drawBackbone() {
  const prepared = prepareCanvas(backboneCanvas);
  if (!prepared) return;
  const { ctx, width } = prepared;
  const left = width < 430 ? 100 : 151;
  const right = width - 20;
  const x = (v) => left + ((v - 0.86) / 0.08) * (right - left);
  const names = width < 430 ? ["RT-only", "CE", "Mixture NLL"] : objectiveNames;
  ctx.textAlign = "center";
  for (const value of (width < 350 ? [0.86, 0.90, 0.94] : [0.86, 0.88, 0.90, 0.92, 0.94])) {
    line(ctx, x(value), 10, x(value), 112, "#e6ebf1");
    ctx.fillStyle = colors.muted; ctx.fillText(value.toFixed(2), x(value), 129);
  }
  backboneData[$("#backbone").value].forEach(([mean, sd], i) => {
    const y = 24 + i * 36;
    ctx.textAlign = "left"; ctx.fillStyle = colors.ink; ctx.fillText(names[i], 0, y);
    line(ctx, x(mean - sd), y, x(mean + sd), y, objectiveColors[i], 2);
    line(ctx, x(mean - sd), y - 4, x(mean - sd), y + 4, objectiveColors[i]);
    line(ctx, x(mean + sd), y - 4, x(mean + sd), y + 4, objectiveColors[i]);
    ctx.fillStyle = objectiveColors[i]; ctx.beginPath(); ctx.arc(x(mean), y, 4, 0, Math.PI * 2); ctx.fill();
  });
}
$("#backbone").addEventListener("change", () => {
  const select = $("#backbone"), values = backboneData[select.value];
  $("#backbone-values").querySelectorAll("tr").forEach((row, i) => {
    row.querySelector("td").textContent = `${values[i][0].toFixed(4)} \u00b1 ${values[i][1].toFixed(4)}`;
  });
  $("#backbone-status").textContent = `Results for ${select.selectedOptions[0].textContent}. ${objectiveNames.map((name, i) => `${name}: ${values[i][0].toFixed(4)}`).join(". ")}. Lower nRMSE is better.`;
  drawBackbone();
});
$("#shift-objective").addEventListener("change", () => {
  const select = $("#shift-objective");
  $("#shift-results").querySelectorAll("tr").forEach((row, i) => {
    row.querySelectorAll("td").forEach((cell, j) => { cell.textContent = shiftData[select.value][i][j].toFixed(4); });
  });
  $("#shift-results").closest("table").querySelector("caption").textContent = `${select.selectedOptions[0].textContent}: fixed-window training compared with shift-jitter training`;
});

const shiftCanvas = $("#shift-canvas");
function shiftState() {
  const start = Number($("#crop-start").value);
  const tracks = $('input[name="shift-mode"]:checked').value === "localizer";
  const trueRelative = 1.7 - start, predictedRelative = tracks ? trueRelative : 1.2;
  return { start, tracks, trueRelative, predictedRelative, predictedAbsolute: start + predictedRelative };
}
function drawShift() {
  const prepared = prepareCanvas(shiftCanvas);
  if (!prepared) return;
  const { ctx, width } = prepared;
  const { start, trueRelative, predictedRelative, tracks } = shiftState();
  const left = 17, right = width - 17;
  const absoluteX = (t) => left + (t / 3) * (right - left);
  const relativeX = (t) => left + (t / 2) * (right - left);
  ctx.fillStyle = colors.ink; ctx.fillText("Time from stimulus (s)", left, 10);
  ctx.fillStyle = "#d7e9ee"; ctx.fillRect(absoluteX(start), 34, absoluteX(start + 2) - absoluteX(start), 27);
  ctx.fillStyle = colors.cyan; ctx.fillText("2 s crop", absoluteX(start) + 7, 48);
  line(ctx, absoluteX(1.7), 26, absoluteX(1.7), 64, colors.pink, 2);
  ctx.textAlign = "right"; ctx.fillStyle = colors.pink; ctx.fillText("Event: 1.70 s", right, width < 350 ? 25 : 10);
  line(ctx, left, 64, right, 64, "#b9ccd4");
  ctx.textAlign = "center";
  for (const value of [0, 1, 2, 3]) {
    line(ctx, absoluteX(value), 64, absoluteX(value), 68, colors.muted);
    ctx.fillStyle = colors.muted; ctx.fillText(value.toFixed(1), absoluteX(value), 80);
  }
  ctx.textAlign = "left"; ctx.fillStyle = colors.ink; ctx.fillText("Posterior inside the crop", left, 111);
  // Synthetic Gaussians illustrate coordinates, never empirical predictions.
  const base = 215, peak = 60, sigma = 0.115;
  function curve(mean, color, dashed = false) {
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * 2, y = base - peak * Math.exp(-0.5 * ((t - mean) / sigma) ** 2);
      if (i === 0) ctx.moveTo(relativeX(t), y); else ctx.lineTo(relativeX(t), y);
    }
    if (!dashed) {
      ctx.lineTo(right, base); ctx.lineTo(left, base); ctx.closePath();
      ctx.fillStyle = tracks ? "#0b72851a" : "#365dc51a"; ctx.fill();
    }
    ctx.setLineDash(dashed ? [4, 4] : []); ctx.strokeStyle = color;
    ctx.lineWidth = dashed ? 1.5 : 2.5; ctx.stroke(); ctx.setLineDash([]);
  }
  curve(1.2, "#8994a4", true); curve(predictedRelative, tracks ? colors.cyan : colors.blue);
  ctx.setLineDash([3, 4]); line(ctx, relativeX(trueRelative), 151, relativeX(trueRelative), base, colors.pink, 1.5); ctx.setLineDash([]);
  line(ctx, left, base, right, base, "#b9ccd4");
  ctx.textAlign = "center";
  for (const value of [0, 0.5, 1, 1.5, 2]) {
    line(ctx, relativeX(value), base, relativeX(value), base + 4, colors.muted);
    ctx.fillStyle = colors.muted; ctx.fillText(value.toFixed(1), relativeX(value), base + 15);
  }
  ctx.textAlign = "left"; ctx.fillStyle = colors.muted; ctx.fillText("Dashed: canonical crop", left, 132);
  ctx.fillStyle = tracks ? colors.cyan : colors.blue; ctx.textAlign = "right";
  ctx.fillText("Solid: selected crop", right, width < 350 ? 147 : 132);
  ctx.textAlign = "center"; ctx.fillStyle = colors.muted; ctx.fillText("Crop-relative time (s)", width / 2, 249);
}
function updateShift() {
  const s = shiftState(), seconds = (v) => `${v.toFixed(2)} s`;
  $("#crop-output").textContent = seconds(s.start);
  $("#true-relative").textContent = seconds(s.trueRelative);
  $("#pred-relative").textContent = seconds(s.predictedRelative);
  $("#pred-absolute").textContent = seconds(s.predictedAbsolute);
  let explanation = "At the canonical crop, both behaviors give the same prediction. A shift reveals how they differ.";
  if (Math.abs(s.start - 0.5) > 0.001) explanation = s.tracks
    ? `The posterior moves to ${seconds(s.predictedRelative)} within the crop. Adding the new crop start still recovers the same event at 1.70 s after stimulus onset.`
    : `The posterior stays at 1.20 s within the crop. Its stimulus-relative prediction drifts to ${seconds(s.predictedAbsolute)}, ${Math.abs(s.predictedAbsolute - 1.7).toFixed(2)} s away from the unchanged event.`;
  $("#shift-explanation").textContent = explanation;
  shiftCanvas.setAttribute("aria-label", `Schematic, not experimental data. Crop start ${seconds(s.start)}. True event ${seconds(s.trueRelative)} within the crop. Predicted event ${seconds(s.predictedRelative)} within the crop, or ${seconds(s.predictedAbsolute)} after stimulus. ${explanation}`);
  drawShift();
}
$("#crop-start").addEventListener("input", updateShift);
document.querySelectorAll('input[name="shift-mode"]').forEach((input) => input.addEventListener("change", updateShift));
$("#reset-shift").addEventListener("click", () => {
  $("#crop-start").value = "0.5"; $('input[name="shift-mode"][value="localizer"]').checked = true; updateShift();
});
if ("ResizeObserver" in window) {
  const resize = new ResizeObserver(() => { drawBackbone(); drawShift(); });
  resize.observe($("#backbone-chart")); resize.observe(shiftCanvas);
} else window.addEventListener("resize", () => { drawBackbone(); drawShift(); });
drawBackbone(); updateShift();

const chapters = [...document.querySelectorAll(".chapter")];
const contentsLinks = [...document.querySelectorAll(".contents nav a")];
let scrollFrame = false;
function updateReadingPosition() {
  const length = document.documentElement.scrollHeight - window.innerHeight;
  $("#progress").style.width = `${length > 0 ? Math.min(100, (window.scrollY / length) * 100) : 0}%`;
  const active = chapters.filter((chapter) => chapter.getBoundingClientRect().top <= 170).at(-1);
  contentsLinks.forEach((link) => {
    if (active && link.hash === `#${active.id}`) link.setAttribute("aria-current", "true"); else link.removeAttribute("aria-current");
  });
  scrollFrame = false;
}
window.addEventListener("scroll", () => {
  if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(updateReadingPosition); }
}, { passive: true });
window.addEventListener("resize", updateReadingPosition); updateReadingPosition();

const figureDialog = $("#figure-dialog");
let previousFigureLink;
document.querySelectorAll("[data-figure]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || !figureDialog.showModal) return;
    event.preventDefault();
    const caption = link.closest("figure").querySelector("figcaption");
    previousFigureLink = link;
    $("#figure-image").src = link.href; $("#figure-image").alt = link.querySelector("img").alt;
    $("#figure-original").href = link.href;
    $("#figure-title").textContent = caption?.querySelector("span")?.textContent || "Paper figure";
    $("#figure-caption").textContent = caption?.textContent || "";
    $(".dialog-image").classList.remove("zoomed");
    figureDialog.showModal(); document.body.classList.add("dialog-open"); $("#close-figure").focus();
  });
});
$("#close-figure").addEventListener("click", () => figureDialog.close());
figureDialog.addEventListener("click", (event) => {
  const r = figureDialog.getBoundingClientRect();
  if (event.target === figureDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) figureDialog.close();
});
figureDialog.addEventListener("close", () => { document.body.classList.remove("dialog-open"); previousFigureLink?.focus({ preventScroll: true }); });
$("#figure-image").addEventListener("click", () => $(".dialog-image").classList.toggle("zoomed"));
$("#copy-citation").addEventListener("click", async () => {
  const citation = $("#bibtex").textContent;
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(citation); copied = true; }
  } catch (_) { /* Local-file pages may not have clipboard permission. */ }
  if (!copied) {
    const field = document.createElement("textarea"); field.value = citation;
    field.style.cssText = "position:fixed;left:-9999px;top:0"; document.body.append(field); field.select();
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    field.remove(); $("#copy-citation").focus({ preventScroll: true });
  }
  $("#copy-status").textContent = copied ? "BibTeX copied." : "Clipboard unavailable. Download the BibTeX file or select the citation text.";
});
