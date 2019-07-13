/*
    Open Source
    Title: YouTube Spam Hider
    Created By: Sharon Umute
    Email: driftapps@gmail.com
    Distributed under name: 101
    Special note: I have no clue how copyright really works but you're free to use this code however you wish
                Some functions aren't mine and were gotten from answers on stackoverflow.
*/

//Called when extension is clicked
hideSpam()

//Check if two strings match or almost match
//modified from https://stackoverflow.com/questions/12883618/checking-if-a-string-matches-all-characters-but-one-of-another-string
function matchesAlmost(str1, str2) {
    var same = 0;
    var j = 0
    for (var i = 0; i < str2.length; ++i) {
        if (str1.charAt(j) == str2.charAt(i)){
            same++;
            j++;
        }
        	
    }
    return same == str2.length - 1 || same == str2.length;
}

//Method to trim whitespace from string
//Gotten from https://stackoverflow.com/questions/1418050/string-strip-for-javascript
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

//Main function
function hideSpam() {  

    //Get Youtuber's name
    var header = document.getElementById("watch7-user-header");
    var youTuber = header.children[1].children[0].innerHTML;

    //Get comment section element
    var commentSection = document.getElementById("comment-section-renderer-items");

    //Go through each comment visible on screen
    for(var i=1; i<commentSection.children.length; i++) {
        var child = commentSection.children[i];
        
        if(child.tagName != 'DIV' && child != null ){
            var name = child.children[0].children[2].children[0].children[0].innerHTML;
            var comment = child.children[0].children[2].children[1].children[0].innerHTML;
            comment = comment.split(' ').join('').trim().toLowerCase();
            var fake = name.split(' ').join('').trim().toLowerCase();
            var real = youTuber.split(' ').join('').trim().toLowerCase();
    
            //Comment is spam if using similar name to youtuber or contains the phrases below
            if (matchesAlmost(fake.substr(0, fake.indexOf("official")), real) || fake.indexOf("iveaway") != -1 || comment.indexOf("somethingspecialforyou") != -1 || comment.indexOf("clickonmypic") != -1 || comment.indexOf("clickonmyprofilepic") != -1){
                if( child && child.style.display != 'none')
                    child.style.display = 'none';
            }
        }
    }
}
