const debug = false

const regexes = 
[
    "tw ed",
    "tw: ed",
    "ed tw",
    "thinspo",
    "bonespo",
    "deathspo",
    "fatspo",
    "meanspo",
    "sweetspo",
    "sweetpo",
    "ed twt",
    "ed-twt",
    "ed tumblr",
    "ed-tumblr",
    "ed yt",
    "ed-yt",
    "hardedtwt",
    "pro ana",
    "pro-ana",
    "binge",
    "laxative",
    "low restriction",
    "low restricting",
    "high restriction",
    "high restricting",
    "mid restriction",
    "mid restricting",
    "ed vlog",
    "anorexia tips"
]

const regex_letters =
{
    "a": [ "@", "*" ],
    "b": [ "8" ],
    "e": [ "3", "*" ],
    "i": [ "1", "!", "*" ],
    "o": [ "0", "*" ],
    "u": [ "*" ],
    "s": [ "$", "5" ],
    "t": [ "7" ]
}

const regex_letters_keys = Object.keys(regex_letters)

function construct_true_regexes()
{
    var regxs = []
    for(var word of regexes)
    {
        var string = String()
        const len = word.length
        for(var i = 0; i < len; i++)
        {
            const letter = word.charAt(i)
            if(regex_letters_keys.includes(letter))
            {
                const letters = regex_letters[letter]
                const construct = `[${letter+letters.join('')}]`
                string += construct     
            }
            else if(letter == ' ')
            {
                string += '\\s*' // space optional
            }
            else
            {
                string += letter
            }
        }
        const re = new RegExp(string, 'i')
        regxs.push(re)
    }
    return regxs
}

const true_regexes = construct_true_regexes()

function check_words(content)
{
    for(var rgx of true_regexes)
    {
        var matches = content.match(rgx)
        if(matches)
        {
            console.log(matches)
            const index = matches.index
            console.log(`AA Context: ${content.substring(index-10, index+30)} matches`)
            console.log(rgx)
            return true
        }
    }
    return false
}

var interval_id;

function warning()
{
    if(debug)
    {
        alert("GET OFF THIS WEBSITE")
    }
    else
    {
        chrome.runtime.sendMessage({ action: 'redirect', url: document.URL}) // redirect user to ana-help on google
    }
    if(interval_id)
    {
        clearInterval(interval_id)
    }
}

function main()
{
    // try to ignore scripting/meta stuff
    const all = document.querySelectorAll(':not(script):not(style):not(link):not(head):not(meta):not(circle):not(svg):not(rect)')
    const text = Array.from(all).map(x => x.innerText ? x.innerText : '').join(' ')
    const content = text.toLowerCase() // lowkey unnecessary, may be removed in the future
    const violation = check_words(content)
    if(violation)
    {
        warning()
        return
    }
}

interval_id = setInterval(function(){main();}, 3500)

main()
