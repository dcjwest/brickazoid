import { setBallSpeed } from '../components/ball.js';

/* Main Menu Screen Elements */
const mainMenu = document.querySelector('.main-menu');
const mainOptions = mainMenu.querySelector('.main-options');
const startBtn = mainOptions.querySelector('#start-btn');
const howToPlayBtn = mainOptions.querySelector('#howtoplay-btn');
const overviewScreen = mainMenu.querySelector('.overview');
const closeOverviewBtn = overviewScreen.querySelector('.close-modal');
const levelOptions = mainMenu.querySelector('.level-options');
const levelReturnBtn = levelOptions.querySelector('#level-return-btn');

// Hide/show how to play instructions.
const toggleHowToPlay = () => overviewScreen.classList.toggle('hide');

// Hide/show level selector.
function toggleLevelOptions() {
    mainOptions.classList.toggle('hide');
    levelOptions.classList.toggle('hide');

    let levelOptionBtns = [...levelOptions.children].filter(btn =>
        btn.classList.contains('level-btn')
    );

    if (levelOptions.classList.contains('hide')) {
        levelOptionBtns.forEach(btn =>
            btn.removeEventListener('click', setDifficultyLevel)
        );
    } else {
        levelOptionBtns.forEach(btn =>
            btn.addEventListener('click', setDifficultyLevel)
        );
    }
}

// Select game difficulty by ultimately setting ball speed.
function setDifficultyLevel(e) {
    const selectedLevel = e.target.dataset.level;
    let ballSpeed;

    switch (selectedLevel) {
        case 'ninja':
            ballSpeed = 15;
            break;
        case 'hard':
            ballSpeed = 12;
            break;
        default:
            ballSpeed = 7;
            break;
    }
    setBallSpeed(ballSpeed);
    toggleLevelOptions();
    showGameScreen();
}

function showGameScreen() {
    mainMenu.classList.add('hide');
    document.querySelector('.game-screen').classList.add('playmode');
}

startBtn.addEventListener('click', toggleLevelOptions);
levelReturnBtn.addEventListener('click', toggleLevelOptions);
howToPlayBtn.addEventListener('click', toggleHowToPlay);
closeOverviewBtn.addEventListener('click', toggleHowToPlay);
