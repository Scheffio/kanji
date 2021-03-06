
window.onload = () => {
    genKanji()
    document.querySelector('.kanji-input').focus()
    randomKanji(kanjiList)
    setKanji()
}


if (localStorage.getItem('kanji-list') == null) {
    localStorage.setItem('kanji-list', JSON.stringify([{
            "knj": "飲",
            "main": "no",
            "reading2": "nomu",
            "reading3": "nomu",
            "trns": "пить"
        },
        {
            "knj": "行",
            "main": "i",
            "reading2": "kou",
            "reading3": "gyou",
            "trns": "идти"
        },
        {
            "knj": "彼",
            "main": "kare",
            "reading2": "kono",
            "reading3": "kare",
            "trns": "он | она"
        },
        {
            "knj": "代",
            "main": "dai",
            "reading2": "ka",
            "reading3": "ka",
            "trns": "возраст"
        },
        {
            "knj": "留",
            "main": "ryuu",
            "reading2": "re",
            "reading3": "to",
            "trns": "останавливаться"
        }
    ]))
}

const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []
const block = document.querySelector('.kanji-block')
const kanjiTitle = block.querySelector('.kanji')
const kanjiTranslate = block.querySelector('.translate')

let rand = 0

function randomKanji(mas) {
    rand = Math.floor(Math.random() * mas.length)
    block.dataset.kanji = rand
}

function getKanjiByIndex(index) {
    return kanjiList[index]
}

function setKanji() {
    const kanji = getKanjiByIndex(block.dataset.kanji)
    kanjiTitle.innerHTML = kanji['knj']
    kanjiTranslate.innerHTML = kanji['trns']
}

function genKanji() {
    if (kanjiList.length == 0) return;


    document.querySelector('.kanji-input').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let inpt = document.querySelector('.kanji-input').value.toLowerCase()
            if (inpt == kanjiList[rand]['main'] || inpt == kanjiList[rand]['reading2'] || inpt == kanjiList[rand]['reading3']) {
                kanji.classList.add('true')
                kanji.classList.remove('false')
                setTimeout(() => {
                    kanji.classList.remove('true')
                    document.querySelector('.kanji-input').value = ''
                    genKanji()
                }, 500)
            } else {
                kanji.classList.add('false')
                kanji.classList.remove('true')
                setTimeout(() => {
                    kanji.classList.remove('false')
                    document.querySelector('.kanji-input').value = ''
                }, 500)
            }
        }
    })
}

document.querySelector('.readings').addEventListener('click', function () {
    this.classList.toggle('clicked');

    if (this.classList.contains('clicked')) {
        this.innerHTML = `${kanjiList[rand]['main']} | ${kanjiList[rand]['reading2']} | ${kanjiList[rand]['reading3']}`
    } else {
        this.innerHTML = 'Чтения'
    }

})