import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';
import '@testing-library/jest-dom';

describe("Modal Component", () => {
    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

it('should render the modal with the given message when isOpen is true', () => {
    render(
        <Modal
            isOpen={true} 
            modalMessage="This is a test message"
            onClose={mockOnClose}
            onConfirm={mockOnConfirm}
            confirmText="Confirm"
            cancelText="Cancel"
        />
    );

        const messageElement = screen.getByText("This is a test message")
        expect(messageElement).toBeInTheDocument();

        const confirmButton = screen.getByText("Confirm");
        const cancelButton = screen.getByText("Cancel");
        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
});

it('should call the onClose function when the cancel button is clicked', () => {
    render(
        <Modal
        isOpen={true}
        modalMessage= "This is a test message"
        onClose={mockOnClose}
        cancelText= "Cancel"
        />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
})

it('should call onConfirm when the confirm button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        modalMessage="This is a test message"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        confirmText="Confirm"
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('should not render the modal when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        modalMessage="This is a test message"
        onClose={mockOnClose}
      />
    );

    const messageElement = screen.queryByText("This is a test message");
    expect(messageElement).not.toBeInTheDocument();
  });

  it('should not call onClose or onConfirm if buttons are not clicked', () => {
    render(
      <Modal
        isOpen={true}
        modalMessage="This is a test message"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should render the single button when singleButton is true and call onClose when clicked', () => {
  
    render(
      <Modal
        isOpen={true}
        modalMessage="This is a test message"
        onClose={mockOnClose}
        singleButton={true}
        singleButtonText="Close"
      />
    );

    const button = screen.getByText('Close');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render the single button with the correct class and call onClose when clicked', () => {

    render(
      <Modal
        isOpen={true}
        modalMessage="This is a test message"
        onClose={mockOnClose}
        singleButton={true}
        singleButtonText="Close"
      />
    );

    const button = screen.getByText('Close');
    expect(button).toBeInTheDocument();

    expect(button).toHaveClass('btn__order');

    fireEvent.click(button);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

})