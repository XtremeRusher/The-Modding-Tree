addLayer("s", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol() {
		if (hasUpgrade('s', 11)) return "<img src='js/Lab0.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>"
 		return "<img src='js/Lab.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>"},
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		//points: new Decimal(0),
    }},
    color() {
		if(hasUpgrade('s', 11)) return "#ffa0a0"
		return "ff0000"
	},
	tooltip: "Laboratory",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stone", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	gainMult() {
        let mult = new Decimal(1)
		//if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		11: {
			title: "<img src='js/Lab0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> The thinking process",
			description: "You start producing <b>Knowledge</b>",
			cost: new Decimal(10),
			currencyDisplayName:"Knowledge",
			currencyInternalName:"points",
			currencyLocation() {return player},
			tooltip: "Start this adventure and begin the Gathering!",
		},
		12: {
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> <u><b>Bamboo</b></u>",
			description: "Multiplies Knowledge gain by 2, also unlocks new layer",
			cost: new Decimal(15),
			currencyDisplayName:"Knowledge",
			currencyInternalName:"points",
			tooltip: "Material easy to gather, but durable against nature",
			unlocked() {if (hasUpgrade('s', 11)) return true},
			//effect() {
			//return player[this.layer].points.add(player[this.layer].points).div(8).add(1)
			//},
			//effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
		},
		//13: {
			//title: "<img src='js/Lab0.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img> Boulders",
			//description: "Multiply Stone gain by itself",
			//cost: new Decimal(50),
			//currencyDisplayName:"Knowledge",
			//currencyInternalName:"points",
			//effect() {
			//return player[this.layer].points.add(1).pow(0.25)
			//},
			//effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
			//tooltip: "These are really heavy, they would squash you if they start rolling.",
		//},
		13: {
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Paper",
			description: "Points are boosted by itself",
			cost: new Decimal(2500),
			currencyDisplayName:"Bamboo",
			currencyLayer: "bam",
			currencyInternalName:"points",
			tooltip: "The superior tool, that allows to record past and present.",
			effect(){
				return player.points.pow(0.25)
			},
			unlocked(){if (hasUpgrade('s', 12)) return true}
		},
		14: {
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Simple Bamboo Facility",
			description: "Your Knowledge gain is multiplied by 10",
			cost: new Decimal(1e7),
			currencyDisplayName:"Bamboo",
			currencyLayer: "bam",
			currencyInternalName:"points",
			tooltip: "Shelter made out moderatly-weak material",
			effect(){
				return player.points.pow(0.25)
			},
			unlocked(){if (hasUpgrade('s', 12)) return true}
		},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
	doReset(){
		let keep = []
		// declare keep
	  
		if(hasMilestone('bam', 0))keep.push(11, 12)
		if(hasMilestone('bam', 2)&hasUpgrade('s',13))keep.push(13)
		if(hasUpgrade('s',14))keep.push(14)
		// push the upgrades we want to keep
		// keep is now [11,12,13] if you have the milestone
	  
		layerDataReset(this.layer)
		// reset
		
		player[this.layer].upgrades = keep
		// upgrades = keep
	},
})

