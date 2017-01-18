function ChampionSearch() {
	var x = document.getElementById("search_panel");
	var y = document.querySelectorAll('div > p');
	var value = x.value.toLowerCase();
	var length = value.length;
	y.forEach(function(item){
		var championName = item.innerHTML;
		if (championName.toLowerCase().indexOf(value) == -1) {
			item.parentElement.style.visibility = "hidden";
		}
		else {
			item.parentElement.style.visibility = "visible";
		}
	});
	
	// console.log(value);
	// console.log(length);
}