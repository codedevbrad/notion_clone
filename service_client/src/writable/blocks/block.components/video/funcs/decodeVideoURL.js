
export const videoFormat = ( input ) => {
        
    let match = 'watch?v=';

    var matchIndex = input.indexOf( match );
    var split = input.slice( matchIndex + match.length );

    var correctMedia = `https://www.youtube.com/embed/${ split }`;

    return {
        url: correctMedia 
    }
}