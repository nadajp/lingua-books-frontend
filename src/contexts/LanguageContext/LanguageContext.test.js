import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { LanguageContext, LanguageProvider } from "./LanguageContext";

describe("LanguageProvider", () => {
  test("renders children", () => {
    const { getByText } = render(
      <LanguageProvider>
        <div>Child Element</div>
      </LanguageProvider>
    );
    expect(getByText("Child Element")).toBeInTheDocument();
  });

  test("contains initial languages and selected languages as empty array", () => {
    const { container } = render(
      <LanguageProvider>
        <LanguageContext.Consumer>
          {({ languages, selectedLanguages }) => (
            <div>
              <div data-testid="languages-length">{languages.length}</div>
              <div data-testid="selected-languages-length">
                {selectedLanguages.length}
              </div>
            </div>
          )}
        </LanguageContext.Consumer>
      </LanguageProvider>
    );
    expect(container.querySelector('[data-testid="languages-length"]').textContent).toBe('0');
    expect(container.querySelector('[data-testid="selected-languages-length"]').textContent).toBe('0');
  });

  test("updates selected languages correctly", () => {
    const { container } = render(
      <LanguageProvider>
        <LanguageContext.Consumer>
          {({ updateSelectedLanguages }) => (
            <button onClick={() => updateSelectedLanguages(['en', 'fr'])}>
              Update Languages
            </button>
          )}
        </LanguageContext.Consumer>
        <LanguageContext.Consumer>
          {({ selectedLanguages }) => (
            <div data-testid="selected-languages">
              {JSON.stringify(selectedLanguages)}
            </div>
          )}
        </LanguageContext.Consumer>
      </LanguageProvider>
    );
    const updateButton = container.querySelector("button");
    expect(container.querySelector('[data-testid="selected-languages"]').textContent).toBe('[]');
    fireEvent.click(updateButton);
    expect(container.querySelector('[data-testid="selected-languages"]').textContent).toBe('["en","fr"]');
  });
});
