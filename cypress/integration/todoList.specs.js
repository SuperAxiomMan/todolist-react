import { createYield, idText } from "typescript"

describe('test my todolist',() => {
  it('create todos', () => {
      cy.visit('/')
      cy.findByTestId('input_todo').type('setup cypress')
    
  })
  it('create todos', () => {
    
})
})