window.onload = function() {
	addHordeAlliance();
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Horde',
			fill: false,
			data: [],
			backgroundColor: ['rgba(217, 30, 24, 1)'],
			borderColor: ['rgba(217, 30, 24, 1)'],
			borderWidth: 2
		},
		{
			label: 'Alliance',
			fill: false,
			data: [],
			backgroundColor: ['rgba(65, 131, 215, 1)'],
			borderColor: ['rgba(65, 131, 215, 1)'],
			borderWidth: 2
		}]
	},
	options: {
				responsive: true,
				title: {
					display: true,
					text: 'Nombres de recherche des mots clés Alliance & Horde'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				spanGaps: true,
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						color: 'rgba(0, 0, 0, 1)',
						ticks: {
						  fontColor: "#000", // this here
						},	
						scaleLabel: {
							display: true
						},
						gridLines: {
							color: 'rgba(36, 37, 42, 1)',
							lineWidth: 0.1
						  }
					}],
					yAxes: [{
						display: true,
						color: 'rgba(0, 0, 0, 1)',
						ticks: {
						  fontColor: "#000", // this here
						},						
						scaleLabel: {
							display: true,
							labelString: 'Nombre de recherche'
						},
						gridLines: {
							color: 'rgba(36, 37, 42, 1)',
							lineWidth: 0.1
						  }
					}]
				}
			}
});

var NbOfRechercheHorde = 0;
var NbOfRechercheAlly = 0;
var NbOfRecherche = 0;

function addHordeAlliance(){
	var a = 0;
	var h = 0;
	var today = moment().format('YYYY-MM-DD');
	$.getJSON("http://localhost:5000/api/Stats", function(data) {          
		$.each( data, function(i, marker) {
			var start = moment(marker._id.date);
			var end = moment(today);
			var nbdays = end.diff(start, "days");

			if(nbdays <= 29){
				//console.log( marker.Nb + ':' + marker._id.date + ':' + marker._id.name );
				if(marker._id.name == "Horde"){
					myChart.data.labels[h] = marker._id.date;
					myChart.data.datasets[0].data[h] = marker.Nb;
					myChart.data.datasets[0].backgroundColor[h] = 'rgba(217, 30, 24, 1)'
					NbOfRechercheHorde = NbOfRechercheHorde + marker.Nb;
					h++;
				}
				if(marker._id.name == "Alliance"){
					myChart.data.labels[a] = marker._id.date;
					myChart.data.datasets[1].data[a] = marker.Nb;
					myChart.data.datasets[1].backgroundColor[a] = 'rgba(65, 131, 215, 1)'
					NbOfRechercheAlly = NbOfRechercheAlly + marker.Nb;
					a++;
				}
				myChart.update();
				document.getElementById("nbAlly").innerText = NbOfRechercheAlly;
				document.getElementById("nbHorde").innerText = NbOfRechercheHorde;
				document.getElementById("nbTotalAlly").innerText = NbOfRechercheAlly + NbOfRechercheHorde;
				document.getElementById("nbTotalHorde").innerText = NbOfRechercheAlly + NbOfRechercheHorde;
			}
		})
	});                  
};

function UpdateDate(){
	var a = 0;
	var h = 0;
	NbOfRechercheHorde = 0;
	NbOfRechercheAlly = 0;
	NbOfRecherche = 0;
	ClearGraph();
	$.getJSON("http://localhost:5000/api/Stats", function(data) {          
		$.each( data, function(i, marker) {
			var comparedateformat = moment(marker._id.date, 'YYYY-MM-DD').format("DD/MM/YYYY");
			var compareDate = moment(comparedateformat, "DD/MM/YYYY");
			var startDate   = moment(moment(document.getElementById("DateDebutField").value).format("DD/MM/YYYY"), "DD/MM/YYYY");
			var endDate     = moment(moment(document.getElementById("DateFinField").value).format("DD/MM/YYYY"), "DD/MM/YYYY");
			//console.log(marker._id.date);
			//console.log(compareDate);
			//console.log(startDate);
			//console.log(endDate);
			if(compareDate.isBetween(startDate, endDate, null, '[]')){
				//console.log( marker.Nb + ':' + marker._id.date + ':' + marker._id.name );
				if(marker._id.name == "Horde"){
					console.log(marker._id.date);
					myChart.data.labels[h] = marker._id.date;
					myChart.data.datasets[0].data[h] = marker.Nb;
					myChart.data.datasets[0].backgroundColor[h] = 'rgba(217, 30, 24, 1)'
					NbOfRechercheHorde = NbOfRechercheHorde + marker.Nb;
					h++;
				}
				if(marker._id.name == "Alliance"){
					console.log(marker._id.date);
					myChart.data.labels[a] = marker._id.date;
					myChart.data.datasets[1].data[a] = marker.Nb;
					myChart.data.datasets[1].backgroundColor[a] = 'rgba(65, 131, 215, 1)'
					NbOfRechercheAlly = NbOfRechercheAlly + marker.Nb;
					a++;
				}
				myChart.update();
				document.getElementById("nbAlly").innerText = NbOfRechercheAlly;
				document.getElementById("nbHorde").innerText = NbOfRechercheHorde;
				document.getElementById("nbTotalAlly").innerText = NbOfRechercheAlly + NbOfRechercheHorde;
				document.getElementById("nbTotalHorde").innerText = NbOfRechercheAlly + NbOfRechercheHorde;
			}
		})
	});                  
};

function ClearGraph(){
	myChart.reset();
	myChart.destroy();
	ctx = document.getElementById('myChart').getContext('2d');
	myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				label: 'Horde',
				fill: false,
				data: [],
				backgroundColor: ['rgba(217, 30, 24, 1)'],
				borderColor: ['rgba(217, 30, 24, 1)'],
				borderWidth: 2
			},
			{
				label: 'Alliance',
				fill: false,
				data: [],
				backgroundColor: ['rgba(65, 131, 215, 1)'],
				borderColor: ['rgba(65, 131, 215, 1)'],
				borderWidth: 2
			}]
		},
		options: {
					responsive: true,
					title: {
						display: true,
						text: 'Nombres de recherche des mots clés Alliance & Horde'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					spanGaps: true,
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Nombre de recherche'
							}
						}]
					}
				}
	});
}