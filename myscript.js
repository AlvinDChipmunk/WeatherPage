
// to be used for creating date for current weather 
var myNow; 

var myMonth; 
var myDate; 
var myYear; 

var myWIcon; // weather icon for current weather 
var lociIcon = document.getElementById("iIcon"); 

var inCity;    // raw input from inputCity 
var codedCity; // city name now encoded to be safe for API calls 
var locinCity = document.getElementById("inputCity"); 

var myCity; // actual city name from weather object 
var locpCityNameDate = document.getElementById("pCityNameDate"); 

// Lat and Long needed to get UV data from API call 
var myLat; 
var myLng; 

// hook to add searched cities 
var mycityList; 
var locmycityList = document.getElementById("cityList"); 

var myTemp; // temperature from weather object 
var locpTemp = document.getElementById("pTemp"); 

var myHumid; // humidity from weather object 
var locpHumid  = document.getElementById("pHumid"); 

var myWindSpd; // wind speed from weather object 
var locpWind = document.getElementById("pWind"); 

var myWindDir; // wind direction from weather object 

var myUV; // UV index from weather object 
var locpUV = document.getElementById("pUV"); 

var locaUVSafety = document.getElementById("aUVSafety"); 

// hook for adding the five forecast boxes 
var locforecastRow = document.getElementById("forecastRow"); 

var tmpNow; 

var tmpMonth; 
var tmpDate; 
var tmpYear; 

var tmpWIcon; // temp weather icon from forcast object 
var tmpTemp;  // temp temperature from forcast object 
var tmpHumid; // temp humidity from forecast object 

// hook for activating button 
var locbtnGetWeather = document.getElementById("btnGetWeather"); 

// listing of array offset values so stepping through the forecast array for 5 days will be simpler 
var forecastOffsetArr = [ 0, 8, 16,24, 32 ]; 
var forecastNumDays = 5; 

// this is the constant front end for all queries 
var wQFront       = "http://api.openweathermap.org/data/2.5/"; 

var wQType        = "weather"; // only two valid choices for this API should be "weather", for a one day report, and "forecast", for a 5 day report divided into 3 hour intervals 
var wQCityPrefix  = "?q=";     // leading query symbols before inserting city 
var wQCityName    = "";        // needs to be populated by a valid city 
var wQCountryCode = "";        // needs a valid 3 letter country code for the city in question 

// tail end of query string 
var wQEnd         = "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d"; // tail end of query string 
var wQComplete; 

var boolAreForecastCellsEmpty = true; 

// what the complete query string should look like 
// var wQComplete = wQFront + wQType + wQCityPrefix + wQCityName + "," + wQCountryCode + wQEnd; 

// = "http://api.openweathermap.org/data/2.5/" + "forecast" + "?q=" + Bujumbura,BDI + "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d";
// = "http://api.openweathermap.org/data/2.5/" + "weather"  + "?q=" + Bujumbura,BDI + "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d";

/* 
function retrieveListedCityWeather (myCity) { 

	wQFront       = "http://api.openweathermap.org/data/2.5/"; 
	
	wQType        = "weather"; // only two valid choices for this API should be "weather", for a one day report, and "forecast", for a 5 day report divided into 3 hour intervals 
	wQCityPrefix  = "?q=";     // leading query symbols before inserting city 
	wQCityName    = listedCity;    // needs to be populated by a valid city 
	
	wQEnd         = "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d"; // tail end of query string 
	
	// what the complete query string should look like 
	wQComplete = wQFront + wQType + wQCityPrefix + wQCityName + wQEnd; 

	// first get current weather 
	$.ajax( 
		{
			url: wQComplete,
			method: "GET"
		}
	).then ( function (oldResponse) 
		{

			myCity = oldResponse.name; 

			myWindSpd = oldResponse.wind.speed; 
			locpWind.textContent = "Wind Speed: " + myWindSpd + " mph"; 

			myWindDir = oldResponse.wind.deg; 

			myHumid = oldResponse.main.humidity; 
			locpHumid.textContent = "Humidity: " + myHumid + " %"; 

			myTemp = oldResponse.main.temp; 
			locpTemp.textContent = "Temperature: " + myTemp + " °F"; 
			
			// locpUV 
			
			myLat = oldResponse.coord.lat; 
			myLng = oldResponse.coord.lon; 

			myWIcon = "http://openweathermap.org/img/wn/" + oldResponse.weather[0].icon + "@2x.png"; 
			lociIcon.src = myWIcon; 
	
			testMoment = moment.unix(oldResponse.dt); 
	
			testMonth = testMoment.format("MMM"); 
			testDate  = testMoment.format("DD"); 
			testYear  = testMoment.format("YYYY"); 

			locpCityNameDate.textContent = myCity + " " + testDate + " " + testMonth + " " + testYear; 
			
			getUVIndex(); 
			
		} 
	); 

} 
*/ 


