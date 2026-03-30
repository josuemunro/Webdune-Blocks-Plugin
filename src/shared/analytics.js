/**
 * Pre-checkout analytics — dataLayer events for GA4/GTM (WEB-92).
 *
 * Pushes events to window.dataLayer for Google Tag Manager to forward
 * to GA4. Mirrors the pattern used in phone-orders-v2 checkout analytics.
 *
 * No PII is included in any event parameters.
 */

function pushEvent( eventName, params = {} ) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push( { event: eventName, ...params } );
}

export { pushEvent };

/**
 * Scroll-depth tracking via IntersectionObserver.
 *
 * Fires `page_scroll_depth` at 50 % and 90 % of the document height,
 * then disconnects so each threshold fires at most once per page load.
 */
export function trackScrollDepth() {
	if ( typeof IntersectionObserver === 'undefined' ) {
		return;
	}

	const thresholds = [ 50, 90 ];
	const fired = new Set();

	const sentinel = document.createElement( 'div' );
	sentinel.setAttribute( 'aria-hidden', 'true' );
	sentinel.style.cssText = 'position:absolute;width:1px;height:1px;pointer-events:none;';
	document.body.appendChild( sentinel );

	function placeSentinel( pct ) {
		const docHeight = Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight
		);
		sentinel.style.top = `${ ( docHeight * pct ) / 100 }px`;
	}

	let currentTarget = 0;
	placeSentinel( thresholds[ currentTarget ] );

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( ! entry.isIntersecting ) {
					return;
				}

				const pct = thresholds[ currentTarget ];
				if ( fired.has( pct ) ) {
					return;
				}

				fired.add( pct );
				pushEvent( 'page_scroll_depth', {
					scroll_percentage: pct,
					page_path: window.location.pathname,
				} );

				currentTarget++;
				if ( currentTarget < thresholds.length ) {
					placeSentinel( thresholds[ currentTarget ] );
				} else {
					observer.disconnect();
					sentinel.remove();
				}
			} );
		},
		{ threshold: 0 }
	);

	observer.observe( sentinel );
}

/**
 * Global CTA / button click tracking.
 *
 * Uses a single delegated listener on <body> so every `.button` and
 * `.underline-cta` link across all blocks (current and future) is
 * tracked automatically without per-block wiring.
 */
export function trackButtonClicks() {
	document.body.addEventListener( 'click', ( e ) => {
		const link = e.target.closest( 'a.button, a.underline-cta' );
		if ( ! link ) {
			return;
		}

		const section = link.closest( 'section' );
		const sectionName = section
			? Array.from( section.classList ).find(
					( c ) => c !== 'section' && c !== 'padding-global'
			  ) || ''
			: '';

		const block = link.closest( '[class*="webdune-"]' );
		const blockName = block
			? Array.from( block.classList ).find( ( c ) =>
					c.startsWith( 'webdune-' )
			  ) || ''
			: '';

		pushEvent( 'cta_click', {
			cta_text: link.textContent.replace( /\s+/g, ' ' ).trim(),
			section_name: sectionName,
			block_name: blockName,
			destination_url: link.getAttribute( 'href' ) || '',
			page_path: window.location.pathname,
		} );
	} );
}
