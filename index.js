
let locations = [];
let tolls = [];

function createInputs() {

    let container = document.querySelector(".input-container")

    for (let i = 0 ; i < locations.length ; i++) {
        let id = "#input" + i.toString();
        let input = document.querySelector(id);
        input.remove();
    }


    container.innerHTML = "";

    let inputdivs = [];    

    for(let i = 0 ; i< locations.length + 1 ; i++) {

        const heavyInput = document.querySelector('.input-div').cloneNode(true);

        heavyInput.classList.remove("display-none");
    
        let id = "input" + i.toString();

        heavyInput.setAttribute("id" , id)

        // if (i !== 0 && i !== locations.length+1) {
        //     value = locations[i-1].name;

        //     heavyInput.setAttribute("value" , value)
        // }

        inputdivs.push(heavyInput)

        container.appendChild(inputdivs[i])
        // let inputContainer = document.querySelector('.input-container');
    }



    for (let i = 0; i< inputdivs.length-2 ; i++) {
        const heavyToll = document.querySelector('.toll-div').cloneNode(true);

        heavyToll.classList.remove("display-none");

        let tollId = "toll" + i.toString();

        heavyToll.setAttribute("id" , tollId)

        let id = "#input" + i.toString(); 
        
        let parentInput = document.querySelector(id)

        console.log(parentInput);

        parentInput.insertAdjacentElement("afterend" , heavyToll)
      
    }

    
    console.log(container);
    console.log(inputdivs);

    locations.length !== 0 ? initialize() : null


}

function map() {

    const map = new google.maps.Map(
        document.querySelector(".map"),
        {
            mapTypeControl: false,
            center: { lat: 13.8688, lng: 101.2195 },
            zoom: 4,
        }
    );
}

function initialize() {

    locations.length === 0 ? createInputs() : null;

    let inputContainer = document.querySelector('.input-container')

    var inputArr = inputContainer.querySelectorAll("input")

    inputArr.forEach( input => {
        console.log(input);

        var autocomplete = new google.maps.places.Autocomplete(input);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            map()

                lastInputId = "input" + (locations.length).toString()
                
                var place = autocomplete.getPlace();

                if (input.id === lastInputId) {
                
                    console.log(locations.length);
                    
                    locations.push(place)
                    console.log(locations);   
                }else {
                    let index = input.id.split("t")[1];
                    locations[index] = place
                    console.log(locations)
                }
                         
            
            createInputs();

        });

    })


}
google.maps.event.addDomListener(window, 'load', initialize);




// document.getElementById('city2').value = place.name;
// document.getElementById('cityLat').value = place.geometry.location.lat();
// document.getElementById('cityLng').value = place.geometry.location.lng();