function getCityWeather (myCity) { 

	wQFront       = "http://api.openweathermap.org/data/2.5/"; 
	
	wQType        = "weather"; // only two valid choices for this API should be "weather", for a one day report, and "forecast", for a 5 day report divided into 3 hour intervals 
	wQCityPrefix  = "?q=";     // leading query symbols before inserting city 
	wQCityName    = myCity;    // needs to be populated by a valid city 
	
	wQEnd         = "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d"; // tail end of query string 
	
	// what the complete query string should look like 
	wQComplete = wQFront + wQType + wQCityPrefix + wQCityName + wQEnd; 

	// first get current weather 
	$.ajax( 
		{
			url: wQComplete,
			method: "GET"
		}
	).then ( function (cityResponse) 
		{

			myCity = cityResponse.name; 

			myWindSpd = cityResponse.wind.speed; 
			locpWind.textContent = "Wind Speed: " + myWindSpd + " mph"; 

			myWindDir = cityResponse.wind.deg; 

			myHumid = cityResponse.main.humidity; 
			locpHumid.textContent = "Humidity: " + myHumid + " %"; 

			myTemp = cityResponse.main.temp; 
			locpTemp.textContent = "Temperature: " + myTemp + " °F"; 
			
			myLat = cityResponse.coord.lat; 
			myLng = cityResponse.coord.lon; 

			myWIcon = "http://openweathermap.org/img/wn/" + cityResponse.weather[0].icon + "@2x.png"; 
			lociIcon.src = myWIcon; 
	
			testMoment = moment.unix(cityResponse.dt); 
	
			testMonth = testMoment.format("MMM"); 
			testDate  = testMoment.format("DD"); 
			testYear  = testMoment.format("YYYY"); 

			locpCityNameDate.textContent = myCity + " " + testDate + " " + testMonth + " " + testYear; 
			
			var newliCity = document.createElement ( "li" ); 
			newliCity.className += "list-group-item"; 
			newliCity.setAttribute ( "data-URICity", myCity ); 
			newliCity.setAttribute ( "style", "cursor: pointer; " ); 
			newliCity.textContent = myCity; 

			locmycityList.appendChild ( newliCity ); 
			//newliCity.addEventListener("click", retrieveListedCityWeather(myCity) , false); 
			
			getUVIndex(); 
			
		} 
	); 

} 

function getUVIndex() { 

	// now get UV index 
	
	wQFront       = "http://api.openweathermap.org/data/2.5/"; 
	
	wQType        = "uvi"; 
	/* 
	Three valid choices for this API should be: 
		"weather", for a one day report, 
		"forecast", for a 5 day report divided into 3 hour intervals, 
		"uvi" to get UV information, either as current for one location, or a forecast with &cnt={cnt} as a specified number of returned days  
	*/ 
	wQCityPrefix  = "?appid=f28d5fef4ca99d2c3ed57bdc57c5b41d"; // API key goes here in lieu of actual city due to using Lat and Long 

	wQCityName    = ""; // not a needed value, but clear it out just in case 
	
	wQEnd         = "&lat=" + myLat + "&lon="  + myLng;  // tail end of query string that needs to contain Lat and Long 
	
	// what the complete query string should look like 
	wQComplete = wQFront + wQType + wQCityPrefix + wQEnd; 
	
	$.ajax( 
		{
			url: wQComplete,
			method: "GET"
		}
	).then ( function (uvResponse) 
		{

			myUV = uvResponse.value; 
			
			var newUVBtn = document.createElement ( "button" ); 
			
			if (      myUV > 9 ) { newUVBtn.className += "uvBtnExtreme"; } 
			else if ( myUV > 7 ) { newUVBtn.className += "uvBtnVeryHigh"; } 
			else if ( myUV > 4 ) { newUVBtn.className += "uvBtnHigh"; } 
			else if ( myUV > 2 ) { newUVBtn.className += "uvBtnModerate"; } 
			else {                 newUVBtn.className += "uvBtnLow"; } 
			
			newUVBtn.textContent = myUV; 
			newUVBtn.disabled = true; 
			
			locpUV.textContent = "UV Index: "; 
			locpUV.appendChild ( newUVBtn ); 
			
			locaUVSafety.textContent = "[Link to UV index safety explaination]"; 

		} 
	); 
	
	getCityForecast(myCity); 
}

