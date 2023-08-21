const promptDisplay = document.querySelector('#prompt')
const optionsDisplay = document.querySelector('#options')
const resultDisplay = document.querySelector('#result')


const noteVals = [
    {
        name: "C",
        val: 0
    },
    {
        name: "D",
        val: 2
    },
    {
        name: "E",
        val: 4
    },
    {
        name: "F",
        val: 5
    },
    {
        name: "G",
        val: 7
    },
    {
        name: "A",
        val: 9
    },
    {
        name: "B",
        val: 11
    }
]

const accidentals = [
    {
        name: "♭♭",
        val: -2
    },
    {
        name: "♭",
        val: -1
    },
    {
        name: "♮",
        val: 0
    },
    {
        name: "♯",
        val: 1
    },
    {
        name: "𝄪",
        val: 2
    }
]

const normalQuals = [
    {
        name: "diminished",
        diff: -2
    },
    {
        name: "minor",
        diff: -1
    },
    {
        name: "Major",
        diff: 0
    },
    {
        name: "Augmented",
        diff: 1
    }
]

const perfQuals = [
    {
        name: "diminished",
        diff: -1
    },
    {
        name: "Perfect",
        diff: 0
    },
    {
        name: "Augmented",
        diff: 1
    }
]

const majorIntHalfSteps = [0, 2, 4, 5, 7, 9, 11]


notes = []
accs = []

const updatePrompt = (stage) => {
    prompt = document.createElement('h2')
    text = ""
    if(stage == 0)
        text = "Bottom Note?"
    if (stage == 2) 
        text = "Top Note?"
    if (stage == 4)
        text = "Interval : "

    prompt.textContent = text
    promptDisplay.append(prompt)
}

const populateOptions = (stage, list) => {
    if(stage >= 4){
        populateResult()
        return
    }

    const opts = document.createElement('div')

    opts.classList.add('opt-list')

    for(let i = 0; i < list.length; i++) {
        const optBlock = document.createElement('div')
        optBlock.ind = i
        optBlock.classList.add('opt-block')
        optBlock.textContent = list[i].name
        optBlock.addEventListener('click', () => optClick(optBlock, stage))
        opts.append(optBlock)
    }

    optionsDisplay.append(opts)
}

const populateResult = () => {
    size = notes[1] - notes[0]
    if(size < 0) 
        size += 7
    quality = "Badly written interval"
    halfSteps = noteVals[notes[1]].val - noteVals[notes[0]].val
                + accidentals[accs[1]].val - accidentals[accs[0]].val
    if(size != 0 && halfSteps < 0) 
        halfSteps += 12
    if(size == 6 && halfSteps == 0)
        halfSteps += 12

    diff = halfSteps - majorIntHalfSteps[size] 
    console.log(diff)
    list = []
    if(size == 0 || size == 3 || size == 4) 
        list = perfQuals
    else 
        list = normalQuals


    sizeText = ""
    list.forEach(q => {
        if(q.diff == diff) {
            quality = q.name
            if(size == 0)
                sizeText = "Unison/Octave"
            else if(size == 1) 
                sizeText = (size + 1) + "nd"
            else if(size == 2)
                sizeText = (size + 1) + "rd"
            else
                sizeText = (size + 1) + "th"
        }
            
    });

    
    

    res = document.createElement('h1')
    res.textContent = quality + " " + sizeText
    resultDisplay.append(res)
    
}

const optClick = (opt, stage) => {
    optionsDisplay.innerHTML = "";
    promptDisplay.append(opt)
    if(stage % 2 == 0) {
        notes.push(opt.ind)
        populateOptions(stage + 1, accidentals)
    }
    if(stage % 2 == 1) {
        accs.push(opt.ind)
        run(stage + 1)
    }
}

const run = (stage) => {
    updatePrompt(stage)
    populateOptions(stage, noteVals)
}

run(0)
