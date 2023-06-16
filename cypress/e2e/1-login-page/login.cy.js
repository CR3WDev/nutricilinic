/// <reference types="cypress" />

describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve carregar a página de login', () => {
    cy.get('form').should('be.visible');
  });

  it('Deve exibir erro em campos vazios', () => {
    cy.get('form').submit();
    cy.get('.p-error').should('have.length', 2);
  });

  it('Deve exibir erro ao tentar fazer login com CPF inválido', () => {
    cy.get('#cpf').type('123');
    cy.get('#password').type('1123456');
    cy.get('form').submit();
    cy.get('.p-toast-message-error').should("be.visible").and('contain', 'Falha ao realizar login. Tente novamente em instantes');
  });

  it('Deve exibir erro  tentar fazer login com em senha vazia', () => {
    cy.get('#cpf').type('12345678901');
    cy.get('form').submit();
    cy.get('.p-error').should('contain', 'Campo obrigatório');
  });

  it('Deve exibir erro em credenciais inválidas', () => {
    cy.get('#cpf').type('12345678901');
    cy.get('#password').type('senhaincorreta');
    cy.get('form').submit();
    cy.get('.p-toast-message').should('contain', 'Usuário ou senha inválidos');
  });
});