addLayer("bam", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "<img src='js/Bamboo.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		pHarvest: new Decimal(1),
    }},
    color: "#a5f57d",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "Bamboo", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	effect() {
		if(hasMilestone('bam',3)) return player[this.layer].points.pow(0.5).add(1).min(10).add(tmp.bam.milestones[3].effect)
		return player[this.layer].points.pow(0.5).add(1).min(10)
	},
	effectDescription(){
		return "multiplying point gain by " + format(tmp[this.layer].effect)
	},
	branches: ['s'],
	gainMult() {
        let mult = new Decimal(1)
		if (hasMilestone('bam', 1)) mult = mult.times(player[this.layer].points.sqrt().sqrt().min(10))
		if (player.bam.pHarvest<900 & hasMilestone('bam', 2)) mult = mult.times(player[this.layer].pHarvest.sqrt().div(5))
		if (player.bam.pHarvest>900 & hasMilestone('bam', 2)) mult = mult.times(0)
		mult = mult.times(player.mush.mushB.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades:{
		11:{
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Simple bed",
			tooltip: "Bamboo seems to be soft enough for rest",
			cost: new Decimal(100),
			description: "Multiplies your knowledge gain by 4"
		},
		12:{
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Better Harvesting Methods",
			tooltip: "This harvesting seems boring and fruitless, maybe i'm doing it wrong?",
			cost: new Decimal(100),
			description: "Multiplies your harvest speed by 5",
		},
	},
	bars: {
		Harvest: {
			direction: RIGHT,
			height: 50,
			width: 400,
			progress() {
				return player[this.layer].pHarvest.div(1000)
			},
			fillStyle: {
				"background-color":"#a5f57d"
			},
		}
	},
	milestones: {
		0: {
			requirementDescription: "1 Bamboo",
			effectDescription: "You keep most important upgrades from Laboratory!",
			done() { return player.bam.points.gte(1) }
		},
		1: {
			requirementDescription: "25 Bamboo",
			effectDescription: "Bamboo boosts it's own production",
			done() {return player.bam.points.gte(25) },
			effect() {return player[this.layer].points.add(1).div(5)},
		},
		2: {
			requirementDescription: "500 Bamboo",
			effectDescription: "Unlock ability to Harvest Bamboo",
			done() {return player.bam.points.gte(500) },
		},
		3: {
			requirementDescription: "5000 Bamboo",
			effectDescription: "Bamboo boosts its own effect slightly",
			done() {return player.bam.points.gte(5000) },
			effect() {return player[this.layer].points.sqrt()},
		},
		4: {
			requirementDescription: "20000 Bamboo",
			effectDescription: "Unlock new Layer",
			done() {return player.bam.points.gte(20000) },
		},
	},
	update(diff){
		if (hasUpgrade('bam', 12)) return player.bam.pHarvest = player.bam.pHarvest.add(5).min(1000)
		player.bam.pHarvest = player.bam.pHarvest.add(1).min(1000)
	},
	infoboxes: {
		harv: {
			title: "Harvesting Bamboo ",
			body() {return "Here you have to check if your Bamboo is growing properly. If harvested at the right time, you will gain more Bamboo. But if Bamboo is collected too late or too soon, it will heavily impact your Bamboo gain."},
		},
	},
	tabFormat: {
		"Upgrades": {
			content:["main-display", "resource-display", "prestige-button", "blank", "upgrades"],
			unlocked(){return true},
		},
		"Milestones": {
			content:["main-display", "resource-display", "prestige-button", "blank", "milestones"],
			unlocked(){return true},
		},
		"Harvest": {
			content:["main-display", "resource-display", "prestige-button", "blank", ["bar", "Harvest"],
			"blank",["display-text", function(){return 'You have '+format(player.bam.pHarvest)+'/1000 Harvest Points'}],"blank",["infobox","harv"]],
			unlocked(){if (hasMilestone('bam', 2)) {return true} else {return false}},
		},
	},
	row: 1,
    hotkeys: [
        {key: "b", description: "b: Reset for Bamboo", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
		if (hasUpgrade('s', 12) | player.bam.points > 0){
			return true
		}
	},
	onPrestige(){
		player.bam.pHarvest = new Decimal(0)
	},
})

addLayer("mush", {
    name: "",
	symbol: "<img src='js/Mush.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 0,
    startData() { return {
		points: new Decimal(0),
		mushA: new Decimal(0),
		mushB: new Decimal(0),
        unlocked: true,
    }},
    color() {
		return "#ad6040"
	},
	tooltip: "",
	row: 1,
	branches: ['s'],
	layerShown(){
		if (hasMilestone('bam', 4)) return true
	},
	requires: new Decimal(20),
	resource: "Mushroom",
    baseResource: "Knowledge", 
    baseAmount() {return player.points},
    type: "normal", 
    exponent: 0.5,
	gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
	update(diff){
		player.mush.mushA = player.mush.mushA.add(player.mush.points.div(500))
		player.mush.mushB = player.mush.mushB.add(player.mush.points.div(50000))
	},
	tabFormat: {
		"Main": {
			content:["main-display", "resource-display", "prestige-button", "blank", ["display-text", function(){
				return 'You have <h3 style="color:#4D1F1C">'+format(player.mush.mushA)+'</h3> of Bay Bolete Mushrooms, which increases your point gain.'
			}],["display-text", function(){
				return 'You have <h3 style="color:#FFD64D">'+format(player.mush.mushB)+'</h3> of Chanterelle Mushrooms, which increases your Bamboo gain.'
			}]],
		},
	},
})
