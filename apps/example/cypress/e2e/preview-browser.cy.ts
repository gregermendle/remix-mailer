describe("PreviewBrowser", () => {
  it("should open to no preview selected", () => {
    cy.visit("/email");
    cy.findByText("No preview selected.");
  });

  it("should open preview", () => {
    cy.visit("/email");
    cy.get('[aria-label="view loginCode"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=loginCode");
    });

    cy.get('[aria-label="view resetPassword"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=resetPassword");
    });
  });

  it("should switch between mobile and desktop view", () => {
    cy.visit("/email?preview=loginCode");
    cy.get('[aria-label="view mobile resolution"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=loginCode&view=mobile");
    });
    cy.findByTitle("loginCode preview")
      .should("have.class", "max-w-[375px]")
      .should("have.class", "max-h-[667px]");
    cy.get('[aria-label="view desktop resolution"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=loginCode&view=desktop");
    });
    cy.findByTitle("loginCode preview")
      .should("not.have.class", "max-w-[375px]")
      .should("not.have.class", "max-h-[667px]");
  });

  it("should show a hamburger menu on small resolutions", () => {
    cy.visit("/email");
    cy.get('[aria-label="open side navigation"]').should("not.be.visible");
    cy.viewport("iphone-se2");
    cy.get('[aria-label="open side navigation"]').should("be.visible");
  });
});
