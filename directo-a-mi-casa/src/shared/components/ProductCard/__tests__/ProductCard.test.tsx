import { act, render, RenderResult,screen, fireEvent } from "@testing-library/react"
import ProductCard from "../ProductCard"
import { productResponseMock } from "../__mocks__/product";
import { ModuleRoutes } from "@/app/routes/routes";
import { useProducts } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";

jest.mock('../../../app/context/CartContext');
jest.mock('../../../app/context/ProductContext');

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

const mockAddProduct = jest.fn();
const mockSetSelectedProduct = jest.fn();
const mockNavigate = jest.fn();

beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addProduct: mockAddProduct,
    });

    (useProducts as jest.Mock).mockReturnValue({
      setSelectedProduct: mockSetSelectedProduct,
    });

    jest.mock('../../hooks/useProductNavigation', () => ({
      useProductNavigation: () => ({
        onNavigate: mockNavigate,
      }),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });






const renderComponent = async (): Promise<RenderResult> => {
    const component = await act(async () => render(<ProductCard product= {productResponseMock}/>))

    return component;
};

const {category,title} = productResponseMock;

describe.only("ProductCard", () => {

    it("Should render ProductCard component", async () => {
        await renderComponent();
 
        expect(screen.getByText(category)).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
    })

    it("Should navigate to ProductPage when user click the card", async () => {
        await renderComponent();

        const ProductCard = screen.getByText(title);
        fireEvent.click(ProductCard)

        expect(mockNavigate).toHaveBeenCalledWith(`${ModuleRoutes.ProductsPage}/${title}`);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should call addProduct when add to cart button is clicked', () => {
        render(<ProductCard product={productResponseMock} />);
    
        const addToCartButton = screen.getByText('Agregar');
        fireEvent.click(addToCartButton);
    
        expect(mockAddProduct).toHaveBeenCalledWith(productResponseMock);
      });

      it('should call setSelectedProduct and navigate when product card is clicked', () => {
        render(<ProductCard product={productResponseMock} />);
    
        const productCard = screen.getByRole('button', { title: /Essence Mascara Lash Princess/i });
        fireEvent.click(productCard);
    
        expect(mockSetSelectedProduct).toHaveBeenCalledWith(productResponseMock);
        expect(productResponseMock).toHaveBeenCalledWith('Essence Mascara Lash Princess');
      });
});