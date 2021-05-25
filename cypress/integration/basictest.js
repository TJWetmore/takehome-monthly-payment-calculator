let mortgageTest = {
  term : 15,
  interest : 4.00, 
  loan : 500000,
  displayLoan: '$500,000',
  payments : '$3,698.44'
}

let personalLoanTest = {
  term : 6,
  interest : 35.00, 
  loan : 500,
  displayLoan : '$500',
  payments : '$92.04'

}


describe('Launching Application Test', () => {
  it('Can visit the site', () => {
    cy.visit('/')
  })

  it('Has all relevant text', () => {
    cy.get('.toggleOptionsPersonal').should('have.text', ' Personal Loan ')
    cy.get('.toggleOptionsMortgage').should('have.text', ' Home Loan ')
    cy.get('.loanHeadline').should('have.text', 'Loan Amount')
    cy.get('.paymentHeadline').should('have.text', 'Monthly Payments')
    cy.get('.bodyLoanAmount').should('have.text', 'Loan Amount')
    cy.get('.bodyRepaymentMonths').should('have.text', 'Repayment Months')
    cy.get('.bodyInterestRate').should('have.text', 'Interest Rate (APR)')
  })

    it('Can accurately calculate Mortgage payments', () => {
    cy.get('.bodyRepaymentMonthsInput').type(`{backspace}{backspace}${personalLoanTest.term}`)
    cy.get('.bodyLoanAmountInput').type(`{backspace}{backspace}{backspace}{backspace}${personalLoanTest.loan}`)
    cy.get('.bodyInterestRateInput').type(`{leftarrow}{backspace}{backspace}{backspace}${personalLoanTest.interest}`)
    cy.get('.paymentHeadlineNumeric').should('have.text', personalLoanTest.payments)
    cy.get('.loanHeadlineNumeric').should('have.text', personalLoanTest.displayLoan)
  })

    it('Site can toggle between Personal and Home Loan', () => {
    cy.get('.bodyRepaymentMonths').should('have.text', 'Repayment Months')
    cy.get('.loanTypeToggle').click().pause()
    cy.get('.bodyRepaymentYears').should('have.text', 'Repayment Years')
  })


  it('Can accurately calculate Mortgage payments', () => {
    cy.get('.bodyRepaymentYearsInput').type(`{backspace}{backspace}${mortgageTest.term}`)
    cy.get('.bodyLoanAmountInput').type(`{backspace}{backspace}{backspace}{backspace}${mortgageTest.loan}`)
    cy.get('.bodyInterestRateInput').type(`{leftarrow}{backspace}{backspace}{backspace}${mortgageTest.interest}`)
    cy.get('.paymentHeadlineNumeric').should('have.text', mortgageTest.payments)
    cy.get('.loanHeadlineNumeric').should('have.text', mortgageTest.displayLoan)

  })
})
