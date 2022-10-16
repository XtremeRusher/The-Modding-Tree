addLayer("s", {
    name: "",
	symbol() {
		if (hasUpgrade('s', 11)) return "<img src='js/Lab0.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>"
 		return "<img src='js/Lab.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>"},
    position: 1,
    startData() { return {
        unlocked: true,
		PickPow: new Decimal(0),
		stor: new Decimal(0),
		storMax: new Decimal(0),
		eat1: new Decimal(0),
		eat2: new Decimal(0),
		eat3: new Decimal(0),
		eat4: new Decimal(0),
		eatHap: new Decimal(0),
    }},
    color() {
		if(hasUpgrade('s', 11)) return "#ffa0a0"
		return "ff0000"
	},
	tooltip: "Laboratory",
    requires: new Decimal(10), 
    resource: "Stone", 
    baseResource: "Knowledge", 
    baseAmount() {return player.points}, 
    type: "none",
    exponent: 0.5,
	gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
	update(diff){
		player.s.PickPow = buyableEffect('s', 22)
		if (hasUpgrade('w', 14)) player.s.storMax = new Decimal(50)
		player.s.stor = player.FoodB.points.add(player.FoodA.points).add(player.FoodB.pig).add(player.FoodB.cow).add(player.FoodB.chk).add(player.FoodB.shp)
		.add(player.FoodB.fsh).add(player.FoodA.wheat).add(player.FoodA.rice).add(player.FoodA.corn)
		.add(player.FoodA.carrot).add(player.FoodA.onion).add(player.FoodA.cabbage).add(player.FoodA.potato)
		.add(player.FoodA.apple).add(player.FoodA.banana).add(player.FoodA.grapes)
		.add(getBuyableAmount("s", "a1")).add(getBuyableAmount("s", "a2")).add(getBuyableAmount("s", "a3")).add(getBuyableAmount("s", "a4")).add(getBuyableAmount("s", "a5"))
		player.s.eat1 = player.s.eat1.sub(0.01).max(0).min(100)
		player.s.eat2 = player.s.eat2.sub(0.01).max(0).min(100)
		player.s.eat3 = player.s.eat3.sub(0.01).max(0).min(100)
		player.s.eat4 = player.s.eat4.sub(0.01).max(0).min(100)
		player.s.eatHap = player.s.eatHap.sub(0.01).max(0).min(100)
	},
	effect(){
		return player.s.eat1.div(10).max(1).times(player.s.eat2.div(10).max(1)).times(player.s.eat3.div(10).max(1)).times(player.s.eat4.div(10).max(1)).times(player.s.eatHap.div(10).max(1))
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
			unlocked() {return hasUpgrade('s', 11)},
		},
		13: {
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Paper",
			description: "Knowledge is boosted by itself",
			cost: new Decimal(10000),
			currencyDisplayName:"Bamboo",
			currencyLayer: "bam",
			currencyInternalName:"points",
			tooltip: "The superior tool, that allows to record past and present.",
			effect(){
				return player.points.pow(0.25)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked(){return hasUpgrade('s', 12)}
		},
		14: {
			title: "<img src='js/Bamboo.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Simple Bamboo Facility",
			description: "Your Knowledge gain is multiplied by 10",
			cost: new Decimal(1e7),
			currencyDisplayName:"Bamboo",
			currencyLayer:"bam",
			currencyInternalName:"points",
			tooltip: "Shelter made out moderatly-weak material",
			unlocked(){return hasUpgrade('s', 12)}
		},
		15: {
			title: "<img src='js/Wood.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> <u><b>Wood</b></u>",
			description: "Unlock New Layer",
			cost: new Decimal(1.5e7),
			currencyDisplayName:"Knowledge",
			currencyInternalName:"points",
			tooltip: "Common, but very durable. Hardest green material!",
			unlocked(){return hasUpgrade('s', 14)}
		},
		21:{
			title: "<img src='js/OtherPNG/Axe0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Axe Blueprint",
			tooltip: "Finally, I don't have to use bare hands!",
			cost: new Decimal(10000),
			currencyDisplayName:"Wood",
			currencyLayer:"w",
			currencyInternalName:"points",
			description: "Unlock new Buyable in Workbench",
			unlocked(){if(hasUpgrade('w',13)) return true}
		},
		22:{
			title: "<img src='js/OtherPNG/Sword0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Sword Blueprint",
			tooltip: "En Garde! Innocent, walking food!",
			cost: new Decimal(30000),
			currencyDisplayName:"Wood",
			currencyLayer:"w",
			currencyInternalName:"points",
			description: "Unlock new Buyable in Workbench",
			unlocked(){if(hasUpgrade('w',15)) return true}
		},
		23:{
			title: "<img src='js/OtherPNG/Scythe0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Scythe Blueprint",
			tooltip: "I'm Crop Reaper!",
			cost: new Decimal(90000),
			currencyDisplayName:"Wood",
			currencyLayer:"w",
			currencyInternalName:"points",
			description: "Unlock new Buyable in Workbench",
			unlocked(){if(hasUpgrade('w',15)) return true}
		},
		24:{
			title: "<img src='js/OtherPNG/Pick0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Pickaxe Blueprint",
			tooltip: "Let's dive into caverns!",
			cost: new Decimal(270000),
			currencyDisplayName:"Wood",
			currencyLayer:"w",
			currencyInternalName:"points",
			description: "Unlock new Buyable in Workbench",
			unlocked(){if(hasUpgrade('w',13)) return true}
		},
		25:{
			title: "<img src='js/Meat.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Fishing Rod",
			tooltip: "Let's dive into caverns!",
			cost: new Decimal(2e6),
			currencyDisplayName:"Wood",
			currencyLayer:"w",
			currencyInternalName:"points",
			description: "Unlock new Type of Meat",
			unlocked(){if(hasUpgrade('w',13)) return true}
		},
	},
	buyables:{
		11:{
			title: "Wooden Axe <img src='js/OtherPNG/Axe0.png' style='width:calc(40%);height:calc(40%);margin:10%'></img>",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { knw: new Decimal(10).pow(prc), drw: new Decimal(10).times(prc).pow(2)}
				return cost
			},
			display() { 
				let display = "Cost: "+formatWhole(tmp.s.buyables[11].cost.knw)+" Knowledge and "+formatWhole(tmp.s.buyables[11].cost.drw)+" Wood\n\
				Boost to Wood Gain: "+format(tmp.s.buyables[11].effect)+"x\n\
				Level: "+formatWhole(getBuyableAmount("s", 11))+"/15"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.points.gte(tmp[this.layer].buyables[this.id].cost.knw) & player.w.points.gte(tmp[this.layer].buyables[this.id].cost.drw)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.knw) player.points = player.points.sub(cost.knw);
				if (cost.drw) player.w.points = player.w.points.sub(cost.drew);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(){
				eff = new Decimal(1).times(getBuyableAmount("s", 11))
				return eff = eff
			},
			purchaseLimit: new Decimal(15),
			unlocked(){if (hasUpgrade('s', 21)) return true}
		},
		12:{
			title: "Wooden Sword <img src='js/OtherPNG/Sword0.png' style='width:calc(40%);height:calc(40%);margin:10%'></img>",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { knw: new Decimal(100).pow(prc), drw: new Decimal(10).times(prc).pow(2.5)}
				return cost
			},
			display() { 
				let display = "Cost: "+formatWhole(tmp.s.buyables[12].cost.knw)+" Knowledge and "+formatWhole(tmp.s.buyables[12].cost.drw)+" Wood\n\
				Boost to Animal product Gain: "+format(tmp.s.buyables[12].effect)+"x\n\
				Level: "+formatWhole(getBuyableAmount("s", 12))+"/10"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.points.gte(tmp[this.layer].buyables[this.id].cost.knw) & player.w.points.gte(tmp[this.layer].buyables[this.id].cost.drw)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.knw) player.points = player.points.sub(cost.knw);
				if (cost.drw) player.w.points = player.w.points.sub(cost.drew);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(){
				eff = new Decimal(1).times(getBuyableAmount("s", 12))
				return eff = eff
			},
			purchaseLimit: new Decimal(10),
			unlocked(){if (hasUpgrade('s', 22)) return true}
		},
		21:{
			title: "Wooden Scythe <img src='js/OtherPNG/Scythe0.png' style='width:calc(40%);height:calc(40%);margin:10%'></img>",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { knw: new Decimal(100).pow(prc), drw: new Decimal(10).times(prc).pow(1.5)}
				return cost
			},
			display() { 
				let display = "Cost: "+formatWhole(tmp.s.buyables[21].cost.knw)+" Knowledge and "+formatWhole(tmp.s.buyables[21].cost.drw)+" Wood\n\
				Boost to Bamboo Gain: "+format(tmp.s.buyables[21].effect)+"x\n\
				Level: "+formatWhole(getBuyableAmount("s", 21))+"/10"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.points.gte(tmp[this.layer].buyables[this.id].cost.knw) & player.w.points.gte(tmp[this.layer].buyables[this.id].cost.drw)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.knw) player.points = player.points.sub(cost.knw);
				if (cost.drw) player.w.points = player.w.points.sub(cost.drew);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(){
				eff = new Decimal(10).times(getBuyableAmount("s", 21))
				return eff = eff
			},
			purchaseLimit: new Decimal(10),
			unlocked(){if (hasUpgrade('s', 23)) return true}
		},
		22:{
			title: "Wooden Pickaxe <img src='js/OtherPNG/Pick0.png' style='width:calc(40%);height:calc(40%);margin:10%'></img>",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { knw: new Decimal(100).pow(prc), drw: new Decimal(10).times(prc).pow(2.5)}
				return cost
			},
			display() { 
				let display = "Cost: "+formatWhole(tmp.s.buyables[22].cost.knw)+" Knowledge and "+formatWhole(tmp.s.buyables[22].cost.drw)+" Wood\n\
				Pickaxe Power: "+format(tmp.s.buyables[22].effect)+"\n\
				Level: "+formatWhole(getBuyableAmount("s", 22))+"/5"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.points.gte(tmp[this.layer].buyables[this.id].cost.knw) & player.w.points.gte(tmp[this.layer].buyables[this.id].cost.drw)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.knw) player.points = player.points.sub(cost.knw);
				if (cost.drw) player.w.points = player.w.points.sub(cost.drew);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(){
				eff = new Decimal(1).times(getBuyableAmount("s", 22))
				return eff = eff
			},
			purchaseLimit: new Decimal(5),
			unlocked(){if (hasUpgrade('s', 24)) return true}
		},
		a1:{
			title: "Bread",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = new Decimal(5)
				return cost
			},
			display() { 
				let display = "<h3>Cost: 5 Wheat</h3>, <br> You have "+formatWhole(getBuyableAmount("s", "a1"))+" Bread"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.FoodA.wheat.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost) player.FoodA.wheat = player.FoodA.wheat.sub(cost);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		a2:{
			title: "Nigiri",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { one: new Decimal(3), two: new Decimal(1)}
				return cost
			},
			display() { 
				let display = "<h3>Cost: 3 Rice and <br>1 Seafood</h3>, <br> You have "+formatWhole(getBuyableAmount("s", "a2"))+" Nigiri"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.FoodA.rice.gte(tmp[this.layer].buyables[this.id].cost.one) & player.FoodB.fsh.gte(tmp[this.layer].buyables[this.id].cost.two)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.one) player.FoodA.rice = player.FoodA.rice.sub(cost.one);
				if (cost.two) player.FoodB.fsh = player.FoodB.fsh.sub(cost.two);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		a3:{
			title: "Banana Shake",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { one: new Decimal(2), two: new Decimal(10)}
				return cost
			},
			display() { 
				let display = "<h3>Cost: 2 Banana and <br>10L of Milk</h3>, <br> You have "+formatWhole(getBuyableAmount("s", "a3"))+" Banana Shakes"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.FoodA.banana.gte(tmp[this.layer].buyables[this.id].cost.one) & player.FoodB.mlk.gte(tmp[this.layer].buyables[this.id].cost.two)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.one) player.FoodA.banana = player.FoodA.banana.sub(cost.one);
				if (cost.two) player.FoodB.mlk = player.FoodB.mlk.sub(cost.two);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		a4:{
			title: "Coleslaw",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { one: new Decimal(2), two: new Decimal(2), three: new Decimal(1)}
				return cost
			},
			display() { 
				let display = "<h3>Cost: 2 Cabbages,<br>2 Carrots and<br>1 Apple</h3>, <br> You have "+formatWhole(getBuyableAmount("s", "a4"))+" Coleslaw portions"
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.FoodA.cabbage.gte(tmp[this.layer].buyables[this.id].cost.one) & player.FoodA.carrot.gte(tmp[this.layer].buyables[this.id].cost.two) & player.FoodA.apple.gte(tmp[this.layer].buyables[this.id].cost.three)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.one) player.FoodA.cabbage = player.FoodA.cabbage.sub(cost.one);
				if (cost.two) player.FoodA.carrot = player.FoodA.carrot.sub(cost.two);
				if (cost.three) player.FoodA.apple = player.FoodA.apple.sub(cost.three);
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		a5:{
			title: "Pork chop with mashed potatos and salad",
			cost(prc=player[this.layer].buyables[this.id]){
				let cost = { one: new Decimal(1), two: new Decimal(2), three: new Decimal(1)}
				return cost
			},
			display() { 
				let display = "<h3>Cost: 1 Pork,<br>2 Potatos and<br>1 Coleslaw Portion</h3>, <br> You have "+formatWhole(getBuyableAmount("s", "a5"))+""
				return display;
			},
			canAfford(){
				let cost = tmp[this.layer].buyables[this.id].cost
				return player.FoodB.pig.gte(tmp[this.layer].buyables[this.id].cost.one) & player.FoodA.potato.gte(tmp[this.layer].buyables[this.id].cost.two) & getBuyableAmount('s', "a4").gte(tmp[this.layer].buyables[this.id].cost.three)
			},
			buy(){
				let cost = tmp[this.layer].buyables[this.id].cost
				if (cost.one) player.FoodB.pig = player.FoodB.pig.sub(cost.one);
				if (cost.two) player.FoodA.potato = player.FoodA.potato.sub(cost.two);
				if (cost.three) setBuyableAmount('s', "a4", getBuyableAmount('s', "a4").sub(cost.three));
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
	},
	clickables:{
		11:{
			title: "Pork",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodB.pig)+" Pork</h3>"},
			canClick(){
				if(player.FoodB.pig.gte(1)) return true
			},
			onClick(){
				player.FoodB.pig = player.FoodB.pig.sub(1)
			},
			unlocked(){
				if(player.FoodB.pig.gte(1)) return true
			}
		},
		12:{
			title: "Beef",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodB.cow)+" Beef</h3>"},
			canClick(){
				if(player.FoodB.cow.gte(1)) return true
			},
			onClick(){
				player.FoodB.cow = player.FoodB.cow.sub(1)
			},
			unlocked(){
				if(player.FoodB.cow.gte(1)) return true
			}
		},
		13:{
			title: "Poultry",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodB.chk)+" Poultry</h3>"},
			canClick(){
				if(player.FoodB.chk.gte(1)) return true
			},
			onClick(){
				player.FoodB.chk = player.FoodB.chk.sub(1)
			},
			unlocked(){
				if(player.FoodB.chk.gte(1)) return true
			}
		},
		14:{
			title: "Mutton",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodB.shp)+" Mutton</h3>"},
			canClick(){
				if(player.FoodB.shp.gte(1)) return true
			},
			onClick(){
				player.FoodB.shp = player.FoodB.shp.sub(1)
			},
			unlocked(){
				if(player.FoodB.shp.gte(1)) return true
			}
		},
		15:{
			title: "Seafood",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodB.fsh)+" Seafood</h3>"},
			canClick(){
				if(player.FoodB.fsh.gte(1)) return true
			},
			onClick(){
				player.FoodB.fsh = player.FoodB.fsh.sub(1)
			},
			unlocked(){
				if(player.FoodB.fsh.gte(1)) return true
			}
		},
		21:{
			title: "Wheat",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.wheat)+" Wheat</h3>"},
			canClick(){
				if(player.FoodA.wheat.gte(1)) return true
			},
			onClick(){
				player.FoodA.wheat = player.FoodA.wheat.sub(1)
			},
			unlocked(){
				if(player.FoodA.wheat.gte(1)) return true
			}
		},
		22:{
			title: "Rice",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.rice)+" Rice</h3>"},
			canClick(){
				if(player.FoodA.rice.gte(1)) return true
			},
			onClick(){
				player.FoodA.rice = player.FoodA.rice.sub(1)
			},
			unlocked(){
				if(player.FoodA.rice.gte(1)) return true
			}
		},
		23:{
			title: "Corn",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.corn)+" Corns</h3>"},
			canClick(){
				if(player.FoodA.corn.gte(1)) return true
			},
			onClick(){
				player.FoodA.corn = player.FoodA.corn.sub(1)
			},
			unlocked(){
				if(player.FoodA.corn.gte(1)) return true
			}
		},
		24:{
			title: "Carrot",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.carrot)+" Carrots</h3>"},
			canClick(){
				if(player.FoodA.carrot.gte(1)) return true
			},
			onClick(){
				player.FoodA.carrot = player.FoodA.carrot.sub(1)
			},
			unlocked(){
				if(player.FoodA.carrot.gte(1)) return true
			}
		},
		25:{
			title: "Onion",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.onion)+" Onions</h3>"},
			canClick(){
				if(player.FoodA.onion.gte(1)) return true
			},
			onClick(){
				player.FoodA.onion = player.FoodA.onion.sub(1)
			},
			unlocked(){
				if(player.FoodA.onion.gte(1)) return true
			}
		},
		31:{
			title: "Cabbage",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.cabbage)+" Cabbages</h3>"},
			canClick(){
				if(player.FoodA.cabbage.gte(1)) return true
			},
			onClick(){
				player.FoodA.cabbage = player.FoodA.cabbage.sub(1)
			},
			unlocked(){
				if(player.FoodA.cabbage.gte(1)) return true
			}
		},
		32:{
			title: "Potato",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.potato)+" Potatos</h3>"},
			canClick(){
				if(player.FoodA.potato.gte(1)) return true
			},
			onClick(){
				player.FoodA.potato = player.FoodA.potato.sub(1)
			},
			unlocked(){
				if(player.FoodA.cabbage.gte(1)) return true
			}
		},
		33:{
			title: "Apple",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.apple)+" Apples</h3>"},
			canClick(){
				if(player.FoodA.apple.gte(1)) return true
			},
			onClick(){
				player.FoodA.apple = player.FoodA.apple.sub(1)
			},
			unlocked(){
				if(player.FoodA.apple.gte(1)) return true
			}
		},
		34:{
			title: "Banana",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.banana)+" Bananas</h3>"},
			canClick(){
				if(player.FoodA.banana.gte(1)) return true
			},
			onClick(){
				player.FoodA.banana = player.FoodA.banana.sub(1)
			},
			unlocked(){
				if(player.FoodA.banana.gte(1)) return true
			}
		},
		35:{
			title: "Grape",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(player.FoodA.grapes)+" Bunches of Grapes</h3>"},
			canClick(){
				if(player.FoodA.grapes.gte(1)) return true
			},
			onClick(){
				player.FoodA.grapes = player.FoodA.grapes.sub(1)
			},
			unlocked(){
				if(player.FoodA.grapes.gte(1)) return true
			}
		}, // Here Begins Different Type of Food, yummy!
		41:{
			title: "Bread",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a1"))+" Breads</h3>"},
			canClick(){
				if(getBuyableAmount('s', "a1").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a1", getBuyableAmount('s', "a1").sub(1))
			},
			unlocked(){
				if(getBuyableAmount('s', "a1").gte(1)) return true
			}
		},
		42:{
			title: "Nigiri",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a2"))+" Breads</h3>"},
			canClick(){
				if(getBuyableAmount('s', "a2").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a2", getBuyableAmount('s', "a2").sub(1))
			},
			unlocked(){
				if(getBuyableAmount('s', "a2").gte(1)) return true
			}
		},
		43:{
			title: "Banana Shake",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a3"))+" Banana Shakes</h3>"},
			canClick(){
				if(getBuyableAmount('s', "a3").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a3", getBuyableAmount('s', "a3").sub(1))
			},
			unlocked(){
				if(getBuyableAmount('s', "a3").gte(1)) return true
			}
		},
		44:{
			title: "Coleslaw",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a4"))+" Coleslaw Portions</h3>"},
			canClick(){
				if(getBuyableAmount('s', "a4").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a4", getBuyableAmount('s', "a4").sub(1))
			},
			unlocked(){
				if(getBuyableAmount('s', "a4").gte(1)) return true
			}
		},
		45:{
			title: "Pork chop with mashed potatos and salad",
			display(){ return "Click to Trash 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a5"))+" pieces</h3>"},
			canClick(){
				if(getBuyableAmount('s', "a5").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a5", getBuyableAmount('s', "a5").sub(1))
			},
			unlocked(){
				if(getBuyableAmount('s', "a5").gte(1)) return true
			}
		}, //
		//
		// Here Food Becomes !Xx_Edible_xX!
		//
		//
		a01:{
			title: "Carrot",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(player.FoodA.carrot)+" Carrots</h3><br>Healthy"},
			canClick(){
				if(player.FoodA.carrot.gte(1)) return true
			},
			onClick(){
				player.FoodA.carrot = player.FoodA.carrot.sub(1)
				player.s.eat1 = player.s.eat1.add(10)
				player.s.eatHap = player.s.eatHap.add(3)
			},
			unlocked(){
				if(player.FoodA.carrot.gte(1)) return true
			}
		},
		a02:{
			title: "Onion",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(player.FoodA.onion)+" Onions</h3><br>Healthy"},
			canClick(){
				if(player.FoodA.onion.gte(1)) return true
			},
			onClick(){
				player.FoodA.onion = player.FoodA.onion.sub(1)
				player.s.eat1 = player.s.eat1.add(7)
				player.s.eatHap = player.s.eatHap.add(2)
			},
			unlocked(){
				if(player.FoodA.onion.gte(1)) return true
			}
		},
		a03:{
			title: "Apple",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(player.FoodA.apple)+" Apples</h3><br>Healthy, Sweet"},
			canClick(){
				if(player.FoodA.apple.gte(1)) return true
			},
			onClick(){
				player.FoodA.apple = player.FoodA.apple.sub(1)
				player.s.eat1 = player.s.eat1.add(7)
				player.s.eat2 = player.s.eat2.add(10)
				player.s.eatHap = player.s.eatHap.add(4)
			},
			unlocked(){
				if(player.FoodA.apple.gte(1)) return true
			}
		},
		a04:{
			title: "Banana",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(player.FoodA.banana)+" Bananas</h3><br>Healthy, Sweet"},
			canClick(){
				if(player.FoodA.banana.gte(1)) return true
			},
			onClick(){
				player.FoodA.banana = player.FoodA.banana.sub(1)
				player.s.eat1 = player.s.eat1.add(8)
				player.s.eat2 = player.s.eat2.add(8)
				player.s.eatHap = player.s.eatHap.add(2)
			},
			unlocked(){
				if(player.FoodA.banana.gte(1)) return true
			}
		},
		a05:{
			title: "Grapes",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(player.FoodA.grapes)+" Bunches of Grapes</h3><br>Healthy, Sweet"},
			canClick(){
				if(player.FoodA.grapes.gte(1)) return true
			},
			onClick(){
				player.FoodA.grapes = player.FoodA.grapes.sub(1)
				player.s.eat1 = player.s.eat1.add(8)
				player.s.eat2 = player.s.eat2.add(8)
				player.s.eatHap = player.s.eatHap.add(2)
			},
			unlocked(){
				if(player.FoodA.grapes.gte(1)) return true
			}
		},
		a06:{
			title: "Bread",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a1"))+" Breads</h3><br>Healthy"},
			canClick(){
				if(getBuyableAmount('s', "a1").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a1", getBuyableAmount('s', "a1").sub(1))
				player.s.eat1 = player.s.eat1.add(5)
				player.s.eatHap = player.s.eatHap.add(10)
			},
			unlocked(){
				if(getBuyableAmount('s', "a1").gte(1)) return true
			}
		},
		a07:{
			title: "Nigiri",
			display(){ return "Click to Eat 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a2"))+" Nigiri</h3><br>Meaty, Unique"},
			canClick(){
				if(getBuyableAmount('s', "a2").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a2", getBuyableAmount('s', "a2").sub(1))
				player.s.eat3 = player.s.eat3.add(5)
				player.s.eat4 = player.s.eat4.add(20)
				player.s.eatHap = player.s.eatHap.add(10)
			},
			unlocked(){
				if(getBuyableAmount('s', "a2").gte(1)) return true
			}
		},
		a08:{
			title: "Banana Shake",
			display(){ return "Click to Drink 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a3"))+" Banana Shakes</h3><br>Healthy, Sweet, Unique"},
			canClick(){
				if(getBuyableAmount('s', "a3").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a3", getBuyableAmount('s', "a3").sub(1))
				player.s.eat1 = player.s.eat1.add(2)
				player.s.eat2 = player.s.eat2.add(15)
				player.s.eat4 = player.s.eat4.add(15)
				player.s.eatHap = player.s.eatHap.add(10)
			},
			unlocked(){
				if(getBuyableAmount('s', "a3").gte(1)) return true
			}
		},
		a09:{
			title: "Coleslaw",
			display(){ return "Click to Drink 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a4"))+" Coleslaw Portions</h3><br>Healthy, Sweet"},
			canClick(){
				if(getBuyableAmount('s', "a4").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a4", getBuyableAmount('s', "a4").sub(1))
				player.s.eat1 = player.s.eat1.add(15)
				player.s.eat2 = player.s.eat2.add(5)
				player.s.eatHap = player.s.eatHap.add(3)
			},
			unlocked(){
				if(getBuyableAmount('s', "a4").gte(1)) return true
			}
		},
		a10:{
			title: "Pork chop with mashed potatos and salad",
			display(){ return "Click to Drink 1. <br><br><h3>"+formatWhole(getBuyableAmount('s', "a5"))+" Pieces</h3><br>Healthy, Sweet, Meaty, Unique"},
			canClick(){
				if(getBuyableAmount('s', "a5").gte(1)) return true
			},
			onClick(){
				setBuyableAmount('s', "a5", getBuyableAmount('s', "a5").sub(1))
				player.s.eat1 = player.s.eat1.add(10)
				player.s.eat2 = player.s.eat2.add(2)
				player.s.eat3 = player.s.eat3.add(15)
				player.s.eat4 = player.s.eat4.add(10)
				player.s.eatHap = player.s.eatHap.add(30)
			},
			unlocked(){
				if(getBuyableAmount('s', "a5").gte(1)) return true
			}
		},
	},
	bars:{
		Green: {
			direction: RIGHT,
			height: 25,
			width: 400,
			progress() {
				return player.s.eat1.div(100)
			},
			display(){
				return "Healthy Gauge: "+formatWhole(player.s.eat1)+"/100"
			},
			fillStyle: {
				"background-color":"#a5f57d"
			},
			instant: true,
		},
		White: {
			direction: RIGHT,
			height: 25,
			width: 400,
			progress() {
				return player.s.eat2.div(100)
			},
			display(){
				return "Sweet Gauge: "+formatWhole(player.s.eat2)+"/100"
			},
			instant: true,
		},
		Crimson: {
			direction: RIGHT,
			height: 25,
			width: 400,
			progress() {
				return player.s.eat3.div(100)
			},
			display(){
				return "Greasy Gauge: "+formatWhole(player.s.eat3)+"/100"
			},
			fillStyle: {
				"background-color":"#a5f57d"
			},
			instant: true,
		},
		Gold: {
			direction: RIGHT,
			height: 25,
			width: 400,
			progress() {
				return player.s.eat4.div(100)
			},
			display(){
				return "Unique Gauge: "+formatWhole(player.s.eat4)+"/100"
			},
			fillStyle: {
				"background-color":"#a5f57d"
			},
			instant: true,
		},
		Full: {
			direction: RIGHT,
			height: 25,
			width: 400,
			progress() {
				return player.s.eatHap.div(100)
			},
			display(){
				return "Stomach Gauge: "+formatWhole(player.s.eatHap)+"/100"
			},
			fillStyle: {
				"background-color":"#a5f57d"
			},
			instant: true,
		},
	},
	tabFormat: {
		"Main":{
			content:["resource-display", "blank", "upgrades"],
		},
		"Workbench":{
			content:[["display-text", function(){
				if (!hasUpgrade('s', 21)) return 'Here is your Workplace, but What you will make without <b>Blueprints</b>?'
			}],["row", [["buyable", "11"],["buyable", "12"]]],["row", [["buyable", "21"],["buyable", "22"]]]],
			buttonStyle: { "border-color": "#995D2C" },
			unlocked(){return hasUpgrade('w', 13)},
		},
		"Storage":{
			content:[["display-text", function(){
				return "<h3>Available space: "+formatWhole(player.s.stor)+"/"+formatWhole(player.s.storMax)+"</h3>"
			}],"blank", ["row", [["clickable", "11"], ["clickable", "12"], ["clickable", "13"], ["clickable", "14"], ["clickable", "15"]]],
			["row", [["clickable", "21"],["clickable", "22"],["clickable", "23"],["clickable", "24"],["clickable", "25"]]],
			["row", [["clickable", "31"],["clickable", "32"],["clickable", "33"],["clickable", "34"],["clickable", "35"]]],
			["row", [["clickable", "41"],["clickable", "42"],["clickable", "43"],["clickable", "44"],["clickable", "45"]]]],
			buttonStyle: { "border-color": "#995D2C" },
			unlocked(){return hasUpgrade('w', 14)},
		},
		"Kitchen":{
			content:[["row", [["buyable", "a1"], ["buyable", "a2"], ["buyable", "a3"]]], ["row", [["buyable", "a4"], ["buyable", "a5"]]]],
			buttonStyle: { "border-color": "#995D2C" },
			unlocked(){return hasUpgrade('w', 15)},
		},
		"Dining Room":{
			content: [["bar", "Green"],["bar", "White"],["bar", "Crimson"],["bar", "Gold"],["bar", "Full"],"blank",["display-text", function(){
				return "Your eating habits are giving you: <h2>"+format(tmp.s.effect)+"</h2>x More Knowledge!"
			}],,"blank",["row", [["clickable", "a01"],["clickable", "a02"],["clickable", "a03"],["clickable", "a04"],["clickable", "a05"]]],
			["row", [["clickable", "a06"],["clickable", "a07"],["clickable", "a08"],["clickable", "a09"],["clickable", "a10"]]],],
			buttonStyle: { "border-color": "#995D2C" },
			unlocked(){return hasUpgrade('w', 15)},
		},
	},
    row: 0,
    layerShown: true,
	doReset(){
		let keep = []
	  
		if(hasMilestone('bam', 0))keep.push(11, 12)
		if(hasMilestone('bam', 2)&hasUpgrade('s',13))keep.push(13)
		if(hasUpgrade('s',14))keep.push(14)
		if(player.w.points>0)keep.push(15)
		keep.push[buyables]
	  
		layerDataReset(this.layer)
		// reset
		
		player[this.layer].upgrades = keep
		// upgrades = keep
	},
})

