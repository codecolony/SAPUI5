
	//globals
	var oConnectorMatrix;
	var oFlowstepMatrix;
	var myConnectorAdaptersSelector;
	var myFlowStepAdaptersSelector;
	var categorySelectorExists;
	var connectionMatricExists;
	var flowStepMatrixExists;
	var myCategorySelector;
	var oSimpleForm;
	var rMapStep;
	var oRMap;
	var resultXML;
	var globalRStep2;
	var step2list = [];
	var oNode1, oNode2, oNode3;
	var flow_counter = 0;
	
	var oParentMatrix,oTreeMatrix,oFormMatrix, oHeaderMatrix, oDropDownMatrix;
	var oSplitterV;
	var form;
	var connXML = "\n", FSXML = "\n", RecXML = "\n";
	var headerkeylist, reorderlist, reorderArray;
	var previousStep = "none";
	
function prepareUILayout(){

	if(sap.ui.getCore().byId('headerMatrix')!=undefined){
		oHeaderMatrix = sap.ui.getCore().byId('headerMatrix');
	}
	else{
	oHeaderMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'headerMatrix',
		layoutFixed : true,
		width : '1000px',
		columns : 1,
		widths : ['500px'] });
	
	oHeaderMatrix.placeAt('header');
	}
	
	if(sap.ui.getCore().byId('splitterV')!=undefined){
		oSplitterV = sap.ui.getCore().byId('splitterV');
	}
	else{
	oSplitterV = new sap.ui.commons.Splitter("splitterV"); 
	oSplitterV.setSplitterOrientation(sap.ui.commons.Orientation.vertical);
	oSplitterV.setSplitterPosition("30%");
	oSplitterV.setMinSizeFirstPane("20%");
	oSplitterV.setMinSizeSecondPane("30%");
	oSplitterV.setWidth("100%");
	oSplitterV.setHeight("1000px");
	oSplitterV.setSplitterBarVisible(true);
	oSplitterV.setShowScrollBars(false);
	//oSplitterV.placeAt("content");
	}
	
	if(sap.ui.getCore().byId('treeMatrix')!=undefined){
		oTreeMatrix = sap.ui.getCore().byId('treeMatrix');
	}
	else{
	oTreeMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'treeMatrix',
		layoutFixed : true,
		width : '500px',
		columns : 1,
		widths : ['500px'] });
	}
	
	if(sap.ui.getCore().byId('formMatrix')!=undefined){
		oFormMatrix = sap.ui.getCore().byId('formMatrix');
	}
	else{
	oFormMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'formMatrix',
		layoutFixed : true,
		width : '1000px',
		columns : 2,
		widths : [ '200px', '700px'] });
	}
	
	//splitter code
	oSplitterV.removeAllFirstPaneContent();
	oSplitterV.removeAllSecondPaneContent();
	oSplitterV.addFirstPaneContent(oTreeMatrix);	
	oSplitterV.addSecondPaneContent(oFormMatrix);		
	
}

function getFlowStepList(){
	//simulation at the moment
	return ["Mapping", "Filter", "Modifier", "Signer", "Verifier", "Encrypter", "Decryptor", "Splitter", "Datastore"];
	
	//to do - real logic to retrieve the list
}

function getAdapterList(){
	//simulation at the moment
	return ["dummy1", "dummy2", "dummy3", "dummy4"];
	
	//to do - real logic to retrieve the list
//	var data = new sap.ui.model.json.JSONModel();
//	data.loadData("http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader?$format=json", null, false);
//	
//	//var datastring = {"d":{"results":[{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1294')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1294","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1294')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1394')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1394","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1394')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('146')","type":"glue.services.GlueMetadataHeaderType"},"ID":"146","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('146')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1530')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1530","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1530')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1566')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1566","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1566')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1620')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1620","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1620')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1901')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1901","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1901')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1931')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1931","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1931')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1992')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1992","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1992')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2.6575379443878093%20')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2.6575379443878093 ","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2.6575379443878093%20')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2019')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2019","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2019')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2024')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2024","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2024')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('216')","type":"glue.services.GlueMetadataHeaderType"},"ID":"216","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('216')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2325')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2325","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2325')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3.8657673193643123%20')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3.8657673193643123 ","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3.8657673193643123%20')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3002')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3002","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3002')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3037')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3037","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3037')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3053')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3053","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3053')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3409')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3409","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3409')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3506')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3506","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3506')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3585')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3585","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3585')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3616')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3616","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3616')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3664')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3664","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3664')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3665')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3665","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3665')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3963')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3963","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3963')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4165')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4165","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4165')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4339')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4339","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4339')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('434')","type":"glue.services.GlueMetadataHeaderType"},"ID":"434","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('434')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4348')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4348","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4348')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4374')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4374","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4374')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4521')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4521","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4521')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4525')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4525","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4525')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4569')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4569","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4569')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4669')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4669","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4669')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4672')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4672","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4672')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4859')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4859","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4859')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4930')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4930","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4930')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5123')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5123","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5123')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('520')","type":"glue.services.GlueMetadataHeaderType"},"ID":"520","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('520')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5313')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5313","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5313')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5327')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5327","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5327')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('542')","type":"glue.services.GlueMetadataHeaderType"},"ID":"542","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('542')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5519')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5519","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5519')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5562')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5562","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5562')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5808')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5808","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5808')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('586')","type":"glue.services.GlueMetadataHeaderType"},"ID":"586","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('586')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6129')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6129","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6129')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6200')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6200","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6200')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('624')","type":"glue.services.GlueMetadataHeaderType"},"ID":"624","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('624')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('630')","type":"glue.services.GlueMetadataHeaderType"},"ID":"630","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('630')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6354')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6354","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6354')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6549')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6549","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6549')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6554')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6554","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6554')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6581')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6581","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6581')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6637')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6637","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6637')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6658')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6658","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6658')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6670')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6670","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6670')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6808')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6808","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6808')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('682')","type":"glue.services.GlueMetadataHeaderType"},"ID":"682","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('682')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6871')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6871","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6871')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7089')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7089","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7089')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7136')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7136","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7136')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7245')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7245","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7245')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7394')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7394","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7394')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7492')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7492","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7492')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7544')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7544","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7544')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7588')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7588","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7588')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7670')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7670","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7670')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7775')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7775","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7775')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('796')","type":"glue.services.GlueMetadataHeaderType"},"ID":"796","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('796')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8027')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8027","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8027')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8131')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8131","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8131')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8145')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8145","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8145')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8222')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8222","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8222')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8576')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8576","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8576')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8644')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8644","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8644')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8882')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8882","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8882')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8885')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8885","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8885')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('892')","type":"glue.services.GlueMetadataHeaderType"},"ID":"892","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('892')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9213')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9213","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9213')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9239')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9239","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9239')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9303')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9303","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9303')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9384')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9384","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9384')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9450')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9450","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9450')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9511')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9511","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9511')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9637%20')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9637 ","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9637%20')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9760')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9760","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9760')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9947')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9947","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9947')/GMetaData"}}}]}};
//	var datastring = data.getJSON();
//	//console.log(datastring);
//	
//	var objs = data.getProperty("/d/results", null);
//	var list = [];
//	//console.log(objs);
//	for(var v=0; v<objs.length; v++){
//		if(list.indexOf(objs[v].TYPE)== -1)
//		list.push(objs[v].TYPE);
//	}
//	return list;
}

