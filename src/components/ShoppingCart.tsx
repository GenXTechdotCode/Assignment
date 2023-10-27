import { useState } from "react";
import { Offcanvas, Stack, Modal, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";


type ShoppingCartProps = {
  isOpen: boolean; 
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  const { closeCart, cartItems, clearCart } = useShoppingCart();

  const handleCheckout = () => {
    setShowCheckout(true);
    clearCart();
  };

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find(
                    (i) => i.id === String(cartItem.id)
                  );
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack>
          <Button onClick={handleCheckout}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showCheckout} onHide={() => setShowCheckout(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for your purchase!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been placed!</Modal.Body>
      </Modal>
    </>
  );
}