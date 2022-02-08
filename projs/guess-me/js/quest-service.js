
const STORAGE_KEY = 'questsDB'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gCurrQuest = gQuestsTree;
        gPrevQuest = null;
        _saveQuestsToStorage()
    }
    gCurrQuest = gQuestsTree
    gPrevQuest = null
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    gPrevQuest[lastRes] = createQuest(newQuestTxt)
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
    gPrevQuest[lastRes].no = gCurrQuest
    // gCurrQuest[lastRes] = createQuest(newQuestTxt)
    // moveToNextQuest(lastRes)
    // gCurrQuest.yes = createQuest(newGuessTxt)
    _saveQuestsToStorage()
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveQuestsToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree)
}