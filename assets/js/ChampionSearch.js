function ChampionSearch() {
	var x = document.getElementById("search_panel");
	var y = document.querySelectorAll('div > p');
	var value = x.value.toLowerCase();
	var length = value.length;
	y.forEach(function(item){
		var championName = item.innerHTML;
		if (championName.toLowerCase().indexOf(value) == -1) {
			item.parentElement.classList.add('hidden');
		}
		else {
			item.parentElement.classList.remove('hidden');
		}
	});
	
	// console.log(value);
	// console.log(length);
}