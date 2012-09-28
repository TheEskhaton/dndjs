var dndjs = (function(){
	/*Private*/
	var _= require("underscore");
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
	var StatSet = function(str, intel, dex, cha, wis, con){
			return {
				str: str,
				intel: intel,
				dex: dex,
				cha:cha,
				wis: wis,
				con: con
				
			};
		};
	var statSetasArray= function(statset){
					return [str, intel, dex, cha, wis, con];
				};
	var generateStats = function(){
		var stats = [];
		for(var i=0;i<6;i++){
			var roll = rollDice("4d6");
			var dropLowest= findMinRoll(roll.results);
			stat = _.reduce(dropLowest,function(memo, num){return memo+num.result},0);
			stats.push(stat);

		}
		statSet = new StatSet(stats[0],stats[1],stats[2],stats[3],stats[4],stats[5]);
		return statSet;
	};

	var randomizeStatOrder= function(statset){
		var rand5 = function(){
			return Math.floor((Math.random()*5));
		};
		var statArray = statSetasArray(statset);
		var randomArray = statArray.sort(function() { return 0.5 - Math.random();});
		var newStatSet = new StatSet(randomArray[0],randomArray[1],randomArray[2],randomArray[3],randomArray[4],randomArray[5]);
		return newStatSet;
	};

	var findMinRoll = function(results){
			var minRoll = results[0].result;
			for (var i = results.length - 1; i > 0; i--) {
				if(results[i].result < minRoll)
				{
					minRoll = results[i].result;
				}
			}
			for (var j = results.length - 1; j >= 0; j--) {
				if(results[j].result == minRoll)
				{
					results.splice(results.indexOf(results[j]), 1);
					break;
				}
			}
			return results;
	};

	/*public*/
	return{
		rollDice: rollDice,
		generateStats: generateStats,
		randomizeStatOrder: randomizeStatOrder
	};
})();
module.exports = dndjs;