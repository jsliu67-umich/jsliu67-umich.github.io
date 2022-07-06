import React, { useState, useEffect, useRef } from "react";
import { useInput } from './input-hook';
import { getMenus } from '../utils/requests'

export function GetMenuForm(props) {
    // const { value: diningHall, bind: bindDiningHall, reset: resetDiningHall } = useInput('');
    // const { value: date, bind: bindDate, reset: resetDate } = useInput('');
    // const { value: meal, bind: bindMeal, reset: resetMeal } = useInput('');

    const [diningHall, setDiningHall] = useState('Bursley')
    const [date, setDate] = useState('')
    const [meal, setMeal] = useState('Breakfast')

    const [firstMount, setFirstMount] = useState(0)
    const [menus, setMenus] = useState({}
        // [{
        //     category: [{
        //         name: "",
        //         menuItem: [
        //             {
        //                 name: "",
        //                 itemSizes: [{
        //                     nutritionalInfo: [
        //                         {
        //                             name: "",
        //                             value: ""
        //                         }
        //                     ]
        //                 }]
        //             }
        //         ]
        //     }, {}
        //     ]
        // }]
    );


    useEffect(() => {
        console.log(1)
        console.log(menus)
        if(firstMount < 1){
            setFirstMount(firstMount + 1);
            return;
        }
        else{
            console.log(2)
            updateMenus();
        }
    }, [menus]);

    const handleDiningHallChange = (event) => {
        setDiningHall(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleMealChange = (event) => {
        setMeal(event.target.value);
    };
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // alert(`Submitting Name ${value}`);
        // resetDiningHall();
        // resetDate();
        // resetMeal();
    }

    const fetchMenus = async (diningHall, date, meal) => {
        diningHall = diningHall.replace(' ', '%20')
        meal = meal.toUpperCase();

        console.log(diningHall)
        console.log(date)
        console.log(meal)

        // getMenus(diningHall, date, meal, setMenus)
        console.log(menus)
        const data = await getMenus(diningHall, date, meal)
        await setMenus(data)
    }

    const updateMenus = () => {
        // tempFoodDisplay = {}
        let tempFoodDisplay = {}
        let tempFoodAmounts = {}
        let tempFoodFacts = {}
        console.log(menus)
        if(!('category' in menus[0])){
            props.setValidMenu(false)
            props.onFoodHandler({}, {}, {})
            return;
        }
        props.setValidMenu(true)
        menus[0].category.map((categoryItem, index) => {
            // foodAmounts[categoryItem.name] = 0
            let tempCategoryObject = {}
            let tempFoodFactsSingle = {}
            tempCategoryObject[categoryItem.name] = []
            categoryItem.menuItem.map((menuItem, index) => {
                const tempMenuItem = {}
                tempMenuItem[menuItem.name] = 0
                tempFoodAmounts = ({...tempFoodAmounts, ...tempMenuItem})
                tempCategoryObject[categoryItem.name].push(menuItem.name)
                let foodFactsObject = {}
                foodFactsObject[menuItem.name] = {}
                if('nutritionalInfo' in menuItem.itemSizes[0]){
                    menuItem.itemSizes[0].nutritionalInfo.map((nutritionalItem, index) => {
                        // foodFactsObject[menuItem.name]["Beef"] = "three"
                        // console.log(nutritionalItem.value)
                        // let includeItem = false
                        if (nutritionalItem.name === "Calories"){
                            // console.log(nutritionalItem.value)
                            // includeItem = true
                            foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                        }
                        else if (nutritionalItem.name === "Protein"){
                            // includeItem = true
                            foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                        }
                        else if (nutritionalItem.name === "Total Carbohydrate"){
                            // includeItem = true
                            foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                        }
                        else if (nutritionalItem.name === "Total Fat"){
                            // includeItem = true
                            foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                        }

                        // foodFacts[menuItem.name][nutritionalItem.name] = nutritionalItem.value
                        // const newFoodFacts = {
                        //     ...foodFacts,
                        //     ...(includeItem && {"three": nutritionalItem['value']})
                        // }
                        // foodFacts = newFoodFacts
                    })
                    tempFoodFactsSingle = {...tempFoodFactsSingle, ...foodFactsObject}
                }
                else{
                    console.log(`${menuItem.name} is missing nutrition facts`)
                }
                // setFoodFacts({...foodFacts, ...foodFactsObject})
            })
            tempFoodFacts = {...tempFoodFacts, ...tempFoodFactsSingle}
            console.log(tempFoodFacts)
            // console.log(tempCategoryObject)
            tempFoodDisplay = {...tempFoodDisplay, ...tempCategoryObject}
        })

        props.onFoodHandler(tempFoodDisplay, tempFoodAmounts, tempFoodFacts)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="main-form">
                <label>
                    Dining Hall:
                    <select value={diningHall} onChange={handleDiningHallChange}>
                        <option defaultValue="Bursley">Bursley</option>
                        <option value="South Quad">South Quad</option>
                        <option value="East Quad">East Quad</option>
                        <option value="Mosher Jordan">Mosher Jordan</option>
                    </select>
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <label>
                    Meal:
                    <select value={meal} onChange={handleMealChange} className="custom-select">
                        <option value="Breakfast">Breakfast</option>
                        <option value="Brunch">Brunch</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Linner">Linner</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </label>
            </form>
            <button className="buttons" onClick={() => fetchMenus(diningHall, date, meal)}>Generate Menu</button>
            {/* <button className="buttons" onClick={() => updateMenus()}>Update Menus</button> */}
        </div>
    )
}