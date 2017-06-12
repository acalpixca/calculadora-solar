var SolarCalc = require('solar-calc');
var Calendar = require('node-calendar');

function daysSinceNewYears(date) {
	// date va a tener esta pinta 1972-04-03
	var yearMonthDay=date.split('-');
	var month=parseInt(yearMonthDay[1]);
	var day=parseInt(yearMonthDay[2]);
	var year=parseInt(yearMonthDay[0]);
	
	var diasTotales=day;
	//console.log(day);
	var diasEnMes=[31,0,31,30,31,30,31,31,30,31,30,31];
	for (var i=0; i<(month-1);i++){
		//console.log('iteracion ' + i);
		//console.log('dias totales ' + diasTotales );
		diasTotales=diasTotales+diasEnMes[i];
		if (i==1) { // febrero
			if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) { diasTotales=diasTotales+29; } else {diasTotales=diasTotales+28;}
		}
	}
	
	return(diasTotales);
}

function timeToHours(tiempo){
	// hh:mm:ss lo pasamos a horas, haciendo horas=hh+mm/60 (ignoro los segundos)
	var horaMinutoSegundo=tiempo.split(':');
	var hora=parseInt(horaMinutoSegundo[0]);
	var minuto=parseInt(horaMinutoSegundo[1]);
	
	return(hora + minuto/60);
}

function lastSundayOfEachMonths(year) {
	var resultado=[];
	var lastDay = [31,28,31,30,31,30,31,31,30,31,30,31]
	if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) lastDay[2] = 29
	for (var date = new Date(), month=0; month<12; month+=1) {
		date.setFullYear(year, month, lastDay[month]);
		date.setDate(date.getDate()-date.getDay());
		resultado.push(date.toISOString().substring(0,10));
	}  
	return(resultado);
}

function correccionHorarioVerano(date){
	var yearMonthDay=date.split('-');
	var month=parseInt(yearMonthDay[1]);
	var day=parseInt(yearMonthDay[2]);
	var year=parseInt(yearMonthDay[0]);
	
	var domingoDeMiMes=lastSundayOfEachMonths(year)[month-1];
	var diaDomingoDeMiMes=parseInt(domingoDeMiMes.split('-')[2]);
	
	console.log('El domingo de mi mes ' + domingoDeMiMes + ' y su dia es ' + diaDomingoDeMiMes);
	if((month>3) && (month<10)){
		return(2);
	}
	else if (month==3) {
		if (day<diaDomingoDeMiMes) {
			return(1);
		}
		else return(2);
	}
	else if (month==10) {
		if (day<diaDomingoDeMiMes){
			return(2);
		}
		else return(1);
	}
	else return(1);
}
// console.log(daysSinceNewYears('1968-10-24'));

/* probando ese modulo de node
var solar = new SolarCalc(new Date('Mar 8 2015'),35.78,-78.649999);
console.log('si esto funciona es la bomba. ' + JSON.stringify(solar));
console.log('\n\n' + solar.solarNoon);
// fin prueba del modulo solar_calc
*/

function calculoHoraLocal(date, time, longitude) {
	// hora local es hora civil en decimal - correccion + longitud
	var horaCivil=timeToHours(time);
	var correccion=correccionHorarioVerano(date);
	
	return(horaCivil-correccion+longitude);
}

console.log(Calendar.weekday(2017,06,12));

console.log(lastSundayOfEachMonths(2017));

correccionHorarioVerano('2017-05-12');

module.exports.daysSinceNewYears=daysSinceNewYears;
module.exports.timeToHours=timeToHours;
module.exports.correccionHorarioVerano=correccionHorarioVerano;