function getAdapterDropDown(id){
	var dd, lbl;
	//id = id+'abcd';
	if(sap.ui.getCore().byId(id+'label')!=undefined){
		lbl = sap.ui.getCore().byId(id+'label');
	}
	else{
	lbl = new sap.ui.commons.Label({
		id : id+'label',
		text : 'Template: ',
		width: '200px'
		//textAlign: "Right"
			});
	}

	if(sap.ui.getCore().byId(id+'dd')!=undefined){
		dd = sap.ui.getCore().byId(id+'dd');
	}
	else{
	dd = new sap.ui.commons.DropdownBox(id+'dd');
	dd.setTooltip("Select the category.");
	dd.setEditable(true);
	dd.setWidth("500px");
	
	//add logic to fill the data in the dd
//	var dItem = new sap.ui.core.ListItem("Connector");
//	dItem.setText("Connector");
//	dd.addItem(dItem);
//	
//	dItem = new sap.ui.core.ListItem("FlowStep");
//	dItem.setText("FlowStep");
//	dd.addItem(dItem);
	var list = getAdapterList();
	
	var con_count = 0;
	for(var i=0;i<list.length;i++){
		dItem = new sap.ui.core.ListItem("template_"+id+con_count);
		dItem.setText(list[i]);
		dd.addItem(dItem);
		con_count++;
	}
	
	}
	
	lbl.setLabelFor(dd);
	oFormMatrix.createRow(lbl,dd);
}

function getConnectorList(){
	var data = new sap.ui.model.json.JSONModel();
	data.loadData("http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader?$format=json", null, false);
	
	//var datastring = {"d":{"results":[{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1294')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1294","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1294')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1394')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1394","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1394')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('146')","type":"glue.services.GlueMetadataHeaderType"},"ID":"146","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('146')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1530')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1530","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1530')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1566')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1566","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1566')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1620')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1620","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1620')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1901')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1901","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1901')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1931')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1931","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1931')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1992')","type":"glue.services.GlueMetadataHeaderType"},"ID":"1992","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('1992')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2.6575379443878093%20')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2.6575379443878093 ","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2.6575379443878093%20')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2019')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2019","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2019')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2024')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2024","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2024')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('216')","type":"glue.services.GlueMetadataHeaderType"},"ID":"216","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('216')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2325')","type":"glue.services.GlueMetadataHeaderType"},"ID":"2325","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('2325')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3.8657673193643123%20')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3.8657673193643123 ","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3.8657673193643123%20')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3002')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3002","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3002')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3037')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3037","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3037')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3053')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3053","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3053')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3409')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3409","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3409')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3506')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3506","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3506')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3585')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3585","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3585')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3616')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3616","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3616')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3664')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3664","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3664')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3665')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3665","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3665')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3963')","type":"glue.services.GlueMetadataHeaderType"},"ID":"3963","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('3963')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4165')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4165","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4165')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4339')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4339","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4339')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('434')","type":"glue.services.GlueMetadataHeaderType"},"ID":"434","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('434')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4348')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4348","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4348')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4374')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4374","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4374')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4521')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4521","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4521')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4525')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4525","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4525')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4569')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4569","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4569')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4669')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4669","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4669')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4672')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4672","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4672')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4859')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4859","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4859')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4930')","type":"glue.services.GlueMetadataHeaderType"},"ID":"4930","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('4930')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5","TYPE":"type","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5123')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5123","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5123')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('520')","type":"glue.services.GlueMetadataHeaderType"},"ID":"520","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('520')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5313')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5313","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5313')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5327')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5327","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5327')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('542')","type":"glue.services.GlueMetadataHeaderType"},"ID":"542","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('542')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5519')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5519","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5519')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5562')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5562","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5562')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5808')","type":"glue.services.GlueMetadataHeaderType"},"ID":"5808","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('5808')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('586')","type":"glue.services.GlueMetadataHeaderType"},"ID":"586","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('586')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6129')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6129","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6129')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6200')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6200","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6200')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('624')","type":"glue.services.GlueMetadataHeaderType"},"ID":"624","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('624')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('630')","type":"glue.services.GlueMetadataHeaderType"},"ID":"630","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('630')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6354')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6354","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6354')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6549')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6549","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6549')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6554')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6554","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6554')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6581')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6581","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6581')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6637')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6637","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6637')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6658')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6658","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6658')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6670')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6670","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6670')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6808')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6808","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6808')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('682')","type":"glue.services.GlueMetadataHeaderType"},"ID":"682","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('682')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6871')","type":"glue.services.GlueMetadataHeaderType"},"ID":"6871","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('6871')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7089')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7089","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7089')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7136')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7136","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7136')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7245')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7245","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7245')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7394')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7394","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7394')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7492')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7492","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7492')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7544')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7544","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7544')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7588')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7588","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7588')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7670')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7670","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7670')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7775')","type":"glue.services.GlueMetadataHeaderType"},"ID":"7775","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('7775')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('796')","type":"glue.services.GlueMetadataHeaderType"},"ID":"796","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('796')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8027')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8027","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8027')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8131')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8131","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8131')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8145')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8145","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8145')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8222')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8222","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8222')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8576')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8576","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8576')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8644')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8644","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8644')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8882')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8882","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8882')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8885')","type":"glue.services.GlueMetadataHeaderType"},"ID":"8885","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('8885')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('892')","type":"glue.services.GlueMetadataHeaderType"},"ID":"892","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('892')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9213')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9213","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9213')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9239')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9239","TYPE":"type of ddta","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9239')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9303')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9303","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9303')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9384')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9384","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9384')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9450')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9450","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9450')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9511')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9511","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9511')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9637%20')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9637 ","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9637%20')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9760')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9760","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9760')/GMetaData"}}},{"__metadata": {"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9947')","type":"glue.services.GlueMetadataHeaderType"},"ID":"9947","TYPE":"type of data","GMetaData":{"__deferred":{"uri":"http://inblrll936.dhcp.blrl.sap.corp:8000/com/sap/glue/services/glue.xsodata/GlueMetadataHeader('9947')/GMetaData"}}}]}};
	var datastring = data.getJSON();
	//console.log(datastring);
	
	var objs = data.getProperty("/d/results", null);
	var list = [];
	//console.log(objs);
	for(var v=0; v<objs.length; v++){
		if(list.indexOf(objs[v].TYPE)== -1)
		list.push(objs[v].TYPE);
	}
	return list;
}

