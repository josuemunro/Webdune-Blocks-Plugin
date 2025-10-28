import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
  URLInput
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  TextControl,
  ToggleControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    logo,
    menuItems,
    accountUrl,
    showAccountIcon
  } = attributes;

  const blockProps = useBlockProps({
    className: 'webdune-navigation-block',
  });

  const updateMenuItem = (index, key, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][key] = value;
    setAttributes({ menuItems: newMenuItems });
  };

  const addMenuItem = () => {
    setAttributes({
      menuItems: [
        ...menuItems,
        { text: 'New Link', url: '#', openInNewTab: false }
      ]
    });
  };

  const removeMenuItem = (index) => {
    const newMenuItems = menuItems.filter((_, i) => i !== index);
    setAttributes({ menuItems: newMenuItems });
  };

  const moveMenuItem = (index, direction) => {
    const newMenuItems = [...menuItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < menuItems.length) {
      [newMenuItems[index], newMenuItems[newIndex]] = [newMenuItems[newIndex], newMenuItems[index]];
      setAttributes({ menuItems: newMenuItems });
    }
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Logo', 'webdune-blocks')} initialOpen={true}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({
                logo: {
                  id: media.id,
                  url: media.url,
                  alt: media.alt
                }
              })}
              allowedTypes={['image']}
              value={logo?.id}
              render={({ open }) => (
                <div>
                  {logo?.url && (
                    <div style={{ marginBottom: '12px' }}>
                      <img
                        src={logo.url}
                        alt={logo.alt || ''}
                        style={{ maxWidth: '100%', height: 'auto', maxHeight: '60px' }}
                      />
                    </div>
                  )}
                  <Button onClick={open} variant="secondary">
                    {logo?.url ? __('Change Logo', 'webdune-blocks') : __('Select Logo', 'webdune-blocks')}
                  </Button>
                  {logo?.url && (
                    <Button
                      onClick={() => setAttributes({ logo: {} })}
                      variant="tertiary"
                      isDestructive
                      style={{ marginLeft: '8px' }}
                    >
                      {__('Remove', 'webdune-blocks')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>

        <PanelBody title={__('Menu Items', 'webdune-blocks')}>
          {menuItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{__('Link', 'webdune-blocks')} {index + 1}</strong>
                <div>
                  <Button
                    onClick={() => moveMenuItem(index, 'up')}
                    disabled={index === 0}
                    isSmall
                  >
                    ↑
                  </Button>
                  <Button
                    onClick={() => moveMenuItem(index, 'down')}
                    disabled={index === menuItems.length - 1}
                    isSmall
                  >
                    ↓
                  </Button>
                  <Button
                    onClick={() => removeMenuItem(index)}
                    isDestructive
                    isSmall
                  >
                    {__('Remove', 'webdune-blocks')}
                  </Button>
                </div>
              </div>

              <TextControl
                label={__('Link Text', 'webdune-blocks')}
                value={item.text}
                onChange={(value) => updateMenuItem(index, 'text', value)}
              />

              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500' }}>
                  {__('Link URL', 'webdune-blocks')}
                </label>
                <URLInput
                  value={item.url}
                  onChange={(value) => updateMenuItem(index, 'url', value)}
                />
              </div>

              <ToggleControl
                label={__('Open in new tab', 'webdune-blocks')}
                checked={item.openInNewTab}
                onChange={(value) => updateMenuItem(index, 'openInNewTab', value)}
              />
            </div>
          ))}

          <Button
            onClick={addMenuItem}
            variant="secondary"
          >
            {__('+ Add Menu Item', 'webdune-blocks')}
          </Button>
        </PanelBody>

        <PanelBody title={__('Account Icon', 'webdune-blocks')}>
          <ToggleControl
            label={__('Show Account Icon', 'webdune-blocks')}
            checked={showAccountIcon}
            onChange={(value) => setAttributes({ showAccountIcon: value })}
          />

          {showAccountIcon && (
            <div style={{ marginTop: '12px' }}>
              <TextControl
                label={__('Account URL', 'webdune-blocks')}
                value={accountUrl}
                onChange={(value) => setAttributes({ accountUrl: value })}
                help={__('URL for the account/login link', 'webdune-blocks')}
              />
            </div>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="navbar14_component w-nav">
          <div className="navbar14_container">
            <div className="nav_logo-menu-wrapper">
              {logo?.url ? (
                <a href="/" className="navbar14_logo-link w-nav-brand">
                  <img
                    loading="lazy"
                    src={logo.url}
                    alt={logo.alt || 'Logo'}
                    className="navbar14_logo"
                  />
                </a>
              ) : (
                <div className="navbar14_logo-placeholder">
                  <p>{__('Select logo in sidebar →', 'webdune-blocks')}</p>
                </div>
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
                      onClick={(e) => e.preventDefault()}
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
    </>
  );
}

