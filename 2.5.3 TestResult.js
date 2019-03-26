//ResultFormatter class, before we implement interface checking
var ResultSet = new Interface('ResultSet', ['getData', 'getResults']);

var ResultFormatter = function (resultObject){
	/*
	if(!(resultObject instanceOf TestResult)){
		throw new Error("ResultFormatter:constructor requires an instance")
		+ " of TestResult as an argument.";
	}
	*/
	Interface.ensureImplements(resultObject, ResultSet);
	this.resultObject = resultObject;
};

ResultFormatter.prototype.renderResults = function(){
	var dataOfTest = this.resultObject.getData();
	var resultsArr = this.resultObject.getResults();

	var resultsContainer = document.createElement('div');

	var resultsHeader = document.createElement('h3');
	resultsHeader.innerHTML = 'Test Results from ' + dataOfTest.toUTCString();
	resultsContainer.appendChild(resultsHeader);

	var resultList = document.createElement('ul');
	resultsContainer.appendChild(resultList);

	for (var i = 0, len = resultsArr.length; i < len; i++) {
		var listItem = document.createElement('li');
		listItem.innerHTML = resultsArr[i];
		resultList.appendChild(listItem);
	}

	return resultsContainer;
};