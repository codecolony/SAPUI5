
	//globals
	var oConnectorMatrix;
	var oFlowstepMatrix;
	var myConnectorAdaptersSelector;
	var myFlowStepAdaptersSelector;
	var categorySelectorExists;
	var connectionMatricExists;
	var flowStepMatrixExists;
	var oMatrix;
	var fixedMatrix;
	var oFormMatrix;
	var myCategorySelector;
	var oSimpleForm;
	var rMapStep;
	var oRMap;
	var resultXML;
	var globalRStep2;
	var step2list = [];

function getFlowStepList(){
	//simulation at the moment
	return ["Mapping", "Signer", "Verifier", "Encoder", "Decoder"];
	
	//to do - real logic to retrieve the list
}

function addFlowStep(stepName){
	var dItem = new sap.ui.core.ListItem(stepName);
	dItem.setText(stepName);
	myFlowStepAdaptersSelector.addItem(dItem);
}

function getCategorySelector() {
	//add category drop down
	if(	categorySelectorExists == true ){
		
		return sap.ui.getCore().byId("CategoryDropdown");
	}
	else {
	myCategorySelector = new sap.ui.commons.DropdownBox("CategoryDropdown");
	myCategorySelector.setTooltip("Select the category.");
	myCategorySelector.setEditable(false);
	myCategorySelector.setWidth("200px");
	
	var dItem = new sap.ui.core.ListItem("Connector");
	dItem.setText("Connector");
	myCategorySelector.addItem(dItem);
	
	dItem = new sap.ui.core.ListItem("FlowStep");
	dItem.setText("FlowStep");
	myCategorySelector.addItem(dItem);
	categorySelectorExists = true;
	return myCategorySelector;
	
	}
}

function setConnectorCategorySelected(){
	myCategorySelector.setSelectedItemId("Connector");
	myCategorySelector.fireEvent('change');
}

function setFlowStepCategorySelected(){
	myCategorySelector.setSelectedItemId("FlowStep");
	myCategorySelector.fireEvent('change');
}

function getConnectionMatrix(){
	
	if(flowStepMatrixExists == true){
		flowStepMatrixExists = false;
		
		fixedMatrix.removeAllRows();
		//fixedMatrix.removeRow(sap.ui.getCore().byId("L-FlowAdapters"),sap.ui.getCore().byId("flowstepDropdown"));
		sap.ui.getCore().byId("flowstepDropdown").destroy();
		sap.ui.getCore().byId("L-FlowAdapters").destroy();
		
	}
	
	if( connectionMatricExists == true ){
		//addComponentTypeDropDown();
		return sap.ui.getCore().byId("connectorDropdown");
	}
	else{
		addComponentTypeDropDown();
		myConnectorAdaptersSelector = new sap.ui.commons.DropdownBox("connectorDropdown",{ 
			change: function(oEvent){
//                sap.ui.getCore().byId("TextFieldKey").setValue(oEvent.oSource.getSelectedKey());
//                sap.ui.getCore().byId("TextFieldId").setValue(oEvent.oSource.getSelectedItemId());
			processDropDownConnector();
                }});
		myConnectorAdaptersSelector.setTooltip("Select the adapter.");
		myConnectorAdaptersSelector.setEditable(true);
		myConnectorAdaptersSelector.setWidth("200px");
	
	var dItem = new sap.ui.core.ListItem("IDOC");
	dItem.setText("IDOC");
	myConnectorAdaptersSelector.addItem(dItem);
	
	dItem = new sap.ui.core.ListItem("SFTP");
	dItem.setText("SFTP");
	myConnectorAdaptersSelector.addItem(dItem);
	
	dItem = new sap.ui.core.ListItem("SOAP");
	dItem.setText("SOAP");
	myConnectorAdaptersSelector.addItem(dItem);
	
	
	
	var oLabel = new sap.ui.commons.Label({
		id : 'L-ConnectorAdapters',
		text : 'Type: ' });
	oLabel.setLabelFor(myConnectorAdaptersSelector);
	//oCell.addContent(oLabel, myAdaptersSelector);

	fixedMatrix.createRow(oLabel,myConnectorAdaptersSelector);
	//oConnectorMatrix.placeAt('content');
	//oMatrix.createRow(oConnectorMatrix);

	connectionMatricExists = true;
	//myConnectorAdaptersSelector.attachEvent('change', processDropDownConnector(myConnectorAdaptersSelector));
	return myConnectorAdaptersSelector;
	}
}

