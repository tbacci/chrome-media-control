console.log(`Media Control loaded`);

let targetTab = null;

//Check all tabs to find deezer on startup
chrome.tabs.query({}, (tabs) => {
    for(tab of tabs) {
        if (tab.url.match(/https:\/\/(www\.)?deezer\.com.*/)) {
            targetTab = tab.id
            console.log('Deezer detected');
        } else if (tab.url.match(/https:\/\/(www\.)?youtube\.com.*/)) {
            targetTab = tab.id
            console.log('Youtube detected');
        }
    }
})

// For each tab update
chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        // If tab goes on deezer, let's save it
        if(tab.url.match(/https:\/\/(www\.)?deezer\.com.*/)) {
            targetTab = tabId
            console.log('Deezer detected');
        } else if (tab.url.match(/https:\/\/(www\.)?youtube\.com.*/)) {
            targetTab = tab.id
            console.log('Youtube detected');
        }
})

chrome.commands.onCommand.addListener((command) => {
    console.log('Media control - ' + command)

    switch (command) {
        case 'previous-track':
            chrome.scripting.executeScript({
                target: {tabId: targetTab},
                func: () => {
                    const selectors = [
                        '#page_player button[data-testid="previous_track_button"]', // deezer
                        '.ytp-prev-button' // youtube
                    ]
                    for(selector of selectors) {
                        const element = document.querySelector(selector)
                        element?.click();
                    }
                },
                args: ['action'],
            });
        break;
        case 'next-track':
            chrome.scripting.executeScript({
                target: {tabId: targetTab},
                func: () => {
                    const selectors = [
                        '#page_player button[data-testid="next_track_button"]', // deezer
                        '.ytp-next-button' // youtube
                    ]
                    for(selector of selectors) {
                        const element = document.querySelector(selector)
                        element?.click();
                    }
                },
                args: ['action'],
            });
            break;
        case 'play-pause':
            chrome.scripting.executeScript({
                target: {tabId: targetTab},
                func: () => {
                    const selectors = [
                        '#page_player button[data-testid="play_button_pause"], #page_player button[data-testid="play_button_play"]', // deezer
                        '.ytp-play-button' // youtube
                    ]
                    for(selector of selectors) {
                        const element = document.querySelector(selector)
                        element?.click();
                    }
                },
                args: ['action'],
            });
            break;
    }
});