function getCityForecast (myCity) { 

	wQFront       = "http://api.openweathermap.org/data/2.5/"; 
	
	wQType        = "forecast"; // only two valid choices for this API should be "weather", for a one day report, and "forecast", for a 5 day report divided into 3 hour intervals 
	wQCityPrefix  = "?q=";     // leading query symbols before inserting city 
	wQCityName    = myCity;    // needs to be populated by a valid city 
	
	wQEnd         = "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d"; // tail end of query string 
	
	// what the complete query string should look like 
	wQComplete = wQFront + wQType + wQCityPrefix + wQCityName + wQEnd; 

	// first get current weather 
	$.ajax( 
		{
			url: wQComplete,
			method: "GET"
		}
	).then ( function (cityResponse) 
		{ 
		
			console.log(cityResponse);
		
			var tmpFCdt;     // holder for unix time stamp 
			var tmpFCmoment; // holder for time moment object 
			var tmpFCMonth;  // holder for derived month value 
			var tmpFCDate;   // holder for derived date value 
			var tmpFCYear;   // holder for derived year value 
			
			var tmpFCicon;   // holder for weather icon 
			
			// var tmpFCKelvin; // holder for Kelvin value 
			var tmpFCFaren;  // holder for Farenheit value 
			
			var tmpFCHumid;  // holder for humidity value 
			
			// loop variables to help create the forecast cards 
			var dayIterator; // iterator for the days 
			var arrIterator = forecastOffsetArr; // iterator holder for the array offset values!  
			
			/* 
			myCity = cityResponse.city.name; 
			
			cityResponse.list[i].dt 
			cityResponse.list[i].weather.icon 
			tmpKelvin = cityResponse.list[i].main.temp 
			//(0K − 273.15) × 9/5 + 32 = -459.7°F
			tmpFaren = ( ( tmpKelvin - 273.15 ) * 9 / 5 ) + 32; 
			cityResponse.list[i].main.humidity
			*/ 

			var tmpCellName = "cell_"; 
			
			if ( !boolAreForecastCellsEmpty ) { 

				var tmpCell0 = document.getElementById("cell_0"); 
				var tmpCell1 = document.getElementById("cell_1"); 
				var tmpCell2 = document.getElementById("cell_2"); 
				var tmpCell3 = document.getElementById("cell_3"); 
				var tmpCell4 = document.getElementById("cell_4"); 
				
				tmpCell0.removeChild(tmpCell0.firstChild); 
				tmpCell1.removeChild(tmpCell1.firstChild); 
				tmpCell2.removeChild(tmpCell2.firstChild); 
				tmpCell3.removeChild(tmpCell3.firstChild); 
				tmpCell4.removeChild(tmpCell4.firstChild); 

			} else { 
				boolAreForecastCellsEmpty = false; 
			} 

			for ( dayIterator = 0; dayIterator < forecastNumDays; dayIterator ++) { 

				// first need setup variables to create a forecast day card 
				// needing one div for the card body, several spans for text data, and one img for the icon  
				// var newFCcol        = document.createElement ( "div" ); 
				
				tmpCellName = "cell_" + dayIterator; 
				
				var newFCCard       = document.createElement ( "div" ); 
				var newFCdtSpan     = document.createElement ( "div" ); 
				var newFCiconSpan   = document.createElement ( "div" ); 
				var newFCiconImg    = document.createElement ( "img" ); 
				var newFCtempSpan   = document.createElement ( "div" ); 
				var newFChumidSpan  = document.createElement ( "div" ); 
				var tmpBreak        = document.createElement ( "br" ); 
				
				var tmpCellLoc = document.getElementById(tmpCellName); 

				// now assign classes to make column divs 
				// newFCcol.className += "col-sm-2 "; 
				// newFCcol.className += "forcastCell "; 

				// now assign classes to make the divs become cards 
				newFCCard.className += "card "; 
				newFCCard.className += "forecastCard "; 

				// using nested array referencing to get actual array value from forecast object's array 

				// here we start with the unix timestamp 
				tmpFCdt = cityResponse.list[arrIterator[dayIterator]].dt; 
				tmpFCmoment = moment.unix(tmpFCdt); 

				// now using moment.js to get month, date, and year 
				tmpFCMonth = tmpFCmoment.format("MMM"); 
				tmpFCDate  = tmpFCmoment.format("DD"); 
				tmpFCYear  = tmpFCmoment.format("YYYY"); 

				// now add the actual text for the date to the span 
				newFCdtSpan.textContent = tmpFCDate + " " + tmpFCMonth + " " + tmpFCYear; 

				// now creating icon 
				tmpFCicon =  "http://openweathermap.org/img/wn/" + cityResponse.list[arrIterator[dayIterator]].weather[0].icon + "@2x.png";
				newFCiconImg.src    = tmpFCicon; 
				newFCiconImg.width  = 50; 
				newFCiconImg.height = 50; 
				newFCiconSpan.appendChild(newFCiconImg); 
				
				// now creating temperature 
				tmpFCFaren = cityResponse.list[arrIterator[dayIterator]].main.temp; 
				newFCtempSpan.textContent = "Temp.: " + tmpFCFaren + " °F"; 

				// now creating humidity 
				tmpFCHumid = cityResponse.list[arrIterator[dayIterator]].main.humidity; 
				newFChumidSpan.textContent = "Humidity: " + tmpFCHumid + " %"; 
				
				// now needing to append to the card 
				newFCCard.appendChild(tmpBreak); 
				newFCCard.appendChild(newFCdtSpan); 
				newFCCard.appendChild(tmpBreak); 
				newFCCard.appendChild(newFCiconSpan); 
				newFCCard.appendChild(tmpBreak); 
				newFCCard.appendChild(newFCtempSpan); 
				newFCCard.appendChild(tmpBreak); 
				newFCCard.appendChild(newFChumidSpan); 

				// now append the card to the div cell 
				// newFCcol.appendChild(newFCCard); 
				tmpCellLoc.appendChild(newFCCard); 

				// now append the cell to the forecast row 
				// locforecastRow.appendChild(newFCcol); 
				
			} 

			// that should now populate the row 
			
		} 
	); 
	
} 

