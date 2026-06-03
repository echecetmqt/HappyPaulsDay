const failImages = [
    "assets/fall1.gif",
    "assets/fall2.gif",
    "assets/fall3.gif",
    "assets/fall4.gif"
];

const TARGET = "6.04";

let playerName = "";
let startTime;
let timerInterval;

/* 화면 전환 */

function hideAll() {

    document.querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.add("hidden");
        });

}

function goHome() {

    hideAll();

    document
        .getElementById("homeScreen")
        .classList.remove("hidden");

}

function openNameScreen() {

    hideAll();

    document
        .getElementById("nameScreen")
        .classList.remove("hidden");

}

function openRecordSearch() {

    hideAll();

    document
        .getElementById("recordScreen")
        .classList.remove("hidden");

}

function openRanking() {

    hideAll();

    document
        .getElementById("rankingScreen")
        .classList.remove("hidden");

    showRanking();

}

/* 게임 시작 */

function startGame() {

    playerName =
        document
            .getElementById("nicknameInput")
            .value
            .trim();

    if (!playerName) {

        alert("닉네임을 입력하세요.");

        return;
    }

    hideAll();

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    startTime = performance.now();

    timerInterval = setInterval(() => {

        let elapsed =
            (performance.now() - startTime) / 1000;

        document
            .getElementById("timer")
            .innerText =
            elapsed.toFixed(2);

    }, 10);

}

/* 게임 종료 */

function stopTimer() {

    clearInterval(timerInterval);

    let elapsed =
        (performance.now() - startTime) / 1000;

    let displayTime =
        elapsed.toFixed(2);

    saveRecord(
        playerName,
        displayTime
    );

    showResult(displayTime);

}

/* 결과 */

function showResult(time) {

    hideAll();

    document
        .getElementById("resultScreen")
        .classList.remove("hidden");

    const dollImage =
        document.getElementById("dollImage");

    document
        .getElementById("resultTime")
        .innerText =
        `${time}초`;

    if (time === TARGET) {

        document
            .getElementById("resultTitle")
            .innerHTML = `
        <span class="successText">🎉 성공! 🎉</span><br>
        <span class="subText">
            ㅊㅊ<br>
            당신은 글록을 소지할 자격이 있습니다
        </span>
    `;
        dollImage.src = "assets/doll.png";

        dollImage.style.animation =
            "drop 1s ease, spin 4s linear infinite";

    } else {

        document
            .getElementById("resultTitle")
            .innerHTML =
            "❌ 실패 ㅠ.,ㅜ";

        const randomFail =
            failImages[Math.floor(Math.random() * failImages.length)];

        dollImage.src = randomFail;

        dollImage.style.animation = "none";
    }
}

/* 다시하기 */

function restartGame() {

    hideAll();

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    startTime = performance.now();

    clearInterval(timerInterval);

    document
        .getElementById("timer")
        .innerText = "0.00";

    timerInterval = setInterval(() => {

        let elapsed =
            (performance.now() - startTime) / 1000;

        document
            .getElementById("timer")
            .innerText =
            elapsed.toFixed(2);

    }, 10);

}

/* 기록 저장 */

function saveRecord(name, score) {

    let records =
        JSON.parse(
            localStorage.getItem("records")
            || "[]"
        );

    records.push({
        name: name,
        score: score
    });

    localStorage.setItem(
        "records",
        JSON.stringify(records)
    );

}

/* 개인 기록 */

function searchRecord() {

    let nickname =
        document
            .getElementById("searchName")
            .value
            .trim();

    let records =
        JSON.parse(
            localStorage.getItem("records")
            || "[]"
        );

    let result =
        records.filter(
            r => r.name === nickname
        );

    let html = "";

    if (result.length === 0) {

        html = "기록 없음";

    } else {

        result.forEach((r, i) => {

            html +=
                `${i + 1}. ${r.score}초<br>`;

        });

    }

    document
        .getElementById("recordList")
        .innerHTML = html;

}

/* TOP 10 */

function showRanking() {

    let records =
        JSON.parse(
            localStorage.getItem("records")
            || "[]"
        );

    records.sort((a, b) => {

        let diffA =
            Math.abs(
                Number(a.score) - 6.04
            );

        let diffB =
            Math.abs(
                Number(b.score) - 6.04
            );

        return diffA - diffB;

    });

    let top10 =
        records.slice(0, 10);

    let html = "";

    top10.forEach((r, i) => {

        html +=
            `${i + 1}위 |
             ${r.name}
             (${r.score}초)
             <br>`;

    });

    document
        .getElementById("rankingList")
        .innerHTML = html;

}

/* 첫 화면 */

goHome();