import { data } from "./data";

const $currentLevel = document.querySelector("#input-current-level");
const $currentExp = document.querySelector("#input-current-exp");
const $targetLevel = document.querySelector("#input-target-level");
const $slots = document.querySelector("#input-slots");
const $bonus = document.querySelector("#input-bonus");

const $targetExp = document.querySelector("#input-target-exp");
const $neededExp = document.querySelector("#input-needed-exp");

const $craftExp = document.querySelector("#input-craft-exp");

const $validOk = document.querySelector("#input-valid-ok");
const $statusMessage = document.querySelector(".status-message");

const $total = document.querySelector("#input-total");
const $divTotal = document.querySelector(".total");

const $calculateButton = document.querySelector(".calculator-button");

const getNeededExp = (current, target) => {
  let neededExp = Math.max(0, target - current);
  $neededExp.value = neededExp;
  return neededExp;
};

const getTargetExp = (value) => {
  const targetExp = data.expData[value] || 0;
  $targetExp.value = targetExp;
  return targetExp;
};

const validateOk = (slot, target, level, exp) => {
  if (
    isNaN(slot) ||
    isNaN(target) ||
    isNaN(level) ||
    isNaN(exp) ||
    slot < 2 ||
    slot > 7 ||
    target < 1 ||
    target > 100 ||
    level < 1 ||
    level > 99
  ) {
    $validOk.value = "ERROR";
    $validOk.classList.add("input-invalid-ok");
    $statusMessage.textContent = "Por favor, verifica todos los campos";
  } else if (level >= target) {
    $validOk.value = "ERROR";
    $validOk.classList.add("input-invalid-ok");
    $statusMessage.textContent = "El nivel de oficio objetivo debe ser mayor al actual";
  } else if ((target > 80 && slot < 4) || (target > 60 && slot < 3) || (target > 40 && slot < 2)) {
    $validOk.value = "ERROR";
    $validOk.classList.add("input-invalid-ok");
    $statusMessage.textContent = "Cantidad de Ranuras en la receta es muy bajo";
  } else if (
    (level < 80 && slot >= 7) ||
    (level < 60 && slot >= 6) ||
    (level < 40 && slot >= 5) ||
    (level < 20 && slot >= 4) ||
    (level < 10 && slot >= 3)
  ) {
    $validOk.value = "ERROR";
    $validOk.classList.add("input-invalid-ok");
    $statusMessage.textContent = "Tu nivel de Oficio no te permite fabricar esta receta";
  } else if (
    $currentExp.value < data.expData[$currentLevel.value] ||
    $currentExp.value >= data.expData[$targetLevel.value] ||
    $currentExp.value >= data.expData[parseInt($currentLevel.value) + 1]
  ) {
    $validOk.value = "ERROR";
    $validOk.classList.add("input-invalid-ok");
    $statusMessage.textContent = "Revisa tu experiencia o nivel de oficio";
  } else {
    $validOk.value = "OK";
    $validOk.classList.remove("input-invalid-ok");
    $statusMessage.textContent = "Valores validos para calcular";
  }
};

const updateAll = () => {
  const currentLevel = parseInt($currentLevel.value);
  const slots = parseInt($slots.value);
  const targetValue = parseInt($targetLevel.value);
  const currentExp = parseInt($currentExp.value);

  getNeededExp(currentExp, getTargetExp(targetValue));

  validateOk(slots, targetValue, currentLevel, currentExp);

  if ($bonus.checked) {
    $craftExp.value = data.expByBonus[slots - 2] || 0;
  } else {
    $craftExp.value = data.expBySlot[slots - 2] || 0;
  }

  $calculateButton.disabled = $validOk.value === "ERROR";
};

const showTotalDiv = () => {
  $divTotal.classList.remove("total-hide");
  $divTotal.classList.add("total-show");
};

const calculateTotal = () => {
  showTotalDiv();
  let total = $neededExp.value / $craftExp.value;
  total = Math.ceil(total);
  if (
    total > 11472 ||
    total <= 0 ||
    isNaN(total) ||
    total === Infinity ||
    $validOk.value === "ERROR"
  ) {
    $divTotal.classList.add("total-hide");
    $divTotal.classList.remove("total-show");
  } else {
    $total.textContent = total;
  }
};

$currentLevel.addEventListener("input", () => {
  $currentExp.value = data.expData[$currentLevel.value];
  updateAll();
});
$currentExp.addEventListener("input", updateAll);
$targetLevel.addEventListener("input", updateAll);
$slots.addEventListener("input", updateAll);
$bonus.addEventListener("change", updateAll);

$calculateButton.addEventListener("click", calculateTotal);

document.addEventListener("DOMContentLoaded", function () {
  updateAll();
});
