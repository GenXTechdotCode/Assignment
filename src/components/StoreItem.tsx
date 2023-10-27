import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
  id: number | string;
  name: string
  description: string
  imgUrl: string
  price: number
  category: string
}

export function StoreItem({ id, name, description, imgUrl, price  }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(id as number);
 
  return (
    <>
    
    <div className="p-0">
      <Card className="d-flex h-150">
        <div className="d-flex">
          <div style={{ flex: "0 0 auto", padding: "10px", width: "180px" }}>
            <Card.Img
              variant="top"
              src={imgUrl}
              style={{ height: "200px", objectFit: "fill" }}
            />
          </div>
          <div className="d-flex flex-column flex-grow-1 pt-2">
            <div style={{ maxHeight: "200px", overflowY: "auto"}}>
              <span className="lead">{description}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <Card.Body className="d-flex flex-column " style={{ padding: "15px"}}>
            <div className="d-flex justify-content-between">
              <Card.Title>
                <span className="lead">{name}</span>
              </Card.Title>
              <span className="ms-2 lead">{formatCurrency(price)}</span>
            </div>
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button variant="success" className="w-100" onClick={() => increaseCartQuantity(id as number)}>
                  + Add To Cart
                </Button>
              ) : (
                <div
                  className="d-flex align-items-center flex-column"
                  style={{ gap: ".5rem" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: ".5rem" }}
                  >
                    <Button  onClick={() => decreaseCartQuantity(id as number)}>-</Button>
                    <div>
                      <span className="fs-3">{quantity}</span> in cart
                    </div>
                    <Button onClick={() => increaseCartQuantity(id as number)}>+</Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(id as number)}
                    variant="danger"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
    </>  
    );
}  