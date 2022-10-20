import fs from "fs";

const readMenu = (path) => {
    const file = fs.readFileSync(path, "utf-8");
    const items = file.split("\n");
    const ListOfDicts=[];
    for (let i=1; i<items.length; i++) {
        let dict=[];
        let splitLine=items[i].split(",");
        dict["id"]=splitLine[0];
        dict["item"]=splitLine[1];
        if (splitLine[1]===undefined) continue;
        dict["cost"]=parseFloat(splitLine[2]);
        dict["category"]=splitLine[3];
        dict["allergens"]=splitLine[4];
        ListOfDicts.push(dict);
    }
    return ListOfDicts
}

const IncreasingPrice = (Menu) => {
    let List=Menu;
    let List2=[];
    const Entries=Menu.length;
    List.sort((a,b) => a.cost - b.cost);
    for (let i=0; i<Entries; i++) {
        let temp=[];
        let Temp=List[i];
        temp.push(Temp.item);
        temp.push(Temp.cost);
        List2.push(temp);
    }
    return List2
}

const AlphabeticalItems = (Menu) => {
    let List=[];
    for (let i=0; i<Menu.length; i++) {
        let temp=Menu[i];
        List.push(temp.item);
    }
    List.sort();
    return List
}

const ExpensiveDrink = (Menu) => {
    let MaxPrice=0;
    let CostlyDrink=[];
    for (let i=0; i<Menu.length; i++) {
        if (Menu[i].category==='drink') {
            if (Menu[i].cost>MaxPrice) {
                MaxPrice=Menu[i].cost;
                CostlyDrink=[Menu[i].item];
            }
            else if (Menu[i].cost===MaxPrice) {
                CostlyDrink.push(Menu[i].item);
            }
        }
    }
    return [CostlyDrink,MaxPrice]
}

const CheapestInCategory = (List) => {
    let MinPrice=1000000;
    let cheap_item=[];
    for (let i=0; i<List.length; i++) {
        let temp=List[i];
        if (temp[1]<MinPrice) {
            MinPrice=temp[1];
            cheap_item=[temp[0]];
        }
        else if (temp[1]===MinPrice) {
            cheap_item.push(temp[0]);
        }
    }
    return [cheap_item,MinPrice];
}

const CategorySort = (Menu) => {
    let Mains=[];
    let Sides=[];
    let Desserts =[];
    let Drinks=[];
    for (let i=0; i<Menu.length; i++) {
        let temp=[];
        temp.push(Menu[i].item);
        temp.push(Menu[i].cost);
        if (Menu[i].category==='main') {
            Mains.push(temp);
        }
        else if (Menu[i].category==='side') {
            Sides.push(temp);
        }
        else if (Menu[i].category==='dessert') {
            Desserts.push(temp);
        }
        else if (Menu[i].category==='drink') {
            Drinks.push(temp);
        }
    }
    return [Mains,Sides,Desserts,Drinks]
}

const ValueMeal = (Menu) => {
    const [Mains,Sides,Desserts,Drinks]=CategorySort(Menu);
    const SortedItems=[Mains,Sides,Desserts,Drinks];
    let ValueItems=[];
    let ValuePrice=0;
    for (let i=0; i<4; i++) {
        let [cheap_item,bargain_price]=CheapestInCategory(SortedItems[i]);
        ValueItems.push(cheap_item);
        ValuePrice=ValuePrice+bargain_price;
    }
    return [ValueItems,ValuePrice]
}

const MealCombos = (Menu) => {
    const [Mains,Sides,Desserts,Drinks]=CategorySort(Menu);
//    let possible_meals=[];
    let affordable_meals=[];
    let affordable_prices=[];
    for (let p=0; p<Mains.length; p++) {
        let main=Mains[p];
        for (let q=0; q<Sides.length; q++) {
            let side=Sides[q];
            for (let r=0; r<Desserts.length; r++) {
                let dessert=Desserts[r];
                for (let s=0; s<Drinks.length; s++) {
                    let drink=Drinks[s];
                    let meal=[main[0], side[0], dessert[0], drink[0]];
                    let price=main[1]+side[1]+dessert[1]+drink[1];
                    if (price<=20) {
                        meal.push(price);
                        affordable_meals.push(meal);
                    }
//                    possible_meals.push(meal);
                }
            }
        }
    }
    return [affordable_meals,affordable_meals.length]
}

const Menu=readMenu("menu.csv");
// const prices=IncreasingPrice(Menu);
// const ItemList=AlphabeticalItems(Menu);
// const CostlyDrink=ExpensiveDrink(Menu);
// const CheapFood=ValueMeal(Menu);
const AllCombos=MealCombos(Menu);
console.log(AllCombos)