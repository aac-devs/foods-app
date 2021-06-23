import classes from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose}>Cancel</button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
