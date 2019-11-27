/**
 * Near matches for two strings
 * @param {string} str1
 * @param {string} str2
 */
function matchesAlmost(str1, str2) {
    var same = 0;
    var j = 0;
    for (var i = 0; i < str2.length; ++i) {
        if (str1.charAt(j) == str2.charAt(i)) {
            same++;
            j++;
        }
    }
    return same == str2.length - 1 || same == str2.length;
}

function paramParser(param) {
    return param
        .split(' ')
        .join('')
        .trim()
        .toLowerCase();
}

/**
 * Scan comments for matches to specified criteria
 */
function hideSpam() {
    // Get Youtuber's name
    var header = document.getElementById('watch7-user-header');
    var youTuber = header.children[1].children[0].innerHTML;

    // Get comment section element
    var commentSection = document.getElementById(
        'comment-section-renderer-items'
    );

    // Go through each comment visible on screen
    for (var i = 1; i < commentSection.children.length; i++) {
        var child = commentSection.children[i];

        if (child.tagName != 'DIV' && child != null) {
            var fake = paramParser(child.children[0].children[2].children[0].children[0].innerHTML);
            var comment = paramParser(child.children[0].children[2].children[1].children[0].innerHTML);
            var real = paramParser(youTuber);

            // Comment is spam if using similar name to youtuber or contains the phrases below
            if (
                matchesAlmost(fake.substr(0, fake.indexOf('official')), real) ||
                fake.indexOf('iveaway') != -1 ||
                comment.indexOf('somethingspecialforyou') != -1 ||
                comment.indexOf('clickonmypic') != -1 ||
                comment.indexOf('clickonmyprofilepic') != -1
            ) {
                if (child && child.style.display != 'none')
                    child.style.display = 'none';
            }
        }
    }
}

hideSpam();
