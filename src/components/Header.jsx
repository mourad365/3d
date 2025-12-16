import React from 'react';

const Header = ({ currentLang, setLang, isDarkMode, toggleTheme }) => {
    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <div className="brand">
                        <img src="/logo.svg" alt="Logo" className="brand-logo" />
                        <div className="brand-text">
                            {currentLang === 'ar' ? (
                                <>
                                    <h1>الجمهورية الإسلامية الموريتانية</h1>
                                    <p>شرف - إخاء - عدل</p>
                                </>
                            ) : (
                                <>
                                    <h1>République Islamique de Mauritanie</h1>
                                    <p>Ministère de la Culture</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="actions">
                        <button className="icon-btn" onClick={toggleTheme} title="Theme">
                            {isDarkMode ? (
                                <svg className="icon sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            ) : (
                                <svg className="icon moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            )}
                        </button>

                        <button
                            className={`btn ${currentLang === 'ar' ? 'primary' : ''}`}
                            onClick={() => setLang('ar')}
                        >
                            العربية
                        </button>
                        <button
                            className={`btn ${currentLang === 'fr' ? 'primary' : ''}`}
                            onClick={() => setLang('fr')}
                        >
                            Français
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