function addFlowStep(stepName){
	var dItem = new sap.ui.core.ListItem(stepName);
	dItem.setText(stepName);
	myFlowStepAdaptersSelector.addItem(dItem);
	//getFlowSteps();
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
	myCategorySelector.setWidth("500px");
	
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
		
		//oDropDownMatrix.removeAllRows();
		sap.ui.getCore().byId("flowstepDropdown").destroy();
		sap.ui.getCore().byId("L-FlowAdapters").destroy();
		
	}
	
	if( connectionMatricExists == true ){
//		sap.ui.getCore().byId("L-ConnectorAdapters").destroy();
//		var oLabel = new sap.ui.commons.Label({
//			id : 'L-ConnectorAdapters',
//			text : 'Type: ',
//			width: '200px'
//			//textAlign: "Right"
//				});
//		oLabel.setLabelFor(myConnectorAdaptersSelector);

		oFormMatrix.createRow(sap.ui.getCore().byId("L-ConnectorAdapters"),myConnectorAdaptersSelector);
		
		return sap.ui.getCore().byId("connectorDropdown");
	}
	else{
		addComponentTypeDropDown();
		myConnectorAdaptersSelector = new sap.ui.commons.DropdownBox("connectorDropdown",{ 
			change: function(oEvent){
			processDropDownConnector();
                }});
		myConnectorAdaptersSelector.setTooltip("Select the adapter.");
		myConnectorAdaptersSelector.setEditable(true);
		myConnectorAdaptersSelector.setWidth("500px");
	
	//list =	getConnectorList();
		
	var dItem = new sap.ui.core.ListItem("IDOC");
	dItem.setText("IDOC");
	myConnectorAdaptersSelector.addItem(dItem);
	
	dItem = new sap.ui.core.ListItem("SFTP");
	dItem.setText("SFTP");
	myConnectorAdaptersSelector.addItem(dItem);
	
	dItem = new sap.ui.core.ListItem("SOAP");
	dItem.setText("SOAP");
	myConnectorAdaptersSelector.addItem(dItem);
	
//	var con_count = 0;
//	for(var i=0;i<list.length;i++){
//		dItem = new sap.ui.core.ListItem("conn_adap"+con_count);
//		dItem.setText(list[i]);
//		myConnectorAdaptersSelector.addItem(dItem);
//		con_count++;
//	}
	
	var oLabel = new sap.ui.commons.Label({
		id : 'L-ConnectorAdapters',
		text : 'Type: ',
		width: '200px'
		//textAlign: "Right"
			});
	oLabel.setLabelFor(myConnectorAdaptersSelector);

	oFormMatrix.createRow(oLabel,myConnectorAdaptersSelector);

	connectionMatricExists = true;
	return myConnectorAdaptersSelector;
	}
}

function getFlowStepMatrix(){
	
	if(connectionMatricExists == true){
		connectionMatricExists = false;
		
		//oDropDownMatrix.removeAllRows();
		sap.ui.getCore().byId("connectorDropdown").destroy();
		sap.ui.getCore().byId("L-ConnectorAdapters").destroy();
	}
	
	if( flowStepMatrixExists == true ){
		//addComponentTypeDropDown();
		oFormMatrix.createRow(sap.ui.getCore().byId("L-FlowAdapters"),myFlowStepAdaptersSelector);
		return sap.ui.getCore().byId("flowstepDropdown");
	}
	else{
		addComponentTypeDropDown();
		myFlowStepAdaptersSelector = new sap.ui.commons.DropdownBox("flowstepDropdown",{ 
			change: function(oEvent){
				addRemoveFlowStepsToRMap();
              }});
		myFlowStepAdaptersSelector.setTooltip("Select the step.");
		myFlowStepAdaptersSelector.setEditable(true);
		myFlowStepAdaptersSelector.setWidth("500px");
		
		flowList = getFlowStepList();
		
		for(item in flowList){
			var dItem = new sap.ui.core.ListItem(flowList[item]);
			dItem.setText(flowList[item]);
			myFlowStepAdaptersSelector.addItem(dItem);
		}
		
		oLabel = new sap.ui.commons.Label({
			id : 'L-FlowAdapters',
			text : 'Type: ',
			width: '200px'
			//textAlign: "Right"
				});
		
		oLabel.setLabelFor(myFlowStepAdaptersSelector);
		oFormMatrix.createRow(oLabel, myFlowStepAdaptersSelector);

		flowStepMatrixExists = true;
		//showFlowFormAndButtons();
		
		return myFlowStepAdaptersSelector;
	}
}

function addComponentTypeDropDown(){
	
//	if(sap.ui.getCore().byId("fixedMatrix")==undefined){
//		
//		fixedMatrix = new sap.ui.commons.layout.MatrixLayout({
//			id : 'fixedMatrix',
//			layoutFixed : true,
//			width : '1000px',
//			columns : 5,
//			widths : ['150px', '250px', '200px', '200px', '200px'] });
//	}
	
	if(sap.ui.getCore().byId("L-Category")!=undefined){
		var oLabel = sap.ui.getCore().byId("L-Category");
	}
	else{
		var oLabel = new sap.ui.commons.Label({
			id : 'L-Category',
			text : 'Category: ',
			width: '200px'
			//textAlign: "Right"
				});
	}
	
	myCategorySelector = getCategorySelector( );
	oLabel.setLabelFor(myCategorySelector);
	oFormMatrix.createRow(oLabel, myCategorySelector);

}

function addHeaderInfo(){
	//trying matrix layout
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 15 });
	
	if(sap.ui.getCore().byId("glue-integrate")!=undefined){
		var oTV = sap.ui.getCore().byId("glue-integrate");
	}
	else{
		var oTV = new sap.ui.commons.TextView({
		id : 'glue-integrate',
		text : 'Glue Integrate',
		design : sap.ui.commons.TextViewDesign.H1 });
	}
	
	oCell.addContent(oTV);
	oHeaderMatrix.createRow(oCell);
	//oHeaderMatrix.placeAt('header');
}

