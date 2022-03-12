var funcs = ["","input","output","write","read","subtract","add","multiply","compare","jump"]
function moaiToPt() {
	var moai = document.getElementById("moai").value;
	var pText = "";
	var moaiArr = moai.split("\n");
	var nArr = [];
	moaiArr.forEach(m => (nArr.push([...m].length)));
	for(var n of nArr) {
		if(n >= 10) {
			pText += "push "+(n-10)+"\n";
		} else {
			pText += funcs[n]+"\n";
		}
	}
	document.getElementById("plaintext").value = pText;
}

function ptToMoai() {
	var pText = document.getElementById("plaintext").value;
	var moai = "";
	var textArr = pText.split("\n")
	for(var t of textArr) {
		if(t.startsWith("push")) {
			moai+="🗿".repeat(10+parseInt(t.split(" ")[1]))+"\n";
		} else {
			moai+="🗿".repeat(funcs.indexOf(t))+"\n";
		}
	}
	document.getElementById("moai").value = moai;
}