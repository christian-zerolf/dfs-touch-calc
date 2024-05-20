const expData = [
	null,
	0,
	50,
	140,
	271,
	441,
	653,
	905,
	1199,
	1534,
	1911,
	2330,
	2792,
	3297,
	3846,
	4439,
	5078,
	5762,
	6493,
	7271,
	8097,
	8973,
	9898,
	10875,
	11903,
	12985,
	14122,
	15315,
	16564,
	17873,
	19242,
	20672,
	22166,
	23726,
	25353,
	27048,
	28815,
	30656,
	32572,
	34566,
	36641,
	38800,
	41044,
	43378,
	45804,
	48325,
	50946,
	53669,
	56498,
	59437,
	62491,
	65664,
	68960,
	72385,
	75943,
	79640,
	83482,
	87475,
	91624,
	95937,
	100421,
	105082,
	109930,
	114971,
	120215,
	125671,
	131348,
	137256,
	143407,
	149811,
	156481,
	163429,
	170669,
	178214,
	186080,
	194283,
	202839,
	211765,
	221082,
	230808,
	240964,
	251574,
	262660,
	274248,
	286364,
	299037,
	312297,
	326175,
	340705,
	355924,
	371870,
	388582,
	406106,
	424486,
	443772,
	464016,
	485274,
	507604,
	531071,
	555741,
	581687,
];

const expBySlot = [10, 25, 50, 100, 250, 500, 1000];
const expBySlotBonus = [15, 37, 75, 150, 375, 750, 1500];

const inputs = document.querySelectorAll('input');
const $currentLevel = document.querySelector('#input-current-level');
const $currentExp = document.querySelector('#input-current-exp');
const $targetLevel = document.querySelector('#input-target-level');
const $slots = document.querySelector('#input-slots');
const $bonus = document.querySelector('#input-bonus');

const $targetExp = document.querySelector('#input-target-exp');
const $neededExp = document.querySelector('#input-needed-exp');

const $craftExp = document.querySelector('#input-craft-exp');

const $validOk = document.querySelector('#input-valid-ok');
const $whyNot = document.querySelector('.why-not');

const $total = document.querySelector('#input-total');
const $divTotal = document.querySelector('.total');

const $calculateButton = document.querySelector('.calculator-button');

$currentLevel.addEventListener('input', (event) => {
	let currentLevel = parseInt(event.target.value);
	let slots = parseInt($slots.value);
	let targetValue = parseInt($targetLevel.value);
	$currentExp.value = expData[$currentLevel.value];
	let currentExp = parseInt($currentExp.value);
	getNeededExp(currentExp, getTargetExp(targetValue));
	validateOk(slots, targetValue, currentLevel, currentExp);
});

$currentExp.addEventListener('input', (event) => {
	let currentExp = parseInt(event.target.value);
	let currentLevel = parseInt($currentLevel.value);
	let slots = parseInt($slots.value);
	let targetValue = parseInt($targetLevel.value);
	getNeededExp(currentExp, getTargetExp(targetValue));
	validateOk(slots, targetValue, currentLevel, currentExp);
});

$targetLevel.addEventListener('input', (event) => {
	let targetValue = parseInt(event.target.value);
	let currentExp = parseInt($currentExp.value);
	getNeededExp(currentExp, getTargetExp(targetValue));
	let slots = parseInt($slots.value);
	let currentLevel = parseInt($currentLevel.value);
	validateOk(slots, targetValue, currentLevel, currentExp);
});

const getNeededExp = (current, target) => {
	let neededExp = parseInt(target - current);
	neededExp = neededExp > 0 ? neededExp : 0;
	$neededExp.value = neededExp;
	return neededExp;
};

const getTargetExp = (value) => {
	let targetExp = expData[value];
	$targetExp.value = expData[value];
	return targetExp;
};

