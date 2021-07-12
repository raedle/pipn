import { gql, useMutation } from '@apollo/client';
import React from 'react';

type DisplayBrightness = 'on' | 'off';

type DisplayStatus = {
    brightness: DisplayBrightness,
    setBrightness: (brightness: DisplayBrightness) => void;
}

const Context = React.createContext<DisplayStatus>({
    brightness: 'on',
    setBrightness: () => { }
});
Context.displayName = 'DisplayContext';

type Props = {
    children: React.ReactChild | React.ReactChild[]
}

const TURN_ON_DISPLAY = gql`
  mutation TurnOnDisplay {
    turnOnDisplay
  }
`;

const TURN_OFF_DISPLAY = gql`
  mutation TurnOffDisplay {
    turnOffDisplay
  }
`;

export function useDisplayContext() {
    return React.useContext(Context);
}

export default function DisplayContext({ children }: Props) {
    const [turnOnDisplay] = useMutation(TURN_ON_DISPLAY, {
        onCompleted: () => setBrightness('on')
    });
    const [turnOffDisplay] = useMutation(TURN_OFF_DISPLAY, {
        onCompleted: () => setBrightness('off')
    });
    const [brightness, setBrightness] = React.useState<DisplayBrightness>('on');

    function handleBrightness(brightness: DisplayBrightness) {
        if (brightness === 'on') {
            turnOnDisplay();
        }
        else if (brightness === 'off') {
            turnOffDisplay();
        }
    }

    return (
        <Context.Provider value={{
            brightness,
            setBrightness: handleBrightness,
        }}>
            {children}
        </Context.Provider>
    );
}