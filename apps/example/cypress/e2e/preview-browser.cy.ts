describe("PreviewBrowser", () => {
  it("should open to no preview selected", () => {
    cy.visit("/email");
    cy.findByText("No preview selected.");
  });

  it("should open preview", () => {
    cy.visit("/email");
    cy.get('[aria-label="view LoginCode"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=LoginCode");
    });

    cy.get('[aria-label="view ResetPassword"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=ResetPassword");
    });
  });

  it("should switch between mobile and desktop view", () => {
    cy.visit("/email?preview=LoginCode");
    cy.get('[aria-label="view mobile resolution"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=LoginCode&view=mobile");
    });
    cy.findByTitle("LoginCode preview")
      .should("have.class", "rm-max-w-[375px]")
      .should("have.class", "rm-max-h-[667px]");
    cy.get('[aria-label="view desktop resolution"]').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?preview=LoginCode&view=desktop");
    });
    cy.findByTitle("LoginCode preview")
      .should("not.have.class", "rm-max-w-[375px]")
      .should("not.have.class", "rm-max-h-[667px]");
  });

  it("should show a hamburger menu on small resolutions", () => {
    cy.visit("/email");
    cy.get('[aria-label="open side navigation"]').should("not.be.visible");
    cy.viewport("iphone-se2");
    cy.get('[aria-label="open side navigation"]').should("be.visible");
  });
});
