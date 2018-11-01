let changeColor = document.getElementById('changeColor');
let showTabs = document.getElementById('tabs');

chrome.tabs.query({'highlighted': true}, function(tabs) {
    console.log(showTabs);
    tabs.forEach((tab)=>{
        // console.log(tab);
        let item = document.createElement('li');
        item.textContent = tab.title;
        showTabs.appendChild(item);
    })
    // chrome.tabs.update(tabs[0].id, {url: newUrl});
});
//
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