function getFlowStepMatrix(){
	
	if(connectionMatricExists == true){
		connectionMatricExists = false;
		
		fixedMatrix.removeAllRows();
		//fixedMatrix.removeRow(sap.ui.getCore().byId("L-ConnectorAdapters"),sap.ui.getCore().byId("connectorDropdown"));
		sap.ui.getCore().byId("connectorDropdown").destroy();
		sap.ui.getCore().byId("L-ConnectorAdapters").destroy();
	}
	
	if( flowStepMatrixExists == true ){
		addComponentTypeDropDown();
		return sap.ui.getCore().byId("flowstepDropdown");
	}
	else{
		addComponentTypeDropDown();
		myFlowStepAdaptersSelector = new sap.ui.commons.DropdownBox("flowstepDropdown",{ 
			change: function(oEvent){
//              sap.ui.getCore().byId("TextFieldKey").setValue(oEvent.oSource.getSelectedKey());
//              sap.ui.getCore().byId("TextFieldId").setValue(oEvent.oSource.getSelectedItemId());
			//processDropDownFlowStep();
				addRemoveFlowStepsToRMap();
              }});
		myFlowStepAdaptersSelector.setTooltip("Select the step.");
		myFlowStepAdaptersSelector.setEditable(true);
		myFlowStepAdaptersSelector.setWidth("200px");
		
		flowList = getFlowStepList();
		
		for(item in flowList){
			var dItem = new sap.ui.core.ListItem(flowList[item]);
			dItem.setText(flowList[item]);
			myFlowStepAdaptersSelector.addItem(dItem);
		}
		
		oLabel = new sap.ui.commons.Label({
			id : 'L-FlowAdapters',
			text : 'Type: ' });
		
		//oCell.addContent(myAdaptersSelector);
		oLabel.setLabelFor(myFlowStepAdaptersSelector);
		fixedMatrix.createRow(oLabel, myFlowStepAdaptersSelector);

		flowStepMatrixExists = true;
		//myFlowStepAdaptersSelector.attachEvent('change', processDropDownFlowStep(myFlowStepAdaptersSelector));
		return myFlowStepAdaptersSelector;
	}
}

function addComponentTypeDropDown(){
	
	if(sap.ui.getCore().byId("fixedMatrix")==undefined){
		
		fixedMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'fixedMatrix',
			layoutFixed : true,
			width : '1000px',
			columns : 5,
			widths : ['150px', '250px', '200px', '200px', '200px'] });
	}
	
//	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
//		colSpan: 5 });

	if(sap.ui.getCore().byId("L-Category")!=undefined){
		var oLabel = sap.ui.getCore().byId("L-Category");
	}
	else{
		var oLabel = new sap.ui.commons.Label({
			id : 'L-Category',
			text : 'Category: ' });
	}
	
	myCategorySelector = getCategorySelector( );
	oLabel.setLabelFor(myCategorySelector);
	fixedMatrix.createRow(oLabel, myCategorySelector);

	fixedMatrix.placeAt('fixed');
}

