export {romance, Items}
import { TaskHandler } from "./task";

//Factory function for creating item objects.
let Item = (name, value, icon, image, location) => {
    return {name, value, icon, image, location}
}

//Object for handling items.
const Items = (() => {
    const shopGrid = document.getElementById('shopgrid');
    const inventoryGrid = document.getElementById('inventorygrid');

    let itemList = [];

    const descBox = document.createElement('div');
    descBox.classList.add('descbox');
    document.body.appendChild(descBox);

    //Create all items to add to shop and inventory.
    const frog = Item('Crapeau Chapeau', 60, require('/src/images/frog_icon.png'), require('/src/images/hat_frog.png'), 'shop');
    const tiara = Item('Ornate Tiara', 30, require('../src/images/tiara_icon.png'), require('../src/images/hat_tiara.png'), 'shop');
    const bow = Item('Beryl Bow', 25, require('../src/images/bow_icon.png'), require('../src/images/hat_bow.png'), 'shop');
    const aviators = Item('Luxury Aviators', 20, require('../src/images/aviators_icon.png'), require('../src/images/hat_aviators.png'), 'shop');
    const retro = Item('Retro Shades', 20, require('../src/images/retro_icon.png'), require('../src/images/hat_retro.png'), 'shop');
    const reflect = Item('Reflective Bifocals', 40, require('../src/images/reflect_icon.png'), require('../src/images/hat_reflect.png'), 'shop');
    const blonde = Item('Pixie Cut', 60, require('../src/images/blonde_icon.png'), require('../src/images/hat_blonde.png'), 'shop');
    const eye = Item('Eye of Behelit', 100, require('../src/images/eye_icon.png'), require('../src/images/hat_eye.png'), 'shop');
    const cap = Item('Froggy Cap', 50, require('../src/images/cap_icon.png'), require('../src/images/hat_cap.png'), 'shop');
    const witch = Item('Wiccan Hat', 120, require('../src/images/witch_icon.png'), require('../src/images/hat_witch.png'), 'shop');

 

    //Set item location if there is local storage for it.
    if (localStorage['hat_Crapeau Chapeau']) {

        //Add back hat data from local storage.
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('hat_')) {
                const localItem = JSON.parse(localStorage[key]);
                itemList.push(localItem); 
            }
        }); 
    } else {

        //Add all hats to itemList and local storage.
        itemList.push(frog, tiara, bow, aviators, retro, reflect,
                        blonde, eye, cap, witch);
        itemList.forEach(item => {
            localStorage[`hat_${item.name}`] = JSON.stringify(item);
        });
    }

    //Add effects around Loretta when switching gear.
    const hatEffect = (emoji) => {
        const loretta = document.getElementById('loretta');
        console.log('effect added');

        //Create a heart effect.  
        const effect = document.createElement('div');
        effect.classList.add('hateffect');
        effect.innerText = emoji;


        loretta.appendChild(effect);


        //Remove effect after animation.
        setTimeout(() => {
            effect.remove();
        }, 800);
    }

    //Display an item with its icon, name, value, and location.
    const display = (item) => {
        const newItem = document.createElement('div');
        const itemImage =  document.createElement('img');
        itemImage.src = item.icon;
        itemImage.alt = item.name;
        itemImage.value = item.value;

        const inventoryGrid = document.getElementById('inventorygrid');
        
        newItem.appendChild(itemImage);

        //Add item to shop if it is a shop item.
        if (item.location === 'shop') {
            newItem.className = 'item shopitem';
            shopGrid.appendChild(newItem);
        } else {
            newItem.className = 'item inventoryitem';
            inventoryGrid.appendChild(newItem);
        }

        //Buy item if in the shop, otherwise equip it.
        newItem.addEventListener('click', () => {
            //Move item to inventory if can afford and in shop.
            if (TaskHandler.getPoints() >= item.value && item.location === 'shop') {
                item.location = 'inventory';
                newItem.className = 'item inventoryitem';

                //Deduct points based on item value;
                TaskHandler.updatePoints(item.value * -1);
                newItem.remove();
                
                //Hide and reset the description box.
                descBox.style.filter = 'opacity(0)';

                //Move item to shop panel
                inventoryGrid.appendChild(newItem);

                //Update local storage for item location.
                localStorage[`hat_${item.name}`] = JSON.stringify(item);

            //Show an error if can't afford an item.
            } else if (TaskHandler.getPoints() < item.value && item.location === 'shop') {
                const errorBox = document.getElementById('errorbox');
                
                errorBox.style.display = 'block';
                setTimeout(() => {
                    errorBox.style.display = 'none';
                }, 2000);

            //Equip or unequip owned items.
            } else if (item.location === 'inventory') {
                const hatImage = document.getElementById('lorettahat');

                if (hatImage.src.endsWith(item.image)) {
                    hatImage.src = '';
                } else {
                    hatImage.src = item.image;
                    updateLoretta(item);
                }
            }
        });

        //Update Loretta's face based on equipped item.
        const updateLoretta = (item) => {
            //Initialize arrays for Loretta's preferences.
            const upsetItems = [aviators.name, retro.name, reflect.name];
            const happyItems = [witch.name, tiara.name, bow.name];
            const shyItems = [frog.name, cap.name, blonde.name];

            const loretta = document.getElementById('lorettamain');

            //Change Loretta's expression based on equipped item.
            if (upsetItems.includes(item.name)) {
                loretta.src = require('../src/images/lorettaupset.png');
                hatEffect('💢');
            } else if (happyItems.includes(item.name)) {
                loretta.src = require('../src/images/lorettahappy.png');
                hatEffect('😊');
            } else if (shyItems.includes(item.name)) {
                loretta.src = require('../src/images/lorettashy.png');
                hatEffect('❤️');
            } else {
                loretta.src = require('../src/images/lorettascary.png');
                hatEffect('☠️');
            }
        }

    }

    //Display all items.
    itemList.forEach(item => {
        display(item);
    });

})();

//Object representing the romance panel with its functions.
const romance = (() => {
    const shopButton = document.getElementById('shopbtn');
    const shopGrid = document.getElementById('shopgrid');

    const inventoryButton = document.getElementById('inventorybtn');
    const inventoryGrid = document.getElementById('inventorygrid');

    const descBox = document.querySelector('.descbox');

    let shopOpen = true;
    let inventoryOpen = true;

    //Create button for expanding shop panel.
    shopButton.addEventListener('click', () => {
        if (shopOpen) {
            shopGrid.style.display = 'none';
            shopOpen = false;   
            shopButton.classList.remove('openitems');
        } else {
            shopGrid.style.display = 'grid';
            shopOpen = true;
            shopButton.classList.add('openitems');
        }
    });

    //Create button for expanding inventory panel.
    inventoryButton.addEventListener('click', () => {
        if (inventoryOpen) {
            inventoryGrid.style.display = 'none';
            inventoryOpen = false;   
            inventoryButton.classList.remove('openitems');
        } else {
            inventoryGrid.style.display = 'grid';
            inventoryOpen = true;
            inventoryButton.classList.add('openitems');
        }
    });



    let items = Array.from(document.querySelectorAll('.item'));

    //Show item detail on hover.
    items.forEach(item => {
        const icon = item.querySelector('img');
        
        if (icon !== null) {
             
            item.addEventListener('mouseover', () => {

                item.appendChild(descBox);
                descBox.style.filter = 'opacity(1)';
                descBox.innerText = `${icon.alt}\n${icon.value} ₪`;
            });

            item.addEventListener('mouseleave', () => {
                descBox.style.filter = 'opacity(0)';
            });

            
        } 
    });
})();

