function attachEvents() {
    let inputLocation = document.querySelector('input#location');
    let getWeatherBtn = document.querySelector('input#submit');
    let forecast = document.querySelector('div#forecast');
    let currentWeather = document.querySelector('div#current');
    let upcomingWeather = document.querySelector('div#upcoming');

    getWeatherBtn.addEventListener('click', getWeather);

    let conditions = {
        'Sunny': '&#x2600', 
        'Partly sunny': '&#x26C5', 
        'Overcast': '&#x2601', 
        'Rain': '&#x2614', 
        'Degrees': '&#176'
    }

    function getWeather() {
        // currentWeather.innerHTML = '';
        
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then(res => res.json())
        .then(data => {
            let cityIndex = data.findIndex(el => el.name == inputLocation.value);
            forecast.style.display = 'block';
            if (cityIndex == -1) {
                throw new Error();
            }
            
            let cityCode = data[cityIndex].code;

            //Current weather
            fetch('http://localhost:3030/jsonstore/forecaster/today/' + cityCode)
            .then(res => res.json())
            .then(data => {
                //Main div
                let forecasts = document.createElement('div');
                forecasts.className = 'forecasts';
    
                //Condition symbol span
                let condSymbol = document.createElement('span');
                condSymbol.className = 'condition symbol';
                condSymbol.innerHTML = conditions[data.forecast.condition];
                forecasts.appendChild(condSymbol);
    
                //Condition info spans
                let condition = document.createElement('span');
                condition.className = 'condition';

                //Span1
                let span1 = document.createElement('span');
                span1.className = 'forecast-data';
                span1.textContent = data.name;
                condition.appendChild(span1);
                
                //Span2
                let span2 = document.createElement('span');
                span2.className = 'forecast-data';
                span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
                condition.appendChild(span2);
                
                //Span3
                let span3 = document.createElement('span');
                span3.className = 'forecast-data';
                span3.textContent = data.forecast.condition;
                condition.appendChild(span3);

                forecasts.appendChild(condition);
                currentWeather.appendChild(forecasts);
            })


            //Upcoming weather
            fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + cityCode)
            .then(res => res.json())
            .then(data => {
                //Main div
                let fcInfo = document.createElement('div');
                fcInfo.className = 'forecast-info';

                //Each day of the array
                data.forecast.forEach( el => {
                    //Main span
                    let upcoming = document.createElement('span');
                    upcoming.className = 'upcoming';

                    //Symbol
                    let symbol = document.createElement('span');
                    symbol.className = 'symbol';
                    symbol.innerHTML = conditions[el.condition];
                    upcoming.appendChild(symbol);

                    //Forecast data 1st span
                    let fcData = document.createElement('span');
                    fcData.className = 'forecast-data';
                    fcData.innerHTML = `${el.low}&#176;/${el.high}&#176;`;
                    upcoming.appendChild(fcData);

                    //Forecast data 2nd span
                    let fcData2 = document.createElement('span');
                    fcData2.className = 'forecast-data';
                    fcData2.textContent = el.condition;
                    upcoming.appendChild(fcData2);

                    fcInfo.appendChild(upcoming);
                });

                upcomingWeather.appendChild(fcInfo);
            })
            .catch(() => forecast.textContent = 'Error');
        })
        .catch(() => forecast.textContent = 'Error');
    }
}

attachEvents();