function getTree(){
	
	if(sap.ui.getCore().byId('tree')!=undefined){
		return sap.ui.getCore().byId('tree');
	}
	else{
		oTree = new sap.ui.commons.Tree("tree");
		oTree.setTitle("Glue Integrate");
		oTree.setWidth("45%");
		//oTree.setHeight("auto");
		oTree.setShowHeaderIcons(true);
		oTree.setShowHorizontalScrollbar(false);
		
		oNode1 = new sap.ui.commons.TreeNode("sender", {text:"Sender", icon:"integrate/images/sender.jpg", expanded: true});
		oNode2 = new sap.ui.commons.TreeNode("flowstep", {text:"Flow Steps", icon:"integrate/images/flowstep.jpg", expanded: true});
		oNode3 = new sap.ui.commons.TreeNode("receiver", {text:"Receiver", icon:"integrate/images/receiver.jpg", expanded: true});
	
		oTree.addNode(oNode1);
		oTree.addNode(oNode2);
		oTree.addNode(oNode3);
	
	//	oTree.attachSelect(function(oEvent){
	//
	//	});
		
		oNode1.attachSelected(function(oEvent){
			setConnectorCategorySelected();
		});
		
		oNode2.attachSelected(function(oEvent){
			setFlowStepCategorySelected();
			//oFormMatrix.removeAllRows();
			//showFlowFormAndButtons();
			//addRemoveFlowStepsToRMap();
		});
		
		oNode3.attachSelected(function(oEvent){
			setConnectorCategorySelected();
		});
		
		//oNode1.select();
		
		oTreeMatrix.createRow(oTree);
		return oTree;
	}
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
		
		homepage();
		
		//creating shell
		var oShell = new sap.ui.ux3.Shell("myShell", {
			appTitle: "SAPUI5 Gold Reflection Shell",
			appIcon: "images/SAPLogo.gif",
			appIconTooltip: "SAP logo",
			showLogoutButton: true,
			showSearchTool: true,
			showInspectorTool: true,
			showFeederTool: true,
			worksetItems: [new sap.ui.ux3.NavigationItem("WI_home",{key:"wi_home",text:"Home"}),
			               new sap.ui.ux3.NavigationItem("WI_1",{key:"wi_1",text:"Examples", subItems:[
			                  new sap.ui.ux3.NavigationItem("WI_1_1",{key:"wi_1_1",text:"Text"}),
			                  new sap.ui.ux3.NavigationItem("WI_1_2",{key:"wi_1_2",text:"Button"}),
			                  new sap.ui.ux3.NavigationItem("WI_1_3",{key:"wi_1_3",text:"Image"})]}),
			               new sap.ui.ux3.NavigationItem("WI_API",{key:"wi_api",text:"API Documentation"})],
			paneBarItems: [ new sap.ui.core.Item("PI_Date",{key:"pi_date",text:"date"}),
			                new sap.ui.core.Item("PI_Browser",{key:"pi_browser",text:"browser"})],
			content: oSplitterV,
			toolPopups: [new sap.ui.ux3.ToolPopup("contactTool",{
										title: "New Contact",
										tooltip: "Create New Contact",
										icon: "images/Contact_regular.png",
										iconHover: "images/Contact_hover.png",
										content:[new sap.ui.commons.TextView({text:"Here could be a contact sheet."})],
										buttons: [new sap.ui.commons.Button("cancelContactButton", {tehxt:"Cancel",press:function(oEvent){
											sap.ui.getCore().byId("contactTool").close();
										}})]
									})],
			headerItems: [new sap.ui.commons.TextView({text:"User Name",tooltip:"U.Name"}),
			              new sap.ui.commons.Button({text:"Personalize",tooltip:"Personalize",press:function(oEvent){alert("Here could open an personalize dialog");}}),
										new sap.ui.commons.MenuButton({
											text: "Help",
											tooltip: "Help Menu",
											menu: new sap.ui.commons.Menu("menu1",{items:[
												new sap.ui.commons.MenuItem("menuitem1",{text:"Help"}),
												new sap.ui.commons.MenuItem("menuitem2",{text:"Report Incident"}),
												new sap.ui.commons.MenuItem("menuitem3",{text:"About"})]})
										})],
			worksetItemSelected: function(oEvent){
				var sId = oEvent.getParameter("id");
				var oShell = oEvent.oSource;
				switch (sId) {
				case "WI_home":
					oShell.setContent(oSplitterV);
					break;
				case "WI_1_1":
					oShell.setContent(oSplitterV);
					break;
				case "WI_1_2":
					oShell.setContent(oSplitterV);
					break;
				case "WI_1_3":
					oShell.setContent(oSplitterV);
					break;
				case "WI_API":
					oShell.setContent(oSplitterV);
					break;
				default:
					break;
				}
			},
			paneBarItemSelected: function(oEvent){
				var sKey = oEvent.getParameter("key");
				var oShell = oEvent.oSource;
				switch (sKey) {
				case "pi_date":
					var oDate = new Date();
					oShell.setPaneContent(new sap.ui.commons.TextView({text:oDate.toLocaleString()}), true);
					break;
				case "pi_browser":
					oShell.setPaneContent(new sap.ui.commons.TextView({text:"You browser provides the following information:\n"+navigator.userAgent}), true);
					break;
				default:
					break;
				}
			},
			logout:function(){
				alert("Logout Button has been clicked.\nThe application can now do whatever is required.");
			},
		 	search:function(oEvent){
		 		alert("Search triggered: " + oEvent.getParameter("text"));
		 	},
		 	feedSubmit:function(oEvent){
		 		alert("Feed entry submitted: " + oEvent.getParameter("text"));
		 	},
		 	paneClosed : function(oEvent) {
		 	    alert("Pane has been closed: " + oEvent.getParameter("id"));
		 	}
		}).placeAt("content");
		
	}
	
	

});

function homepage(){
	prepareUILayout();
	addHeaderInfo();
	getTree();
	
	//adds component dropdown to form matrix
	addComponentTypeDropDown();
	
	myCategorySelector.attachEvent('change', function processCategoryDDSelection(){
		console.log("In createContent:processCategoryDDSelection funtion: "+myCategorySelector.getLiveValue());
		
		if (myCategorySelector.getLiveValue()=="Connector"){
			myConnectorAdaptersSelector = getConnectionMatrix( );
			getAdapterDropDown("connector");
			if (previousStep == "sender"){
				//createXML("Sender", step2list, null, false );
				createXML("Sender", form, myConnectorAdaptersSelector.getLiveValue(), false );
			}
			else if(previousStep == "flowstep"){
				createXML("FlowStep", step2list, null, false );
			}
			else if(previousStep == "receiver"){
				//createXML("Receiver", step2list, null, false );
				createXML("Receiver", form, myConnectorAdaptersSelector.getLiveValue(), false );
			}
			
			myConnectorAdaptersSelector.fireEvent('change');
		}
		else if (myCategorySelector.getLiveValue()=="FlowStep"){
			//createXML("Sender", form, myConnectorAdaptersSelector.getLiveValue(), false );
			if (previousStep == "sender"){
				//createXML("Sender", step2list, null, false );
				createXML("Sender", form, myConnectorAdaptersSelector.getLiveValue(), false );
			}
			else if(previousStep == "flowstep"){
				createXML("FlowStep", step2list, null, false );
			}
			else if(previousStep == "receiver"){
				//createXML("Receiver", step2list, null, false );
				createXML("Sender", form, myConnectorAdaptersSelector.getLiveValue(), false );
			}
			
			oFormMatrix.removeAllRows();
			myFlowStepAdaptersSelector =  getFlowStepMatrix();
			addRemoveFlowStepsToRMap();
			getAdapterDropDown("flowstep");
		}

		
	});
	myCategorySelector.fireEvent('change');

}
function processDropDownConnector(){
	
	if(previousStep == "none")
		previousStep = "sender";

	//now load the adapter xml/json files
	console.log("Inside processDropDownConnector function");
	
	
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
	////console.log(json);
	sap.ui.getCore().setModel(json);  
	
	//loop into the parameters to add UI input
	var oModel =  sap.ui.getCore().getModel();
	////console.log(oModel);
	
	
	if (adap_type=="SOAP"){
	attrib_objects = oModel.oData.AdapterTypeMetaData.Attribute;
	/////console.log(oModel.oData.AdapterTypeMetaData);
	}
	else{
	var oData1 = oModel.getData();
	//////console.log(oModel.oData);
	attrib_objects = oData1.Attribute;
	}
	
	if(oFormMatrix != undefined){
		oFormMatrix.removeAllRows();
		
		addComponentTypeDropDown();
		getConnectionMatrix();
		getAdapterDropDown("connector");
//		oFormMatrix.removeRow(oSimpleForm);
		//oSimpleForm.destroy();
	}
//
	showFormAndButtons(attrib_objects, adap_type);
//
	};

