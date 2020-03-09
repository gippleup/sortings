function cachedPrimeNum () {
    let cache = {};

    function nextPrimeOf(index, curNum, divider) {
        let foundNext = false;
        while (foundNext === false) {
            curNum += 1;
            let intDividerNum = 0;
            for (const ele of divider) {
                let divideResult = curNum / ele;
                if (parseInt(divideResult) === divideResult) {
                    intDividerNum += 1;
                }
            }
            if (intDividerNum <= 1) {
                foundNext = true
                index += 1;
                divider.push(curNum);
                cache[String(index)] = curNum;
            }

        }
        return {
            index: index,
            num: curNum,
            divider: divider
        }
    }

    function primeNumber(n) {
        let divider = [1];
        let index = 0;
        let curNum = 1;
        let maxIndex = cache['maxIndex'];
        
        if(n <= maxIndex) {
            return cache[String(n)]
        } else {
            index = (maxIndex === undefined) ? 0 : maxIndex;
            curNum = (maxIndex === undefined) ? 1 : cache[String(index)];
            while (index < n) {
                let nextPrime = nextPrimeOf(index, curNum, divider);
                index = nextPrime.index;
                curNum = nextPrime.num;
                divider = nextPrime.divider;
            }
            cache['maxIndex'] = index;
            return curNum;
        }

    }

    return (n) => {
        let argsString = String(n);
        if (argsString in cache) {
            console.log("Fetching from cache");
            return cache[argsString];
        } else {
            console.log("Calculating result");
            let result = primeNumber(n);
            cache[argsString] = result;
            return [result, Object.values(cache).slice(0,n)];
        }
    }
}

let primeNum = cachedPrimeNum();
let myPrimeNum = primeNum(100);
let myPrimeArr = myPrimeNum[1];
let randomPrimes = myPrimeArr.shuffle();
