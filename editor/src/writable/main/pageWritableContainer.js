
import WritableContainer = ( ) => {

      const { dragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );

      const draggableEdit = ( ) => {
          togglecanEdit();
      }

      const handleBlockCreation = async ( evt ) => {
          let isOutOfElement = evt.classList[0] == 'page_right';
          if ( isOutOfElement && !dragSelection.canDrag ) {
               await handleWrtableBlockUpdate( 'fresh' );
          }
      }

      return (
          <div className="page_right" onClick={ ( evt ) => handleBlockCreation( evt.target ) }>
              <p className={ `edit_control ${ dragSelection.canDrag ? 'edit_control_on' : ''  } `} onClick={ () => draggableEdit(  ) }>
                  <i className="fas fa-edit"></i>
              </p>
              <PageWritable />
          </div>
      )
}
