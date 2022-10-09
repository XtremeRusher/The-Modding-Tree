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
	},
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
			return 'Also thanks to <h2 style="color:#016CFD">Kubson_F0X</h2> for idea for Mushroom layer.'
		}],]
	
})
