document.addEventListener("DOMContentLoaded", () => {
	var numStep = 1;

	//Changes the phone and email fields when clicking on radio
	var curChooseField = document.querySelector(".js-choose-radio:checked");

	chooseField(curChooseField.value);

	document.querySelectorAll(".js-choose-radio").forEach(function(radio){
		radio.onchange = function(e){
			chooseField(e.target.value);
		};
	});

	function chooseField(val) {
		let fields = document.querySelectorAll('.js-choose-field');

		for (let field of fields) {
			field.classList.remove("active");
			field.querySelector("input").classList.remove("js-landing-input");
		}


		document.querySelectorAll(".js-choose-field[data-val='"+val+"']").forEach(function(chooseField){
			chooseField.classList.add('active');
		});

		document.querySelectorAll(".js-choose-field[data-val='"+val+"'] input").forEach(function(chooseField){
			chooseField.classList.add('js-landing-input');
		});

		document.querySelector(".js-choose-field[data-val='"+val+"'] input").onchange = function(e){
			validForm(document.querySelector(".js-choose-field[data-val='"+val+"'] input"));
		}

		document.querySelectorAll('.js-landing-step[data-step="1"] .js-landing-input').forEach(function(input){
			validForm(input);
		});
	}

	//Open popup
	document.querySelector(".js-open-popup").addEventListener("click", function(e){
		let popup = document.querySelector('.js-popup');

		popup.classList.add('active');
	});

	//Close popup
	document.querySelectorAll(".js-close-popup").forEach(function(elem){
		elem.onclick = function(e){
			let popup = document.querySelector('.js-popup');

			popup.classList.remove('active');
	}
	});

	//valid form
	//Radio validation function
	function validateRadio(name) {
		var radios = document.querySelectorAll('input[type="radio"][name='+name+']');
		var selected = false;
		
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				selected = true;
				break;
			}
		}

		if(selected == false){
			return true;
		}
	}

	function validForm(input) {
		var form =  input.closest('.js-landing-step');
		var patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
		var error = false;

		//Checking fields for emptiness
		form.querySelectorAll('.js-landing-input').forEach(function(field){
			//Email verification
			if(field.type == 'email' && field.value !== ''){
				if (!patternEmail.test(field.value)) {
					error = true;
				}
			}
		
			//Radio verification
			if(field.type == 'radio'){
				if(validateRadio(field.name)){
					error = true;
				}
			}

			//Checkbox verification
			if(field.type == 'checkbox' &&  field.hasAttribute('required')){
				if(!field.checked){
					error = true;
				}
			}

			//Checking all fields
			if (field.value === '' &&  field.hasAttribute('required')) {
				error = true;
			}
		});

		//Unlock the button if all fields are filled in
		if(error == false){
			form.querySelector('.js-btn-next').classList.remove('disable');
		}else{
			form.querySelector('.js-btn-next').classList.add('disable');
		}
	}

	//Validation of the form at the first step when loading the page
	document.querySelectorAll('.js-landing-step[data-step="1"] .js-landing-input').forEach(function(input){
		validForm(input);
	});

	//Validation of the form at the first step when changing the field value
	document.querySelectorAll('.js-landing-step[data-step="1"] .js-landing-input').forEach(function(input){
		input.onchange = function(e){
			validForm(input);
		}
	});

	//Next step
	document.querySelectorAll(".js-btn-next").forEach(function(btn){
		btn.onclick = function(e){
			if (!e.target.classList.contains('disable')) {
				numStep++;
				console.log('numStep = ', numStep);
	
				if(numStep == 6){
					document.querySelector('.js-wrap-landing').classList.add('hide');
					document.querySelector('.js-final-page').classList.add('active');
				}else{
					document.querySelector('.js-wrap-landing').classList.remove('hide');
					document.querySelector('.js-final-page').classList.remove('active');
	
					document.querySelectorAll('.js-landing-step').forEach(function(step){
						step.classList.remove('active');
					});
		
					document.querySelector('.js-landing-step[data-step="'+numStep+'"]').classList.add('active');
					document.querySelector('.js-btn-back').classList.add('active');
				}
			}
		}
	});

	//Prev step
	document.querySelector(".js-btn-back").onclick = function(e){
		numStep--;
		console.log('numStep = ', numStep);
		
		document.querySelectorAll('.js-landing-step').forEach(function(step){
			step.classList.remove('active');
		});

		document.querySelector('.js-landing-step[data-step="'+numStep+'"]').classList.add('active');

		if(numStep == 1){
			document.querySelector('.js-btn-back').classList.remove('active');
		}
	}
	

	//opening the fields when selecting the select value
	document.querySelector('.js-select-celebrate').onchange = function(e){
		document.querySelector('.js-select-phrases').classList.add('active');
		document.querySelector('.js-field-author').classList.remove('hide');
		document.querySelectorAll('.js-landing-step[data-step="2"] .js-landing-input').forEach(function(input){
			validForm(input);
		});
	}

	//Validation of the form at the second step when changing the field value
	document.querySelectorAll('.js-landing-step[data-step="2"] .js-landing-input').forEach(function(input){
		input.onchange = function(e){
			validForm(input);
		}
	});

	//Clear textarea
	document.querySelector(".js-clear-field").onclick = function(e){
		document.querySelector('.js-select-phrases-field').value = '';
	}
	

	//file selection
	const dropContainer = document.querySelector(".js-choose-pic");
	const fileInput = document.querySelector(".js-choose-pic-input");
	const dropImg = document.querySelector(".js-choose-pic-img");
	let file;

	dropContainer.addEventListener("dragover", (e) => {
		// prevent default to allow drop
		e.preventDefault()
	}, false)

	dropContainer.addEventListener("dragenter", () => {
		dropContainer.classList.add("drag-active")
	})

	dropContainer.addEventListener("dragleave", () => {
		dropContainer.classList.remove("drag-active")
	})

	dropContainer.addEventListener("drop", (e) => {
		e.preventDefault()
		dropContainer.classList.remove("drag-active")
		fileInput.files = e.dataTransfer.files
		file = e.dataTransfer.files[0];
		showFile();
	})


	fileInput.addEventListener("change", function(){
		//getting user select file and [0] this means if user select multiple files then we'll select only the first one
		file = this.files[0];
		showFile(); //calling function
	});

	//file selection function
	function showFile(){
		let fileType = file.type; //getting selected file type
		let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array

		if(validExtensions.includes(fileType)){ //if user selected file is an image file
			let fileReader = new FileReader(); //creating new FileReader object

			fileReader.onload = ()=>{
				let fileURL = fileReader.result; //passing user file source in fileURL variable
				let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
				dropImg.classList.add('active');
				dropImg.innerHTML = imgTag; //adding that created img tag inside dropArea container
			}
			fileReader.readAsDataURL(file);

			document.querySelector('.js-form-pic-actions[data-status="before"]').classList.remove('active');
			document.querySelector('.js-form-pic-actions[data-status="after"]').classList.add('active');
			document.querySelector('.js-choose-pic-del').classList.add('active');
			fileInput.disabled = true;
			
		}else{
			alert("This is not an Image File!");
		}
	}

	//Deleting the photo
	document.querySelector(".js-choose-pic-del").onclick = function(e){
		e.preventDefault();
		document.querySelector('.js-form-pic-actions[data-status="after"]').classList.remove('active');
		document.querySelector('.js-form-pic-actions[data-status="before"]').classList.add('active');
		document.querySelector('.js-choose-pic-del').classList.remove('active');
		dropImg.classList.remove('active');
		fileInput.value = '';
		fileInput.disabled = false;
	}

	// when choosing a day, we show the time
	document.querySelector('.js-select-day').onchange = function(e){
		console.log('e = ', e.target.value);
		if(e.target.value == 'now'){
			document.querySelector('.js-select-time').classList.add('hide');
		}else{
			document.querySelector('.js-select-time').classList.remove('hide');
		}
	}
});