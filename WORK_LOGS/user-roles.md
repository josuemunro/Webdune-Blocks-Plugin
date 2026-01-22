# User Roles & Permissions Implementation

**Date**: January 23, 2026  
**Status**: ✅ Complete  
**Location**: Production server - `/wp-content/themes/sellmycell/functions.php`

---

## Problem

Client needed a custom WordPress role that could:
- ✅ View and edit User Orders post type
- ❌ NOT delete User Orders
- ❌ NOT see any other admin pages (Posts, Tips, Plugins, Settings, etc.)
- ✅ Only see "User Orders" menu in admin sidebar

Initial attempt using Members plugin showed `order_editor` role could see ALL post types because they all shared the same capabilities.

---

## Root Cause

The **User Orders** custom post type (`user_orders`) was registered without a `capability_type` parameter:

```php
// BEFORE (in functions.php ~line 628)
$args = array(
  'labels'        => $labels,
  'description'   => 'Displays city hotels and their ratings',
  'public'        => false,
  'show_ui'       => true,
  'menu_position' => 4,
  'supports'      => array(...),
  'has_archive'   => true,
  // ❌ Missing: capability_type
);

register_post_type('user_orders', $args);
```

**Why this was a problem:**
- Without `capability_type`, WordPress defaults to `'post'` capabilities
- This means User Orders used: `edit_posts`, `delete_posts`, `publish_posts`
- Tips, regular Posts, and all other CPTs also use `edit_posts`
- Result: Can't differentiate permissions between post types in Members plugin

---

## Solution

### 1. Add Custom Capability Type to User Orders CPT

**File**: `/wp-content/themes/sellmycell/functions.php`  
**Lines**: 636-637 (added after `'has_archive' => true,`)

```php
$args = array(
  'labels'        => $labels,
  'description'   => 'Displays city hotels and their ratings',
  'public'        => false,
  'show_ui'       => true,
  'menu_position' => 4,
  'supports'      => array(...),
  'has_archive'   => true,
  'capability_type' => 'order',      // ✅ NEW: Custom capabilities
  'map_meta_cap'    => true,         // ✅ NEW: Maps meta capabilities
);
```

**What this does:**
- Creates unique capabilities for User Orders:
  - `edit_order`, `edit_orders`, `edit_others_orders`, `edit_published_orders`
  - `delete_order`, `delete_orders`, `delete_others_orders`, `delete_published_orders`
  - `publish_orders`, `read_order`, `read_private_orders`
- `map_meta_cap => true` ensures WordPress properly checks these capabilities
- Administrators automatically get all capabilities (they have `manage_options`)

**Result:** Members plugin now shows separate "Order" capabilities distinct from "Post" capabilities!

---

### 2. Allow order_editor Role to Access Admin (WooCommerce Fix)

**Problem**: WooCommerce redirects users without `edit_posts` or `manage_woocommerce` to `/my-account/`

**File**: `/wp-content/themes/sellmycell/functions.php`  
**Lines**: ~2000-2012 (added at end of file)

```php
/**
 * Allow order_editor role to access wp-admin
 * WooCommerce blocks admin access for users without edit_posts capability.
 * This filter allows our order_editor role to access the admin area.
 */
function sellmycell_allow_order_editor_admin_access($prevent_access) {
  $user = wp_get_current_user();
  if (in_array('order_editor', (array) $user->roles)) {
    return false; // Don't prevent access
  }
  return $prevent_access;
}
add_filter('woocommerce_prevent_admin_access', 'sellmycell_allow_order_editor_admin_access', 10, 1);
```

---

### 3. Hide All Admin Menus Except User Orders

**File**: `/wp-content/themes/sellmycell/functions.php`  
**Lines**: ~2014-2040 (added at end of file)

```php
/**
 * Hide admin menu items for order_editor role
 * Only show User Orders menu
 */
function sellmycell_hide_menus_for_order_editor() {
  $user = wp_get_current_user();
  
  if (!in_array('order_editor', (array) $user->roles)) {
    return;
  }
  
  // Remove all menu items except User Orders
  remove_menu_page('index.php');                                 // Dashboard
  remove_menu_page('edit.php');                                  // Posts
  remove_menu_page('upload.php');                                // Media
  remove_menu_page('edit.php?post_type=page');                   // Pages
  remove_menu_page('edit-comments.php');                         // Comments
  remove_menu_page('edit.php?post_type=tip');                    // Tips
  remove_menu_page('themes.php');                                // Appearance
  remove_menu_page('plugins.php');                               // Plugins
  remove_menu_page('users.php');                                 // Users
  remove_menu_page('tools.php');                                 // Tools
  remove_menu_page('options-general.php');                       // Settings
  remove_menu_page('wpcf7');                                     // Contact Form 7
  remove_menu_page('woocommerce');                               // WooCommerce
  remove_menu_page('edit.php?post_type=product');                // Products
  remove_menu_page('woocommerce-marketing');                     // Marketing
  remove_menu_page('edit.php?post_type=customer_feedback');      // Customer Feedback
  remove_menu_page('themest_page');                              // Theme Setting
  remove_menu_page('edit.php?post_type=post');                   // Blogs
  remove_menu_page('vc-general');                                // WPBakery Page Builder
  remove_menu_page('mo_openid_settings');                        // miniOrange Social Login
  remove_menu_page('vc-welcome');                                // WPBakery Welcome
  
  // Keep only: User Orders (edit.php?post_type=user_orders), Profile, Collapse Menu
}
add_action('admin_menu', 'sellmycell_hide_menus_for_order_editor', 999);
```

