import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";

const quotes = [
    "Badges we don't need no stinking badges because we Support RichardTMiles",
    "Just when I thought I was out, Supporting  RichardTMiles pulls me back in!",
    "Houston, we have a problem. But you can solve it when you Support RichardTMiles.",
    "I love the smell of donations in the morning. Smells like...victory. Help make it happen, Support RichardTMiles.",
    "May the funds be with you. Support RichardTMiles.",
    "I'm king of the world! And you could be too if you Support RichardTMiles.",
    "Keep your friends close, but your donors closer. Support RichardTMiles.",
    "Hello. My name is Inigo Montoya. You used my software. Prepare to donate. Support RichardTMiles.",
    "Show me the money! Seriously, you can show it here: Support RichardTMiles.",
    "Go ahead, make my day with a donation. Support RichardTMiles.",
    "To infinity and beyond! But first, Support RichardTMiles.",
    "Here's looking at you, donor. Support RichardTMiles.",
    "You can't handle the truth! But you can handle donating. Support RichardTMiles.",
    "I feel the need—the need for your support! Support RichardTMiles.",
    "Nobody puts Baby in a corner. Except for Baby. Baby can definitely Support RichardTMiles.",
    "There's no place like home. And there's no support like yours. Support RichardTMiles.",
    "You're gonna need a bigger wallet. To Support RichardTMiles.",
    "E.T. phone home. And also, E.T. Support RichardTMiles.",
    "I'm not a smart man, but I know what support is. Support RichardTMiles.",
    "It's alive! It's alive! But it could be more alive with your support. Support RichardTMiles.",
    "You talkin' to me? Well, I'm asking you to Support RichardTMiles.",
    "I'll have what she's having...and what she's having is the joy of supporting. Support RichardTMiles.",
    "Wax on, wax off. Donate on, stress off. Support RichardTMiles.",
    "Life is like a box of chocolates. Donations, however, are much more straightforward. Support RichardTMiles.",
    "They may take our lives, but they'll never take our FREEDOM to Support RichardTMiles!",
    "I'm gonna make him an offer he can't refuse. And that's to kindly ask for your support. Support RichardTMiles.",
    "This is the beginning of a beautiful friendship...with benefits for both of us when you Support RichardTMiles.",
    "If you build it, they will come. If you donate, we will build. Support RichardTMiles.",
    "The first rule of Support Club is: you do talk about Support Club. Support RichardTMiles.",
    "I wish I knew how to quit you, but your support is too good. Support RichardTMiles.",
    "You had me at 'hello', but you'll have us at 'donation'. Support RichardTMiles.",
    "There's no crying in baseball! But there's definitely support in coding. Support RichardTMiles.",
    "Hasta la vista, baby...but not until after you Support RichardTMiles.",
    "That'll do, pig, that'll do. And what you can do is Support RichardTMiles.",
    "You're a wizard, supporter! Support RichardTMiles.",
    "Oh, Captain! My Captain! Lead the way with your donation. Support RichardTMiles.",
    "I'm walking here! I'm walking straight to Support RichardTMiles.",
    "I have always depended on the kindness of strangers...and by strangers, I mean amazing supporters like you. Support RichardTMiles.",
    "A million dollars isn't cool. You know what's cool? Your support. Support RichardTMiles.",
    "I'm as mad as hell, and I'm not going to take this anymore! Unless it's your support. That, I'll gladly take. Support RichardTMiles.",
    "What we've got here is failure to communicate. But communicating support is easy: Support RichardTMiles.",
    "Toto, I've got a feeling we're not in Kansas anymore. We're in a place where people Support RichardTMiles.",
    "Why so serious? Let's put a smile on that face with a donation! Support RichardTMiles.",
    "I'll be back...with more reasons for you to support. Support RichardTMiles.",
    "Say 'hello' to my little friend: the donate button. Support RichardTMiles.",
    "Elementary, my dear Watson. The solution is simple: Support RichardTMiles.",
    "Life moves pretty fast. If you don't stop and donate once in a while, you could miss it. Support RichardTMiles.",
    "The truth is...I see people supporting. All the time. They're everywhere. Support RichardTMiles.",
    "Keep swimming, just keep swimming...towards supporting us. Support RichardTMiles.",
    "Roads? Where we're going, we don't need roads, but we do need your support. Support RichardTMiles.",
    "This, is Sparta! And in Sparta, we Support RichardTMiles.",
    "You mustn't be afraid to dream a little bigger, darling. Dream of supporting. Support RichardTMiles.",
    "I'm having an old friend for dinner...perhaps you can join us with your support? Support RichardTMiles.",
    "My precious... Support RichardTMiles.",
    "Life finds a way...to support. Support RichardTMiles.",
    "I'm not even supposed to be here today! But here I am, supporting. Support RichardTMiles.",
    "Ohana means family, and family means nobody gets left behind or forgotten. Join our family. Support RichardTMiles.",
    "Get busy living, or get busy supporting. Support RichardTMiles.",
    "I feel the need—the need for support! Support RichardTMiles.",
    "It's not personal, Sonny. It's strictly business...and our business needs support. Support RichardTMiles.",
    "Don't let's ask for the moon. We have the stars...and your support. Support RichardTMiles.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall...and in supporting. Support RichardTMiles.",
    "What's in the box? Hopefully, your donation! Support RichardTMiles.",
    "Every time a bell rings, an angel gets its wings. Every time you donate, we get to keep ours. Support RichardTMiles.",
    "Frankly, my dear, I do give a damn...about your support. Support RichardTMiles.",
    "I'm gonna make you an offer you can't refuse: join us in supporting. Support RichardTMiles.",
    "We don't need roads where we're going, but we do need donations. Support RichardTMiles.",
    "You can't fight in here! This is the war room! But you can fight for us with your support. Support RichardTMiles.",
    "Listen to me, mister. You're my knight in shining armor. Don't you forget it. And knights support. Support RichardTMiles.",
    "Nobody's perfect. But your donation could be. Support RichardTMiles.",
    "You've got to ask yourself one question: 'Do I feel generous?' Well, do ya, punk? Support RichardTMiles.",
    "I have a dream that one day this project will rise up and live out the true meaning of its creed: 'We hold these truths to be self-evident, that all supporters are created equal.' Support RichardTMiles.",
    "They call me Mister Tibbs! And Mr. Tibbs supports. Support RichardTMiles.",
    "I want to be alone...with your support. Support RichardTMiles.",
    "After all, tomorrow is another day...for supporting. Support RichardTMiles.",
    "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti...and then I supported. Support RichardTMiles.",
    "Love means never having to say you're sorry...for not having supported sooner. Support RichardTMiles.",
    "I'm ready for my close-up, Mr. DeMille. And by close-up, I mean your support. Support RichardTMiles.",
    "This is one small step for man, one giant leap for our community. Help us make that leap. Support RichardTMiles.",
]

function SupportMe() {


    // get a random quote
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    //  quote.replace(/((Support )?RichardTMiles)/, '<a href="https://github.com/sponsors/RichardTMiles">$1</a>')
    return <>
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <div style={{backgroundColor: "lightgreen"}}>
                <div style={{padding: "2em"}}>
                    <h1
                        dangerouslySetInnerHTML={
                            {
                                __html: quote.replace(/((Support )?RichardTMiles)/,
                                    '<a href="https://github.com/sponsors/RichardTMiles" target="_blank">$1</a>')
                            }
                    }/>
                </div>
            </div>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </>

}

export default SupportMe;