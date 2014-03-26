var maxSelectors = 4096;

function showStats(stats) {

    if(!stats.length) {
        window.close();
        return;
    };

    stats.sort(function(x, y){ 
        return y.selectors - x.selectors;
    });

    for(var i = 0; i < stats.length; i++) {
        
        var inline = (stats[i].href.indexOf("<style>") !== -1)
        var appendParent = document.getElementById( inline ? "inlineStyles" : "linkedStyles");

        var h2 = document.createElement("h2");
        h2.title = stats[i].selectors + " selectors, " + stats[i].rules + " rules";

        if(inline) {
            h2.innerText = stats[i].href;
        } else {
            var a = document.createElement("a");
            a.href = stats[i].href;
            h2.innerText = a.pathname;
        }
        appendParent.appendChild(h2);

        var table = document.createElement("table");
        table.className = "stat_table";

        var tbody = document.createElement("tbody");

            // var tr = document.createElement("tr");

            //     var th = document.createElement("th");
            //     th.innerText = "Rules";
            //     tr.appendChild(th);

            //     var td = document.createElement("td");
            //     tr.appendChild(td);

            //     var th = document.createElement("th");
            //     th.innerText = stats[i].rules;
            //     tr.appendChild(th);

            // tbody.appendChild(tr);

            var tr = document.createElement("tr");

                var th = document.createElement("th");
                th.innerText = "Selectors";
                tr.appendChild(th);

                var td = document.createElement("td");
                td.className = "stat_progress_bar";

                    var span = document.createElement("span");

                    percentDisplay = Math.round((parseInt(stats[i].selectors) / maxSelectors) * 100);
                    percentDisplay = Math.min(percentDisplay, 100);

                    if(percentDisplay <= 45) {
                        span.style.backgroundColor = "#78BF58"; //green
                    } else if(percentDisplay <= 65) {
                        span.style.backgroundColor = "#3F93F6"; //blue
                    } else if(percentDisplay <= 85) {
                        span.style.backgroundColor = "#F70"; //orange
                    } else {
                        span.style.backgroundColor = "#C00"; //red
                    }

                    span.style.width = percentDisplay + "%";
                    td.appendChild(span);

                tr.appendChild(td);

                var th = document.createElement("th");
                th.innerText = stats[i].selectors;
                tr.appendChild(th);

            tbody.appendChild(tr);

        table.appendChild(tbody);
        appendParent.appendChild(table);
        appendParent.style.display = "block";

        var notFoundMessage = document.getElementById("notFoundMessage");
        notFoundMessage.style.display = "none";
    }

}


chrome.extension.onRequest.addListener(function(stats) {
    showStats(stats);
});


window.onload = function() {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id},
            function(activeTabs) {
                chrome.tabs.executeScript(
                activeTabs[0].id, {file: 'send_links.js', allFrames: true});
            });
    });
};
