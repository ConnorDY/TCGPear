var players = new Array();
var pid = 0;

var activeTab = new Array("Event", 1);

function init()
{
	$("#bTab1").click(function() {showTab("Event", 1);});
	$("#bTab2").click(function() {showTab("Players", 2);});
	$("#bTab3").click(function() {showTab("Round", 3);});
	$("#bTab4").click(function() {showTab("Standings", 4);});

	for (var i = 1; i <= 30; i++)
		$("#numRounds").append('<option value="'+i+'">'+i+'</option>');

	$("#bAddPlayer").click(function() {addPlayer();});

	loadDataLocal();

	setInterval(function() {saveDataLocal();}, 5000);
}

function showTab(tab, button)
{
	$(".tab").addClass("hidden");
	$("#tab"+tab).removeClass("hidden");
	$(".tabButton").removeClass("select");
	$("#bTab"+button).addClass("select");

	activeTab = new Array(tab, button);
}

function saveDataLocal()
{
	if (typeof(Storage) !== undefined)
	{
		localStorage.numRounds = $("#numRounds").val();
		localStorage.activeTab = JSON.stringify(activeTab);

		/*
		* Get time and convert it into HH:MM:SS (12 hr format)
		*/
		var time = new Date($.now());
		var displayTime = "";
		var PM = false;

		// Hours
		var hours = time.getHours();
		if (hours >= 12)
		{
			PM = true;
			hours -= 12;
		}
		if (hours < 10) displayTime += "0";
		displayTime += hours+":";

		// Minutes
		if (time.getMinutes() < 10) displayTime += "0";
		displayTime += time.getMinutes()+":";

		// Seconds
		if (time.getSeconds() < 10) displayTime += "0";
		displayTime += time.getSeconds()+" ";

		// AM/PM
		if (PM) displayTime += "PM";
		else displayTime += "AM";

		$("#notif").html("Last saved: "+displayTime);
	}
}

function loadDataLocal()
{
	if (typeof(Storage) !== undefined)
	{
		if (localStorage.getItem("numRounds") !== null) $("#numRounds").val(localStorage.numRounds);
		if (localStorage.getItem("activeTab") !== null)
		{
			activeTab = JSON.parse(localStorage.activeTab);
			showTab(activeTab[0], activeTab[1]);
		}
	}
}

function addPlayer()
{
	if ($("#playerFirstName").val().trim() == "") return 0;
	if ($("#playerLastName").val().trim() == "") return 0;

	var player = new Array(pid, $("#playerFirstName").val().trim(), $("#playerLastName").val().trim());
	players.push(player);
	pid++;

	$("#playerListTable").append('<tr id="p'+player[0]+'"><td>'+player[1]+' '+player[2]+'</td></tr>');
	$("#playerFirstName").val("");
	$("#playerLastName").val("");
}