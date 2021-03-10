const blockTypes = [
    'text' ,
    'bullet' ,
    'bookmark' ,
    'divider' ,
    'h1' , 'h2' , 'h3' ,
    'image'
]

const betterTypes = [
  { type: 'text' ,
    catches: 'text block writing'
  } ,
  {
    type: 'bullet' ,
    catches: 'bullet bulletmarks list'
  } ,
  {
    type: 'bookmark' ,
    catches: 'web bookmark link'
  } ,
  {
    type: 'divider' ,
    catches: 'divider'
  } ,
  {
    type: 'image' ,
    catches: 'image web img upload'
  } ,
  {
    type: 'h1' ,
    catches: 'heading1 heading header1'
  } ,
  {
    type: 'h2' ,
    catches: 'heading2 heading header2'
  } ,
  {
    type: 'h3' ,
    catches: 'heading3 heading header3'
  }
]

const getblockData = ( type ) => {
    switch ( type ) {
          case 'text' :
              return {
                  block: {
                      type: 'text' ,
                      tag: 'p' ,
                      text: '' ,
                      marginlevel: 0
                  } ,
                  definitions: {
                      publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/text_dpupd0.jpg' ,
                      block_title: 'Text block' ,
                      block_description: 'start writing text.' ,
                      classFocus:  '.editable' ,
                      rules: {
                        canTurn:  true ,
                        canFocus: true
                      }
                  }
              }
              break;

          case 'bullet' :
              return {
                  block: {
                      type: 'bullet' ,
                      tag: 'p' ,
                      text: '' ,
                      marginlevel: 0
                  } ,
                  definitions: {
                      publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/bullet_mwsj7w.jpg' ,
                      block_title: 'Bulleted list' ,
                      block_description: 'Create a simple bulleted list.' ,
                      classFocus:  '.editable' ,
                      rules: {
                        canTurn:  true ,
                        canFocus: true
                      }
                  } ,
              }
              break;
          case 'bookmark' :
              return {
                  block: {
                      type: 'bookmark' ,
                      tag: 'div' ,
                      text: '' ,
                      marginlevel: 0
                  } ,
                  definitions: {
                      publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615304413/notion_clone/block_icons/bookmark_kxxxuj.jpg' ,
                      block_title: 'Web bookmark' ,
                      block_description: 'Save a link as a visual bookmark.' ,
                      classFocus:  'input' ,
                      rules: {
                        canTurn:  false ,
                        canFocus: false
                      }
                  }
              }
              break;
          case 'image' :
              return {
                  block: {
                      type: 'image' ,
                      tag: 'img' ,
                      text: false ,
                      marginlevel: 0
                  } ,
                  definitions: {
                      publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/image_hvvh2r.jpg' ,
                      block_title: 'Image' ,
                      block_description: 'Upload an image via web or desktop' ,
                      classFocus:  'input' ,
                      rules: {
                        canTurn:  false ,
                        canFocus: false
                      }
                  }
              }
              break;
          case 'h1' :
              return {
                   block: {
                      type: 'text' ,
                      tag: 'h1' ,
                      text: '' ,
                      marginlevel: 0
                   } ,
                   definitions: {
                      publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/h1_ommxl2.jpg' ,
                      block_title: 'H1 title' ,
                      block_description: 'Give your app a large heading.' ,
                      classFocus:  '.editable' ,
                      rules: {
                        canTurn:  true ,
                        canFocus: true
                      }
                   }
              }
              break;
        case 'h2' :
            return {
                block: {
                    type: 'text' ,
                    tag: 'h2' ,
                    text: '' ,
                    marginlevel: 0
                } ,
                definitions: {
                    publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/h2_edprrj.jpg' ,
                    block_title: 'H2 title' ,
                    block_description: 'Give your app a medium heading.' ,
                    classFocus:  '.editable' ,
                    rules: {
                      canTurn:  true ,
                      canFocus: true
                    }
                }
            }
            break;
        case 'h3' :
            return {
                block: {
                    type: 'text' ,
                    tag: 'h3' ,
                    text: '' ,
                    marginlevel: 0
                } ,
                definitions: {
                    publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/h3_axbumm.jpg' ,
                    block_title: 'H3 title' ,
                    block_description: 'Give your app a small small.' ,
                    classFocus:  '.editable' ,
                    rules: {
                      canTurn:  true ,
                      canFocus: true
                    }
                }
            }
            break;
        case 'divider' :
            return {
                block: {
                    type: 'divider' ,
                    tag: 'div' ,
                    text: '' ,
                    marginlevel: 0
                } ,
                definitions: {
                    publicUrl:   'https://res.cloudinary.com/dezoqwmss/image/upload/v1615297631/notion_clone/block_icons/divider_b46onq.jpg' ,
                    block_title: 'Divider' ,
                    block_description: 'Visually Divide blocks.' ,
                    classFocus:  '.editable' ,
                    rules: {
                      canTurn:  false ,
                      canFocus: false
                    }
                }
            }
            break;
    }
}

const blockChoices = ( shouldFilter , stringInput ) => {

    let string_lowercase = shouldFilter ? stringInput.toLowerCase() : null;

    let blocksChosen = [ ];
    let allBlocks = blockTypes;

    let filtered = shouldFilter ? allBlocks.filter( ( block ) => {
          let block_lowercase = block.toLowerCase();
       		return block_lowercase.indexOf( string_lowercase ) > -1
     }) : allBlocks;

    filtered.forEach( ( blockValue , i ) => {
          let blockObject = getblockData( blockValue ).definitions;
          blocksChosen.push( blockObject ) ;
    });
    return blocksChosen;
}

export {
    blockChoices , getblockData
}
