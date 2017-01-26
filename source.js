let tags = [];
$(document).ready( () => {
    let tempSet;
    let tags = [];
    let headline = [];
    let answerLinks = [];
    let sideLinks = [];

    const stopWords = ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're"," weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've", "way", "out", "code", "work", "working", "try", "trying", "tried"];

    function parseTags () {
        let arr = [];
        $('body').find('.post-tag').each(function(el) {
            arr.push($(this).text());
        });
        tempSet = new Set(arr);
        return Array.from(tempSet);
    }
    function parseHeadline () {
        let arr = [];
        let stopHash = {};
        let str = $('body').find('#question-header').find('a').text();
        str = str.replace(/\W+/g, ' ');
        let strArr = str.split(' ');
        let tempSet = new Set(strArr);
        strArr = Array.from(tempSet);

        for (let i = 0; i < stopWords.length; i += 1) {
            stopHash[ stopWords[i].trim() ] = true;
        }
        
        for (let i = 0; i < strArr.length; i += 1) {
            let word = strArr[i].trim().toLowerCase();
            if (!stopHash[word] && word.length > 0) {
                arr.push(word);
            }
        }

        return arr;
    }
    function parseAnswerLinks () {
        let arr = [];
        $('body').find('.accepted-answer').find('.post-text').find('a').each(function(el) {
            arr.push($(this).attr('href'));
        });
        tempSet = new Set(arr);
        return Array.from(tempSet);
    }
    function parseSideLinks () {
        let arr = [];
        $('body').find('.sidebar-linked').find('a').each(function(el) {
            arr.push($(this).attr('href'));
        });
        tempSet = new Set(arr);
        return Array.from(tempSet);
    }


    tags = parseTags();
    headline = parseHeadline();
    answerLinks = parseAnswerLinks();
    sideLinks = parseSideLinks();

    const map = {
    'javascript': ['https://developer.mozilla.org/en-US/docs/Learn/JavaScript', 'mdn+js'],
    'java': ['https://docs.oracle.com/javase/8/', 'oracle java'],
    'php': ['http://php.net/manual/en/', 'php manual'],
    'android': ['https://developer.android.com/guide/index.html', 'android developer'],
    'node.js': ['https://nodejs.org/api/', 'nodejs'],
    'ajax': ['https://developer.mozilla.org/en-US/docs/AJAX', 'mdn+ajax'],
    'css': ['https://developer.mozilla.org/en-US/docs/Web/CSS', 'mdn+css'],
    'jquery': ['http://api.jquery.com/', 'jquery'],
    'ios': ['https://developer.apple.com/ios/resources/', 'apple ios'],
    'html': ['https://developer.mozilla.org/en-US/docs/Web/HTML', 'mdn html'],
    'angularjs': ['https://docs.angularjs.org/api', 'angularjs docs'],
    'reactjs': ['https://facebook.github.io/react/', 'react github'],
    'mysql': ['https://dev.mysql.com/doc/', 'mysql'],
    'json': ['http://www.json.org/', 'json.org'],
    'python': ['https://www.python.org/', 'python documentation'],
    'ruby-on-rails': ['http://api.rubyonrails.org/', 'api rubyonrails'],
    'express': ['https://expressjs.com/en/api.html', 'expressjs'],
    'twitter-bootstrap': ['http://bootstrapdocs.com/v3.0.3/docs/css/#overview', 'twitter bootstrap']
    }
    //logic for main container
    $('body').append('<div id = "dm-container"></div>');
    $('#dm-container').append('<div class = "dm-header">Expand Source Documentation</div>');
    const subjects = [];
    const mainTags = [];
    //logic for main tag addition
    tags.forEach(tag =>{
        if (map[tag]){
            mainTags.push(tag);
            $('#dm-container').append('<div class = "dm-tag" + id = ' + tag + '><h3><a>' + tag +  '</a></h3></div>')
            let idTagA = '#' + tag + ' a';
            $(idTagA).attr('href', map[tag][0]).attr('target','_blank');
        }
        else subjects.push(tag);
    })
    //logic for subject addition
    for (let i = 0; i < mainTags.length; i++){
        let tagId = '#' + mainTags[i];
        subjects.forEach(subject => {
            console.log(tagId);
            let appendVal = '<div class = "subject" id =' + subject + i  + '>' + '<a>' + subject + ' (' + 'for ' + mainTags[i] + ')' + '</a>' + '</div>'
            console.log(appendVal);
            $(tagId).append(appendVal)
            let idSubject = '#' + subject + i + ' a';
            let url = 'https://google.com/search?q=' + map[mainTags[i]][1] + '+' + subject
            $(idSubject).attr('href', url).attr('target','_blank')
            

    })
    }
    //logic for nice expand and collapse
    $(".dm-header").click(function () {
    $('.dm-tag').slideToggle(500, function () {
        $('.dm-header').text(function () {
            return $('.dm-tag').is(":visible") ? "Collapse Source Documentation" : "Expand Source Documentation";
        });
    });
    });
    console.log('tags: ', tags);
    console.log('headline: ', headline);
    console.log('answer links: ', answerLinks);
    console.log('side links: ', sideLinks);

});