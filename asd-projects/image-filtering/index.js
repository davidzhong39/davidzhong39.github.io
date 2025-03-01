// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify)     
  applyFilter(decreaseBlue)
  applyFilterNoBackground(increaseGreenByBlue)
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction){             // Applies a colored filter to an entire image
  for(let i=0; i<image.length; i++){
    for(let j=0; j<image[i].length; j++){  
      let rgbString = image[i][j];                 
      let rgbNumbers = rgbStringToArray(rgbString);  
      filterFunction(rgbNumbers)                  
      rgbString = rgbArrayToString(rgbNumbers);      
      image[i][j] = rgbString;                      
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction){   // Applies a colored filter to an image without affecting the background
  let backgroundColor = image[0][0]                   
  for(let i=0; i<image.length; i++){
    for(let j=0; j<image[i].length; j++){
      let rgbString = image[i][j];      
      if(image[i][j] !== backgroundColor){              
        let rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers)
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(suckballs){                 // This prevents the RGB values of each pixel from going below 0 or above 255
  return (suckballs < 0) ? 0 : ((suckballs > 255) ? 255 : (suckballs))
}

// TODO 3: Create reddify function
function reddify(array){
  array[RED] = 200;   // Makes pixels red
}

// TODO 6: Create more filter functions
function decreaseBlue(array){
  array[BLUE] = keepInBounds(array[BLUE] - 50)   // Makes pixels blue
}

function increaseGreenByBlue(array){
  array[GREEN] = keepInBounds(array[GREEN] + array[BLUE])   // Makes pixels green
}


// CHALLENGE code goes below here





