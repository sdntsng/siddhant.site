<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Pyaar
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>
	<header class="entry-header">
		<?php
		if ( is_singular() ) :
			the_title( '<h1 class="entry-title post-title">', '</h1>' );
		else :
			the_title( '<h2 class="entry-title post-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif;

		if ( 'post' === get_post_type() ) : ?>
		<div class="entry-meta post-meta">
			<?php pyaar_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php
		endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
			the_content( sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'pyaar' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			) );

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'pyaar' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
	
	<p class="post__discuss">
		<a href="https://twitter.com/share?text=<?php echo urlencode(get_the_title()) ?>&amp;url=<?php echo urlencode(get_the_permalink()) ?>&amp;via=siddhantsings" onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;">
		  <i class="icon-twitter icon--inline"></i> Discuss on Twitter
    </a>
  </p>

	<footer class="entry-footer post-footer">
		<?php pyaar_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
