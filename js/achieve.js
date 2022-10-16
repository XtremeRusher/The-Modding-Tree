addLayer("a", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "<img src='js/achieve/ach.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color() {
		return "#ff0000"
	},
	tooltip: "Achievements",
	row: "side",
	layerShown(){
		if (hasUpgrade('s', 11)) return true
	},
	achievements: {
		11: {
			name: "Era of Discoveries!",
			done() {
				return hasUpgrade('bam', 11)
			},
			tooltip: "Buy 1st upgrade from Bamboo layer.",
			//image: "js/achieve/ach.png",
			style: {
				width: "96px",
				height: "96px",
			}
		},
		12: {
			name: "Plantation!",
			done() {
				return hasMilestone('bam', 2)
			},
			tooltip: "Unlock special feature in Bamboo layer.",
			style: {
				width: "96px",
				height: "96px",
			}
		},
		13: {
			name: "Grand Tour around Forests!",
			done() {
				return hasMilestone('bam', 4)
			},
			tooltip: "Unlock Mushroom layer.",
			style: {
				width: "96px",
				height: "96px",
			}
		},
		14: {
			name: "Primitive reinforcements",
			done() {
				return player.w.points!=0
			},
			tooltip: "Collect 1st Wood Point.",
			style: {
				width: "96px",
				height: "96px",
			}
		},
		15: {
			name: "Peaceful Japanese Village",
			done() {
				let PJV = getPointGen()
				return PJV>=1.4e6 & player.w.points<1
			},
			goalTooltip: "Have 1,4M Knowledge gain per sec, before getting any Wood!",
			doneTooltip: "Reward: 1.1x Multiplier to points",
			style: {
				width: "96px",
				height: "96px",
				color: "#BA0000"
			}
		},
		21: {
			name: "The Revolution Begun!",
			done() {
				return hasUpgrade('w', 13)
			},
			tooltip: "Buy 'Workbench' Upgrade",
			style: {
				width: "96px",
				height: "96px",
			}
		},
		22: {
			name: "Shaping the World!",
			done() {
				return hasUpgrade('s', 21) && hasUpgrade('s', 22) && hasUpgrade('s', 23) && hasUpgrade('s', 24)
			},
			tooltip: "Collect all Wooden crafting Blueprints",
			style: {
				width: "96px",
				height: "96px",
			}
		},
		23: {
			name: "Eating the World!",
			done() {
				let food = tmp.s.effect
				return food>1.01
			},
			tooltip: "Eat Something... Not irl",
			style: {
				width: "96px",
				height: "96px",
			}
		},
	},
	tabFormat: ["blank", "blank", "blank", "blank","achievements"]
})

addLayer("f", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "Thx",
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color() {
		return "#0f0f0f"
	},
	tooltip: "Special Thanks",
	row: "side",
	layerShown(){
		if (hasUpgrade('s', 11)) return true
	},
	tabFormat:
		[["display-text", function(){
			return 'Thank you, <h2 style="color:#2ECC71">Smiley</h2> and <h2 style="color:#2ECC71">jakub</h2> from <h2 style="color:#8B0FC8">TMT Discord Server</h3> for helping me understand the coding of this mod!'
		}],"blank",["display-text", function(){
			return 'Thanks a lot to <h2 style="color:#2ECC71">Escapee</h2> for helping out on buyables,'
		}],"blank",["display-text", function(){
			return 'and Thanks to <h2 style="color:#00A0FF">MomentCookie</h2> for help with clickables.'
		}],"blank",["display-text", function(){
			return 'Also thanks to <h2 style="color:#016CFD">Kubson_F0X</h2> for idea for Mushroom layer.'
		}],]
})
