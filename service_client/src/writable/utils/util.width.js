import { scrubOffTags } from "./util.blockHelpers";
import { getTextWidth } from "./util.blockHelpers";

    export const widthByText = ( element ) => {

        let curr_elm_coors = element.getBoundingClientRect();
        let curr_elm_text  = scrubOffTags( element.innerHTML );
        let curr_elm_text_length = getTextWidth( curr_elm_text );

        return [ curr_elm_coors.x + ( curr_elm_text_length + 25 ) , curr_elm_coors.y + 40 ];
    }

    export const widthByElement = ( element ) => {
        let elementRect = element.getBoundingClientRect();
        return [
            elementRect.width / 2 , 
            elementRect.y + 40
        ]
    }