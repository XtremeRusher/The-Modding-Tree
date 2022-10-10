let modInfo = {
	name: "Collection of Everything",
	id: "XR2003",
	author: "XtremeRusher",
	pointsName: "Knowledge",
	modFiles: ["layers.js", "tree.js", "achieve.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Bugfix Mini-Update",
}

let changelog = `<h4>Changelog:</h4><br>
	<h2>0.1.1 - Bugfix Mini-Update</h2><br>
	- Some minor changes in code<br>
	- Mini-Mushrooms are now displaying amount per sec (x/sec)<br>
	- Changed price of "Paper" Upgrade, it now costs 10k Bamboo and effect of this upgrade is now visible<br>
	- 4th Bamboo milestone requirement has been nerfed (5000 => 4000)<br>
	- Now "Rotting" of the Bamboo Harvest slightly decreases gain until 0 (It used to decrease instantly to 0)<br><br>
	<h1>0.1 - First Update</h1><br>
	Added 3 layers:<br>
	- Laboratory<br>
	- Bamboo<br>
	- Mushrooms<br>
	<br>
	Bamboo unique mechanic has been Added "Harvest"<br>
	Mini-Mushrooms has been Added in 2 types:<br>
	- Bay Bolete<br>
	- Chanterelle<br>`

let winText = `Congratulations! You beat the game!`
// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
		let gain = new Decimal(0)
		if (hasUpgrade('s', 11)) {
		gain = new Decimal(1)
		if (hasUpgrade('s', 12)) gain = gain.times(2)
		if (hasUpgrade('bam', 11)) gain = gain.times(4)
		gain = gain.times(tmp.bam.effect)
		if (hasUpgrade('s', 13)) gain = gain.add(upgradeEffect('s', 13))
		gain = gain.add(player.mush.mushA)
		if (hasUpgrade('s',14)) gain = gain.times(10)
	}
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [ "Endgame at 10000 Mushrooms"
]

// Determines when the game "ends"
function isEndgame() {
	return player.mush.points.gte(new Decimal("1e4"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}