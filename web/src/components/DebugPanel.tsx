import React, { CSSProperties, useMemo, useState } from 'react';
import '../App.css';

type Props = {
    style?: CSSProperties;
}

export default function DebugPanel({ style }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const size = useMemo(() => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }, []);
    return isVisible ? (
        <div style={{ ...style, padding: 10, backgroundColor: 'white' }}>
            <pre style={{fontSize: 12, textAlign: 'left'}}>
                {JSON.stringify(size, null, 2)}
            </pre>
            <div style={{ position: 'absolute', backgroundColor: 'hotpink', top: 0, right: 0, height: 40, width: 40, transform: 'translate3d(50%, -50%, 0)' }}
                onClick={() => setIsVisible(false)}>X</div>
        </div>
    ) : null;
}