function addHeaderInfo(){
	//trying matrix layout
	oMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'parentMatrix',
		layoutFixed : true,
		width : '1000px',
		columns : 5,
		widths : ['150px', '250px', '200px', '200px', '200px'] });

	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 5 });

	var oTV = new sap.ui.commons.TextView({
		id : 'glue-integrate',
		text : 'Glue Integrate',
		design : sap.ui.commons.TextViewDesign.H1 });

	oCell.addContent(oTV);
	oMatrix.createRow(oCell);
	oMatrix.placeAt('header');
	
	//let me try roadmap control
	oRMap = new sap.ui.commons.RoadMap("rMap");

	//create the RoadMap steps
	var oStep1 = new sap.ui.commons.RoadMapStep("sender", {label: "Sender" });
	var oStep2 = new sap.ui.commons.RoadMapStep("flowstep", {label: "Flow Steps"});
	var oStep3 = new sap.ui.commons.RoadMapStep("receiver", {label: "Receiver"});
	
	globalRStep2 = oStep2;
	
	oRMap.attachStepSelected(function(oEvent){
		//alert(oRMap.getSelectedStep()); 
		rMapStep = oRMap.getSelectedStep();
		
		if(rMapStep == "sender"){
			setConnectorCategorySelected();
		}
		else if(rMapStep == "flowstep" ){
			setFlowStepCategorySelected();
			oFormMatrix.removeAllRows();
			if(rMapStep != "flowstep"){
				//console.log(rMapStep.charAt(0)+rMapStep.substring(1,rMapStep.length - 1));
				myFlowStepAdaptersSelector.setSelectedItemId(rMapStep.charAt(0).toUpperCase()+rMapStep.substring(1,rMapStep.length));
				//myFlowStepAdaptersSelector.fireEvent('change');
			}
			myFlowStepAdaptersSelector.fireEvent('change');
		}
		else if(rMapStep == "receiver"){
			setConnectorCategorySelected();
		}

	});
	
	//add steps to the RoadMap
	oRMap.addStep(oStep1);
	oRMap.addStep(oStep2);
	oRMap.addStep(oStep3);

	//Set the first step as selected
	oRMap.setSelectedStep("sender");

	//Set the number of visible steps
	oRMap.setNumberOfVisibleSteps(10);

	//Place the control on the UI	
	oRMap.placeAt("header");
}
sap.ui.jsview("integrate.test", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf integrate.test
	*/ 
	getControllerName : function() {
		return "integrate.test";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf integrate.test
	*/
	

	createContent : function(oController) {
		
		addHeaderInfo();
		
		//////////////////////

		addComponentTypeDropDown();
		///////////////
		
//		myCategorySelector = getCategorySelector( );
//		oLabel.setLabelFor(myCategorySelector);
//		fixedMatrix.createRow(oLabel, myCategorySelector);
		//oMatrix.placeAt('header');

		myCategorySelector.attachEvent('change', function processCategoryDDSelection(){
			console.log(myCategorySelector.getLiveValue());
			
			if (myCategorySelector.getLiveValue()=="Connector"){
				//oMatrix.createRow(getConnectionMatrix( ) );
				myConnectorAdaptersSelector = getConnectionMatrix( );
				//myConnectorAdaptersSelector.attachEvent('change', processDropDownFlowStep());
				myConnectorAdaptersSelector.fireEvent('change');
			}
			else if (myCategorySelector.getLiveValue()=="FlowStep"){
				//oMatrix.createRow(getFlowStepMatrix());
				myFlowStepAdaptersSelector =  getFlowStepMatrix();
				//myFlowStepAdaptersSelector.attachEvent('change', processDropDownFlowStep(myFlowStepAdaptersSelector));
			}
		});
		myCategorySelector.fireEvent('change');
	
		return oMatrix;
	}
	
	

});

function processDropDownConnector(){

		//now load the adapter xml/json files
		console.log("Inside processDropDownConnector function");
		if(oFormMatrix != undefined)
			oFormMatrix.removeAllRows();
		
		var adap_type = myConnectorAdaptersSelector.getLiveValue();
		var fileToLoad;
		
		if (adap_type=="IDOC")
		fileToLoad = "./integrate/datafiles/IDOCMetadata.json";
		else if (adap_type=="SFTP")
		fileToLoad = "./integrate/datafiles/SFTPMetadata.json";
		else if (adap_type=="SOAP")
		fileToLoad = "./integrate/datafiles/SOAPMetadata.json";
		
		console.log(fileToLoad);
		
		//xml = new sap.ui.model.xml.XMLModel(fileToLoad);
		//xmlContents = xml.getXML();
		
		var json = new sap.ui.model.json.JSONModel();
		json.loadData(fileToLoad,null,false);
		console.log(json);
		sap.ui.getCore().setModel(json);  
		
		//loop into the parameters to add UI input
		var oModel =  sap.ui.getCore().getModel();
		console.log(oModel);
		
		
		if (adap_type=="SOAP"){
		attrib_objects = oModel.oData.AdapterTypeMetaData.Attribute;
		console.log(oModel.oData.AdapterTypeMetaData);
		}
		else{
		var oData1 = oModel.getData();
		console.log(oModel.oData);
		attrib_objects = oData1.Attribute;
		}

		showFormAndButtons(attrib_objects, adap_type);
		
};

