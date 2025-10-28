import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    logo,
    menuItems,
    accountUrl,
    showAccountIcon
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'webdune-navigation-block',
  });

  return (
    <div {...blockProps}>
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar14_component w-nav"
      >
        <div className="navbar14_container">
          <div className="nav_logo-menu-wrapper">
            {logo?.url && (
              <a href="/" className="navbar14_logo-link w-nav-brand">
                <img
                  loading="lazy"
                  src={logo.url}
                  alt={logo.alt || 'Logo'}
                  className="navbar14_logo"
                />
              </a>
            )}

            <div className="nav_account-menu-wrapper">
              {showAccountIcon && (
                <div className="navbar14_button-wrapper mobile">
                  <a href={accountUrl} className="nav_account-link w-inline-block">
                    <div className="icon-embed-small w-embed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path d="M15.9974 0.000158665C7.16728 0.000158665 0 7.17073 0 16.0002C0 20.4559 1.82533 24.4883 4.76873 27.3902V27.3915L4.79266 27.4154C7.68016 30.251 11.6352 32 15.9972 32C20.3643 32 24.3251 30.2456 27.2137 27.4046V27.406C27.2283 27.3927 27.2429 27.3794 27.2562 27.3648C30.1851 24.464 32 20.4427 32 16.0001C32 7.17057 24.8276 0 15.9972 0L15.9974 0.000158665ZM15.9974 1.08923C24.2401 1.08923 30.9097 7.75632 30.9097 15.9999C30.9097 19.7982 29.4925 23.262 27.1591 25.8944C25.7951 21.0109 21.3203 17.446 15.9971 17.446C10.6753 17.446 6.20043 21.0106 4.83623 25.8944C2.50303 23.2621 1.08568 19.7982 1.08568 15.9999C1.08568 7.75632 7.75436 1.08923 15.9965 1.08923H15.9974ZM15.9974 4.55835C12.691 4.55835 10.0017 7.25046 10.0017 10.5562C10.0017 13.8618 12.6912 16.5541 15.9974 16.5541C19.3038 16.5541 21.9945 13.862 21.9945 10.5562C21.9945 7.25057 19.3037 4.55835 15.9974 4.55835ZM15.9974 5.64742C18.7148 5.64742 20.9071 7.8375 20.9071 10.5564C20.9071 13.2751 18.7148 15.4691 15.9974 15.4691C13.28 15.4691 11.0877 13.2751 11.0877 10.5564C11.0877 7.83778 13.28 5.64742 15.9974 5.64742ZM15.9974 18.5328C21.0639 18.5328 25.2558 22.0708 26.266 26.8203C23.5925 29.3583 19.9777 30.915 15.9974 30.915C12.0157 30.915 8.40242 29.3584 5.72877 26.8203C6.73915 22.0708 10.9309 18.5328 15.9974 18.5328Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </a>
                </div>
              )}

              <div className="navbar14_menu-button w-nav-button">
                <div className="menu-icon2">
                  <div className="menu-icon2_line-top"></div>
                  <div className="menu-icon2_line-middle">
                    <div className="menu-icon1_line-middle-inner"></div>
                  </div>
                  <div className="menu-icon2_line-bottom"></div>
                </div>
              </div>
            </div>
          </div>

          <nav role="navigation" className="navbar14_menu w-nav-menu">
            <div className="navbar14_menu-link-wrapper">
              <div className="navbar14_menu-links">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="navbar14_link w-nav-link"
                    target={item.openInNewTab ? '_blank' : '_self'}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {item.text}
                  </a>
                ))}
              </div>

              {showAccountIcon && (
                <div className="navbar14_button-wrapper">
                  <a href={accountUrl} className="nav_account-link w-inline-block">
                    <div className="icon-embed-small w-embed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path d="M15.9974 0.000158665C7.16728 0.000158665 0 7.17073 0 16.0002C0 20.4559 1.82533 24.4883 4.76873 27.3902V27.3915L4.79266 27.4154C7.68016 30.251 11.6352 32 15.9972 32C20.3643 32 24.3251 30.2456 27.2137 27.4046V27.406C27.2283 27.3927 27.2429 27.3794 27.2562 27.3648C30.1851 24.464 32 20.4427 32 16.0001C32 7.17057 24.8276 0 15.9972 0L15.9974 0.000158665ZM15.9974 1.08923C24.2401 1.08923 30.9097 7.75632 30.9097 15.9999C30.9097 19.7982 29.4925 23.262 27.1591 25.8944C25.7951 21.0109 21.3203 17.446 15.9971 17.446C10.6753 17.446 6.20043 21.0106 4.83623 25.8944C2.50303 23.2621 1.08568 19.7982 1.08568 15.9999C1.08568 7.75632 7.75436 1.08923 15.9965 1.08923H15.9974ZM15.9974 4.55835C12.691 4.55835 10.0017 7.25046 10.0017 10.5562C10.0017 13.8618 12.6912 16.5541 15.9974 16.5541C19.3038 16.5541 21.9945 13.862 21.9945 10.5562C21.9945 7.25057 19.3037 4.55835 15.9974 4.55835ZM15.9974 5.64742C18.7148 5.64742 20.9071 7.8375 20.9071 10.5564C20.9071 13.2751 18.7148 15.4691 15.9974 15.4691C13.28 15.4691 11.0877 13.2751 11.0877 10.5564C11.0877 7.83778 13.28 5.64742 15.9974 5.64742ZM15.9974 18.5328C21.0639 18.5328 25.2558 22.0708 26.266 26.8203C23.5925 29.3583 19.9777 30.915 15.9974 30.915C12.0157 30.915 8.40242 29.3584 5.72877 26.8203C6.73915 22.0708 10.9309 18.5328 15.9974 18.5328Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* SVG filter for liquid glass effect */}
      <div className="glass-nav-svg-defs w-embed">
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.025 0.025" numOctaves="2" seed="92" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale="65" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

