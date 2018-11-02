let changeColor = document.getElementById('changeColor');
let showTabs = document.getElementById('tabs');
let saveButton = document.getElementById('save');
let currentTabs;

let genA = (tab)=>{
    let a = document.createElement('a');
    let linkText = document.createTextNode(tab.title);
    a.appendChild(linkText);
    a.title = tab.title;
    a.href = tab.url;
    a.onclick = ()=>{
        chrome.tabs.create({active: true, url: tab.url});
    }
    return a;
}

let genOpenTabs = (name, inputList)=>{
    let btn = document.createElement('BUTTON');
    let linkText = document.createTextNode(name);
    btn.appendChild(linkText);
    btn.onclick = ()=>{
        inputList.forEach((input)=>{
            chrome.tabs.create({active: true, url: input.url});
        })
    }
    return btn;
}

let genDelete = (name)=>{
    let btn = document.createElement('BUTTON');
    let linkText = document.createTextNode('D');
    btn.appendChild(linkText);
    btn.onclick = ()=>{
        let elem = document.getElementById(name);
        elem.parentNode.removeChild(elem);
        chrome.storage.sync.remove([name], ()=>{
            console.log(`removed ${name}`);
        });
    };
    return btn;
}

let genUl = (name, inputList) =>{
    let container = document.createElement('div');
    container.id = name;
    let listName = genOpenTabs(name, inputList);
    let deleteButton = genDelete(name);
    let newList = document.createElement('ul');
    inputList.forEach((input)=>{
        let item = document.createElement('li');
        item.appendChild(genA(input));
        newList.appendChild(item);
    });
    container.appendChild(listName);
    container.appendChild(deleteButton);
    container.appendChild(newList);
    document.body.appendChild(container);
}

chrome.storage.sync.get(function(results){
    console.log(results);
    Object.entries(results).forEach(([key, value]) =>{
        // console.log(key, value);
        genUl(key, value);
    });
});


chrome.tabs.query({'highlighted': true}, function(tabs) {
    tabs.forEach((tab)=>{
        let item = document.createElement('li');
        item.textContent = tab.title;
        showTabs.appendChild(item);
    })
    currentTabs = tabs;
});

saveButton.onclick = ()=>{
    let curName = document.getElementById('curName').value;
    genUl(curName, currentTabs);
    chrome.storage.sync.set({[curName]: currentTabs}, function(){
        console.log(currentTabs);
    });
}
