import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    logo,
    tagline,
    quickLinks,
    officeHours,
    email,
    phone,
    address,
    newsletterHeading,
    newsletterText,
    showNewsletter,
    socialLinks
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-footer-block',
  });

  // Get social icon SVG
  const getSocialIconSVG = (platform) => {
    const icons = {
      instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 26 26" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <g clip-path="url(#clip0_177_199)">
            <path d="M5.76678 -0.0302734H19.7791C21.3626 -0.0302734 22.7967 0.612082 23.8423 1.65778C24.8731 2.68853 25.5304 4.13756 25.5304 5.70611V19.7184C25.5304 21.3019 24.8731 22.736 23.8423 23.7817C22.7967 24.8124 21.3626 25.4697 19.7791 25.4697H5.76678C4.19823 25.4697 2.7492 24.8124 1.71844 23.7817C0.672751 22.736 0.0303955 21.3019 0.0303955 19.7184V5.70611C0.0303955 4.13756 0.672751 2.68853 1.71844 1.65778C2.7492 0.612082 4.19823 -0.0302734 5.76678 -0.0302734ZM19.7791 2.24038H5.76678C4.81071 2.24038 3.94428 2.62878 3.31686 3.25619C2.68945 3.88361 2.30105 4.75004 2.30105 5.70611V19.7184C2.30105 20.6745 2.68945 21.5409 3.31686 22.1683C3.94428 22.8107 4.81071 23.1991 5.76678 23.1991H19.7791C20.7351 23.1991 21.6016 22.8107 22.229 22.1683C22.8713 21.5409 23.2597 20.6745 23.2597 19.7184V5.70611C23.2597 4.75004 22.8713 3.88361 22.229 3.25619C21.6016 2.62878 20.7351 2.24038 19.7791 2.24038Z" fill="currentColor"/>
            <path d="M19.9284 4.42188C20.2421 4.42188 20.5409 4.54138 20.7351 4.75052C20.9442 4.95966 21.0787 5.24349 21.0787 5.5572C21.0787 5.87091 20.9442 6.16968 20.7351 6.36388C20.5409 6.57302 20.2421 6.70746 19.9284 6.70746C19.6147 6.70746 19.3309 6.57302 19.1217 6.36388C18.9126 6.16968 18.7931 5.87091 18.7931 5.5572C18.7931 5.24349 18.9126 4.95966 19.1217 4.75052C19.3309 4.54138 19.6147 4.42188 19.9284 4.42188Z" fill="currentColor"/>
            <path d="M12.773 6.52832C14.491 6.52832 16.0296 7.23043 17.15 8.33588C18.2704 9.45626 18.9725 11.0099 18.9725 12.7129C18.9725 14.4308 18.2704 15.9694 17.15 17.0898C16.0296 18.2102 14.491 18.9123 12.773 18.9123C11.07 18.9123 9.51644 18.2102 8.39606 17.0898C7.29061 15.9694 6.5885 14.4308 6.5885 12.7129C6.5885 11.0099 7.29061 9.45626 8.39606 8.33588C9.51644 7.23043 11.07 6.52832 12.773 6.52832ZM15.5367 9.96417C14.8345 9.26206 13.8486 8.81391 12.773 8.81391C11.6975 8.81391 10.7265 9.26206 10.0244 9.96417C9.32224 10.6663 8.87409 11.6373 8.87409 12.7129C8.87409 13.7884 9.32224 14.7744 10.0244 15.4765C10.7265 16.1786 11.6975 16.6118 12.773 16.6118C13.8486 16.6118 14.8345 16.1786 15.5367 15.4765C16.2388 14.7744 16.672 13.7884 16.672 12.7129C16.672 11.6373 16.2388 10.6663 15.5367 9.96417Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_177_199">
              <rect width="25.5" height="25.5" fill="currentColor"></rect>
            </clipPath>
          </defs>
        </svg>`,
      tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 25 25" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M12.5 0C19.4036 0 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM15.5518 4.66602H13.0459V14.2227C13.4234 19.3252 8.88437 18.5527 8.53418 15.9414C8.35233 14.5784 9.00717 13.8054 10.1621 13.3926C10.5487 13.2534 10.9725 13.1483 11.3682 13.0811V10.3877C6.17437 10.5845 5.18267 15.4955 6.80176 18.2939C9.32148 22.6424 15.5879 20.7459 15.5879 14.6787V9.90332C16.8203 10.6905 17.8802 11.1081 19.0898 10.9834V8.42969C17.0025 8.28556 15.8019 6.93149 15.5518 4.66113V4.66602Z" fill="currentColor"/>
        </svg>`,
      facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="currentColor"/>
        </svg>`,
      twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
        </svg>`,
      youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
        </svg>`,
      linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
        </svg>`
    };
    return icons[platform] || icons.instagram;
  };

  return (
    <div {...blockProps}>
      <footer className="footer2_component">
        <div className="padding-global">
          <div className="container-medium">
            <div className="w-layout-grid footer2_top-wrapper">
              {/* Logo & Tagline */}
              <div className="footer_logo-wrap">
                {logo?.url && (
                  <a href="/" className="footer2_logo-link w-nav-brand">
                    <img
                      loading="lazy"
                      src={logo.url}
                      alt={logo.alt || ''}
                      className="footer2_logo"
                    />
                  </a>
                )}
                {tagline && <div>{tagline}</div>}
              </div>

              {/* Quick Links */}
              <div className="footer2_link-column">
                <div className="margin-bottom margin-xsmall">
                  <div className="text-weight-semibold"><strong>Quick Links</strong></div>
                </div>
                <div className="footer2_link-list">
                  {quickLinks && quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="footer2_link"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="footer2_link-column">
                <div className="footer_office-hours">
                  <div className="text-weight-semibold"><strong>Office hours</strong></div>
                  <div>{officeHours}</div>
                </div>
                <div className="footer_info-list">
                  <a href={`mailto:${email}`} className="text-style-link">
                    {email}
                  </a>
                  <div>
                    Need help?<br />
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-style-link">
                      {phone}
                    </a>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: address }} />
                </div>
              </div>

              {/* Newsletter & Social */}
              {showNewsletter && (
                <div className="footer2_right-wrapper">
                  <div className="margin-bottom margin-xsmall">
                    <div className="text-weight-semibold">{newsletterHeading}</div>
                  </div>
                  <div className="margin-bottom margin-xsmall">
                    <div className="text-size-small">{newsletterText}</div>
                  </div>
                  <div className="footer2_form-block w-form">
                    <form
                      id="wf-form-Footer-Newsletter-Form"
                      name="wf-form-Footer-Newsletter-Form"
                      data-name="Footer Newsletter Form"
                      method="post"
                      className="footer2_form"
                    >
                      <input
                        className="footer_email-input w-input"
                        maxLength="256"
                        name="Email"
                        data-name="Email"
                        placeholder="Get email updates"
                        type="email"
                        id="Email"
                        required
                      />
                      <button type="submit" className="button">
                        <div className="icon-embed-arrow w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 26 13" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                            <path d="M20.2543 12.0044L25.3264 6.80104C25.6781 6.44018 25.6781 5.8465 25.3264 5.48565L20.2543 0.270645C19.9025 -0.0902149 19.3238 -0.0902149 18.9721 0.270645C18.6203 0.631504 18.6203 1.22518 18.9721 1.58604L22.501 5.20627H0.907755C0.40849 5.20627 0 5.62533 0 6.13752C0 6.64971 0.40849 7.06877 0.907755 7.06877H22.4896L18.9607 10.689C18.7792 10.8753 18.6997 11.1081 18.6997 11.3525C18.6997 11.597 18.7905 11.8298 18.9607 12.016C19.3238 12.3653 19.9025 12.3653 20.2543 12.0044Z" fill="currentColor"></path>
                          </svg>
                        </div>
                      </button>
                    </form>
                  </div>
                  {socialLinks && socialLinks.length > 0 && (
                    <div className="w-layout-grid footer2_social-list">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="footer2_social-link w-inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            className="icon-embed-xsmall w-embed"
                            dangerouslySetInnerHTML={{ __html: getSocialIconSVG(link.platform) }}
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