function showFormAndButtons(attrib_objects, adap_type){
	var text = "#text";
	form = [];
//	var formTitle = new sap.ui.commons.Title({text:"Enter parameters"});
//	form.push(formTitle);
	
	if(sap.ui.getCore().byId('glue-params')!=undefined){
		var oTV = sap.ui.getCore().byId('glue-params');
	}
	else{
		var oTV = new sap.ui.commons.TextView({
			id : 'glue-params',
			text : 'Enter parameters',
			design : sap.ui.commons.TextViewDesign.H2 });
	}
	
	oFormMatrix.createRow(oTV);
	
	var otextview;
	var otextinput;
	
	for (var i = 0, count = 0; i < attrib_objects.length; i++) {
	
	if (attrib_objects[i].Usage != "optional"){
	
	//exclude object defaults
		textDefaultValue = attrib_objects[i].Default;
		//console.log(textDefaultValue);
		if( typeof textDefaultValue === 'object')
			textDefaultValue = "";
		else
			textDefaultValue = attrib_objects[i].Default;
		
	textid = "txtView"+adap_type+count;
	textfield = "txtField"+adap_type+count;
	if (adap_type=="SOAP"){
	textGuiLabel = attrib_objects[i].GuiLabels.Label[text];
	//textDefaultValue = attrib_objects[i].Default;
	}
	else{
	textGuiLabel = attrib_objects[i].GuiLabels[0][text];
	//textDefaultValue = attrib_objects[i].Default;
	}
	
	//place a row repeater for lines
	if(sap.ui.getCore().byId(textid)!=undefined){
		otextview = sap.ui.getCore().byId(textid);
	}
	else{
		otextview = new sap.ui.commons.Label(textid,{
		text: textGuiLabel,
		tooltip: "testing",
		textAlign:  "Left",
		textDirection: sap.ui.core.TextDirection.LTR 
		});
	}
	
	if(sap.ui.getCore().byId(textfield)!=undefined){
		otextinput = sap.ui.getCore().byId(textfield	);
	}
	else{
		otextinput = new sap.ui.commons.TextField(textfield, {
		value: textDefaultValue,
		width: '500px'
		});
	}
	
	count++;
	form.push(otextview);
	form.push(otextinput);
	
	oFormMatrix.createRow(otextview, otextinput);
	}
	}
	
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 2,
		hAlign: "Left"
		//padding: sap.ui.commons.layout.Padding.Both
		});
	
	//oFormMatrix.removeAggregation(oSimpleForm);

//	if(sap.ui.getCore().byId("sf"+adap_type)!=undefined){
//		
//		oSimpleForm = sap.ui.getCore().byId("sf"+adap_type);
//	}
//	else{
//		oSimpleForm = new sap.ui.commons.form.SimpleForm(
//		"sf"+adap_type,
//		{
//		maxContainerCols: 1,
//		minWidth: -1, //200,
//		labelMinWidth: 280,
//		content:form,
//		layout: sap.ui.commons.form.SimpleFormLayout.GridLayout
//		});
//	}
	
//	oCell.addContent(oSimpleForm);
//	oFormMatrix.createRow(oCell);
	////////oFormMatrix.createRow(oSimpleForm);
	
	var btn;
	if(oNode3.getIsSelected()){
		
		previousStep = "receiver";
		
		
		if(sap.ui.getCore().byId("submit")!=undefined){
			
			btn  = sap.ui.getCore().byId("submit");
			
		}
		else{
			btn = new sap.ui.commons.Button("submit",{
			text: "Create",
			width: "100px",
			align: "Center",
			press : function(oEvent){createXML("Receiver", form, myConnectorAdaptersSelector.getLiveValue(), true)}
			});
		}
		//oCell.addContent(btn);
		oFormMatrix.createRow(btn);
	}
	else if(oNode1.getIsSelected()){
		previousStep = "sender";
	}
	else if(oNode2.getIsSelected()){
		previousStep = "flowstep";
	}
}

function addRemoveFlowStepsToRMap(){
	
	oFormMatrix.removeAllRows();
	
	addComponentTypeDropDown();
//	getConnectionMatrix();
	getFlowStepMatrix();
	
	//place for reorder flow steps
	
	if(sap.ui.getCore().byId("flowstepslabel")!=undefined){
		otextview = sap.ui.getCore().byId("flowstepslabel");
		//otextview.setText("Mapping Type");
	}
	else{
		otextview = new sap.ui.commons.Label("flowstepslabel",{
		text: "Reorder Flow Steps",
		tooltip: "Reorder Flow Steps"
		});
	}
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 2,
		hAlign: "Left",
		rowSpan: 2,
		padding: sap.ui.commons.layout.Padding.End});
	//get labels for steps 2 list
	reorderArray = getFlowSteps();
	
	
	if(sap.ui.getCore().byId("flowstepsinput")!=undefined){
		otextinput = sap.ui.getCore().byId("flowstepsinput");
	}
	else{
		otextinput = new sap.ui.commons.ListBox({
			items : reorderArray,
			 
			});
		reorderlist = otextinput;
	}
	
	btn = new sap.ui.commons.Button({
		text: "Move Up",
		width: "100px",
		align: "Center",
		press : function(oEvent){moveFlowStepUp();}
		});
	
	oFormMatrix.createRow(otextview, otextinput, btn);
	/////
	
	var btn;

	
	
	if(sap.ui.getCore().byId("addflowstep")!=undefined){
		
		btn  = sap.ui.getCore().byId("addflowstep");
		
	}
	else{
		btn = new sap.ui.commons.Button("addflowstep",{
		text: "Add Step",
		width: "100px",
		align: "Center",
		press : function(oEvent){addFlowSteptoRoadMap(myFlowStepAdaptersSelector.getLiveValue());}
		});
	}
	oCell.insertContent(btn,0);
	
//	var btn;
//	if(sap.ui.getCore().byId("removeflowstep")!=undefined){
//		
//		btn  = sap.ui.getCore().byId("removeflowstep");
//		
//	}
//	else{
//		btn = new sap.ui.commons.Button("removeflowstep",{
//		text: "Remove Step",
//		width: "100px",
//		align: "Center",
//		press : function(oEvent){removeFlowStepFromRoadMap(myFlowStepAdaptersSelector.getLiveValue());}
//		});
//	}
	
		
	//oCell.insertContent(null);
	//oCell.insertContent(btn,2);
	btn = new sap.ui.commons.Button({
		text: "Move Up",
		width: "100px",
		align: "Center",
		press : function(oEvent){moveFlowStepUp(reorderlist.getSelectedIndex());}
		});
	oCell.insertContent(btn,3);
	

	
	btn = new sap.ui.commons.Button({
		text: "Move Down",
		width: "100px",
		align: "Center",
		press : function(oEvent){moveFlowStepDown(reorderlist.getSelectedIndex());}
		});
	oCell.insertContent(btn,4);
	oFormMatrix.createRow(oCell);
	
	btn = new sap.ui.commons.Button({
		text: "Apply Reorder Change",
		width: "180px",
		align: "Center",
		press : function(oEvent){applyReorderChange();}
		});
	oCell.insertContent(btn,4);
	oFormMatrix.createRow(oCell);
}

