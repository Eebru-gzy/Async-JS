// const second = () => {
//     setTimeout(() => {
//     console.log('Async HEy');

//     },)
// }
// const first = () => {
//     console.log('hey there');
//     second();
//     console.log('The end')
// }
// first();

//this is called 'call-back-hell'
/*
function getRecipe () {
    setTimeout(() =>{
        const recipeId = [234,453,124,554];
        console.log(recipeId);

        setTimeout(id => {
            const recipe = {title: 'fresh tomato pasta', publisher: 'Eebru'}
            console.log(`${id}: ${recipe.title}`);

            setTimeout(publisher => {
                const recipe2 = {title: 'Italian Pizza', publisher: 'Eebru'};
                console.log(recipe2, publisher)
            }, 1500, recipe.title);

        },1500, recipeId[2]);

    }, 1500);
}

getRecipe(); 
*/

//__________________//


//Promise: its an object that keeps track whether an eveny has happened or not, if happened, determine what to do with it. Promise is a time sensitive event and so it has different states, when the event hasn't happened, it is in a 'pending' state: when the event happened, it is in a resolved state: the resolved state can then be fulfilled; that means, what is asked to get was done; or Rejected; if thre's an error...... we can produce and consume promises, when we produce a promise, we create a promise and send a result using that promise, when we consume, we can use a call-back-function fulfillment and rejection of our promise



//creating a promise to implement the above call back hell

// just like any other object, Promise is created using the new keyword;
/*
const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([234,453,124,554]); 
    }, 1500);
}); //here we created a promise, then pass inside its call-back the settimeout fn(which make for a normal ajax call), settimeout would always get resolved- thats why we used the resolve function from the callback fn's parameter. settimeout would the return the fake recipe that we passed into it... 


//the second call-back-hell above
const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID =>{
            const recipe = { title: "fresh tomato pasta", publisher: "Eebru" };
            resolve(`${ID}: ${recipe.title}`);
        },1500, recID);
    });
};

//the 3rd call-back-hell
const getRelated = (publisher) => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {title: 'Italian Pizza', publisher: 'Eebruz'};
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};



//consuming first promise 
getIds.then(Ids => {
    console.log(Ids); //since it is resolved, this would take place

    return getRecipe(Ids[2]); //returning another promise
})
//consuming it here
.then(recipe => {
    console.log(recipe)

    return getRelated('Eebru'); //returning the 3rd here
})
//consuming here
.then(pub => {
    console.log(pub);
})

.catch(error => {
    console.log('Error!!!'); //if rejected, this would then take place
});




// From Promise to Async/Wait: (ES7) help makes consuming Promises easier: async/await actually consumes promises and not to produce them

// so we make use of the already made promises from the last promises created

const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([234,453,124,554]); 
    }, 1500);
}); 

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID =>{
            const recipe = { title: "fresh tomato pasta", publisher: "Eebru" };
            resolve(`${ID}: ${recipe.title}`);
        },1500, recID);
    });
};

const getRelated = (publisher) => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {title: 'Italian Pizza', publisher: 'Eebruz'};
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
}; 

 
//consuming
async function getRecipeAw () {
    const IDs = await getIds;
    console.log(IDs);

    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);

    const related = await getRelated("Eebru");
    console.log(related);


    //async function always returns a promise, that can then be worked on

    return recipe;
}

//so we consume it on the function call
getRecipeAw().then(res => {
    console.log(`${res} is yummy`)
})

*/

/////////////Making Ajax call with fetch and promises

//Weather API-call

function getWeather (woeid) {
    fetch(
     `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
    ) //same origin policy
     .then(result => {
      console.log(result);
      return result.json();
     })
     .then(data => {
        //  console.log(data);
        const today = data.consolidated_weather[0]
        console.log(`The temperature in ${data.title} today is between ${today.min_temp} and ${today.max_temp} `)
     })
     .catch(e => {
      console.log(e);
     });
}

getWeather(44418);
getWeather(2487956);



// Using async and await to consume promise from fetch

async function getweatherAw (woeid) {
    const result = await fetch(
     `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
    );
    const data = await result.json();

    console.log(data);
}


getweatherAw(44418);
getweatherAw(2487956);

