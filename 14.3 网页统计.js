/* PageStats interface */
var PageStats = new Interface('PageStats', ['getPageViews', 
    'getUniques', 'getBrowserShare', 'getTopSearchTerms', 'getMostVisitedPages']);


/* StatsProxy singleton */
var StatsProxy = (function(){
    /*Private attributes*/
    var xhrHandler = XHRManager.createXHRHandler();
    var urls = {
        pageViews: '/stats/getPageViews',
        uniques: '/stats/getUniques',
        browserShare: '/stats/getBrowserShare',
        topSearchTerms: '/stats/getTopSearchTerms',
        mostVisitePages: '/stats/getMostVisitedPages'
    };

    /*private method*/
    function xhrFailure(){
        throw new Error('StatsProxy: asynchronous request for stats failed.');
    }

    function fetchData(url, dataCallback, startDate, endDate, page){
        var callback = {
            success: function(responseText){
                var stats = eval('(' + responseText + ')');
                dataCallback(stats);
            },
            failure: xhrFailure
        };

        var getVars = [];
        if(startDate != undefined){
            getVars.push('startDate=' + encodeURICompoent(startDate));
        }
        if(endDate != undefined){
            getVars.push('endDate=' + encodeURICompoent(endDate));
        }
        if(page != undefined){
            getVars.push('page=' + page);
        }
        if(getVars.length > 0){
            url = url + '?' + getVars.join('&');
        }
        xhrHandler.request('GET', url, callback);
    }

    /* public methods.*/
    return {
        getPageViews: function(callback, startDate, endDate, page){
            fetchData(urls.pageViews, callback, startDate, endDate, page);
        },
        getUniques: function(callback, startDate, endDate, page){
            fetchData(urls.uniques, callback, startDate, endDate, page);
        },
        getBrowserShare: function(callback, startDate, endDate, page){
            fetchData(urls.browserShare, callback, startDate, endDate, page);
        },
        getTopSearchTerms: function(callback, startDate, endDate, page){
            fetchData(urls.topSearchTerms, callback, startDate, endDate, page);
        },
        getMostVisitedPages: function(callback, startDate, endDate, page){
            fetchData(urls.mostVisitePages, callback, startDate, endDate, page);
        }
    };
})();