addLayer("bam", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "<img src='js/Bamboo.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		pHarvest: new Decimal(1),
		pHarMax: new Decimal(1000),
    }},
    color: "#a5f57d",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "Bamboo", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	effect() {
		if(hasMilestone('bam',3)) return player[this.layer].points.pow(0.5).add(1).min(10).add(tmp.bam.milestones[3].effect).min(1.6e4)
		return player[this.layer].points.pow(0.5).add(1).min(10)
	},
	effectDescription(){
		return "multiplying point gain by " + format(tmp[this.layer].effect)
	},
	branches: ['s'],
	gainMult() {
        let mult = new Decimal(1)
		if (hasMilestone('bam', 1)) mult = mult.times(player[this.layer].points.sqrt().sqrt().max(1).div(1).min(10))
		if (player.bam.pHarvest<900 & hasMilestone('bam', 2)) mult = mult.times(player[this.layer].pHarvest.sqrt().div(4))
		if (player.bam.pHarvest>=900 & hasMilestone('bam', 2)) mult = mult.times(player[this.layer].pHarMax.sub(player[this.layer].pHarvest)).sqrt().div(4).times(9)
		mult = mult.times(player.mush.mushB.add(1))
		if (getBuyableAmount('s', 21)>0) mult = mult.times(buyableEffect('s', 21))
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
			cost: new Decimal(1000),
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
			requirementDescription: "4000 Bamboo",
			effectDescription: "Bamboo boosts its own effect slightly (Up to 16,000x)",
			done() {return player.bam.points.gte(4000) },
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
			body() {return "Here you have to check if your Bamboo is growing properly. If you wait a little, you will gain more Bamboo. But if Harvest Gauge overfills, Bamboo will rot, negatively impacting your Bamboo gain."},
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
			"blank",["display-text", function(){return 'Your Harvest Gauge '+format(player.bam.pHarvest)+'/900'}],
			["display-text", function(){if(player.bam.pHarvest>900)return 'Bamboo is decaying!'}],"blank",["infobox","harv"]],
			unlocked(){return hasMilestone('bam', 2)},
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
    position: 2,
    startData() { return {
		points: new Decimal(0),
		mushA: new Decimal(0),
		mushB: new Decimal(0),
		mushC: new Decimal(0),
        unlocked: true,
    }},
    color() {
		return "#ad6040"
	},
	row: 1,
	branches: ['s'],
	layerShown(){
		if (hasMilestone('bam', 4)) return true
	},
	requires: new Decimal(20),
	resource: "Mushrooms",
    baseResource: "Knowledge", 
    baseAmount() {return player.points},
    type: "normal", 
    exponent: 0.45,
	effect(){
		return {
			bayb: player.mush.points.div(500).times(20),
			chan: player.mush.points.div(50000).times(20),
			hney: player.mush.points.div(1e7).times(20).add(player.w.points.sqrt()).div(25)
		}
	},
	gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { 
		if(player.mush.points>1e5) return new Decimal(0.9)
        return new Decimal(1)
    },
	update(diff){
		player.mush.mushA = player.mush.mushA.add(tmp.mush.effect.bayb.times(diff))
		player.mush.mushB = player.mush.mushB.add(tmp.mush.effect.chan.times(diff))
		if(hasUpgrade('w', 11)) player.mush.mushC = player.mush.mushC.add(tmp.mush.effect.hney.times(diff))
	},
	tabFormat: 
		["main-display", "resource-display", "prestige-button", "blank", ["display-text", function(){
			return 'You have <h3 style="color:#4D1F1C">'+format(player.mush.mushA)+'</h3> of Bay Bolete Mushrooms, which increases your point gain.'
		}],["display-text", function(){
			return '(<h3 style="color:#4D1F1C">'+format(tmp.mush.effect.bayb)+'</h3>/sec)'
		}],"blank",["display-text", function(){
			return 'You have <h3 style="color:#FFD64D">'+format(player.mush.mushB)+'</h3> of Chanterelle Mushrooms, which increases your Bamboo gain.'
		}],["display-text", function(){
			return '(<h3 style="color:#FFD64D">'+format(tmp.mush.effect.chan)+'</h3>/sec)'
		}],"blank",["display-text", function(){
			if(hasUpgrade('w', 11))return 'You have <h3 style="color:#D39741">'+format(player.mush.mushC)+'</h3> of Honey Mushrooms, which increases your Wood gain.'
		}],["display-text", function(){
			if(hasUpgrade('w', 11))return '(<h3 style="color:#D39741">'+format(tmp.mush.effect.hney)+'</h3>/sec)'
		}],"blank","blank","blank",["display-text", function(){
			if(player.mush.points>1e5)return 'Your mushroom gain exponent is decreased, because you keep collecting them faster than they can regrow!'
		}]]
})