function showFlowFormAndButtons(){
	
	if(oNode2.getIsSelected()){
		oFormMatrix.removeAllRows();
		addComponentTypeDropDown();
		addRemoveFlowStepsToRMap();
		return;
	}
	
	var text = "#text";
	var form = [];
	var formTitle = new sap.ui.commons.Title({text:"Enter parameters"});
	form.push(formTitle);
	
	var otextview;
	var otextinput;
	
	var count=0;
	adap_type = "flow";
	
	textid = "txtView"+adap_type+count;
	textfield = "txtField"+adap_type+count;

	
	//textGuiLabel = "Label for "+oRMap.getSelectedStep();
	textGuiLabel = "Label for flowstep";
	//place a row repeater for lines
	if(sap.ui.getCore().byId(textid)!=undefined){
		otextview = sap.ui.getCore().byId(textid);
		otextview.setText(textGuiLabel);
	}
	else{
		otextview = new sap.ui.commons.Label(textid,{
		text: textGuiLabel,
		tooltip: "testing"
		});
	}
	
	if(sap.ui.getCore().byId(textfield)!=undefined){
		otextinput = sap.ui.getCore().byId(textfield	);
	}
	else{
		otextinput = new sap.ui.commons.TextField(textfield, {
		value: textDefaultValue,
		width: '500px'
		});
	}
	
	
	form.push(otextview);
	form.push(otextinput);
	
	//create a new matrix layout.
	if(sap.ui.getCore().byId("formMatrix")!=undefined){
		oFormMatrix = sap.ui.getCore().byId("formMatrix");
		//oFormMatrix.removeAllRows();
	}
	else{
	oFormMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : 'formMatrix',
		layoutFixed : true,
		width : '100px',
		columns : 4,
		widths : ['45px', '450px'] });

	
	//oFormMatrix.placeAt('content');
	}
	
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 4, rowSpan :4  });
	
	if(sap.ui.getCore().byId("sf"+adap_type)!=undefined){
		
		oSimpleForm = sap.ui.getCore().byId("sf"+adap_type);
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

	if(oNode2.getIsSelected()){
		
		var btn;
		if(sap.ui.getCore().byId("submit"+adap_type)!=undefined){
			
			btn  = sap.ui.getCore().byId("submit"+adap_type);
			
		}
		else{
			btn = new sap.ui.commons.Button("submit"+adap_type,{
			text: "Create",
			width: "400px",
			press : function(oEvent){createXML(form, adap_type, null, false);}  //<---- bug?
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

function processDropDownFlowStep(myAdaptersSelector){
	console.log("Inside processDropDownFlowStep function");
//	//oFormMatrix.removeAllRows();
//	
//	var adap_type = myFlowStepAdaptersSelector.getLiveValue();
//	var fileToLoad;
//	
//	addFlowSteptoRoadMap(adap_type);
}

function processTreeFlowSubStep(id){
	console.log("Inside processTreeFlowSubStep function");
	
//	for(var i=0; i<step2list.length; i++){
//		if(step2list[i].getIsSelected()){
//			console.log(step2list[i] +": inner node selected");
//		}
//	}
	previousStep = "flowstep";
	oFormMatrix.removeAllRows();

	
	var node = sap.ui.getCore().byId(id);
	
	if(node != undefined){
		if(node.getIsSelected())
			console.log(id +": inner node selected");
		else
			console.log("inner node not selected");
	}
	
	var otextview, otextinput;
	
	// Add the form
	if(node.getText() == "Mapping"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("mappingtypelabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("mappingtypelabel"+id);
			//otextview.setText("Mapping Type");
		}
		else{
			otextview = new sap.ui.commons.Label("mappingtypelabel"+id,{
			text: "Mapping Type",
			tooltip: "Mapping Type"
			});
		}
		
		if(sap.ui.getCore().byId("mappingtypeinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("mappingtypeinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("mappingtypeinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		if(sap.ui.getCore().byId("mappingnamelabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("mappingnamelabel"+id);
			//otextview.setText("Mapping Name");
		}
		else{
			otextview = new sap.ui.commons.Label("mappingnamelabel"+id,{
			text: "Mapping Name",
			tooltip: "Mapping Name"
			});
		}
		
		if(sap.ui.getCore().byId("mappingnameinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("mappingnameinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("mappingnameinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Filter"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("filterpathlabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("filterpathlabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("filterpathlabel"+id,{
			text: "Filter Path",
			tooltip: "Filter Path"
			});
		}
		
		if(sap.ui.getCore().byId("filterpathinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("filterpathinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("filterpathinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Modifier"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("headerkeylistlabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("headerkeylistlabel"+id);
			//otextview.setText("Mapping Type");
		}
		else{
			otextview = new sap.ui.commons.Label("headerkeylistlabel"+id,{
			text: "Header Key Value List",
			tooltip: "Header Key Value List"
			});
		}
		
		if(sap.ui.getCore().byId("headerkeylistinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("headerkeylistinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.ListBox({
//				items : [
//					 		new sap.ui.core.ListItem({text : 'Spring --> afdfdsf'}),
//							new sap.ui.core.ListItem({text : 'Summer'}),
//							new sap.ui.core.ListItem({text : 'Autumn'}),
//							new sap.ui.core.ListItem({text : 'Winter'})
//				  ],
				 
				});
			headerkeylist = otextinput;
		}
		oFormMatrix.createRow(otextview, otextinput);
		console.log("headerkeylistinput"+id);
		
		//KEY
		if(sap.ui.getCore().byId("headerkeylabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("headerkeylabel"+id);
			//otextview.setText("Mapping Type");
		}
		else{
			otextview = new sap.ui.commons.Label("headerkeylabel"+id,{
			text: "Header Key",
			tooltip: "Header Key"
			});
		}
		
		if(sap.ui.getCore().byId("headerkeyinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("headerkeyinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("headerkeyinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		//VALUE
		if(sap.ui.getCore().byId("headervaluelabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("headervaluelabel"+id);
			//otextview.setText("Mapping Type");
		}
		else{
			otextview = new sap.ui.commons.Label("headervaluelabel"+id,{
			text: "Header Value",
			tooltip: "Header Value"
			});
		}
		
		if(sap.ui.getCore().byId("headervalueinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("headervalueinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("headervalueinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		//create button to update list
		if(sap.ui.getCore().byId("headerlistaddbutton"+id)!=undefined){
			var btn1 = sap.ui.getCore().byId("headerlistaddbutton"+id);
		}
		else{
		
			var btn1 = new sap.ui.commons.Button("headerlistaddbutton"+id,{
				text: "Add Key",
				width: "100px",
				align: "Center",
				press : function(oEvent){addHeaderKeyToList(id);}
				});
		}
		//oFormMatrix.createRow(otextinput);
		
		//create button to update list
		if(sap.ui.getCore().byId("headerlistdeletebutton"+id)!=undefined){
			var btn2 = sap.ui.getCore().byId("headerlistdeletebutton"+id);
		}
		else{
		
			var btn2 = new sap.ui.commons.Button("headerlistdeletebutton"+id,{
				text: "Remove Key",
				width: "100px",
				align: "Center",
				press : function(oEvent){removeHeaderKeyFromList();}
				});
		}
		oFormMatrix.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content: [btn1, btn2]
		}));
		
		if(sap.ui.getCore().byId("modifierbodylabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("modifierbodylabel"+id);
			//otextview.setText("Mapping Type");
		}
		else{
			otextview = new sap.ui.commons.Label("modifierbodylabel"+id,{
			text: "Body",
			tooltip: "Body"
			});
		}
		
		if(sap.ui.getCore().byId("modifierbodyinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("modifierbodyinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("modifierbodyinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Signer"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("signerkeylabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("signerkeylabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("signerkeylabel"+id,{
			text: "Private Key",
			tooltip: "Private Key"
			});
		}
		
		if(sap.ui.getCore().byId("signerkeyinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("signerkeyinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("signerkeyinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Verifier"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("verifierkeylabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("verifierkeylabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("verifierkeylabel"+id,{
			text: "Private Key",
			tooltip: "Private Key"
			});
		}
		
		if(sap.ui.getCore().byId("verifierkeyinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("verifierkeyinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("verifierkeyinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Encrypter"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("encrypterkeylabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("encrypterkeylabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("encrypterkeylabel"+id,{
			text: "Public Key",
			tooltip: "Public Key"
			});
		}
		
		if(sap.ui.getCore().byId("encrypterkeyinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("encrypterkeyinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("encrypterkeyinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Decryptor"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("decrypterkeylabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("decrypterkeylabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("decrypterkeylabel"+id,{
			text: "Private Key",
			tooltip: "Private Key"
			});
		}
		
		if(sap.ui.getCore().byId("decrypterkeyinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("decrypterkeyinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("decrypterkeyinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	else if(node.getText() == "Splitter"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("splittertokenlabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("splittertokenlabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("splittertokenlabel"+id,{
			text: "Token",
			tooltip: "Token"
			});
		}
		
		if(sap.ui.getCore().byId("splittertokeninput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("splittertokeninput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("splittertokeninput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		if(sap.ui.getCore().byId("splittertypelabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("splittertypelabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("splittertypelabel"+id,{
			text: "Type",
			tooltip: "Type"
			});
		}
		
		if(sap.ui.getCore().byId("splittertypeinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("splittertypeinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("splittertypeinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		
	}
	else if(node.getText() == "Datastore"){
		//console.log("Mapping is the focus");
		if(sap.ui.getCore().byId("datastorenamelabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("datastorenamelabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("datastorenamelabel"+id,{
			text: "Datastore Name",
			tooltip: "Datastore Name"
			});
		}
		
		if(sap.ui.getCore().byId("datastorenameinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("datastorenameinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("datastorenameinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		if(sap.ui.getCore().byId("datastoremesidlabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("datastoremesidlabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("datastoremesidlabel"+id,{
			text: "Message id",
			tooltip: "Message id"
			});
		}
		
		if(sap.ui.getCore().byId("datastoremesidinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("datastoremesidinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("datastoremesidinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
		
		if(sap.ui.getCore().byId("datastoreoperationlabel"+id)!=undefined){
			otextview = sap.ui.getCore().byId("datastoreoperationlabel"+id);
			//otextview.setText("Filter Path");
		}
		else{
			otextview = new sap.ui.commons.Label("datastoreoperationlabel"+id,{
			text: "Operation",
			tooltip: "Operation"
			});
		}
		
		if(sap.ui.getCore().byId("datastoreoperationinput"+id)!=undefined){
			otextinput = sap.ui.getCore().byId("datastoreoperationinput"+id);
		}
		else{
			otextinput = new sap.ui.commons.TextField("datastoreoperationinput"+id, {
			//value: textDefaultValue
				width: '500px'
			});
		}
		oFormMatrix.createRow(otextview, otextinput);
	}
	
	//create adapter dd line
	var idd = node.getText().toLowerCase();
	console.log(idd);
	getAdapterDropDown(idd);
	
	//add remove step dropdown
	var btn;
	if(sap.ui.getCore().byId("removeflowstep")!=undefined){
		
		btn  = sap.ui.getCore().byId("removeflowstep");
		
	}
	else{
		btn = new sap.ui.commons.Button("removeflowstep",{
		text: "Delete This Step!",
		width: "200px",
		align: "Center",
		press : function(oEvent){removeFlowStepFromRoadMap(myFlowStepAdaptersSelector.getLiveValue());}
		});
	}
	oFormMatrix.createRow(btn);
 //need to add createXML() call?
}


function addFlowSteptoRoadMap(stepName){
	
	var stepId = stepName.charAt(0).toLowerCase()+stepName.substring(1,stepName.length)+flow_counter;
	flow_counter++;
	
	var oSubStep = new sap.ui.commons.TreeNode(stepId, {text: stepName, 
		selected : function(oEvent){processTreeFlowSubStep(stepId);}
		});
//	oSubStep.attachEvent('selected',processTreeFlowSubStep());
//	
//	oSubStep.fireSelected();
//	
	oNode2.addNode(oSubStep);

	step2list.push(stepId);
	console.log(step2list);
	
	//try to reflect instantly in reorder list
	reorderArray = getFlowSteps();
	myFlowStepAdaptersSelector.fireEvent('change');
}

function removeFlowStepFromRoadMap(stepName){
	console.log("Inside removeFlowStepFromRoadMap function");
//	stepName = oRMap.getSelectedStep();
	var stepId;
	for(var i=0; i<step2list.length; i++){
		var subnode = sap.ui.getCore().byId(step2list[i]);
		if(subnode.getIsSelected()){
			stepId = step2list[i];
			break;
		}
	}
	//var stepId = stepName.charAt(0).toLowerCase()+stepName.substring(1,stepName.length);

	oNode2.removeNode(stepId);
	
	var index = step2list.indexOf(stepId);
	
	if (index > -1) {
		step2list.splice(index, 1);
	}
	console.log(step2list);
	oFormMatrix.removeAllRows();
	reorderArray = getFlowSteps();
	
}

function createXML(catgory, inputobjects, liveValue, lastCall){
	console.log("Inside createXML function");
	console.log(inputobjects.length);
	
	//let's try xml model
	var xmlFile = "";
	if(catgory=="Sender")
		xmlFile = "<xml>";
	var idd;
	var templ;
	
	if(catgory!="FlowStep"){
		
	
		xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+liveValue+"'>";
		if (catgory=="Sender" || catgory=="Receiver")
			templ = sap.ui.getCore().byId("connectordd");
		else if (catgory=="FlowStep")
			templ = sap.ui.getCore().byId("flowstepdd");
		
		xmlFile = xmlFile + '\n' + "<parameter name='Template'>"+templ.getValue()+"</parameter>";
		for (var i = 0; i < inputobjects.length; i=i+2) {
			
			xmlFile = xmlFile + '\n' + "<parameter name='"+inputobjects[i].getText()+"'>"+inputobjects[i+1].getValue()+"</parameter>";
		}
		
		//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
		xmlFile = xmlFile + '\n' +"</component>";
	}
	else{
		
		var key,value, id;
				
		for (var i = 0; i < inputobjects.length; i=i+1) {
			//liveValue = sap.ui.getCore().byId(inputobjects[i]);
			id = inputobjects[i];
			idd = id;
			
			if(id.search("mapping")!= -1){
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Mapping"+"'>";
				key = sap.ui.getCore().byId("mappingtypelabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("mappingtypeinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				key = sap.ui.getCore().byId("mappingnamelabel"+id);
				value = sap.ui.getCore().byId("mappingnameinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
				//liveValue = "Mapping";
			}
			else if(id.search("filter") != -1){
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Filter"+"'>";
				key = sap.ui.getCore().byId("filterpathlabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("filterpathinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
				//liveValue = "Filter";
			}
			else if(id.search("modifier") != -1){
//				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Modifier"+"'>";
//				key = sap.ui.getCore().byId("headerkeylabel"+id);
//				if(key==undefined) return;
//				value = sap.ui.getCore().byId("headerkeyinput"+id);
//				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//new list processing
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Modifier"+"'>";
				var arr = headerkeylist.getItems();
				var tmp, tmparr;
				for( var itm in arr){
					tmp = arr[itm].getText();
					tmparr = tmp.split("|");
					xmlFile = xmlFile + '\n' + "<header key= '"+tmparr[0] +"'>"+ tmparr[1]+"</header>";
				}
				
				key = sap.ui.getCore().byId("modifierbodylabel"+id);
				value = sap.ui.getCore().byId("modifierbodyinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
				//liveValue = "Modifier";
			}
			else if(id.search("signer") != -1){
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Signer"+"'>";
				key = sap.ui.getCore().byId("signerkeylabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("signerkeyinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
				//liveValue = "Signer";
			}
			else if(id.search("verifier") != -1){
				//liveValue = "Verifier";
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Verifier"+"'>";
				key = sap.ui.getCore().byId("verifierkeylabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("verifierkeyinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
			}
			else if(id.search("encrypter") != -1){
				//liveValue = "Encrypter";
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Encrypter"+"'>";
				key = sap.ui.getCore().byId("encrypterkeylabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("encrypterkeyinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
			}
			else if(id.search("decryptor") != -1){
				//liveValue = "Decryptor";
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Decryptor"+"'>";
				key = sap.ui.getCore().byId("decrypterkeylabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("decrypterkeyinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
			}
			else if(id.search("splitter") != -1){
				//liveValue = "Splitter";
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Mapping"+"'>";
				key = sap.ui.getCore().byId("splittertokenlabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("splittertokeninput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				key = sap.ui.getCore().byId("splittertypelabel"+id);
				value = sap.ui.getCore().byId("splittertypeinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
			}
			else if(id.search("datastore") != -1){
				//liveValue = "Datastore";
				xmlFile = xmlFile + '\n' + "<component name='"+catgory+ "' type='"+"Mapping"+"'>";
				key = sap.ui.getCore().byId("datastorenamelabel"+id);
				if(key==undefined) return;
				value = sap.ui.getCore().byId("datastorenameinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				key = sap.ui.getCore().byId("datastoremesidlabel"+id);
				value = sap.ui.getCore().byId("datastoremesidinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				key = sap.ui.getCore().byId("datastoreoperationlabel"+id);
				value = sap.ui.getCore().byId("datastoreoperationinput"+id);
				xmlFile = xmlFile + '\n' + "<parameter name='"+key.getText()+"'>"+value.getValue()+"</parameter>";
				
				//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
			}
			
			//adapter drop down
			
			if(idd.search("mapping")!= -1)
				idd = "mapping";
			else if(idd.search("filter")!= -1)
				idd = "filter";
			else if(idd.search("modifier")!= -1)
				idd = "modifier";
			else if(idd.search("signer")!= -1)
				idd = "signer";
			else if(idd.search("verifier")!= -1)
				idd = "verifier";
			else if(idd.search("encrypter")!= -1)
				idd = "encrypter";
			else if(idd.search("decryptor")!= -1)
				idd = "decryptor";
			else if(idd.search("splitter")!= -1)
				idd = "splitter";
			else if(idd.search("datastore")!= -1)
				idd = "datastore";
								
			key = sap.ui.getCore().byId(idd+"label");
			value = sap.ui.getCore().byId(idd+"dd");
			xmlFile = xmlFile + '\n' + "<parameter name='Template'>"+value.getLiveValue()+"</parameter>";
			
			//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
			xmlFile = xmlFile + '\n' +"</component>";
		}
		
		
	}
	//xmlFile = xmlFile + '\n' +"</component>\n</xml>";
	console.log(xmlFile);
	
	if(catgory == "Sender")
		ConnXML = xmlFile;
	else if(catgory=="FlowStep")
		FSXML = xmlFile;
	else if(catgory=="Receiver")
		RecXML = xmlFile;
	
	if(lastCall == true){
	console.log("Full XML :\n"+ConnXML+ '\n'+FSXML+ '\n'+ RecXML+"\n</xml>");
	var content = ConnXML+ '\n'+FSXML+ '\n'+ RecXML+"\n</xml>";
	var uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	newWindow=window.open(uriContent, 'neuesDokument');
	}
}

function addHeaderKeyToList(id){
	var key, value;
	key = sap.ui.getCore().byId("headerkeyinput"+id);

	value = sap.ui.getCore().byId("headervalueinput"+id);
	
	//list = sap.ui.getCore().byId("headerkeylistinput"+id);
	//console.log("headerkeylistinput"+id);
	headerkeylist.addItem(new sap.ui.core.ListItem({text : key.getValue()+'|'+value.getValue()}));
}

function removeHeaderKeyFromList(){
	headerkeylist.removeItem(headerkeylist.getSelectedItem());
}

function getFlowSteps(){
	var list = [];
	for(obj in step2list){
		
		//list.push(sap.ui.getCore().byId(step2list[obj]).getText());
		list.push(new sap.ui.core.ListItem({text : step2list[obj]}));
	}
	reorderArray = list;
	return list;
}

function moveFlowStepUp(i){
	
	//i is getSelectedIndex()
	if(i==0) return;
	var temp = reorderlist.getSelectedItem();
	var temp2 = reorderlist.removeItem(temp);
	reorderlist.insertItem(temp, i-1);
	
//	//to reflect instantly in UI
//	temp = reorderArray[i-1];
//	reorderArray[i-1] = reorderArray[i];
//	reorderArray[i] = temp;
}

function moveFlowStepDown(i){
	if(i==reorderlist.getItems().length-1) return;
	var temp = reorderlist.getSelectedItem();
	var temp2 = reorderlist.removeItem(temp);
	reorderlist.insertItem(temp, i+1);
}

function applyReorderChange(){

	//console.log(step2list);
	//console.log(reorderlist.getItems());
	
	var list = reorderlist.getItems();
	var newlist = [];
	
	for(i in list){
		newlist.push(list[i].getText());
	}
	
	step2list = newlist;
	oNode2.removeAllNodes();
	var node;
	for(i in step2list){
		node = sap.ui.getCore().byId(step2list[i]);
		oNode2.addNode(node);
	}
	
}