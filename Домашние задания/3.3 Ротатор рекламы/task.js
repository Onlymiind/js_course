const defaultTimeout = 1000;

function changeRotatorCase(idx, rotatorCases) {
  rotatorCases[idx].classList.remove('rotator__case_active');
  idx = (idx + 1) % rotatorCases.length;
  rotatorCases[idx].classList.add('rotator__case_active');
  setTimeout(
    () => changeRotatorCase(idx, rotatorCases),
    getRotatorCaseTimeout(rotatorCases[idx])
  );
}

function getRotatorCaseTimeout(rotatorCase) {
  return rotatorCase.dataset.speed ? parseInt(rotatorCase.dataset.speed) : defaultTimeout;
}



const rotators = Array.from(document.getElementsByClassName('rotator'));

for (const rotator of rotators) {
  const cases = Array.from(rotator.getElementsByClassName('rotator__case'));
  if (cases.length == 0)
    continue;
  for (const i in cases) {
    if (cases[i].dataset.color)
      cases[i].style.color = cases[i].dataset.color;
  }

  setTimeout(
    () => changeRotatorCase(0, cases),
    getRotatorCaseTimeout(cases[0])
  );
}
