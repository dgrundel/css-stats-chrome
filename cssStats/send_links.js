var sheets = [];

if (document.styleSheets && document.styleSheets.length) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        console.log(sheet);
        var count = 0;
        if (sheet && sheet.cssRules) {
            for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
                if( !sheet.cssRules[j].selectorText ) {
                    continue;
                }
                count += sheet.cssRules[j].selectorText.split(',').length;
            }

            sheets.push({
                href: (sheet.href ? sheet.href : 'inline <style> tag'),
                rules: sheet.cssRules.length,
                selectors: count
            });
        }
    }
}

if(sheets.length) chrome.extension.sendRequest(sheets);
