export const SelectTravelLists=[
    {
        id:1,
        title:'Just Me',
        desc: 'A Sole Travel',
        icon : '🏍',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc: 'Two Travelers',
        icon : '🛺',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc: 'Three or More Travelers',
        icon : '🚕',
        people:'3-5'
    ,
    },
    {
        id:4,
        title:'Group',
        desc: 'More Than 5 Travelers',
        icon : '🚌',
        people:'6+'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc: 'Less Than $100',
        icon : '💸'
    },
    {
        id:2,
        title:'Moderate',
        desc: '$100 - $500',
        icon : '💸💸'
    },
    {
        id:3,
        title:'Expensive',
        desc: 'More Than $500',
        icon : '💸💸💸'
    }

]

export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list in hotel as key with HotelName, Hotel address, Price, hotel image url, geo coordinates,rating, descriptions and give me itinerary as itinerary as key with placeName, placeDetails, Place Image Url, Geo Coordinates, ticket Pricing,  rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in json format.'