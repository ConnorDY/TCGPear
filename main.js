var players = new Array();
var pid = 0;

var activeTab = new Array("Event", 1);
var autoSave = null;

function init()
{
	$("#bTab1").click(function() {showTab("Event", 1);});
	$("#bTab2").click(function() {showTab("Players", 2);});
	$("#bTab3").click(function() {showTab("Round", 3);});
	$("#bTab4").click(function() {showTab("Standings", 4);});

	$("#bCloseSession").click(function() {closeSession();});

	$("#matchType").change(function() {changeMatchType();});

	$("#bAddPlayer").click(function() {addPlayer();});
	$("#bCancelEdit").click(function() {hideEditPlayer();});
	$("#bUpdatePlayer").click(function() {editPlayer();});
	$("#bDropPlayer").click(function(){dropPlayer();});

	for (var i = 1; i <= 30; i++)
		$("#numRounds").append('<option value="'+i+'">'+i+'</option>');

	for (var i = 2; i <= 10; i++)
		$("#podSize").append('<option value="'+i+'">'+i+'</option>');

	// Load data and set auto-save to every 5 seconds
	loadDataLocal();
	autoSave = setInterval(function() {saveDataLocal();}, 5000);
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
		localStorage.eventName = $("#eventName").val();
		localStorage.numRounds = $("#numRounds").val();
		localStorage.matchType = $("#matchType").val();
		localStorage.podSize = $("#podSize").val();
		localStorage.activeTab = JSON.stringify(activeTab);
		localStorage.players = JSON.stringify(players);

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
		if (localStorage.getItem("eventName") !== null) $("#eventName").val(localStorage.eventName);
		if (localStorage.getItem("numRounds") !== null) $("#numRounds").val(localStorage.numRounds);
		if (localStorage.getItem("matchType") !== null)
		{
			$("#matchType").val(localStorage.matchType);
			changeMatchType();
		}
		if (localStorage.getItem("podSize") != null) $("#podSize").val(localStorage.podSize);
		if (localStorage.getItem("activeTab") !== null)
		{
			var loadTab = JSON.parse(localStorage.activeTab);
			showTab(loadTab[0], loadTab[1]);
		}
		if (localStorage.getItem("players") !== null)
		{
			var loadPlayers = JSON.parse(localStorage.players);
			for (var i = 0; i < loadPlayers.length; i++)
				addPlayer(loadPlayers[i]);
		}
	}
}

function closeSession()
{
	var choice = confirm("Are you sure you want to close this session?\n\nAll session data will be lost and program defaults will be restored.");
	if (!choice) return 0;

	clearInterval(autoSave);
	$("#mainForm")[0].reset();
	localStorage.clear();
	location.reload();
}

function changeMatchType()
{
	var type = $("#matchType").val();

	if (Number(type) != 0) $("#defaultTeamPodSize").css("display", "block");
	else $("#defaultTeamPodSize").css("display", "none");
}

function getPlayerIndex(id)
{
	for (var i = 0; i < players.length; i++)
	{
		if (players[i][0] == id) return i;
	}

	return -1;
}

function addPlayer(player = null)
{
	if (player === null)
	{
		if ($("#playerFirstName").val().trim() == "") return 0;
		if ($("#playerLastName").val().trim() == "") return 0;

		player = new Array(pid, $("#playerFirstName").val().trim(), $("#playerLastName").val().trim());
	}

	players.push(player);
	pid++;

	$("#playerListTable").append('<tr id="p'+player[0]+'"><td>'+player[1]+' '+player[2]+'</td><td><input class="bEditPlayer" id="bEditP'+player[0]+'" type="button" value="Edit/Drop"></td></tr>');
	$("#playerFirstName").val("");
	$("#playerLastName").val("");

	$("#bEditP"+player[0]).click(function() {popupEditPlayer(player[0]);});
}

function popupEditPlayer(id)
{
	var p = players[getPlayerIndex(id)];

	$("#editPlayer").css("display", "block");

	$("#editPlayerID").val(p[0]);
	$("#editPlayerFirstName").val(p[1]);
	$("#editPlayerLastName").val(p[2]);
}

function hideEditPlayer()
{
	$("#editPlayer").css("display", "none");
}

function editPlayer()
{
	var id = $("#editPlayerID").val();
	var index = getPlayerIndex(id);

	players[index][1] = $("#editPlayerFirstName").val();
	players[index][2] = $("#editPlayerLastName").val();

	$("#p"+id+">td:first-child").html(players[index][1]+" "+players[index][2]);

	hideEditPlayer();
}

function dropPlayer()
{
	var choice = confirm("Are you sure you want to drop this player?");
	if (!choice) return 0;

	var id = $("#editPlayerID").val();
	players.splice(getPlayerIndex(id), 1);
	$("#p"+id).remove();

	hideEditPlayer();
}