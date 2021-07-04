
import React , { Fragment , useEffect , useState , useContext }  from 'react';
import useComponentVisible from '../../../../useEffects/useClickBoundary';

import styles from './tooltip.module.scss';

/** 
 * @param required = { items : array , clickMethod : function }
 */

const ResizeTooltip = ( { dropState , close , required , flow = 'horz' , scheme }  ) => {

    let [ heightSet , setHeight ] = useState( 0 );

    const { items , clickMethod } = required;

    const handleMenuClick = ( value ) => {
        clickMethod( value );
    }

    const {
        ref
    } = useComponentVisible( dropState , close , [ ] , 'dropdown'  );

    useEffect( ( ) => {
        if ( dropState ) {
            let { height } = ref.current.getBoundingClientRect(); 
            setHeight( height + 10 );
        }
    } , [  dropState ] );

    return (
        <Fragment>
             { 
               dropState && 
                
                <div ref={ ref } className={`${ styles.dropdown } ${ scheme === 'dark' ? styles.dropdown__dark : styles.dropdown__light }`} style={{
                    top: `-${ heightSet }px`
                }}>
                        <ul className={ `${ flow === 'horz' ? styles.dropdown__horz :  styles.dropdown__vert } `}>
                            { items.map( ( { element , value } , key ) => 
                                <li key={ key } onClick={ ( ) => handleMenuClick( value ) } > 
                                    { element } 
                                </li>
                            )}
                        </ul>
                </div>
              }
        </Fragment>
    )
}

export default ResizeTooltip;