describe('RealBeans Shopify Storefront', () => {
  beforeEach(() => {
    cy.visit('https://r0918747-realbeans.myshopify.com');
    cy.get('input[type="password"]').type(Cypress.env('SHOPIFY_PASSWORD'), { log: false });
    cy.get('button[type="submit"]').click();
  });

  it('shows all products in the catalog', () => {
    cy.visit('https://r0918747-realbeans.myshopify.com/collections/all');
    cy.get('h3.card__heading').should('contain.text', 'Roasted coffee beans 5kg');
    cy.get('h3.card__heading').should('contain.text', 'Blended coffee 5kg');
  });
  

  it('checks product prices are sorted low to high visually', () => {
    cy.visit('https://r0918747-realbeans.myshopify.com/collections/all');
  

        cy.get('#SortBy').select('Price, low to high');
        cy.url().should('include', 'sort_by=price-ascending');
  

        cy.wait(1000);
        // Now extract all prices in order
        cy.get('#product-grid > li.grid__item').then($items => {
          const prices = Array.from($items).map(item => {
            const priceText = Cypress.$(item)
              .find('.price-item--regular, .price-item--sale, .price-item')
              .first()
              .text();
            const match = priceText.match(/(\d+[\.,]?\d*)/);
            return match ? parseFloat(match[1].replace(',', '.')) : null;
          }).filter(Boolean);
  
          cy.log('Prices in visual order:', prices);
  
          // Assert prices are sorted ascending
          const sorted = [...prices].sort((a, b) => a - b);
          expect(prices, 'Prices should be sorted low to high').to.deep.equal(sorted);
        });
      });
  
  
  
  
  
  
  
  const products = [
    {
      name: 'Roasted coffee beans 5kg',
      description: 'Our best and sustainable real roasted beans.',
      price: '€40',
      imageName: 'RealBeansRoastedBag'
    },
    {
      name: 'Blended coffee 5kg',
      description: 'RealBeans coffee, ready to brew.',
      price: '€55',
      imageName: 'RealBeansBlendBag'
    }
  ];
  
  products.forEach(product => {
    it(`shows correct details for ${product.name}`, () => {
      cy.visit('https://r0918747-realbeans.myshopify.com/collections/all');
      cy.get('h3.card__heading a')
        .contains(product.name)
        .click({ force: true });
      cy.contains(product.description);
      cy.contains(product.price);
      cy.get('img').should('have.attr', 'src').and('include', product.imageName);
      cy.go('back'); 
    });
  });
  
  it('shows homepage intro and product list', () => {
    cy.visit('https://r0918747-realbeans.myshopify.com');
    cy.contains('Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes. Ethically sourced beans, crafted with care.');
    cy.get('h3.card__heading').should('contain.text', 'Roasted coffee beans 5kg');
    cy.get('h3.card__heading').should('contain.text', 'Blended coffee 5kg');
  
  });

  it('shows About page content', () => {
    cy.visit('https://r0918747-realbeans.myshopify.com/pages/about');
    cy.contains('From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future.');
  });
});
