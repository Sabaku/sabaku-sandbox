function transform_sparql(json, me) {
	var json_children  = {};json_children.children = [];
	var json_deps  = {};
	//going over the results, "cluster" together in the same structure the triples that use the same susbject
	for (var i=0; i<json.results.bindings.length; i++) {
		var subj = json.results.bindings[i].person.value;
		var name = json.results.bindings[i].personName.value;
		
		json_children.children[subj] = '';
	}
}

function transform(data, me) {
	//create an array from my coi
	var myCOIS = [];var myCOILabel = [];
	for (var m=0; m<data[me].coi.length; m++) {
		myCOIS.push(data[me].coi[m].id);
	
	}

	//get the links from other researchers
	var json_child = {};json_child.children = [];
	json_child.id = me;
	json_child.name = "Me";

	 
	 //recursing over the links; first level childrne
	  for (var i=0; i<data[me].links.length; i++) {
			var newChildren = {
				//make the id and name; then the children 
				"id":data[me].links[i].id,
				"name":data[me].links[i].firstname+" "+data[me].links[i].lastname,
				"data": {
				   "description": "",
				   "$color": "#66cc66"
				 } 
			};
			
			//add children for the coi
			newChildren.children = [];
			//now list all the concepts of this other children
			//is this part of the link already in the structure?
			var mylinkID = data[me].links[i].id;
			if(typeof(data[mylinkID])!=='undefined'){
				var level2children = {};
				for (var j=0; j<data[mylinkID].coi.length; j++) {
					//shared ids?
					var thisCOI = data[mylinkID].coi[j].id;
					var thisCOILabel = data[mylinkID].coi[j].label;

					if(jQuery.inArray(thisCOI, myCOIS)!==-1){
						var level2children = 
							{
								"id":thisCOI,
								"name":thisCOILabel,
								"data": {
									 "description": "",
									 "$color": "#B0AAF6",
									 "matches": 3
								}
							}
					newChildren.children.push(level2children)	
					}
					else {
						//in this case, the data is not available; need to retrieve it first

						
						
					}
				}
			}
			json_child.children.push(newChildren);
			
	  }
	  sunburst(json_child);
	  //tree_anim(json_child);
	  //tree_map(json_child);
	  //linked_circle(json_adj);

}