var players = {};
var pid = 0;

var eventData = {};
eventData["players"] = [];

var activeTab = ["Event", 1];
var autoSave = null;

function init()
{
	// Add functionality to clicking tabs and close session button
	$("#bTab1").click(function() {showTab("Event", 1);});
	$("#bTab2").click(function() {showTab("Players", 2);});
	$("#bTab3").click(function() {showTab("Round", 3);});
	$("#bTab4").click(function() {showTab("Standings", 4);});

	$("#bCloseSession").click(function() {closeSession();});

	// Trigger event when match type is changed
	$("#matchType").change(function() {changeMatchType();});

	// Trigger addPlayer() when form is submitted
	$("#playerLastName").on("keyup", function(e) {
		if (e.which == 13)
		{
			addPlayer();
			$("#playerFirstName").focus();
		}
	});
	$("#bAddPlayer").click(function() {
		addPlayer();
		$("#playerFirstName").focus();
	});

	// Close update/drop player popup when cancel button is pressed
	$("#bCancelEdit").click(function() {hideEditPlayer();});

	// Trigger editPlayer() when form is submitted
	$("#editPlayerLastName").on("keyup", function(e) {
		if (e.which == 13) editPlayer();
	});
	$("#bUpdatePlayer").click(function() {editPlayer();});

	// Drop player when button is pressed
	$("#bDropPlayer").click(function(){dropPlayer();});

	// Populate certain <select> tags with options
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

	activeTab = [tab, button];
}

function saveDataLocal()
{
	eventData["eventName"] = $("#eventName").val();
	eventData["numRounds"] = $("#numRounds").val();
	eventData["matchType"] = $("#matchType").val();
	eventData["podSize"] = $("#podSize").val();
	eventData["activeTab"] = activeTab;

	if (typeof(Storage) !== undefined)
	{
		localStorage.event = JSON.stringify(eventData);

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
		if (localStorage.getItem("event") !== null && localStorage.getItem("event") != "[]")
		{
			eventData = JSON.parse(localStorage.event);

			$("#eventName").val(eventData["eventName"]);
			$("#numRounds").val(eventData["numRounds"]);

			$("#matchType").val(eventData["matchType"]);
			changeMatchType();

			$("#podSize").val(eventData["podSize"]);

			if (eventData["activeTab"] !== null)
			{
				var loadTab = eventData["activeTab"];
				showTab(loadTab[0], loadTab[1]);
			}

			if (eventData["players"] !== null)
			{
				for (var i = 0; i < eventData["players"].length; i++)
				{
					addPlayer(eventData["players"][i]);
				}
			}
		}
	}
}

function closeSession()
{
	var choice = confirm("Are you sure you want to close this session?\n\nAll session data will be lost and program defaults will be restored.");
	if (!choice) return 0;

	clearInterval(autoSave);
	$("#mainForm")[0].reset();
	localStorage.removeItem("event");
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
	for (var i = 0; i < eventData["players"].length; i++)
	{
		if (eventData["players"][i][0] == id) return i;
	}

	return -1;
}

function addPlayer(player = null)
{
	if (player === null)
	{
		if ($("#playerFirstName").val().trim() == "") return 0;
		if ($("#playerLastName").val().trim() == "") return 0;

		player = [pid, $("#playerFirstName").val().trim(), $("#playerLastName").val().trim()];

		eventData["players"].push(player);
	}

	pid++;

	$("#playerListTable").append('<tr id="p'+player[0]+'"><td>'+player[1]+' '+player[2]+'</td><td><input class="bEditPlayer" id="bEditP'+player[0]+'" type="button" value="Edit/Drop"></td></tr>');
	$("#playerFirstName").val("");
	$("#playerLastName").val("");

	$("#bEditP"+player[0]).click(function() {popupEditPlayer(player[0]);});
}

function popupEditPlayer(id)
{
	var p = eventData["players"][getPlayerIndex(id)];

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

	eventData["players"][index][1] = $("#editPlayerFirstName").val();
	eventData["players"][index][2] = $("#editPlayerLastName").val();

	$("#p"+id+">td:first-child").html(eventData["players"][index][1]+" "+eventData["players"][index][2]);

	hideEditPlayer();
}

function dropPlayer()
{
	var choice = confirm("Are you sure you want to drop this player?");
	if (!choice) return 0;

	var id = $("#editPlayerID").val();
	eventData["players"].splice(getPlayerIndex(id), 1);
	$("#p"+id).remove();

	hideEditPlayer();
}