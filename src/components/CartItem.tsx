import { useState } from "react";
import { Button, Stack, Modal } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number | string;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  const [showModal, setShowModal] = useState(false);
  const handleClearItem = () => {
    setShowModal(true);
  };

  const handleConfirmClearItem = () => {
    removeFromCart(id as string);
    setShowModal(false);
  };
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name}
      />
      <Button onClick={() => decreaseCartQuantity(id as number)}>-</Button>
      <Button onClick={() => increaseCartQuantity(id as number)}>+</Button>
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)} 
      </div>
      
      <Button variant="outline-danger" size="sm" onClick={handleClearItem}>
        Clear Item
      </Button>
  
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Clear Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear this item from your cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmClearItem}>
            Clear Item
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
}