function showFormAndButtons(attrib_objects, adap_type){
	var text = "#text";
	var form = [];
	var formTitle = new sap.ui.commons.Title({text:"Enter parameters"});
	form.push(formTitle);
	
	var otextview;
	var otextinput;
	
	for (var i = 0, count = 0; i < attrib_objects.length; i++) {
	
	//console.log("1"+attrib_objects[i].Name[text]);
	if (attrib_objects[i].Usage != "optional"){
	
	
	textid = "txtView"+adap_type+count;
	textfield = "txtField"+adap_type+count;
	if (adap_type=="SOAP"){
	textGuiLabel = attrib_objects[i].GuiLabels.Label[text];
	textDefaultValue = attrib_objects[i].Default;
	}
	else{
	textGuiLabel = attrib_objects[i].GuiLabels[0][text];
	textDefaultValue = attrib_objects[i].Default;
	}
	
	//place a row repeater for lines
	if(sap.ui.getCore().byId(textid)!=undefined){
		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
		otextview = sap.ui.getCore().byId(textid);
		//oFormMatrix.removeAllRows();
	}
	else{
		otextview = new sap.ui.commons.Label(textid,{
		text: textGuiLabel,
		tooltip: "testing"
		});
	}
	//otextview.placeAt("target"+count);	
	
	if(sap.ui.getCore().byId(textfield)!=undefined){
		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
		otextinput = sap.ui.getCore().byId(textfield	);
		//oFormMatrix.removeAllRows();
	}
	else{
		otextinput = new sap.ui.commons.TextField(textfield, {
		value: textDefaultValue
		
		});
	}
	
	count++;
	form.push(otextview);
	form.push(otextinput);
	}
	}
	
	//create a new matrix layout.
	if(sap.ui.getCore().byId("formMatrix")!=undefined){
		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
		oFormMatrix = sap.ui.getCore().byId("formMatrix");
		oFormMatrix.removeAllRows();
	}
	else{
	oFormMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'formMatrix',
		layoutFixed : true,
		width : '100px',
		columns : 2,
		widths : ['45px', '450px'] });

	
	oFormMatrix.placeAt('form');
	}
	
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 4 });
	
	
	if(sap.ui.getCore().byId("sf"+adap_type)!=undefined){
		
		oSimpleForm = sap.ui.getCore().byId("sf"+adap_type);
		//oSimpleForm.removeAllContent();
	}
	else{
		oSimpleForm = new sap.ui.commons.form.SimpleForm(
		"sf"+adap_type,
		{
		maxContainerCols: 2,
		minWidth: 200,
		labelMinWidth: 180,
		//layout : sap.ui.commons.form.SimpleFormLayout,
		content:form
		});
	}
	
	oCell.addContent(oSimpleForm);
	oFormMatrix.createRow(oCell);
	
	var btn;
	if(oRMap.getSelectedStep()=="receiver"){
		
		
		if(sap.ui.getCore().byId("submit"+adap_type)!=undefined){
			
			btn  = sap.ui.getCore().byId("submit"+adap_type);
			
		}
		else{
			btn = new sap.ui.commons.Button("submit"+adap_type,{
			text: "Create",
			width: "400px",
			press : function(oEvent){createXML(form, adap_type);}
			});
		}
		oCell.addContent(btn);
	}
	
	if(oRMap.getSelectedStep()!="receiver"){
	
		if(sap.ui.getCore().byId("next")!=undefined){
			
			btn  = sap.ui.getCore().byId("next");
			
		}
		else{
			btn = new sap.ui.commons.Button("next",{
			text: "Next",
			width: "400px",
			press : function(oEvent){showNextRoadMap();}
			});
		}
	
		oCell.addContent(btn);
	}
	oFormMatrix.createRow(oCell);

}

function addRemoveFlowStepsToRMap(){
	var btn;
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 4 });
	
	if(sap.ui.getCore().byId("addflowstep")!=undefined){
		
		btn  = sap.ui.getCore().byId("addflowstep");
		
	}
	else{
		btn = new sap.ui.commons.Button("addflowstep",{
		text: "Add Step",
		width: "100px",
		press : function(oEvent){addFlowSteptoRoadMap(myFlowStepAdaptersSelector.getLiveValue());}
		});
	}
	oCell.addContent(btn);
	
	var btn;
	if(sap.ui.getCore().byId("removeflowstep")!=undefined){
		
		btn  = sap.ui.getCore().byId("removeflowstep");
		
	}
	else{
		btn = new sap.ui.commons.Button("removeflowstep",{
		text: "Remove Step",
		width: "100px",
		press : function(oEvent){removeFlowStepFromRoadMap(myFlowStepAdaptersSelector.getLiveValue());}
		});
	}
	oCell.addContent(btn);
	
	if(sap.ui.getCore().byId("next")!=undefined){
		
		btn  = sap.ui.getCore().byId("next");
		
	}
	else{
		btn = new sap.ui.commons.Button("next",{
		text: "Next",
		width: "200px",
		press : function(oEvent){showNextRoadMap();}
		});
	}
	oCell.addContent(btn);
	oFormMatrix.createRow(oCell);
}

