const injectedJavascript = `
    let currentTextElementsInSection = [];
    
    function log(data){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'log', result: data }));
    }

    function error(data){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', result: data }));
    }
    
    function getTextNodes(element) {
        const nodes = [];
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length >= 1) {
                nodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                nodes.push(...getTextNodes(node));
            }
        }
        return nodes;
    }
    
    async function findIndexOfCurrentTextElement() {
        let index = -1;
        const range = makeRangeCfi(rendition.currentLocation().start.cfi, rendition.currentLocation().end.cfi);
        await book.getRange(range).then(r => {
            const content = r.toString()
                .replace(/\\n+/g, "\\n")
                .split("\\n")
                .filter(element => element.trim().length > 1)
                .map(element => element.replace(/\\s+/g, ""));
                
            const elementsInSectionArray = currentTextElementsInSection.map(element => element.textContent.replace(/\\s+/g, ""));
            const elementsInSectionString = elementsInSectionArray.join("");
            const searchIndex = elementsInSectionString.indexOf(content[0])
            
            if (searchIndex !== -1) {
                let currentIndex = 0;
                for (let i = 0; i < elementsInSectionArray.length; i++) {
                    currentIndex += elementsInSectionArray[i].length;
                    if (currentIndex > searchIndex) {
                        index = i;
                        return;
                    }
                }
            }
            // If we cannot find text element, just start from first one
            index = 0;
        });
        return index;
    }
    
    function getElementsInSection() {
        const elements = [];
        rendition.getContents().forEach(function(contents) {
            elements.push(...getTextNodes(contents.document.body));
        });
        return elements;
    }
    
    function replaceTextElementByIndex(content, index) {
        currentTextElementsInSection[index].textContent = content;
    }

    function sectionChanged() {
        let currentSectionHref = null;
        
        rendition.on("relocated", (location) => {
            const newSectionHref = location.start.href;
            
            if (currentSectionHref !== newSectionHref) {
                currentSectionHref = newSectionHref;
                currentTextElementsInSection = getElementsInSection();
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: "getElementsInSection", result: {href: currentSectionHref, textElements: currentTextElementsInSection.map(element => element.textContent)} }));
            }
        })
    }
    
    async function updateSections(sections) {
        const sectionsHrefs = sections.reduce((result, section) => {
            result.push(section.href);
            for (let childSection of section.subitems) {
                result.push(childSection.href);
            }
            return result;
        }, [])

        let sectionsPercentages = [];
        let totalPages = 0;

        for (let href of sectionsHrefs) {
            try {
                let formatedHref = href[0] === "/" ? href.slice(1, href.length) : href;
                await rendition.display(formatedHref);
                const currentLocation = rendition.currentLocation();
                totalPages += currentLocation?.start.displayed.total;
                sectionsPercentages.push(currentLocation?.start?.percentage);
            } catch (e) {
                error("Couldn't fetch sectionsPercentages: " + e);
            }
        }
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "updateSections", result: {sectionsPercentages, totalPages, isLoading: false} }));
    }
    
    function loadWebFont(){
        let script = document.createElement('script');
        script.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
        document.head.appendChild(script);
        sectionChanged();
    }
    loadWebFont();
`

export default injectedJavascript;