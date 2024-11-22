import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { CartState, Action, initialState, cartReducer } from './cartReducer';


interface CartContextProps {
    state: CartState;
    dispatch: React.Dispatch<Action>;
  }
  
  const CartContext = createContext<CartContextProps>({
    state: initialState,
    dispatch: () => null,
  });




// export const CartContext = createContext<CartContextProps>({
//     products: [],
//     addProduct: () => {},
//     totalProducts: 0,
// });


export const CartProvider = ({ children }: { children: ReactNode }) => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [state, dispatch] = useReducer(cartReducer, initialState);


    // const addProduct = (newProduct: Product) => {
    //     setProducts([...products, newProduct])
    // }

    // const totalProducts = products.reduce((total, product) => total + product.quantity, 0);

    // return (
    //     <CartContext.Provider value={{ products, addProduct, totalProducts }}>
    //         {children}
    //     </CartContext.Provider>
    // )
    return (
        <CartContext.Provider value={{ state, dispatch }}>
          {children}
        </CartContext.Provider>
      );
}

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);