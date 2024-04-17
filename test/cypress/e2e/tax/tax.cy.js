import taxFixture from '../../fixtures/tax'

describe('calculate Tax income', () => {

    const baseUrl = Cypress.config("baseUrl");
    beforeEach(() => {
        cy.visit(baseUrl)
    })
    it('can see form', () => {

        cy.contains('Tax Calculator');
        cy.get('[data-test=form-container]').should('be.visible');
        cy.get('[data-test=annual-income-input]').should('be.visible');

        cy.get('[data-test="extra-income-input"]').should('be.visible')


        //check for select input values
        const selectInputValues = taxFixture.selectInputValues;
        cy.get('#age').find('option').each(($option, index) => {
            expect($option.text().trim()).to.equal(selectInputValues[index]);

        });

        cy.get('[data-test=deductions-input]').should('be.visible');


        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible');



    })

    it('cannot submit empty form', ()=> {

        cy.contains('Tax Calculator');

        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();
        cy.get('[data-test=select-input-error]').should('be.visible');
        cy.get('[data-test=error-form-text]').should('be.visible').contains('Please fill in all required fields.')
        

    })

    it('can see incorrect input tooltip showing in input field', ()=> {
        cy.contains('Tax Calculator');
        cy.get('[data-test=annual-income-input]').type(taxFixture.form.incorrectInput).should('be.visible');
        cy.get('[data-test=annual-income-input-tooltip]').trigger('mouseover');
        cy.get('.tooltip').should('be.visible').within(() => {
            cy.get('.tooltip-inner').should('contain', 'Please enter a valid number.');
          });
          cy.get('[data-test=annual-income-input-tooltip]').trigger('mouseout');

        cy.get('[data-test="extra-income-input"]').type(taxFixture.form.incorrectInput).should('be.visible');

        cy.get('[data-test=extra-income-input-tooltip]').trigger('mouseover');
        cy.get('.tooltip').should('be.visible').within(() => {
            cy.get('.tooltip-inner').should('contain', 'Please enter a valid number.');
          });
          cy.get('[data-test=extra-income-input-tooltip]').trigger('mouseout');
          cy.get('[data-test="deductions-input"]').type(taxFixture.form.incorrectInput).should('be.visible');
          cy.get('[data-test=extra-deductions-input-tooltip]').trigger('mouseover');
      
          cy.get('.tooltip').should('be.visible').within(() => {
            cy.get('.tooltip-inner').should('contain', 'Please enter a valid number.');
          });

         


    })

    it('can see  info tooltip showing  on labels', ()=> {

        cy.contains('Tax Calculator');
        cy.get('[data-test="annual-income-label-tooltip"]').trigger('mouseover')

        cy.contains('Gross annual income is your total salary in a year before any deductions')
        cy.get('[data-test="annual-income-label-tooltip"]').trigger('mouseout')

        cy.get('[data-test="extra-income-label-tooltip"]').trigger('mouseover')

        cy.contains('Extra income refers to additional earnings from sources other than your salary, such as bonuses, investments, etc.')
        // data-test="annual-income-label-tooltip"
        cy.get('[data-test="extra-income-label-tooltip"]').trigger('mouseout')

        cy.get('[data-test="select-label-tooltip"]').trigger('mouseover')
        cy.contains('Age group determines the tax rate based on your age bracket.')
        cy.get('[data-test="select-label-tooltip"]').trigger('mouseout');

        cy.get('[data-test="deductions-label-tooltip"]').trigger('mouseover')

        cy.contains('Total applicable deductions are the deductions allowed by tax laws that can reduce your taxable income.')





    })

    it('cannot submit without annual income', ()=> {

        cy.contains('Tax Calculator');

        cy.get('[data-test="extra-income-input"]').type(taxFixture.form.extraIncomeField).should('be.visible');

        cy.get('#age').select(taxFixture.form.selectInputField).should('have.value', taxFixture.form.selectInputField);

        cy.get('#age').select(taxFixture.form.selectInputField).should('have.value', taxFixture.form.selectInputField);
        cy.get('[data-test="deductions-input"]').type(taxFixture.form.deductionsInputField).should('be.visible');

        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();
        cy.get('[data-test=error-form-text]').should('be.visible').contains('Please fill in all required fields.')


    })

    it('cannot submit without extra income', ()=> {

        cy.contains('Tax Calculator');
        cy.get('[data-test=annual-income-input]').type(taxFixture.form.annualIncomeField).should('be.visible');

       

        cy.get('#age').select(taxFixture.form.selectInputField).should('have.value', taxFixture.form.selectInputField);

        cy.get('#age').select(taxFixture.form.selectInputField).should('have.value', taxFixture.form.selectInputField);
        cy.get('[data-test="deductions-input"]').type(taxFixture.form.deductionsInputField).should('be.visible');

        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();
        cy.get('[data-test=error-form-text]').should('be.visible').contains('Please fill in all required fields.')
        

    })


    it('cannot submit without age group', ()=> {

        cy.contains('Tax Calculator');
        cy.get('[data-test=annual-income-input]').type(taxFixture.form.annualIncomeField).should('be.visible');

        cy.get('[data-test="extra-income-input"]').type(taxFixture.form.extraIncomeField).should('be.visible');


        cy.get('[data-test="deductions-input"]').type(taxFixture.form.deductionsInputField).should('be.visible');

        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();
        cy.get('[data-test=select-input-error]').contains('Please select an age group.').should('be.visible');
        

    })

    it('cannot submit without applicable deducitons', ()=> {

        cy.contains('Tax Calculator');
        cy.get('[data-test=annual-income-input]').type(taxFixture.form.annualIncomeField).should('be.visible');
        cy.get('[data-test="extra-income-input"]').type(taxFixture.form.extraIncomeField).should('be.visible');
       

        cy.get('#age').select(taxFixture.form.selectInputField).should('have.value', taxFixture.form.selectInputField);

 
     

        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();
        cy.get('[data-test=error-form-text]').should('be.visible').contains('Please fill in all required fields.')
        

    })


    it('submit with all values', ()=> {

        cy.contains('Tax Calculator');
        cy.get('[data-test=annual-income-input]').type(taxFixture.form.annualIncomeField).should('be.visible');

        cy.get('[data-test="extra-income-input"]').type(taxFixture.form.extraIncomeField).should('be.visible');

        cy.get('#age').select(taxFixture.form.selectInputField).should('have.value', taxFixture.form.selectInputField);

     
        cy.get('[data-test="deductions-input"]').type(taxFixture.form.deductionsInputField).should('be.visible');
        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();
      
        cy.get('[data-test=modal-result-container]').should('be.visible');
        cy.get('[data-test=tax-amount-paid]').should('be.visible').contains(taxFixture.form.taxPaid.toLocaleString())
        cy.get('[data-test=income-after-tax]').should('be.visible').contains(taxFixture.form.incomeAfterTax.toLocaleString())

    })

   


    it('income with no tax', ()=> {

        cy.contains('Tax Calculator');
        cy.get('[data-test=annual-income-input]').type(taxFixture.form2.annualIncomeField).should('be.visible');

        cy.get('[data-test="extra-income-input"]').type(taxFixture.form2.extraIncomeField).should('be.visible');

        cy.get('#age').select(taxFixture.form2.selectInputField).should('have.value', taxFixture.form2.selectInputField);

     
        cy.get('[data-test="deductions-input"]').type(taxFixture.form2.deductionsInputField).should('be.visible');
        cy.get('[data-test=submit-form-button]').should('not.be.disabled').should('be.visible').click();

        cy.contains('No tax applicable.')
        cy.get('[data-test=income-after-tax]').should('be.visible').contains(taxFixture.form2.incomeAfterTax.toLocaleString())

      
        

    })





    


})