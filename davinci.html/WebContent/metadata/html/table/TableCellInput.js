define([
	"dojo/_base/declare",
	"davinci/ve/input/SmartInput"
], function(
	declare,
	SmartInput
) {

return declare(SmartInput, {
	property: "textContent",
	
	displayOnCreate: "false",

	constructor : function() {
	},
	
	serialize: function(widget, updateEditBoxValue, value) {
		var result = value;
		if (value.trim() == "&#8288;") {
			result = "";
		}
		updateEditBoxValue(result); 
	},
	
	parse: function(input) {
		var value = input;
		if (input.trim() == "") {
			value = "&#8288;";
		}
		return value;
	}
});

});