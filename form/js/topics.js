var topic = {
	formFields : contextDescriptors,
	choices : {},
	assembleInterface : function () {
		for (var fields in topic.formFields) {
			var formString = '<p class="ui-widget" id="'+fields+'">'+
								'<label for="'+fields+'">'+topic.formFields[fields]['question']+'</label><br>';
			if(topic.formFields[fields]['inputtype']=='textarea'){
				formString += '<textarea class="'+fields+' text" id="'+fields+'" name="'+fields+'"></textarea>';
			}
			else {
				formString +=  '<input type="text" class="'+fields+' text" id="'+fields+'" name="'+fields+'"/>';
			}

			if(topic.formFields[fields]['addmore']){
				formString += ' <a class="more" onClick="topic.addNewLine(\''+fields+'\')">Add more</a><br />';
			}
			formString += '</p>';
			
			$('#form_ending').
				before(
					formString
				);
			$( "."+fields ).autocomplete({
				source: topic.formFields[fields]['options']
			});
			

		}
		//topic.complete();
		
	},

	addNewLine : function (f) {
		$('#'+f).append(
			'<input type="text" class="'+f+' text" name="'+f+'">'+
			'  <a class="more" onClick="topic.addNewLine(\''+f+'\')">Add more</a><br />'
		);
		$( "."+f).autocomplete({
				source: topic.formFields[f]['options']
		});
	},

	saveNGo : function (user_id) {
		//find all the answers and assemble a json structure to be matched with rdf descriptors/sparql templates
		for (var fields in topic.formFields) {
			//collect the values
			topic.choices[fields] = [];
			var inputs = jQuery('.'+fields);
			for (var i=0; i<inputs.length; i++) {
				topic.choices[fields].push(jQuery(inputs[i]).val());
			}
		}
		//now save it with the user identifier
		if(localStorage.profiles!==null && localStorage.profiles!=='undefined')
			{	var profiles = JSON.parse(localStorage['profiles']);
				if(typeof(profiles[user_id])==='undefined'){
					profiles[user_id] = {};
				
				}
				profiles[user_id]['choices'] = topic.choices;
			}
		else {
			var profiles = {}; profiles[user_id] = {};profiles[user_id]['choices'] = topic.choices;
		}
		localStorage['profiles'] = JSON.stringify(profiles) ;
		
	},

	loadProfile : function (user_id) {
		//this is for when the user is updating his/her profile
		//Now fill with data, provided it exists;
		if(localStorage.profiles!=='undefined'){
			var uP = JSON.parse(localStorage.profiles);
			if(typeof(uP[user_id])!=='undefined'){
				for (var field in uP[user_id]['choices']) {
					$($('.'+field)[0]).attr('value', uP[user_id]['choices'][field][0]);
					if(uP[user_id]['choices'][field].length>1){
						
						for (var i=1; i<uP[user_id]['choices'][field].length; i++) {
							topic.addNewLine(field);
							$($('.'+field)[i]).attr('value', uP[user_id]['choices'][field][i]);
							var a;
						}
					}
					
				}
			}
			var a;
		}
	}

}
