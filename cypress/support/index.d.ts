declare namespace Cypress {
    interface Chainable<Subject> {
      saveCookies(): Chainable<void>;
      clearCookies(): Chainable<void>;
    }
  }