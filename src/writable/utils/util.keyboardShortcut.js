
export const handleKeyboard = keyInput => {
    // event.key 
    switch ( keyInput ) {
      case 'Backspace':
           return { data: 'backspace'}
           break;
      case 'Delete':
           return { data: 'delete' }
      case 'Tab':
           return { data: 'Tab' }
      case 'Enter':
           return { data: 'Enter' }
    }
}
