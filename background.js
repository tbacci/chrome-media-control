console.log(`Deezer Control loaded`);
let deezerTab = null;

//Check all tabs to find deezer on startup
chrome.tabs.query({}, (tabs) => {
    for(tab of tabs) {
        if (tab.url.match(/https:\/\/(www\.)?deezer\.com.*/)) {
            deezerTab = tab.id
            console.log('Deezer detected');
        }
    }
})

// For each tab update
chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        // If tab goes on deezer, let's save it
        if(tab.url.match(/https:\/\/(www\.)?deezer\.com.*/)) {
            deezerTab = tabId
            console.log('Deezer detected');
        }
})

chrome.commands.onCommand.addListener((command) => {
    console.log('Deezer control - ' + command)

    switch (command) {
        case 'previous-track':
            chrome.scripting.executeScript({
                target: {tabId: deezerTab},
                func: () => {
                    const btnPrevious ='.player-bottom .player-controls li button'
                    document.querySelector(btnPrevious).click();
                },
                args: ['action'],
            });
        break;
        case 'next-track':
            chrome.scripting.executeScript({
                target: {tabId: deezerTab},
                func: () => {
                    const btnNext = '.player-bottom .player-controls li:nth-child(n+4) button'
                    document.querySelector(btnNext).click();
                },
                args: ['action'],
            });
            break;
        case 'play-pause':
            chrome.scripting.executeScript({
                target: {tabId: deezerTab},
                func: () => {
                    const btnPlay = '.player-bottom .player-controls li:nth-child(n+2) button'
                    document.querySelector(btnPlay).click();
                },
                args: ['action'],
            });
            break;
    }
});