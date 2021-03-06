<?php
/**
 * Template Name: Carriers Page
 *
 * @since 0.1.0
 * @package automated-logistics-systems
 */

// Don't load directly
if ( ! defined( 'ABSPATH' ) ) {
    die;
}

get_header();

the_post();

global $wp_query;

?>

<?php if ( has_post_thumbnail() ) :
    $hero_image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'hero-image' );
?>

    <section class="hero-image" style="background-image: url( '<?php echo $hero_image[0];?>' ); height: <?php echo $hero_image[2]; ?>px;">
    </section>

<?php endif; ?>

<section id="page-<?php the_ID(); ?>" <?php body_class( array( 'page-content', 'carriers' ) ); ?>>
    
    <?php $content_class = ( have_rows( 'customers_carriers_ctas' ) || get_field( 'customers_carriers_phone_number' ) ) ? ' medium-9 ' : ' '; ?>
    
    <div class="row">
        
        <div class="small-12<?php echo $content_class; ?>columns">
            
            <?php als_custom_breadcrumbs(); ?>

            <div class="page-copy">
                <?php the_content(); ?>
            </div>
    
            <div class="row">
                <div id="after-content-text" class="small-12 columns text-center">
                    <?php echo apply_filters( 'the_content', get_field( 'after_content_text' ) ); ?>
                </div>
            </div>   

        </div>
        
        <?php if ( have_rows( 'customers_carriers_ctas' ) || get_field( 'customers_carriers_phone_number' ) ) : ?>
        
        <div class="small-12 medium-3 columns sidebar-cta">
            
            <?php if ( have_rows( 'customers_carriers_ctas' ) ) : 
            
                while ( have_rows( 'customers_carriers_ctas' ) ) : the_row(); ?>
            
                    <div class="cta-block">
            
                        <?php echo apply_filters( 'the_content', get_sub_field( 'call_to_action' ) ); ?>
                        
                    </div>
            
                <?php endwhile;
            
            endif;
            
            if ( get_field( 'customers_carriers_phone_number' ) ) : ?>
            
                <div class="cta-block">
            
                    <?php echo sprintf( __( 'Call us today %s', THEME_ID ), get_phone_number_link( get_field( 'customers_carriers_phone_number' ) ) ); ?>
                    
                </div>
                    
            <?php endif; ?>
            
        </div>
        
        <?php endif; ?>

    </div>
    
</section>

<?php
get_footer();