function showFlowFormAndButtons(){
	var text = "#text";
	var form = [];
	var formTitle = new sap.ui.commons.Title({text:"Enter parameters"});
	form.push(formTitle);
	
	var otextview;
	var otextinput;
	
	var count=0;
	adap_type = "flow";
	
//	for (var i = 0, count = 0; i < attrib_objects.length; i++) {
//	
//	//console.log("1"+attrib_objects[i].Name[text]);
//	if (attrib_objects[i].Usage != "optional"){
//	
//	
	textid = "txtView"+adap_type+count;
	textfield = "txtField"+adap_type+count;
//	if (adap_type=="SOAP"){
//	textGuiLabel = attrib_objects[i].GuiLabels.Label[text];
//	textDefaultValue = attrib_objects[i].Default;
//	}
//	else{
//	textGuiLabel = attrib_objects[i].GuiLabels[0][text];
//	textDefaultValue = attrib_objects[i].Default;
//	}
//	
	
	textGuiLabel = "Label for "+oRMap.getSelectedStep();
	//place a row repeater for lines
	if(sap.ui.getCore().byId(textid)!=undefined){
		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
		otextview = sap.ui.getCore().byId(textid);
		otextview.setText(textGuiLabel);
		//oFormMatrix.removeAllRows();
	}
	else{
		otextview = new sap.ui.commons.Label(textid,{
		text: textGuiLabel,
		tooltip: "testing"
		});
	}
//	//otextview.placeAt("target"+count);	
	
	if(sap.ui.getCore().byId(textfield)!=undefined){
		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
		otextinput = sap.ui.getCore().byId(textfield	);
		//oFormMatrix.removeAllRows();
	}
	else{
		otextinput = new sap.ui.commons.TextField(textfield, {
		value: textDefaultValue
		
		});
	}
	
	// otextinput.placeAt("target"+count);
	
	//count++;
	form.push(otextview);
	form.push(otextinput);
	//}
	//}
	
	//create a new matrix layout.
	if(sap.ui.getCore().byId("formMatrix")!=undefined){
		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
		oFormMatrix = sap.ui.getCore().byId("formMatrix");
		oFormMatrix.removeAllRows();
		//oFormMatrix.destroyRows();
	}
	else{
	oFormMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'formMatrix',
		layoutFixed : true,
		width : '100px',
		columns : 2,
		widths : ['45px', '450px'] });

	
	oFormMatrix.placeAt('form');
	}
	
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 4, rowSpan :4 ,padding :10 });
	
	//try form
//	if(!sap.ui.getCore().byId("sf"+adap_type)){
//		//oMatrix.createRow(sap.ui.getCore().byId("sf"+adap_type));
//		//sap.ui.getCore().byId("sf"+adap_type).placeAt("form");
//	}
//	else{
	
	if(sap.ui.getCore().byId("sf"+adap_type)!=undefined){
		
		oSimpleForm = sap.ui.getCore().byId("sf"+adap_type);
		//oSimpleForm.removeAllContent();
	}
	else{
		oSimpleForm = new sap.ui.commons.form.SimpleForm(
		"sf"+adap_type,
		{
		maxContainerCols: 2,
		minWidth: 200,
		labelMinWidth: 180,
		content:form
		});
	}
	
	oCell.addContent(oSimpleForm);
	oFormMatrix.createRow(oCell);

	if(oRMap.getSelectedStep()=="receiver"){
		
		var btn;
		if(sap.ui.getCore().byId("submit"+adap_type)!=undefined){
			
			btn  = sap.ui.getCore().byId("submit"+adap_type);
			
		}
		else{
			btn = new sap.ui.commons.Button("submit"+adap_type,{
			text: "Create",
			width: "400px",
			press : function(oEvent){createXML(form, adap_type);}
			});
		}
		oCell.addContent(btn);
	}
	
	if(sap.ui.getCore().byId("next")!=undefined){
		
		btn  = sap.ui.getCore().byId("next");
		
	}
	else{
		btn = new sap.ui.commons.Button("next",{
		text: "Next",
		width: "400px",
		press : function(oEvent){showNextRoadMap();}
		});
	}
	
	oCell.addContent(btn);
	oFormMatrix.createRow(oCell);
}

