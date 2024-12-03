import { render, screen, fireEvent } from '@testing-library/react';
import { usePageNavigation } from '@/utils/navigate/navigationHelpers';
import CategoryTitleBar from '../CategoryTitleBar';


jest.mock('@/utils/navigate/navigationHelpers', () => ({
  usePageNavigation: jest.fn(),
}));

describe.skip('CategoryTitleBar Component', () => {
  const mockClosePage = jest.fn();

  beforeEach(() => {
    (usePageNavigation as jest.Mock).mockReturnValue({
      closePage: mockClosePage,
    });
    jest.clearAllMocks();
  });

  it('should render the title correctly', () => {
    render(<CategoryTitleBar title="Test Category" />);

    const titleElement = screen.getByText("Test Category");
    expect(titleElement).toBeInTheDocument();
  });

  it('should call closePage when the close button is clicked', () => {
    render(<CategoryTitleBar title="Test Category" />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockClosePage).toHaveBeenCalled();
  });

  it('should not call closePage if the button is not clicked', () => {
    render(<CategoryTitleBar title="Test Category" />);

    expect(mockClosePage).not.toHaveBeenCalledTimes(1);
  });

  it("should not call closePage if the button is not clicked", () =>{
    render(<CategoryTitleBar title="Test Category" />);

    expect(mockClosePage).not.toHaveBeenCalled();
  })
});
