jQuery( function( $ ) {
    
    var transitionIn = [ ".slide-in-down", ".slide-in-left", ".slide-in-up", ".slide-in-right", ".fade-in", ".hinge-in-from-top", ".hinge-in-from-right", ".hinge-in-from-bottom", ".hinge-in-from-left", ".hinge-in-from-middle-x", ".hinge-in-from-middle-y", ".scale-in-up", ".scale-in-down", ".spin-in", ".spin-in-ccw" ];
    var transitionInRegex = '\\b(' + transitionIn.join( '|' ) + ')\\b';
    transitionInRegex = new RegExp( transitionInRegex, 'gi' );
    
    var transitionOut = [ ".slide-out-down", ".slide-out-right", ".slide-out-up", ".slide-out-left", ".fade-out", ".hinge-out-from-top", ".hinge-out-from-right", ".hinge-out-from-bottom", ".hinge-out-from-left", ".hinge-out-from-middle-x", ".hinge-out-from-middle-y", ".scale-out-up", ".scale-out-down", ".spin-out", ".spin-out-ccw"]
    var transitionOutRegex = '\\b(' + transitionOut.join( '|' ) + ')\\b';
    transitionOutRegex = new RegExp( transitionOutRegex, 'gi' );
    
    function triggerAnimation( element ) {
        
        var classes = ' ' + $( element ).attr( 'class' ).replace( /\s+/, ' ' ) + ' ';
        
        if ( $( element ).data( 'inOrOut' ) == 'in' ) {
            Foundation.Motion.animateIn( element, $( element ).data( 'animation' ) );
            $( element ).find( '.queued-animation' ).addClass( 'mui-enter-active' );
        }
        if ( $( element ).data( 'inOrOut' ) == 'out' ) {
            $( element ).find( '.queued-animation' ).addClass( 'mui-enter-active' );
            Foundation.Motion.animateOut( element, $( element ).data( 'animation' ) );
        }
        
    }
    
    function checkAnimation( element, percentFromBottom ) {
        
        if ( $( element ).offset().top < $( window ).scrollTop() + ( $( window ).height() * ( 1 - ( percentFromBottom * 0.01 ) ) ) ) {
            return true;
        }
        
        return false;
        
    }
    
    $( document ).ready( function() {
        
        // If it is on-screen at load, then animate
        var percent = 0;
        
        $( '.animate-on-scroll' ).each( function( index, element ) {
            
            // Generate Data attributes on page-load. This way we only need to run Regex at maximum twice per element.
            var classes = ' ' + $( element ).attr( 'class' ).replace( /\s+/, ' ' ) + ' ';
        
            if ( ( classes.match( transitionInRegex ) !== null ) && ( classes.match( transitionInRegex ).length > 0 ) ) {
                // If the animation should Transition In, then start invisible
                $( element ).css( 'visibility', 'hidden' );
                $( element ).data( 'inOrOut', 'in' );
                $( element ).data( 'animation', classes.match( transitionInRegex )[0].trim() );
            }
            else if ( ( classes.match( transitionOutRegex ) !== null ) && ( classes.match( transitionOutRegex ).length > 0 ) ) {
                $( element ).data( 'inOrOut', 'out' );
                $( element ).data( 'animation', classes.match( transitionOutRegex )[0].trim() );
            }
            
            if ( checkAnimation( element, percent ) ) {
                
                triggerAnimation( element );
                
                $( element ).css( 'visibility', 'visible' );
                
            }
            
        } );
        
    } );

    // Scroll down effect
    $( window ).scroll(function () {
        
        // Percentage FROM bottom of window to start animation
        var percent = 25;

        $( '.animate-on-scroll' ).each( function( index, element ) {
            
            if ( ( $( element ).css( 'visibility' ) == 'hidden' ) || ( $( element ).data( 'inOrOut' ) == 'out' ) ) {
            
                if ( checkAnimation( element, percent ) ) {

                    triggerAnimation( element );

                    $( element ).css( 'visibility', 'visible' );

                }
                
            }
            
        } );
        
    } );

} );