/* Math.floor((Math.random()*10)+1);  */

var dndjs = (function(){
	/*Private*/
	var rollDice = function(diceExpression){
		var parsedDice = parseDice(diceExpression);
		var numberOfDies = parsedDice.numberOfDies;
		var typeOfDie = parsedDice.typeOfDie;
		var results = {
			results: [],
			numberOfDies: numberOfDies
		};

		var RollResult = function(dieType,result){
			return{
				dieType: dieType,
				result: result
			};
		};

		for(var i = 0;i < numberOfDies;i++){
			var result= Math.floor((Math.random()*typeOfDie+1));
			if(typeof(parsedDice.modifierAmount) !== String ){
				result += parsedDice.modifierAmount;
			}
			var dieType = typeOfDie;
			var rollResult = new RollResult(dieType, result);
			results.results.push(rollResult);
		}

		return results;
	};

	var parseDice = function(diceExpression){
		var splitExpr = diceExpression.split('d');
		var numberOfDies = parseInt(splitExpr[0],10);
		var typeOfDie = parseInt(splitExpr[1],10);
		var modifierAmount = 0;
		if(diceExpression.indexOf('+')!=-1 || diceExpression.indexOf('-')!=-1 ){
		var modifier = diceExpression.split(typeOfDie)[1];
		modifierAmount = parseInt(modifier,10);
		}

		return{
			numberOfDies: numberOfDies,
			typeOfDie: typeOfDie,
			modifierAmount: modifierAmount
		};
	};

	/*public*/
	return{
		rollDice: rollDice
	};
})();
console.log(dndjs.rollDice("3d6+2"));
module.exports = dndjs;