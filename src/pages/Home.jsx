
import React, { useEffect, useState } from 'react';
import { GetMenuForm } from '../components/GetMenuForm';
import Typography from '@mui/material/Typography';
import { AddFoodForm } from '../components/AddFoodForm';


const Home = () => {
    const [validMenu, setValidMenu] = useState(true)
    const [foodDisplay, setFoodDisplay] = useState({ })
    const [foodAmounts, setFoodAmounts] = useState({ })
    const [foodFacts, setFoodFacts] = useState({ })
    const FoodHandler = (tempFoodDisplay, tempFoodAmounts, tempFoodFacts) => {
        setFoodDisplay(tempFoodDisplay)
        setFoodAmounts(tempFoodAmounts)
        setFoodFacts(tempFoodFacts)
        console.log(foodDisplay)
        console.log(foodAmounts)
        console.log(foodFacts)
    }

    const error = (validMenu) => {
        let returnVal = <></>
        if (validMenu) {
            returnVal =
                <div>
                    Select your dining hall.
                </div>
        }
        else{
            returnVal =
                <div>
                    Bad dining hall, date, or meal. Try again.
                </div>
        }
        return <>
            {returnVal}
        </>
    }

    return (
        <div>
            <Typography variant="h2" className="main-header">MDining Nutrition Calculator</Typography>
            {/* {if(menu == {})} */}
            <GetMenuForm onFoodHandler={FoodHandler} setValidMenu={setValidMenu} />
            {console.log(foodDisplay)}
            {
                // (Object.keys(foodDisplay).length === 0) ? <AddFoodForm /> : null
                (Object.keys(foodDisplay).length === 0)
                    ? error(validMenu)
                    : <AddFoodForm foodFacts={foodFacts} foodDisplay={foodDisplay} foodAmounts={foodAmounts} setFoodAmounts={setFoodAmounts} />
            }
            {/* <AddFoodForm /> */}
        </div>
    );
}

export default Home;