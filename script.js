let graphs = {
    selectedGraph: ''
}

function visualizeArray(array, graphName, drawTarget) {
    let graphBox = document.createElement('DIV');
    graphBox.className = "graph-box " + graphName;
    graphBox.id = graphName;
    
    array.forEach((ele, index) => {
        let gBar = document.createElement('DIV')
        gBar.className = "graph-bar " + graphName;
        gBar.id = graphName + index;
        gBar.setAttribute('value', ele);
        graphBox.appendChild(gBar);
    })
    
    document.querySelector(drawTarget).appendChild(graphBox);
    convertValueToHeight(graphName);
}


function convertValueToHeight (targetGraphName) {
    let target = document.querySelector('.graph-box' + '.' + targetGraphName)
    let graphBars = target.querySelectorAll('.graph-bar');
    let maxValue = nthLargeInGraph(targetGraphName, 0)
    graphBars.forEach((gBar) => {
        let gBarValue = Number(gBar.getAttribute('value'));
        let relativeHeight = (gBarValue / maxValue) * 100;
        gBar.style.width = (1/graphBars.length)*100 + "%";
        gBar.style.height = relativeHeight + "%";
    })
}


function nthLargeInGraph (targetGraphName, index) {
    let target = document.querySelector('.graph-box' + '.' + targetGraphName)
    let graphBars = target.querySelectorAll('.graph-bar');
    let valueArr = [];
    graphBars.forEach((gBar) => {
        let gBarValue = Number(gBar.getAttribute('value'));
        valueArr.push(gBarValue);
    })
    valueArr.sort(function(a,b) {return b-a})
    return valueArr[index];
}


function sortGraphBar (targetGraphName) {
    let target;
    if (typeof targetGraphName !== 'string') {
        target = document.querySelector('#' + graphs.selectedGraph);
    } else {
        target = document.querySelector('.graph-box' + '.' + targetGraphName);
    }
    let graphBars = target.querySelectorAll('.graph-bar');
    let graphBarsArr = Array.from(graphBars);
    graphBarsArr.sort(function (barA, barB) {
        let frontBarValue = Number(barA.getAttribute('value'));
        let laterBarValue = Number(barB.getAttribute('value'));
        // console.log(frontBarValue - laterBarValue);
        return frontBarValue - laterBarValue;
    })
    target.innerHTML = '';
    target.appendChild(graphBarsArr.toNodes());
}

function selectGraph () {
    let graphBoxes = document.querySelectorAll('div.graph-box')
    // console.log(this)
    Array.prototype.forEach.call(graphBoxes, (ele) => {
        ele.className = ele.className.replace(" selected", "");
    })
    this.className += ' selected';
    graphs.selectedGraph = this.id;
}

function randomizeGraph () {
    let target;
    if (typeof targetGraphName !== 'string') {
        target = document.querySelector('#' + graphs.selectedGraph);
    } else {
        target = document.querySelector('.graph-box' + '.' + targetGraphName);
    }
    let graphBars = target.querySelectorAll('.graph-bar');
    let graphBarsArr = Array.from(graphBars);
    graphBarsArr = graphBarsArr.shuffle();
    target.innerHTML = '';
    target.appendChild(graphBarsArr.toNodes());
}

visualizeArray(myPrimeArr, "sortedPrimes", '.prime-sorted')
visualizeArray(randomPrimes, "randomPrimes", '.prime-random')

document.querySelectorAll('div.graph-box').addEventListenerToAll('click', selectGraph);
document.querySelector('button.button-sort').addEventListener('click', sortGraphBar);
document.querySelector('button.button-randomize').addEventListener('click', randomizeGraph);


