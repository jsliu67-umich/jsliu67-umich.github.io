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
            
            {props.foodFacts[props.val] !== undefined ? 
            <div className={isNotActive ? "hide" : "show"}>
                <ul style={{"margin-top": 0}}>
                    <li>Serving Size: {"serving_size" in props.foodFacts[props.val] ? props.foodFacts[props.val].serving_size : "Null"}</li>
                    <li>Calories: {"Calories" in props.foodFacts[props.val] ? props.foodFacts[props.val].Calories : "Null"}</li>
                    <li>Protein: {"Protein" in props.foodFacts[props.val] ? props.foodFacts[props.val].Protein : "Null"}</li>
                    <li>Total Carbohydrate: {"Total Carbohydrate" in props.foodFacts[props.val] ? props.foodFacts[props.val]["Total Carbohydrate"] : "Null"}</li>
                    <li>Total Fat: {"Total Fat" in props.foodFacts[props.val] ? props.foodFacts[props.val]["Total Fat"] : "Null"}</li>
                </ul>
            </div>
            : <div></div>
            }
        </div>
    )

}