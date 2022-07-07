import React, { useState, useEffect } from "react";
import { Calculate } from "./Calculate";

export function AddFoodForm(props) {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // alert(`Submitting Name ${value}`);
        // resetDiningHall();
        // resetDate();
        // resetMeal();
    }

    const amountInput = (val) => {
        return (
            <label key={val}>
                {val}:
                <input className="amount-form-single" type="number" onChange={num => {
                    // console.log(num.target.value)
                    let tempFoodAmounts = props.foodAmounts
                    tempFoodAmounts[val] = num.target.value
                    // console.log(tempFoodAmounts)
                    props.setFoodAmounts(tempFoodAmounts)
                }} />
            </label>
        )
    }

    return (
        <div>
            <form className="amount-form">
                {
                    Object.entries(props.foodDisplay).map(([key, value]) => (
                        Object.entries(value).map(([key2, value2]) => (
                            amountInput(value2)
                        ))
                    ))
                }
            </form>
            <Calculate foodFacts={props.foodFacts} foodAmounts={props.foodAmounts}/>
        </div>
    )
}