function getCity () { 
	inCity = locinCity.value; 
	
	myCity = encodeURI(inCity); 
	
	getCityWeather(myCity); 
	

}

locbtnGetWeather.addEventListener("click", getCity, false); 

function clearCity () { 
	locinCity.value = ""; 
} 

locinCity.addEventListener("click", clearCity, false); 


function retrieveListedCityWeather (listedCity) { 

	console.log("am i reacting to mouse click?"); 

	wQFront       = "http://api.openweathermap.org/data/2.5/"; 
	
	wQType        = "weather"; // only two valid choices for this API should be "weather", for a one day report, and "forecast", for a 5 day report divided into 3 hour intervals 
	wQCityPrefix  = "?q=";     // leading query symbols before inserting city 
	wQCityName    = listedCity;    // needs to be populated by a valid city 
	
	wQEnd         = "&units=imperial&appid=f28d5fef4ca99d2c3ed57bdc57c5b41d"; // tail end of query string 
	
	// what the complete query string should look like 
	wQComplete = wQFront + wQType + wQCityPrefix + wQCityName + wQEnd; 

	// first get current weather 
	$.ajax( 
		{
			url: wQComplete,
			method: "GET"
		}
	).then ( function (cityResponse) 
		{

			myCity = cityResponse.name; 
			console.log("New city?: " + myCity); 

			myWindSpd = cityResponse.wind.speed; 
			locpWind.textContent = "Wind Speed: " + myWindSpd + " mph"; 
			console.log("New wind speed?: " + myWindSpd); 

			myWindDir = cityResponse.wind.deg; 

			myHumid = cityResponse.main.humidity; 
			locpHumid.textContent = "Humidity: " + myHumid + " %"; 
			console.log("New humidity?: " + myHumid); 

			myTemp = cityResponse.main.temp; 
			locpTemp.textContent = "Temperature: " + myTemp + " °F"; 
			console.log("New temperature?: " + myTemp); 
			
			myLat = cityResponse.coord.lat; 
			myLng = cityResponse.coord.lon; 

			myWIcon = "http://openweathermap.org/img/wn/" + cityResponse.weather[0].icon + "@2x.png"; 
			lociIcon.src = myWIcon; 
			
	
			testMoment = moment.unix(cityResponse.dt); 
	
			testMonth = testMoment.format("MMM"); 
			testDate  = testMoment.format("DD"); 
			testYear  = testMoment.format("YYYY"); 

			locpCityNameDate.textContent = myCity + " " + testDate + " " + testMonth + " " + testYear; 
			
			getUVIndex(); 
			
		} 
	); 

} 

