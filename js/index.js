$(document).ready(function(){
	$("#add-country").click(addCountryAndPopulationTextFields);
	$("#graph-btn").click(generateGraph);
	
	var regexCountry = new RegExp(/^[a-zA-Z ]+$/);
	var regexPopulation = new RegExp(/^\d+$/);
	var countryValue = "";
	var populationValue = "";
	$('#graph-btn').prop('disabled', true);
	$("#country-entry").keyup(function(){
		var countryEmpty = false;
		var populationEmpty = false;
		
		$("#country-entry").children("[id^='country']").each(function() {
			countryValue = $(this).val();

			if(!regexCountry.test(countryValue)){
				$(this).val(countryValue.substring(0,countryValue.length - 1));
			}
			
			if($(this).val() == ""){
                countryEmpty = true;
			}
			
		});

		$("#country-entry").children("[id^='population']").each(function() {
			populationValue = $(this).val();
			
			if(!regexPopulation.test(populationValue)){
				$(this).val(populationValue.substring(0,populationValue.length - 1));
			}
			
			if($(this).val() == ""){
                populationEmpty = true;
			}
		});
		
		if(countryEmpty || populationEmpty){
			$('#graph-btn').prop('disabled', true);
		} else {
			$('#graph-btn').prop('disabled', false);
		}
	});
});

var entryCtr = 1;
function addCountryAndPopulationTextFields(){
	var countryText = "Country <input type='text' id='country-" + entryCtr + "' /> Population <input type='text' id='population-" + entryCtr + "' /><br>";
	$("#country-entry").append(countryText);
	entryCtr++;
	$('#graph-btn').prop('disabled', true);
}

function generateGraph(){
	countries = new Array();
	populations = new Array();
	countriesData = new Array();
	
	$("#country-entry").children("[id^='country']").each(function() {
		countries.push($(this).val());
	});	
	

	$("#country-entry").children("[id^='population']").each(function() {
		populations.push($(this).val());
		
	});
	
	for(i = 0; i < countries.length; i++){
		var tempData = new Array();
		tempData.push(parseInt(populations[i]));
		var tempCountryObj = new Country(countries[i],tempData);
		countriesData.push(tempCountryObj);
		tempData = [];
	}
	
	countries = [];
	populations = [];
	
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Population 2012'
        },
        subtitle: {
            text: 'App Dev example'
        },
        xAxis: {
            categories: ['Population(2012)']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population'
            }
        },
       tooltip: {
            valueSuffix: ' people'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: countriesData
    });
}