import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const recepMeals = (mealsObj) => {
      const loadedMeals = [];
      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://react-http-cf56e-default-rtdb.firebaseio.com/meals.json",
      },
      recepMeals
    );
  }, [fetchMeals]);

  const mealsList =
    meals.length > 0 &&
    meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

  let renderInfo = <p>Loading...</p>;

  if (error) {
    renderInfo = <p>{error}</p>;
  }

  if (!isLoading && !error) {
    renderInfo = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{renderInfo}</Card>
    </section>
  );
};

export default AvailableMeals;
