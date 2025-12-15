import React from 'react';

const ArtifactCard = ({ artifact, currentLang, isDarkMode }) => {
    const data = artifact[currentLang];

    return (
        <div className="card">
            <div className="model-viewer-wrapper">

                <model-viewer
                    src={artifact.model}
                    alt={data.title}
                    auto-rotate
                    camera-controls
                    shadow-intensity="1"
                    environment-image="neutral"
                    exposure={isDarkMode ? '1.2' : '1'}
                    orbit-sensitivity="1.5"
                    auto-rotate-delay="0"
                    style={{ width: '100%', height: '100%', '--poster-color': 'transparent' }}
                ></model-viewer>
            </div>
            <div className="card-body">
                <h3 className="card-title">{data.title}</h3>
                <div className="card-info">
                    <span className="info-item">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {data.period}
                    </span>
                    <span className="info-item">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                        {data.material}
                    </span>
                </div>
                <p className="card-desc">{data.desc}</p>
            </div>
        </div>
    );
};

export default ArtifactCard;
