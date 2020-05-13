window.onload = function() {
	addTankHealDps();
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Tank',
			fill: false,
			data: [],
			backgroundColor: ['rgba(30, 139, 195, 1)'],
			borderColor: ['rgba(30, 139, 195, 1)'],
			borderWidth: 2
		},
		{
			label: 'Heal',
			fill: false,
			data: [],
			backgroundColor: ['rgba(77, 175, 124, 1)'],
			borderColor: ['rgba(77, 175, 124, 1)'],
			borderWidth: 2
		},
		{
			label: 'Dps',
			fill: false,
			data: [],
			backgroundColor: ['rgba(102, 51, 153, 1)'],
			borderColor: ['rgba(102, 51, 153, 1)'],
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

var NbOfRechercheTank = 0;
var NbOfRechercheHeal = 0;
var NbOfRechercheDPS = 0;
var NbOfRecherche = 0;

function addTankHealDps(){
	var tank = 0;
	var heal = 0;
	var dps = 0;
	var today = moment().format('YYYY-MM-DD');
	$.getJSON("http://localhost:5000/api/StatsRoles", function(data) {          
		$.each(data, function(i, marker) {
			var start = moment(marker._id.date);
			var end = moment(today);
			var nbdays = end.diff(start, "days");
			NbOfRecherche = NbOfRecherche + marker.NbRole;
			if(nbdays <= 29){
				//console.log(marker._id);
				//console.log( marker.NbRole + ':' + marker._id.date + ':' + marker._id.name );
				if(marker._id.role == "Tank"){
					myChart.data.labels[tank] = marker._id.date;
					myChart.data.datasets[0].data[tank] = marker.NbRole;
					myChart.data.datasets[0].backgroundColor[tank] = 'rgba(30, 139, 195, 1)'
					NbOfRechercheTank = NbOfRechercheTank + marker.NbRole;
					tank++;
				}
				if(marker._id.role == "Heal"){
					myChart.data.labels[heal] = marker._id.date;
					myChart.data.datasets[1].data[heal] = marker.NbRole;
					myChart.data.datasets[1].backgroundColor[heal] = 'rgba(77, 175, 124, 1)'
					NbOfRechercheHeal = NbOfRechercheHeal + marker.NbRole;
					heal++;
				}				
				if(marker._id.role == "Dps"){
					myChart.data.labels[dps] = marker._id.date;
					myChart.data.datasets[2].data[dps] = marker.NbRole;
					myChart.data.datasets[2].backgroundColor[dps] = 'rgba(102, 51, 153, 1)'
					NbOfRechercheDPS = NbOfRechercheDPS + marker.NbRole;
					dps++;
				}
				myChart.update();		
				document.getElementById("nbTank").innerText = NbOfRechercheTank;
				document.getElementById("nbHeal").innerText = NbOfRechercheHeal;
				document.getElementById("nbDps").innerText = NbOfRechercheDPS;
				document.getElementById("nbTotalTank").innerText = NbOfRechercheTank + NbOfRechercheHeal + NbOfRechercheDPS;
				document.getElementById("nbTotalHeal").innerText = NbOfRechercheTank + NbOfRechercheHeal + NbOfRechercheDPS;
				document.getElementById("nbTotalDps").innerText = NbOfRechercheTank + NbOfRechercheHeal + NbOfRechercheDPS;
			}
		})
	});                  
};

function UpdateDate(){
	var tank = 0;
	var heal = 0;
	var dps = 0;
	NbOfRechercheTank = 0;
	NbOfRechercheHeal = 0;
	NbOfRechercheDPS = 0;
	NbOfRecherche = 0;
	ClearGraph();
	$.getJSON("http://localhost:5000/api/StatsRoles", function(data) {          
		$.each( data, function(i, marker) {
			var comparedateformat = moment(marker._id.date, 'YYYY-MM-DD').format("DD/MM/YYYY");
			var compareDate = moment(comparedateformat, "DD/MM/YYYY");
			var startDate   = moment(moment(document.getElementById("DateDebutField").value).format("DD/MM/YYYY"), "DD/MM/YYYY");
			var endDate     = moment(moment(document.getElementById("DateFinField").value).format("DD/MM/YYYY"), "DD/MM/YYYY");
			compareDate.isBetween(startDate, endDate); //false in this case
			NbOfRecherche = NbOfRecherche + marker.NbRole;
			console.log(NbOfRecherche);
			//console.log(compareDate.isBetween(startDate, endDate));
			if(compareDate.isBetween(startDate, endDate)){

				//console.log(marker._id);
				//console.log( marker.NbRole + ':' + marker._id.date + ':' + marker._id.name );
				if(marker._id.role == "Tank"){
					myChart.data.labels[tank] = marker._id.date;
					myChart.data.datasets[0].data[tank] = marker.NbRole;
					myChart.data.datasets[0].backgroundColor[tank] = 'rgba(30, 139, 195, 1)'
					NbOfRechercheTank = NbOfRechercheTank + marker.NbRole;
					tank++;
				}
				if(marker._id.role == "Heal"){
					myChart.data.labels[heal] = marker._id.date;
					myChart.data.datasets[1].data[heal] = marker.NbRole;
					myChart.data.datasets[1].backgroundColor[heal] = 'rgba(77, 175, 124, 1)'
					NbOfRechercheHeal = NbOfRechercheHeal + marker.NbRole;
					heal++;
				}				
				if(marker._id.role == "Dps"){
					myChart.data.labels[dps] = marker._id.date;
					myChart.data.datasets[2].data[dps] = marker.NbRole;
					myChart.data.datasets[2].backgroundColor[dps] = 'rgba(102, 51, 153, 1)'
					NbOfRechercheDPS = NbOfRechercheDPS + marker.NbRole;
					dps++;
				}
				myChart.update();		
				document.getElementById("nbTank").innerText = NbOfRechercheTank;
				document.getElementById("nbHeal").innerText = NbOfRechercheHeal;
				document.getElementById("nbDps").innerText = NbOfRechercheDPS;
				document.getElementById("nbTotalTank").innerText = NbOfRecherche;
				document.getElementById("nbTotalHeal").innerText = NbOfRecherche;
				document.getElementById("nbTotalDps").innerText = NbOfRecherche;
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
				label: 'Tank',
				fill: false,
				data: [],
				backgroundColor: ['rgba(30, 139, 195, 1)'],
				borderColor: ['rgba(30, 139, 195, 1)'],
				borderWidth: 2
			},
			{
				label: 'Heal',
				fill: false,
				data: [],
				backgroundColor: ['rgba(77, 175, 124, 1)'],
				borderColor: ['rgba(77, 175, 124, 1)'],
				borderWidth: 2
			},
			{
				label: 'Dps',
				fill: false,
				data: [],
				backgroundColor: ['rgba(102, 51, 153, 1)'],
				borderColor: ['rgba(102, 51, 153, 1)'],
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
}