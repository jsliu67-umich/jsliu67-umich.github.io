import React, { useState, useEffect } from "react";

export function Calculate(props) {
    const [cals, setCals] = useState(0.0)
    const [protein, setProtein] = useState(0.0)
    const [carbs, setCarbs] = useState(0.0)
    const [fats, setFats] = useState(0.0)
    const [calculate, setCalculate] = useState(false)

    const combineCalculate = (boolVal) => {
        setCalculate(boolVal)
        let [cals, protein, carbs, fats] = calculateTotal()
        setCals(cals)
        setProtein(protein)
        setCarbs(carbs)
        setFats(fats)
        console.log(carbs)
        return
    }
    const displayCalculate = () => {
        return (
            <>
                <div className="nutrition-header">Nutrition Facts</div>
                <ul className="nutrition-items">
                    {/* <li>{names}</li> */}
                    <li>Calories: {cals}</li>
                    <li>Protein: {protein}</li>
                    <li>Total Carbohydrate: {carbs}</li>
                    <li>Total Fat: {fats}</li>
                </ul>
            </>
        )
    }

    const calculateTotal = () => {
        let cals = 0, protein = 0, carbs = 0, fats = 0
        // setCalculate(false)
        console.log(props.foodAmounts)
        function printMissing(missing, value) {
            console.log(`${missing}: ${value} missing`)
        }
        Object.entries(props.foodAmounts).map(([key, val]) => {
            // if value missing, console.log it. else, += it
            if (val !== 0) {
                if (props.foodFacts[key]["Calories"] !== undefined) {
                    // console.log(val)
                    // rounds number to 2 decimal places
                    // setCals(cals + Math.round((foodFacts[key]["Calories"] * val)*100)/100)
                    cals += Math.round((props.foodFacts[key]["Calories"] * val) * 100) / 100
                }
                else {
                    printMissing(key, 'Calories')
                }
                if (props.foodFacts[key]["Protein"] !== undefined) {
                    // setProtein(protein + Math.round((foodFacts[key]["Protein"] * val)*100)/100)
                    protein += Math.round((props.foodFacts[key]["Protein"] * val) * 100) / 100
                }
                else {
                    printMissing(key, 'Protein')
                }
                if (props.foodFacts[key]["Total Carbohydrate"] !== undefined) {
                    // setCarbs(carbs + Math.round((foodFacts[key]["Total Carbohydrate"] * val)*100)/100)
                    carbs += Math.round((props.foodFacts[key]["Total Carbohydrate"] * val) * 100) / 100
                }
                else {
                    printMissing(key, 'Total Carbohydrate')
                }
                if (props.foodFacts[key]["Total Fat"] !== undefined) {
                    // setFats(fats + Math.round((foodFacts[key]["Total Fat"] * val)*100)/100)
                    fats += Math.round((props.foodFacts[key]["Total Fat"] * val) * 100) / 100
                }
                else {
                    printMissing(key, 'Total Fat')
                }
            }
        })
        return [cals, protein, carbs, fats]
    }
    return (
        <div>
            <button className="buttons" onClick={() => {
                combineCalculate(true)
            }}>
            Calculate
            </button>
            {calculate ?
                displayCalculate() :
                null
            }
        </div>
    )
}