$slots.addEventListener('input', (event) => {
	let slots = parseInt(event.target.value);
	let targetValue = parseInt($targetLevel.value);
	let currentLevel = parseInt($currentLevel.value);
	let currentExp = parseInt($currentExp.value);
	validateOk(slots, targetValue, currentLevel, currentExp);

	if ($bonus.checked) {
		$craftExp.value = expBySlotBonus[slots - 2];
	} else {
		$craftExp.value = expBySlot[slots - 2];
	}

	$bonus.addEventListener('input', function () {
		if ($bonus.checked) {
			$craftExp.value = expBySlotBonus[slots - 2];
		} else {
			$craftExp.value = expBySlot[slots - 2];
		}
	});
});

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
		$validOk.value = 'ERROR';
		$validOk.classList.add('input-invalid-ok');
		$whyNot.textContent = 'Por favor, verifica todos los campos';
	} else if (level >= target) {
		$validOk.value = 'ERROR';
		$validOk.classList.add('input-invalid-ok');
		$whyNot.textContent =
			'El nivel de oficio objetivo debe ser mayor al actual';
	} else if (
		(target > 80 && slot < 4) ||
		(target > 60 && slot < 3) ||
		(target > 40 && slot < 2)
	) {
		$validOk.value = 'ERROR';
		$validOk.classList.add('input-invalid-ok');
		$whyNot.textContent = 'Cantidad de Ranuras en la receta es muy bajo';
	} else if (
		(level < 80 && slot >= 7) ||
		(level < 60 && slot >= 6) ||
		(level < 40 && slot >= 5) ||
		(level < 20 && slot >= 4) ||
		(level < 10 && slot >= 3)
	) {
		$validOk.value = 'ERROR';
		$validOk.classList.add('input-invalid-ok');
		$whyNot.textContent =
			'Tu nivel de Oficio no te permite fabricar esta receta';
	} else if (
		$currentExp.value < expData[$currentLevel.value] ||
		$currentExp.value >= expData[$targetLevel.value] ||
		$currentExp.value >= expData[parseInt($currentLevel.value) + 1]
	) {
		$validOk.value = 'ERROR';
		$validOk.classList.add('input-invalid-ok');
		$whyNot.textContent = 'Revisa tu experiencia o nivel de oficio';
	} else {
		$validOk.value = 'OK';
		$validOk.classList.remove('input-invalid-ok');
		$whyNot.textContent = 'Valores validos para calcular';
	}
};

document.addEventListener('DOMContentLoaded', function () {
	let slots = parseInt($slots.value);
	let targetValue = parseInt($targetLevel.value);
	let currentLevel = parseInt($currentLevel.value);

	if ($bonus.checked) {
		$craftExp.value = expBySlotBonus[slots - 2];
	} else {
		$craftExp.value = expBySlot[slots - 2];
	}

	$bonus.addEventListener('input', function () {
		if ($bonus.checked) {
			$craftExp.value = expBySlotBonus[slots - 2];
		} else {
			$craftExp.value = expBySlot[slots - 2];
		}
	});

	let currentExp = parseInt($currentExp.value);
	validateOk(slots, targetValue, currentLevel, currentExp);
	getNeededExp(currentExp, getTargetExp(targetValue));
});

$calculateButton.addEventListener('click', calculateTotal);

function calculateTotal() {
	showTotalDiv();
	let total = $neededExp.value / $craftExp.value;
	total = Math.ceil(total);
	if (
		total > 11472 ||
		total <= 0 ||
		isNaN(total) ||
		total === Infinity ||
		$validOk.value === 'ERROR'
	) {
		$divTotal.classList.add('total-hide');
		$divTotal.classList.remove('total-show');
	} else {
		$total.textContent = total;
	}
}

function showTotalDiv() {
	$divTotal.classList.remove('total-hide');
	$divTotal.classList.add('total-show');
}

inputs.forEach((input) => {
	input.addEventListener('change', () => {
		$divTotal.classList.add('total-hide');
		$divTotal.classList.remove('total-show');
	});
});

inputs.forEach((input) => {
	input.addEventListener('input', () => {
		if ($validOk.value === 'ERROR' || input.value === undefined) {
			$calculateButton.disabled = true;
		} else {
			$calculateButton.disabled = false;
		}
	});
});
