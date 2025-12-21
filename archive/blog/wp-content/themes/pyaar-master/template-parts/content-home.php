<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Pyaar
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post home__post'); ?>>
	<header class="entry-header">
		<?php
			the_title( '<h1 class="entry-title post-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' );

		if ( 'post' === get_post_type() ) : ?>
		<div class="entry-meta post-meta">
			<?php pyaar_posted_on(); ?>
			<?php do_shortcode('[rt_reading_time]'); ?>
		</div>
		<!-- .entry-meta -->
		<?php
		endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content entry-content--excerpt">
		<?php 
			$content = get_the_content();
			$content = explode("</p>", $content)[0]; 
			echo $content;
		?>
		<div class="read-more">
			<a href="<?php echo get_permalink() ?>" class="btn btn--tertiary">Continue Reading <i>&rarr;</i></a>
		</div>
	</div><!-- .entry-content -->

	<?php /* <footer class="entry-footer">
		<?php pyaar_entry_footer(); ?>
	</footer><!-- .entry-footer --> */ ?>
</article><!-- #post-<?php the_ID(); ?> -->
