var chai=require('chai');
var Calculadora=require('../calculadora');

// recurso buenísimo para UT en Node: https://www.sitepoint.com/unit-test-javascript-mocha-chai/
// y para mocha: http://chaijs.com/api/assert/

var assert = chai.assert;

describe('Calculadora', function() {
  it('Calcula dias desde el principio del año', function() {
	assert.deepEqual(27,Calculadora.daysSinceNewYears('1995-01-27'));
	assert.deepEqual(297,Calculadora.daysSinceNewYears('1966-10-24'));
	assert.deepEqual(298,Calculadora.daysSinceNewYears('1968-10-24'));
  });

  it('Calcula la hora en horas es decir horas+minutos/60', function() {
	assert.deepEqual(1.5,Calculadora.timeToHours('01:30:44'));
  });

   it('Correccion horario de verano en invierno es decir de oct a mar +1', function() {
	assert.deepEqual(1,Calculadora.correccionHorarioVerano('2016-2-27'));
  });

   it('Correccion horario de verano en verano es decir de mar a oct +2', function() {
	assert.deepEqual(2,Calculadora.correccionHorarioVerano('2016-7-27'));
  });

  it('Correccion horario el dia de marzo que cambia', function() {
	assert.deepEqual(2,Calculadora.correccionHorarioVerano('2017-03-26'));
  });

  it('Correccion horario un dia de marzo anterior a ultimo domingo', function() {
	assert.deepEqual(1,Calculadora.correccionHorarioVerano('2017-03-23'));
  });

   it('Correccion horario un dia de marzo posterior a ultimo domingo', function() {
	assert.deepEqual(2,Calculadora.correccionHorarioVerano('2017-03-27'));
  });

  it('Correccion horario el dia de octubre que cambia', function() {
	assert.deepEqual(1,Calculadora.correccionHorarioVerano('2017-10-29'));
  });

  it('Correccion horario un dia de octubre anterior a ultimo domingo', function() {
	assert.deepEqual(2,Calculadora.correccionHorarioVerano('2017-10-27'));
  });

  it('Correccion horario un dia de octubre posterior a ultimo domingo', function() {
	assert.deepEqual(1,Calculadora.correccionHorarioVerano('2017-10-31'));
  });

  it('De decimal a grados minutos segundos', function() {
	assert.deepEqual({grados: 51, minutos: 31 , segundos: 31} ,Calculadora.decimalAGradosMinutosSegundos(51.5254742));
  });

  it('Calculo hora solar de mi nacimiento', function() {
	   assert.deepEqual("08:53:39" ,Calculadora.calculoHoraLocal('1972-04-03', '10:45:00', 2.1687863));
  });

  it('Calculo hora solar ahora mismo', function() {
    // este test nunca podrá pasar. Hay que cambiar la función para que el cliente obtenga la hora UTC y se haga todo el cálculo aquí
     assert.deepEqual("08:53:39" ,Calculadora.calculoHoraLocalAhora(2.1687863));
  });

  // calculoHoraLocalAhora
  // We can have more its here
});
