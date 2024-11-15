// calculator.js
function calculateCarbonFootprint(data) {
    const { electricity, diet, travel, dist} = data;

    // Sample calculations; you can adjust these values to match actual data
    const electricityCarbon = electricity * 0.5; // e.g., 0.5 kg CO2 per kWh
    
    let DietCarbon=0;
    if (diet=="Vegan") {
        DietCarbon=4;
    }else if (diet=="Veg") {
        DietCarbon=5;
    }else if (diet=="Non-Veg") {
        DietCarbon=7;
    }
    let travelCarbon=0;
    if(travel=="Bike"){
        travelCarbon=dist*0.05;
    }else if (travel=="Petrol Car") {
        travelCarbon=dist*0.18;
    }else if (travel=="Diesel Car") {
        travelCarbon=dist*0.20;
    }else if (travel=="Bus") {
        travelCarbon=dist*0.10;
    }else {
        travelCarbon=dist*0.04;
    }

    // Total carbon footprint calculation
    return electricityCarbon + travelCarbon + DietCarbon;
}

module.exports = calculateCarbonFootprint;