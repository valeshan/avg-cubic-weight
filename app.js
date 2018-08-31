//get fetch
const fetch = require('node-fetch');

//make request to API using async function
async function getCubicWeight() {
  let response = await fetch('http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1');

  let data = await response.json();
  return data;
}

getCubicWeight().then(data=> data.objects)
                .then(gadgets => {
                  let airConWeights = []; //create array for data to be pushed
                  gadgets.map(gadget=>{ //loop through the data array
                    if(gadget.category === 'Air Conditioners'){ //filter the data for air conditioners

                      //units need to first be multiplied by their dimensions then multiplied by specified conversion factor
                      let singleAirConWeight = Math.floor((gadget.size.width * gadget.size.height * gadget.size.length) * 250);

                      //since units are in cms and grams, we need to divide the weight by 100,000 (1000(grams/kg) * 100(cm/m))
                      let convertedAirConWeight = singleAirConWeight / 100000;

                      //push the converted weights into the airConWeights array
                      airConWeights.push(convertedAirConWeight);
                    }
                  });
                  //return the array of converted weights
                  console.log(airConWeights);
                });
