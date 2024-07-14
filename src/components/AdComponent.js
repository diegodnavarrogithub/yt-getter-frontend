import React, { useEffect } from 'react';

const AdComponent = ({ adClient, adSlot, adFormat = 'auto', adStyle = {} }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block', ...adStyle }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}></ins>
    );
};

export default AdComponent;
