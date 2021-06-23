import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckoutHandler = () => {
    setShowCheckout(true);
  };

  const hideCheckoutHandler = () => {
    setShowCheckout(false);
  };

  const submitCheckoutHandler = (event) => {
    event.preventDefault();
    console.log("Checkout submited!");
    setShowCheckout(false);
    props.onClose();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout
          onSubmit={submitCheckoutHandler}
          onClose={hideCheckoutHandler}
        />
      )}
      <div className={classes.actions}>
        {!showCheckout && (
          <button onClick={props.onClose} className={classes["button-alt"]}>
            Close
          </button>
        )}
        {!showCheckout && hasItems && (
          <button className={classes.button} onClick={showCheckoutHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
