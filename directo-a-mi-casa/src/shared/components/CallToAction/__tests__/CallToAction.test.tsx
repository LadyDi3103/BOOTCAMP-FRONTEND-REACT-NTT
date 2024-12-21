import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallToAction from '../CallToAction';

describe('CallToAction Component', () => {
  it('should render the heading text correctly', () => {
    render(<CallToAction />);

    const headingElement = screen.getByText("HAZ TU PEDIDO Y RECÍBELO DESDE");
    expect(headingElement).toBeInTheDocument();
  });

  it('should contain the highlighted text "2 HORAS"', () => {
    render(<CallToAction />);


    const hoursElement = screen.getByText("2 HORAS");
    expect(hoursElement).toBeInTheDocument();
    expect(hoursElement).toHaveClass('hours');
  });

  test("Should match snapshot", () => {
    const { container } = render(<CallToAction />);
    expect(container).toMatchSnapshot();
});

test("should render a <section> element with class 'cta'", () => {
  render(<CallToAction />);
  
  const sectionElement = screen.getByRole("region");
  expect(sectionElement).toBeInTheDocument();
  expect(sectionElement).toHaveClass("cta");
});


});
