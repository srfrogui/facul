document.addEventListener('DOMContentLoaded', function () {
    const tipoMelInput = document.getElementById('tipoMel');
    const tipoMelOptions = document.querySelectorAll('.tipo-mel-option');
  
    tipoMelInput.addEventListener('input', function () {
      const userInput = tipoMelInput.value.toLowerCase();
      tipoMelOptions.forEach(function (option) {
        const optionValue = option.getAttribute('data-value').toLowerCase();
        if (optionValue.includes(userInput)) {
          option.style.display = 'block';
        } else {
          option.style.display = 'none';
        }
      });
    });
  });
  