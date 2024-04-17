document.addEventListener('DOMContentLoaded', function () {
    const numberInputs = document.querySelectorAll('.number-input');

    
    
    const ageSelect = document.getElementById('age');
    const submitBtn = document.getElementById('submit');
    const errorMessage = document.querySelector('.error-message');
    const selectErrorMessage = document.querySelector('.select-error-message');
   
    numberInputs.forEach(input => {
        input.addEventListener('input', function () {
            const value = this.value.trim();

            if (value === '') {
                hideErrorIcon(this); 
            } else if (!/^\d+$/.test(value)) { 
                showErrorIcon(this); 
            } else {
                hideErrorIcon(this); 
            }
        });
    });

    function showErrorIcon(inputElement) {
        const errorIcon = inputElement.parentElement.querySelector('.error-icon');
        errorIcon.style.display = 'inline'; 
    }
    
    function hideErrorIcon(inputElement) {
        const errorIcon = inputElement.parentElement.querySelector('.error-icon');
        errorIcon.style.display = 'none'; 
    }

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(grossIncome, "gross income")
        validateForm();
    });

    function validateForm() {
        let isValid = true;
        numberInputs.forEach(input => {
            const value = input.value.trim();
            if (value === '') {
                isValid = false;
                errorMessage.textContent = 'Please fill in all required fields.';
            } else if (!/^\d+$/.test(value)) {
                isValid = false;
                errorMessage.textContent = 'Please enter a valid number.';
            } else if (input.id === 'grossIncome' && value === '0') {
                isValid = false;
                errorMessage.textContent = 'Income field cannot have value of 0.';
            }
            
            else {
                hideErrorIcon(input); 
            }

        });

        const selectedAge = ageSelect.value;
        if (selectedAge === '') {
            isValid = false;
            selectErrorMessage.textContent = 'Please select an age group.';
        } else {
            selectErrorMessage.textContent = ''; 
        }

        if (!isValid) {
            errorMessage.style.display = 'block';
            selectErrorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            selectErrorMessage.style.display = 'none';
            calculateTax(); 
        }
    }

    function calculateTax() {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value.trim()) || 0;
        const extraIncome = parseFloat(document.getElementById('extraIncome').value.trim()) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value.trim()) || 0;
        const age = document.getElementById('age').value.trim();
    
        let taxableIncome = grossIncome + extraIncome - deductions;
        let taxAmount = 0;
    
        if (taxableIncome > 800000) {
            const taxRate = (age === '<40') ? 0.3 : (age === '≥ 40 & < 60') ? 0.4 : 0.1;
            taxAmount = taxRate * (taxableIncome - 800000);
        }
    
        const incomeAfterTax = taxableIncome - taxAmount;

        displayTaxResult(taxAmount, incomeAfterTax);
    }
    
    function displayTaxResult(taxAmount, incomeAfterTax) {
    const modalBody = document.getElementById('modal-body');

    if (taxAmount > 0) {
        modalBody.innerHTML = `
            <p data-test="tax-amount-paid" >Tax to be paid: ₹${taxAmount.toLocaleString()}</p>
            <p data-test="income-after-tax">Income after tax: ₹${incomeAfterTax.toLocaleString()}</p>
        `;
    } else {
        modalBody.innerHTML = `<p>No tax applicable.</p>
        <p data-test="income-after-tax" >Income after deductions: ₹${incomeAfterTax.toLocaleString()}</p>
        `;
    }


    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

});




const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))



