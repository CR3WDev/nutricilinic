/// <reference types="cypress" />
import {gerarCPF, gerarCpf} from "../../utilities/geradorCpf"

describe('Página de Usuários', () => {
  const cpfTest = gerarCPF();
  const usuarioTest = "João Silva";

  before(() => {
    cy.visit('/');
    cy.get('#cpf').type("05982191370");
    cy.get('#password').type("123456");
    cy.get('form').submit();
    cy.get('button').contains("Usuários").click();
  });

  it.only('Deve adicionar um novo usuário', () => {
    cy.get('.p-button').contains("Cadastrar").click();
    cy.get('#nome').type(usuarioTest);
    cy.get('#cpf').type(cpfTest);
    cy.get('#senha').type('123456');
    cy.get('button[type="submit"]').click();

    cy.get('.p-toast-message').should(
      'contain.text',
      'Usuário cadastrado com sucesso'
    );
    cy.get('.p-toast-close-icon').click();

    cy.get('td').contains(usuarioTest);
    cy.get('td').contains(cpfTest);
  });
  
  it('Deve editar um usuário existente', () => {
    cy.visit('/usuarios');
    cy.get('td').contains(usuarioTest).parent().within(() => {
      cy.get('button.pi-pencil').click();
    });

    cy.get('#nome').clear().type('João da Silva');
    cy.get('button[type="submit"]').click();

    cy.get('.p-toast-message').should(
      'contain.text',
      'Usuário alterado com sucesso'
    );
    cy.get('.p-toast-close-icon').click();

    cy.get('td').contains('João da Silva');
    cy.get('td').contains(cpfTest);
  });

  it('Deve remover um usuário existente', () => {
    cy.visit('/usuarios');
    cy.get('td').contains('João da Silva').parent().within(() => {
      cy.get('button.pi-trash').click();
    });

    cy.get('.p-confirm-dialog-message').should(
      'contain.text',
      'Confirmar operação?'
    );
    cy.get('.p-confirm-dialog-accept').click();

    cy.get('.p-toast-message').should(
      'contain.text',
      'Usuário excluído com sucesso'
    );
    cy.get('.p-toast-close-icon').click();

    cy.get('td').should('not.contain', 'João da Silva');
    cy.get('td').should('not.contain', cpfTest);
  });
});
