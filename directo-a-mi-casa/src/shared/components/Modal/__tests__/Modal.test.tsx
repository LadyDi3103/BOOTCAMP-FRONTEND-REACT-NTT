import { render, screen } from '@testing-library/react';
import Modal from '../Modal';
import '@testing-library/jest-dom';

describe("Modal Component", () => {

beforeEach(() => {
    jest.clearAllMocks();
});

it("should not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false}>
        <p>This is a test message</p>
      </Modal>
    );

    const modalContent = screen.queryByText("This is a test message");
    expect(modalContent).not.toBeInTheDocument();
});

it("should render the modal with children when isOpen is true", () => {
  render(
    <Modal isOpen={true}>
      <p>This is a test message</p>
    </Modal>
  );

  const modalContent = screen.getByText("This is a test message");
  expect(modalContent).toBeInTheDocument();
});

it("should render the modal content inside a div with class 'modal__content'", () => {
  render(
    <Modal isOpen={true}>
      <p>Test content</p>
    </Modal>
  );

  const modalContent = screen.getByText("Test content");
  expect(modalContent).toBeInTheDocument();

  const modalContainer = modalContent.closest("div");
  expect(modalContainer).toHaveClass("modal__content");
});

it("should render the modal overlay when isOpen is true", () => {
  render(
    <Modal isOpen={true}>
      <p>Overlay test</p>
    </Modal>
  );

  const overlayElement = screen.getByText("Overlay test").closest(".modal-overlay");
  expect(overlayElement).toBeInTheDocument();
});


})