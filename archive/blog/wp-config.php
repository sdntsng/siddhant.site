<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'draftand_wp365' );

/** MySQL database username */
define( 'DB_USER', 'draftand_wp365' );

/** MySQL database password */
define( 'DB_PASSWORD', '7AShp!269!' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );



/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'n5nzwwxmvbjqry3xkt1cvwkzoqjtkxnsyz6wqsdrkqmd9o2utznfe5iy1abg5qjf' );
define( 'SECURE_AUTH_KEY',  'jei4px23bdsz2wiw5lrabkxauebdp9apkeq4sufynetxxfqum3xb8sqmlpfkviu4' );
define( 'LOGGED_IN_KEY',    'yoqbm4wjx7tzvgmesgxkamfdmn8qz8ofvqkswg6abjt0vrnftycensxqi6jmohp8' );
define( 'NONCE_KEY',        'yzoyt8nlggsqv15oejwxazw1pm8d52gbx0ky9quy9a71ovwhnrvq3vz7laykkkma' );
define( 'AUTH_SALT',        'lemdfc4qsmgdzpxpz6kfaxny6hetv6rhuyanzxaxs5szbbqhoinbifavqvsezotc' );
define( 'SECURE_AUTH_SALT', '9hjn7n5afbvuu8cmrqhhieoqz7uzinunwv2pxr5dooyg25l5eces5ibesp30vmco' );
define( 'LOGGED_IN_SALT',   'lnxczczavbrhkhlq8soogvdbyhucau3dg4xopk9hts3hggdnxsoqpjlrbpngfqgl' );
define( 'NONCE_SALT',       'gn5sgidbfxpqy4kzces1taysim1ul0jcychwvnty1x1tuzul3jfqgukhrtur3tyf' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wprk_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

define( 'DISALLOW_FILE_EDIT', true );
define( 'CONCATENATE_SCRIPTS', false );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';