addLayer("s", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='js/Stone.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A0A0A0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stone", // Name of prestige currency
    baseResource: "Stone", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		
		11: {
			title: "Pile of Pebbles",
			description: "Double your point gain.",
			cost: new Decimal(1),
			tooltip: "Just a simple pile.",
		},
		12: {
			title: "Bunch of Boulders",
			description: "Multiply point gain by Stone^0.5",
			cost: new Decimal(4),
			effect() {
			return player[this.layer].points.add(1).pow(0.5)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
			tooltip: "These are really heavy, they would squash you if they start rolling.",
		},
		13: {
			title: "Stone Surface Mine",
			description: "Double your point gain.",
			cost: new Decimal(7),
			tooltip: "...stone is really common, it seems kinda pointless... or is it?",
			effect() {
			return player[this.layer].points.add(1).pow(0.2)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
		},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Stones", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})