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
            } else {
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
        console.log(incomeAfterTax)
        displayTaxResult(taxAmount, incomeAfterTax);
    }
    
    function displayTaxResult(taxAmount, incomeAfterTax) {
    const modalBody = document.getElementById('modal-body');

    if (taxAmount > 0) {
        modalBody.innerHTML = `
            <p>Tax to be paid: ₹${taxAmount.toLocaleString()}</p>
            <p>Income after tax: ₹${incomeAfterTax.toLocaleString()}</p>
        `;
    } else {
        modalBody.innerHTML = `<p>No tax applicable.</p>
        <p>Income after deductions: ₹${incomeAfterTax.toLocaleString()}</p>
        `;
    }


    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

});




const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))




//     const submitBtn = document.getElementById('submit');

//     const numberInputs = document.querySelectorAll('.number-input');
//     const errorIcons = document.querySelectorAll('.error-icon');

//     numberInputs.forEach(input => {
//         input.addEventListener('input', function () {
//             const value = this.value.trim();

//             if (value === '') { // Check if input is empty
//                 hideErrorIcon(this); // Hide the error icon
//             } else if (!/^\d+$/.test(value)) { // Check if input is not a valid number
//                 showErrorIcon(this); // Show the error icon
//             } else {
//                 hideErrorIcon(this); // Hide the error icon if input is valid
//             }
//         });
//     });

//     function showErrorIcon(inputElement) {
//         const errorIcon = inputElement.previousElementSibling;
//         errorIcon.style.display = 'inline'; // Show the error icon
//     }

//     function hideErrorIcon(inputElement) {
//         const errorIcon = inputElement.previousElementSibling;
//         errorIcon.style.display = 'none'; // Hide the error icon
//     }


//     submitBtn.addEventListener('click', function (event) {
//         event.preventDefault(); // Prevent form submission



//         // const grossIncomeInput = document.getElementById('grossIncome');
//         // const extraIncomeInput = document.getElementById('extraIncome');
//         // const ageSelect = document.getElementById('age');
//         // const deductionsInput = document.getElementById('deductions');

//         // // Check if age is selected
//         // if (ageSelect.value === '') {
//         //     console.error('Age group is required.');    
//         //     return;
//         // }

//         // // Validate and calculate tax
//         // const grossIncome = parseFloat(grossIncomeInput.value) || 0;
//         // const extraIncome = parseFloat(extraIncomeInput.value) || 0;
//         // const deductions = parseFloat(deductionsInput.value) || 0;
//         // const ageGroup = ageSelect.value;

//         // if (isNaN(grossIncome) || grossIncome <= 0) {
//         //     console.error('Invalid gross annual income.');
//         //     return;
//         // }

//         // if (isNaN(extraIncome) || extraIncome < 0) {
//         //     console.error('Invalid extra income.');
//         //     return;
//         // }

//         // if (isNaN(deductions) || deductions < 0) {
//         //     console.error('Invalid deductions.');
//         //     return;
//         // }

//         // let taxableIncome = grossIncome + extraIncome - deductions;
//         // let taxAmount = 0;

//         // if (taxableIncome > 800000) {
//         //     if (ageGroup === '<40') {
//         //         taxAmount = 0.3 * (taxableIncome - 800000);
//         //     } else if (ageGroup === '≥ 40 & < 60') {
//         //         taxAmount = 0.4 * (taxableIncome - 800000);
//         //     } else if (ageGroup === '≥ 60') {
//         //         taxAmount = 0.1 * (taxableIncome - 800000);
//         //     }
//         // }

//         // console.log('Tax Amount:', taxAmount.toFixed(2));
//         // Here you can proceed with displaying the modal or performing other actions
//     });
// });



// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
























// // // Get all input fields and error icons
// // console.log('hello')


// // const grossIncomeInput = document.getElementById('grossIncome');
// // const extraIncomeInput = document.getElementById('extraIncome');
// // const deductionsInput = document.getElementById('deductions');
// // const ageSelect = document.getElementById('age');
// // const errorIcons = document.getElementsByClassName(".error-icon");

// // // Function to show error icon and tooltip for an input field
// // function showError(input, message) {
// //   const icon = input.nextElementSibling;
// //   icon.classList.add('visible');
// //   icon.setAttribute('data-bs-original-title', message);
// //   icon.setAttribute('data-bs-toggle', 'tooltip');
// //   icon.setAttribute('data-bs-placement', 'top');
// //   $(icon).tooltip('show');
// // }

// // // Function to hide error icon and tooltip for an input field
// // function hideError(input) {
// // //   const icon = input.nextElementSibling;
// // //   icon.classList.remove('visible');
// // //   $(icon).tooltip('dispose');
// // }

// // // Function to validate an input field
// // function validateInput(input, message) {
// //   if (input.value.trim() === '') {
// //     showError(input, message);
// //     return false;
// //   } else {
// //     hideError(input);
// //     return true;
// //   }
// // }

// // // Function to calculate tax based on age and income
// // function calculateTax(e) {
// //     // Prevent form submission from reloading the page

// //     e.preventDefault()
// //     let isValid = true;
// //     // errorIcons.forEach(icon => icon.classList.remove('visible'));
// //     isValid = validateInput(grossIncomeInput, 'Gross annual income is required');
// //     isValid = validateInput(extraIncomeInput, 'Extra income is required');
// //     isValid = validateInput(deductionsInput, 'Deductions are required');
// //     if (ageSelect.value === '') {
// //       showError(ageSelect, 'Age is required');
// //       isValid = false;
// //     }
// //     if (!isValid) return;
  
// //     // Calculate overall income
// //     const overallIncome = parseFloat(grossIncomeInput.value) + parseFloat(extraIncomeInput.value) - parseFloat(deductionsInput.value);
  
// //     // Calculate tax based on age and income
// //     let tax = 0;
// //     if (overallIncome <= 800000) {
// //       tax = 0;
// //     } else {
// //       const excessIncome = overallIncome - 800000;
// //       if (ageSelect.value === '<40') {
// //         tax = excessIncome * 0.3;
// //       } else if (ageSelect.value === '≥ 40 & < 60') {
// //         tax = excessIncome * 0.4;
// //       } else if (ageSelect.value === '≥ 60') {
// //         tax = excessIncome * 0.1;
// //       }
// //     }
  
// //     // Show modal with tax calculation
// //     const modalBody = document.getElementById('modal-body');
// //     modalBody.innerHTML = `
// //       <p>Gross annual income: ${grossIncomeInput.value}</p>
// //       <p>Extra income: ${extraIncomeInput.value}</p>
// //       <p>Deductions: ${deductionsInput.value}</p>
// //       <p>Age: ${ageSelect.value}</p>
// //       <p>Overall income: ${overallIncome}</p>
// //       <p>Tax: ${tax}</p>
// //     `;
// //     $('#exampleModal').modal('show');
// //   }
  
// //   // Add event listener to submit button
// //   document.getElementById('submit').addEventListener('click', calculateTax);

// // // Initialize tooltip component
// // // $(function () {
// // //   $('[data-bs-toggle="tooltip"]').tooltip()
// // // });