addLayer("w", {
    name: "", 
	symbol: "<img src='js/Wood.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 3,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	requires: new Decimal(2e7),
	resource: "Wood",
    baseResource: "Knowledge", 
    baseAmount() {return player.points},
    type: "normal", 
    exponent() {return 0.3},
	effect() {
		return player[this.layer].points.pow(0.5).min(25).times(10).add(1)
	},
	effectDescription(){
		return "multiplying point gain by " + format(tmp[this.layer].effect)
	},
	gainMult() {
        let mult = new Decimal(1)
		if(getBuyableAmount("s", 11)>0)mult = mult.times(buyableEffect("s", 11))
		mult = mult.times(player.mush.mushC.sqrt()).add(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    color() {
		return "#995D2C"
	},
	row: "1",
	branches: ['s'],
	layerShown(){
		if (hasUpgrade('s', 15) | player.w.points > 0) return true
	},
	upgrades:{
		11:{
			title: "<img src='js/Wood.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Bizarre Partnership",
			tooltip: "I get carbohydrates, you get water and nutrients",
			cost: new Decimal(100),
			description: "Unlock new type of Mini-Mushroom"
		},
		12:{
			title: "<img src='js/Wood.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Primitive Wood Cutting",
			tooltip: "It's possible to break tree without tools, but it's really hard",
			cost: new Decimal(1500),
			description: "Multiplies your Knowledge gain by 4",
			unlocked(){if(hasUpgrade('w',11)) return true}
		},
		13:{
			title: "<img src='js/Lab0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Simple Workbench and Tools",
			tooltip: "The Revolution...",
			cost: new Decimal(10000),
			description: "Unlock new Tab in Laboratory (Only Tab!)",
			unlocked(){if(hasUpgrade('w',12)) return true}
		},
		14:{
			title: "<img src='js/Lab0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Simple Drawer",
			tooltip: "Sadly, I don't have that much hands to hold all of this food",
			cost: new Decimal(1e6),
			description: "Unlock new Tab in Laboratory",
			unlocked(){if(hasUpgrade('w',13)) return true}
		},
		15:{
			title: "<img src='js/Lab0.png' style='width:calc(60%);height:calc(60%);margin:10%'></img> Wooden kitchen utensils",
			tooltip: "This food is boring, but what if i'll add this and little bit of that?",
			cost: new Decimal(2e6),
			description: "Unlock new Tab in Laboratory",
			unlocked(){if(hasUpgrade('w',14)) return true}
		},
	},
	tabFormat:
		["main-display", "resource-display", "prestige-button", "blank", "upgrades"],
})

addLayer("FoodA", {
    name: "", 
	symbol: "<img src='js/Crops.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		wheat: new Decimal(0),
		rice: new Decimal(0),
		corn: new Decimal(0),
		apple: new Decimal(0),
		banana: new Decimal(0),
		grapes: new Decimal(0),
		carrot: new Decimal(0),
		onion: new Decimal(0),
		cabbage: new Decimal(0),
		potato: new Decimal(0),
    }},
	requires: new Decimal(20),
	resource: "Crops",
    baseResource: "Knowledge", 
    baseAmount() {return player.points},
    type: "static", 
    exponent: 0.5,
	gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    color() {
		return "#AD8D22"
	},
	row: "1",
	branches: ['bam'],
	layerShown(){
		if (getBuyableAmount('s', 21)>0) return true
	},
	canReset(){
		if (player.s.stor.gte(player.s.storMax)) return false
		return true
	},
	clickables:{
		11:{
			title: "Collect Wheat",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.wheat = player.FoodA.wheat.add(1)
			},
		},
		12:{
			title: "Collect Rice",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.rice = player.FoodA.rice.add(1)
			},
		},
		13:{
			title: "Collect Corn",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.corn = player.FoodA.corn.add(1)
			},
		},
		21:{
			title: "Collect Carrots",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.carrot = player.FoodA.carrot.add(1)
			},
		},
		22:{
			title: "Collect Onions",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.onion = player.FoodA.onion.add(1)
			},
		},
		23:{
			title: "Collect Cabbages",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.cabbage = player.FoodA.cabbage.add(1)
			},
		},
		24:{
			title: "Collect Potatos",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.potato = player.FoodA.potato.add(1)
			},
		},
		31:{
			title: "Collect Apples",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.apple = player.FoodA.apple.add(1)
			},
		},
		32:{
			title: "Collect Bananas",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.banana = player.FoodA.banana.add(1)
			},
		},
		33:{
			title: "Collect Grapes",
			canClick(){
				if(player.FoodA.points.gte(1)) return true
			},
			onClick(){
				player.FoodA.points = player.FoodA.points.sub(1)
				player.FoodA.grapes = player.FoodA.grapes.add(1)
			},
		},
	},
	tabFormat:
	["main-display", "resource-display", "prestige-button","blank",["display-text", function(){
		return "<h3>Available space: "+formatWhole(player.s.stor)+"/"+formatWhole(player.s.storMax)+"</h3>"
	}],,"blank",["row", [["clickable", "11"],["clickable", "12"],["clickable", "13"]]], "blank",["display-text", function(){
		return 'You have <h2 style="color:#AD8D22">'+formatWhole(player.FoodA.wheat)+'</h2> Wheat, <h2 style="color:#D3C59F">'+formatWhole(player.FoodA.rice)+'</h2> Rice, <h2 style="color:#F1D84A">'+formatWhole(player.FoodA.corn)+'</h2> Corns'
	}],"blank",["row", [["clickable", "21"],["clickable", "22"],["clickable", "23"],["clickable", "24"]]], "blank",["display-text", function(){
		return 'You have <h2 style="color:#FFA000">'+formatWhole(player.FoodA.carrot)+'</h2> Carrots, <h2 style="color:#A6D71C">'+formatWhole(player.FoodA.onion)+'</h2> Onions, <h2 style="color:#CBE57E">'+formatWhole(player.FoodA.cabbage)+'</h2> Cabbages, <h2 style="color:#987458">'+formatWhole(player.FoodA.potato)+'</h2> Potatos'
	}],"blank",["row", [["clickable", "31"],["clickable", "32"],["clickable", "33"]]],"blank",["display-text", function(){
		return 'You have <h2 style="color:#FF0000">'+formatWhole(player.FoodA.apple)+'</h2> Apples, <h2 style="color:#FFFF00">'+formatWhole(player.FoodA.banana)+'</h2> Bananas, <h2 style="color:#8000FF">'+formatWhole(player.FoodA.grapes)+'</h2> Bunches of Grapes'
	}]]
})

