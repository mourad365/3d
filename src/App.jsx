import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArtifactCard from './components/ArtifactCard';
import { artifacts } from './data';
import '@google/model-viewer';

function App() {
    const [currentLang, setCurrentLang] = useState('ar');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.body.className = `lang-${currentLang} ${isDarkMode ? 'dark-mode' : ''}`;
    }, [currentLang, isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <Header
                currentLang={currentLang}
                setLang={setCurrentLang}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />

            <section className="hero">
                <div className="container">
                    <div className="hero-emblem">
                        {currentLang === 'ar' ? 'شرف - إخاء - عدل' : 'Honneur - Fraternité - Justice'}
                    </div>

                    <h2 className="hero-title">
                        {currentLang === 'ar' ? 'المكتب الوطني للمتاحف' : 'Office National des Musées'}
                    </h2>

                    <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
                        {currentLang === 'ar'
                            ? 'منصة رقمية تفاعلية لعرض وتوثيق التراث الثقافي الموريتاني بتقنيات ثلاثية الأبعاد'
                            : 'Une plateforme numérique interactive pour documenter le patrimoine culturel mauritanien en 3D.'
                        }
                    </p>
                </div>
            </section>

            <main className="gallery">
                <div className="container">
                    <div className="grid">
                        {artifacts.map(art => (
                            <ArtifactCard
                                key={art.id}
                                artifact={art}
                                currentLang={currentLang}
                                isDarkMode={isDarkMode}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <footer>
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-logo">
                            <h3>
                                {currentLang === 'ar' ? 'المكتب الوطني للمتاحف' : 'Office National des Musées'}
                            </h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                {currentLang === 'ar' ? 'حفظ التراث.. صون للهوية.' : 'Préserver le patrimoine... Protéger l\'identité.'}
                            </p>
                        </div>
                        <div className="footer-col">
                            <h4>{currentLang === 'ar' ? 'روابط سريعة' : 'Liens Rapides'}</h4>
                            <ul className="footer-links">
                                <li><a href="#">{currentLang === 'ar' ? 'عن المكتب' : 'À propos'}</a></li>
                                <li><a href="#">{currentLang === 'ar' ? 'المجموعات' : 'Collections'}</a></li>
                                <li><a href="#">{currentLang === 'ar' ? 'الزيارة' : 'Visiter'}</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>{currentLang === 'ar' ? 'اتصل بنا' : 'Contact'}</h4>
                            <ul className="footer-links">
                                <li><a href="#">contact@museum.mr</a></li>
                                <li><a href="#">+222 45 25 00 00</a></li>
                                <li><a href="#">Nouakchott, Mauritanie</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2025 Office National des Musées - Mauritanie</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
