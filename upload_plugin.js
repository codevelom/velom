"use strict";

function FileUpload(form,fileField='',url, show=false)
{ 
	 var formInputs, formData,cvg, ajResp, count, filesField;

	 //form passed
	 cvg = $('#'+form);
	 filesField = $('#'+fileField);
	 //prepend a div form responses
	 cvg.prepend('<div id="cvgResp"></div>');
	 ajResp = $('#cvgResp');
	  
	 //check if previes is alowed
	 if(show==true)
	 {
	 	filesField.after('<ul id="preview"></ul>')
	 }

	 
	 if(window.FormData) //check if formData is available
	 {

	 	formData = new FormData();

	 	//Make provision for item preview
	 	filesField.on('change', function(e){
	 		var holder = e.target.files

	 			$('#preview').append( holder.length + ' File(s) Ready for Upload</a>');
	 	})
	 	//End item preview

	 	//On form submission loop files
		cvg.on('submit', function(e){
			e.preventDefault();

			formInputs = cvg.serializeArray(); //put input files in array
			count = $('#'+fileField)[0].files
			//loop through form inputs
			$.each(formInputs, function(key,input){
				formData.append(input.name, input.value);
			});

			//get total number of files selected
			for (var i = 0; i < count.length; i++) {
				formData.append(filesField.attr('name')+'[]', count[i])
			}
			// end count

			//Start ajax request by sending formData to the server
			$.ajax({
				type: cvg.attr('method'),
				url: url,
				cache: false,
				processData: false,
				contentType: false,
				data: formData,
				success: function(xhrResponse){
					ajResp.html(xhrResponse)
				}
			})
			//End Ajax processing
		});

		//---======================== END FORM SERIALIZATION =========================-----------
	 }else{

	 	return false;
	 }

	
}

FileUpload('upload','files','files.php');