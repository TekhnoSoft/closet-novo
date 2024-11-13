import { useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState(() => {
    // Carregar o carrinho do localStorage quando o hook for inicializado
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart || [];
  });

  // Função para salvar o carrinho no localStorage
  const saveCart = (cart) => {
    setCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = (product, qtd) => {
    const updatedCart = [...cart];
  
    // Encontra o índice do produto no carrinho
    const productIndex = updatedCart.findIndex(p => p.id === product.id);
  
    if (productIndex !== -1) {
      // Se o produto já existe no carrinho, verifica e atualiza a quantidade corretamente
      const existingProduct = updatedCart[productIndex];
      const newQtd = existingProduct.qtd ? existingProduct.qtd + qtd : qtd; // Garante que não será null
  
      // Atualiza o produto no carrinho
      updatedCart[productIndex] = {
        ...existingProduct,
        qtd: newQtd
      };
    } else {
      // Se o produto não existe no carrinho, adiciona com a quantidade inicial
      updatedCart.push({ ...product, qtd });
    }
  
    // Salva o carrinho atualizado no localStorage
    saveCart(updatedCart);
  };

  // Remover um produto com base no id_product
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(p => p.id !== id);
    saveCart(updatedCart);
  };

  // Atualizar a quantidade de um produto específico
  const updateCart = (product, qtd) => {
    const updatedCart = cart.map(p =>
      p.id === product.id ? { ...p, qtd } : p
    );
    saveCart(updatedCart);
  };

  // Limpar o carrinho
  const clearCart = () => {
    saveCart([]);
  };

  // Retornar o preço total do carrinho
  const getCartPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.qtd, 0);
  };

  // O hook retorna as funções e o estado do carrinho
  return {
    cart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    getCartPrice
  };
};

export default useCart;
