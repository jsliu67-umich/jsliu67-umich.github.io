import React, { useState, useEffect } from "react";
import { Calculate } from "./Calculate";

export function FoodItem(props) {
    const [isNotActive, setNotActive] = useState("true");

    return (
        <div>
            <label key={props.val}>
                <a onClick={
                    () => {
                        console.log(isNotActive)
                        setNotActive(!isNotActive);
                    }
                }>
                    {props.val}:
                </a>
                <input className="amount-form-single" type="number" onChange={num => {
                    // console.log(num.target.value)
                    let tempFoodAmounts = props.foodAmounts
                    tempFoodAmounts[props.val] = num.target.value
                    // console.log(tempFoodAmounts)
                    props.setFoodAmounts(tempFoodAmounts)
                }} />
            </label>
            
            <div className={isNotActive ? "hide" : "show"}>
                <ul style={{"margin-top": 0}}>
                    <li>Serving Size: {props.foodFacts[props.val].serving_size}</li>
                    <li>Calories: {props.foodFacts[props.val].Calories}</li>
                    <li>Protein: {props.foodFacts[props.val].Protein}</li>
                    <li>Total Carbohydrate: {props.foodFacts[props.val]["Total Carbohydrate"]}</li>
                    <li>Total Fat: {props.foodFacts[props.val]["Total Fat"]}</li>
                </ul>
            </div>
        </div>
    )

}