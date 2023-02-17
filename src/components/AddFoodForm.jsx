import React, { useState, useEffect } from "react";
import { Calculate } from "./Calculate";
import { FoodItem } from '../components/FoodItem';

export function AddFoodForm(props) {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // alert(`Submitting Name ${value}`);
        // resetDiningHall();
        // resetDate();
        // resetMeal();
    }

    return (
        <div>
            <form className="amount-form">
                {
                    Object.entries(props.foodDisplay).map(([key, value]) => (
                        Object.entries(value).map(([key2, value2]) => (
                            <FoodItem val={value2} foodFacts={props.foodFacts} foodAmounts={props.foodAmounts}/>
                        ))
                    ))
                }
            </form>
            <Calculate foodFacts={props.foodFacts} foodAmounts={props.foodAmounts}/>
        </div>
    )
}