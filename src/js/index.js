document.addEventListener("DOMContentLoaded", () => {
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
		}

		document.querySelector(".js-choose-field[data-val='"+val+"']").classList.add('active');
	}

	//Open popup
	document.querySelector(".js-open-popup").addEventListener("click", function(e){
		let popup = document.querySelector('.js-popup');

		popup.classList.add('active');
	});

	//Close popup
	document.querySelector(".js-close-popup").addEventListener("click", function(e){
		let popup = document.querySelector('.js-popup');

		popup.classList.remove('active');
	});

	
});