**Note on finding menu slugs:**
- `themest_page` - Found via `grep add_menu_page functions.php`
- `vc-general`, `vc-welcome` - Found in WPBakery plugin files
- `mo_openid_settings` - Found in miniOrange plugin files

---

### 4. Clean Up Admin Bar

**File**: `/wp-content/themes/sellmycell/functions.php`  
**Lines**: ~2042-2068 (added at end of file)

```php
/**
 * Hide admin bar items for order_editor role
 */
function sellmycell_hide_admin_bar_items_for_order_editor() {
  $user = wp_get_current_user();
  
  if (!in_array('order_editor', (array) $user->roles)) {
    return;
  }
  
  global $wp_admin_bar;
  
  // Remove WordPress logo and links
  $wp_admin_bar->remove_menu('wp-logo');
  $wp_admin_bar->remove_menu('about');
  $wp_admin_bar->remove_menu('wporg');
  $wp_admin_bar->remove_menu('documentation');
  $wp_admin_bar->remove_menu('support-forums');
  $wp_admin_bar->remove_menu('feedback');
  
  // Remove + New content menu
  $wp_admin_bar->remove_menu('new-content');
  
  // Remove comments, updates, WooCommerce
  $wp_admin_bar->remove_menu('comments');
  $wp_admin_bar->remove_menu('updates');
  $wp_admin_bar->remove_menu('woocommerce');
}
add_action('wp_before_admin_bar_render', 'sellmycell_hide_admin_bar_items_for_order_editor', 999);
```

---

## Configuring order_editor Role in Members Plugin

After the code changes above, go to **Users > Roles > order_editor** in WordPress admin:

### ✅ Required Capabilities:
- `read` - Access WordPress admin
- `read_order` - View individual orders
- `edit_order` - Edit individual orders
- `edit_orders` - Edit orders in general

### ❌ Do NOT Enable:
- `delete_order` - Delete individual orders
- `delete_orders` - Delete orders in general
- `delete_others_orders` - Delete orders by other users
- `delete_published_orders` - Delete published orders
- `publish_orders` - Publish new orders (if you don't want them creating orders)
- `edit_others_orders` - Edit orders by other users (optional - enable if needed)
- All `edit_posts`, `edit_pages`, `edit_tips` capabilities
- All plugin/admin capabilities

---

## Testing Checklist

✅ Login as order_editor user:
- Can access wp-admin (no redirect to /my-account/)
- Sees only: User Orders, Profile, Collapse Menu
- Can view list of User Orders
- Can click and edit individual orders
- Cannot see Delete link on orders
- Cannot see Posts, Pages, Tips, Settings, etc.
- Clean admin bar (no clutter)

---

## Backup Created

Before making changes, backup was created:
```bash
/home/sellmycell/htdocs/sellmycell.co.nz/wp-content/themes/sellmycell/functions.php.backup-20260123-HHMMSS
```

---

## Future Enhancements (If Needed)

### Hide Dashboard Widgets
If order_editor can access Dashboard and sees unwanted widgets:

```php
function sellmycell_hide_dashboard_widgets_for_order_editor() {
  $user = wp_get_current_user();
  if (!in_array('order_editor', (array) $user->roles)) {
    return;
  }
  
  remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
  remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');
  remove_meta_box('dashboard_primary', 'dashboard', 'side');
  remove_meta_box('dashboard_secondary', 'dashboard', 'side');
  remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
  remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
  remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
  remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
  remove_meta_box('dashboard_activity', 'dashboard', 'normal');
}
add_action('wp_dashboard_setup', 'sellmycell_hide_dashboard_widgets_for_order_editor');
```

### Redirect to User Orders on Login
```php
function sellmycell_redirect_order_editor_to_orders($redirect_to, $request, $user) {
  if (isset($user->roles) && is_array($user->roles) && in_array('order_editor', $user->roles)) {
    return admin_url('edit.php?post_type=user_orders');
  }
  return $redirect_to;
}
add_filter('login_redirect', 'sellmycell_redirect_order_editor_to_orders', 10, 3);
```

---

## Key Takeaways

1. **Custom capability types are essential** for granular post type permissions
2. **WooCommerce has built-in admin blocks** - use `woocommerce_prevent_admin_access` filter
3. **Menu slugs aren't always obvious** - grep plugin files to find them
4. **Members plugin works great** once CPT capabilities are properly configured
5. **No plugin code needed** - all handled in theme functions.php for easy maintenance

---

## Related Files

- User Orders CPT registration: `functions.php` lines ~638
- Role permission filters: `functions.php` lines ~2000-2070
- Members plugin UI: WP Admin > Users > Roles

---

**Last Updated**: January 23, 2026  
**Implemented By**: Cursor AI + Client  
**Status**: ✅ Working in Production
