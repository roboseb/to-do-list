export {romance, Items}
import { TaskHandler } from "./task";

//Object representing the romance panel with its functions.
const romance = (() => {
    const shopButton = document.getElementById('shopbtn');
    const shopGrid = document.getElementById('shopgrid');
    const shop = document.getElementById('shop');

    const inventoryButton = document.getElementById('inventorybtn');
    const inventoryGrid = document.getElementById('inventorygrid');
    const inventory = document.getElementById('inventory');

    let shopOpen = true;
    let inventoryOpen = true;

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

    const descBox = document.querySelector('.descbox');
    const descBoxImg = descBox.querySelector('img');
    const descText = document.getElementById('desctext');

    let items = Array.from(document.querySelectorAll('.item'));

    //Show item detail on hover.
    items.forEach(item => {
        const icon = item.querySelector('img');
        
        if (icon !== null) {
            console.log(icon.src);
             
            item.addEventListener('mouseover', () => {
                //descBoxImg.src = icon.src;
                descBox.style.filter = 'opacity(1)';
            
                descText.innerText = icon.alt;
            });

            item.addEventListener('mouseleave', () => {
                //descBoxImg.src = "";
                descBox.style.filter = 'opacity(0)';
                
                descText.innerText = '';
            });
        } 
    });
})();

//Object for handling items.
const Items = (() => {
    const owned = [];
    
    const shopGrid = document.getElementById('shopgrid');
    const inventoryGrid = document.getElementById('inventorygrid');



    const display = (item, location) => {

    }
})();