declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<JQuery<HTMLElement>>;
  }
}

// declare global {
//     namespace Cypress {
//       interface Chainable {
//         getByTestId(id: string): Chainable;
//       }
//     }
