import { useEffect , useRef } from 'react';

function useStateRef( state ) {
    const ref = useRef( state );

    useEffect(() => {
       ref.current = state;
    }, [ state ]);

    return [ ref ];
}

export default useStateRef;