addLayer("FoodB", {
    name: "", 
	symbol: "<img src='js/Meat.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 4,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		pig: new Decimal(0),
		cow: new Decimal(0),
		mlk: new Decimal(0),
		chk: new Decimal(0),
		egg: new Decimal(0),
		shp: new Decimal(0),
		wol: new Decimal(0),
		fsh: new Decimal(0),
    }},
	requires: new Decimal(20),
	resource: "Meat",
    baseResource: "Knowledge", 
    baseAmount() {return player.points},
    type: "static", 
    exponent: 0.5,
	gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    color() {
		return "#992A2A"
	},
	row: "1",
	branches: ['w'],
	layerShown(){
		if (getBuyableAmount('s', 12)>0) return true
	},
	canReset(){
		if (player.s.stor.gte(player.s.storMax)) return false
		return true
	},
	effect(){
		return {
			milk: player.FoodB.cow.times(getBuyableAmount('s', 12)).div(20000).times(20),
			eggs: player.FoodB.chk.times(getBuyableAmount('s', 12)).div(40000).times(20),
			wool: player.FoodB.shp.times(getBuyableAmount('s', 12)).times(20),
		}
	},
	update(diff){
		player.FoodB.mlk = player.FoodB.mlk.add(tmp.FoodB.effect.milk.times(diff))
		player.FoodB.egg = player.FoodB.egg.add(tmp.FoodB.effect.eggs.times(diff))
		player.FoodB.wol = player.FoodB.wol.add(tmp.FoodB.effect.wool.times(diff))
	},
	clickables:{
		11:{
			title: "Hunt the Pig",
			canClick(){
				if(player.FoodB.points.gte(1)) return true
			},
			onClick(){
				player.FoodB.points = player.FoodB.points.sub(1)
				player.FoodB.pig = player.FoodB.pig.add(1)
			},
		},
		12:{
			title: "Hunt the Cow",
			canClick(){
				if(player.FoodB.points.gte(1)) return true
			},
			onClick(){
				player.FoodB.points = player.FoodB.points.sub(1)
				player.FoodB.cow = player.FoodB.cow.add(1)
			},
		},
		13:{
			title: "Hunt the Chicken",
			canClick(){
				if(player.FoodB.points.gte(1)) return true
			},
			onClick(){
				player.FoodB.points = player.FoodB.points.sub(1)
				player.FoodB.chk = player.FoodB.chk.add(1)
			},
		},
		14:{
			title: "Hunt the Sheep",
			canClick(){
				if(player.FoodB.points.gte(1)) return true
			},
			onClick(){
				player.FoodB.points = player.FoodB.points.sub(1)
				player.FoodB.shp = player.FoodB.shp.add(1)
			},
		},
		15:{
			title: "Catch the Fish",
			canClick(){
				if(player.FoodB.points.gte(1)) return true
			},
			onClick(){
				player.FoodB.points = player.FoodB.points.sub(1)
				player.FoodB.fsh = player.FoodB.fsh.add(1)
			},
			unlocked(){
				if (hasUpgrade('s', 25)) return true
			},
		},
	},
	tabFormat:
	["main-display", "resource-display", "prestige-button", "blank",["display-text", function(){
		return "<h3>Available space: "+formatWhole(player.s.stor)+"/"+formatWhole(player.s.storMax)+"</h3>"
	}],"blank", "clickables", "blank",["display-text", function(){
		return 'You have <h2 style="color:#E86C6C">'+formatWhole(player.FoodB.pig)+'</h2> of Pork'
	}],"blank",["display-text", function(){
		return 'You have <h2 style="color:#992A2A">'+formatWhole(player.FoodB.cow)+'</h2> of Beef, which made you <h3 style="color:#DDDDDD">'+format(player.FoodB.mlk)+'</h3>L of Milk   <h3>('+format(tmp.FoodB.effect.milk)+'L/sec)</h3>'
	}],"blank",["display-text", function(){
		return 'You have <h2 style="color:#ffbebe">'+formatWhole(player.FoodB.chk)+'</h2> of Poultry, which made you <h3 style="color:#D8C896">'+format(player.FoodB.egg)+'</h3> Eggs   <h3>('+format(tmp.FoodB.effect.eggs)+'/sec)</h3>'
	}],"blank",["display-text", function(){
		return 'You have <h2 style="color:#CA2D25">'+formatWhole(player.FoodB.shp)+'</h2> of Mutton, which made you <h3 style="color:#ffffff">'+format(player.FoodB.wol)+'</h3> Wool   <h3>('+format(tmp.FoodB.effect.wool)+'/sec)</h3>'
	}],"blank",["display-text", function(){ if (hasUpgrade('s', 25))
		return 'You have <h2 style="color:#67988C">'+formatWhole(player.FoodB.fsh)+'</h2> of Seafood'
	}]]
})

addLayer("st", {
    name: "", 
	symbol: "<img src='js/Stone.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	requires: new Decimal(5),
	resource: "Stone",
    baseResource: "Pickaxe Power", 
    baseAmount() {return player.s.PickPow},
    type: "normal", 
    exponent: 0.5,
	gainMult() {
        let mult = new Decimal(0)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    color() {
		return "#606A7A"
	},
	row: "2",
	branches: ['w'],
	layerShown(){
		if (getBuyableAmount('s', 22)>0) return true
	},
})