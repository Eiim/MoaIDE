runMoai = function() {
	var moai = document.getElementById("moai").value;
	var input = document.getElementById("input").value;
	document.getElementById("output").value = moaiscipt(moai, input);
}

moaiscipt = function(moai, input) {
	moaiLines = moai.split("\n");
	
	// Initialize data structures
	mem = [];
	stack = [0,0];
	compare = false;
	
	output = "";
	
	var lineNum = 0;
	for(lineNum = 0; lineNum < moaiLines.length; lineNum++) {
		
		if(lineNum < 0) {
			lineNum = 0;
		}
		var line = moaiLines[lineNum];
		
		// If stack has less than two values, add some more to the bottom to make two (slightly different from but hopefully equivalent to Dtp09's implementation)
		if(stack.length < 2) {stack.push(0)}
		// I don't believe it should be possible to empty the stack after an instruction, but just in case
		if(stack.length < 2) {stack.push(0)}
		
		moais = line.split("🗿").length-1;
		if(moais == 0) {
			// Debug
			// New function in this implementation
			console.log("Memory: ")
			console.log(mem);
			console.log("Stack: ");
			console.log(stack);
			console.log("Compare flag: "+compare);
			console.log();
		} else if (moais == 1) {
			// Take input per-codepoint
			// Official spec is undefined with respect to multi-byte Unicode characters
			// Will probably change soon to be in line with Dtp09's implementation
			if(stack[0] >= input.length) {
				stack.unshift(0);
			} else {
				stack.unshift(input.codePointAt(stack[0]));
			}
		} else if (moais == 2) {
			// Output codepoints
			// Official spec is undefined with respect to multi-byte Unicode characters
			// Will probably change soon to be in line with Dtp09's implementation
			if(stack[0] == 0) {
				output += "🗿";
			} else {
				output += String.fromCodePoint(stack[0]);
			}
		} else if (moais == 3) {
			// Write
			mem[Math.abs(stack[0])] = stack[1];
		} else if (moais == 4) {
			// Read
			val = mem[Math.abs(stack[0])]
			if(val == undefined) {
				stack.unshift(0);
			} else {
				stack.unshift(val);
			}
		} else if (moais == 5) {
			// Subtract
			// second value - top value
			let topVal = stack.shift();
			let secondVal = stack.shift();
			stack.unshift(secondVal - topVal);
		} else if (moais == 6) {
			// Add
			stack.unshift(stack.shift() + stack.shift());
		} else if (moais == 7) {
			// Multiply
			stack.unshift(stack.shift() * stack.shift());
		} else if (moais == 8) {
			// Compare
			compare = (stack[0] == stack[1])
		} else if (moais == 9) {
			// Jump
			// Subtract 1 because we'll end up incrementing at end of loop
			if(compare) {
				lineNum = lineNum + stack[0] - 1;
			}
		} else {
			stack.unshift(moais - 10);
		}
	}
	return output;
}