function showNextRoadMap(){
	console.log("Inside showNextRoadMap function");
	var stepnow = oRMap.getSelectedStep();
	
	if(stepnow == "sender"){
		oRMap.setSelectedStep("flowstep");
		oRMap.fireEvent('stepSelected');
		
	}
//	else if(stepnow == "receiver"){
//		oRMap.setSelectedStep(sSelectedStep);
//	}
	else if(stepnow == "flowstep"){
		
		oRMap.setSelectedStep(step2list[0]);
		oRMap.fireEvent('stepSelected');
	}
	else{
		//var sSelectedStep;
		var idx = step2list.indexOf(stepnow);
		if(idx == step2list.length - 1){
			oRMap.setSelectedStep("receiver");
			oRMap.fireEvent('stepSelected');
		}
		else{
			oRMap.setSelectedStep(step2list[idx+1]);
			oRMap.fireEvent('stepSelected');
		}
	}
	
	
}

function createXML(inputobjects, liveValue){
	console.log("Inside createXML function");
	console.log(inputobjects.length);
	
	//let's try xml model
	//var outputFile = new sap.ui.model.xml.XMLModel();
	var xmlFile = "<xml>";
	xmlFile = xmlFile + '\n' + "<component name='"+myCategorySelector.getLiveValue()+ "' type='"+liveValue+"'>";
	
	for (var i = 1; i < inputobjects.length; i=i+2) {
		//console.log(inputobjects[i].getText());
		//console.log(inputobjects[i+1].getValue());
		
		xmlFile = xmlFile + '\n' + "<parameter name='"+inputobjects[i].getText()+"'>"+inputobjects[i+1].getValue()+"</parameter>";
		//xmlFile = xmlFile + '\n' + "<value>"+inputobjects[i+1].getValue()+"</value>";
	}
	
	xmlFile = xmlFile + '\n' +"</component>\n</xml>";
	console.log(xmlFile);
	

}

function processDropDownFlowStep(myAdaptersSelector){
	console.log("Inside processDropDownFlowStep function");
	oFormMatrix.removeAllRows();
	
	var adap_type = myFlowStepAdaptersSelector.getLiveValue();
	var fileToLoad;
	
//	if (adap_type=="IDOC")
//	fileToLoad = "./integrate/datafiles/IDOCMetadata.json";
//	else if (adap_type=="SFTP")
//	fileToLoad = "./integrate/datafiles/SFTPMetadata.json";
//	else if (adap_type=="SOAP")
//	fileToLoad = "./integrate/datafiles/SOAPMetadata.json";
	
	//console.log(fileToLoad);
	
	//xml = new sap.ui.model.xml.XMLModel(fileToLoad);
	//xmlContents = xml.getXML();
	
//	var json = new sap.ui.model.json.JSONModel();
//	json.loadData(fileToLoad,null,false);
//	console.log(json);
//	sap.ui.getCore().setModel(json);  
	
	//loop into the parameters to add UI input
//	var oModel =  sap.ui.getCore().getModel();
//	console.log(oModel);
	
	
//	if (adap_type=="SOAP"){
//	attrib_objects = oModel.oData.AdapterTypeMetaData.Attribute;
//	console.log(oModel.oData.AdapterTypeMetaData);
//	}
//	else{
//	var oData1 = oModel.getData();
//	console.log(oModel.oData);
//	attrib_objects = oData1.Attribute;
//	}

	//showFlowFormAndButtons();
	addFlowSteptoRoadMap(adap_type);
}

function addFlowSteptoRoadMap(stepName){
	
	var stepId = stepName.charAt(0).toLowerCase()+stepName.substring(1,stepName.length);
	
	if(sap.ui.getCore().byId(stepId)!=undefined){
		
		obj  = sap.ui.getCore().byId(stepId);
		globalRStep2.addSubStep(obj);
	}
	else{	
		var oSubStep = new sap.ui.commons.RoadMapStep(stepId, {label: stepName});
		globalRStep2.addSubStep(oSubStep);
	}
	if(step2list.indexOf(stepId)<0)
		step2list.push(stepId);
	console.log(step2list);
}

function removeFlowStepFromRoadMap(stepName){
	console.log("Inside removeFlowStepFromRoadMap function");
	stepName = oRMap.getSelectedStep();
	var stepId = stepName.charAt(0).toLowerCase()+stepName.substring(1,stepName.length);
	//console.log(stepId);
	
	//obj  = sap.ui.getCore().byId(stepId);
	globalRStep2.removeSubStep(stepId);
	
	var index = step2list.indexOf(stepId);
	
	if (index > -1) {
		step2list.splice(index, 1);
	}
	//step2list.pop(stepId);
	console.log(step2list);
}