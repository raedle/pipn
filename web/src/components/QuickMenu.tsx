import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import DisplayOffIcon from '@material-ui/icons/Brightness2';
import DisplayOnIcon from '@material-ui/icons/Brightness7';
import RestartAltIcon from '@material-ui/icons/RestartAlt';
import CachedIcon from '@material-ui/icons/Cached';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings'
import { SpeedDial, SpeedDialAction } from '@material-ui/core';
import React from 'react';
import { useDisplayContext } from './DisplayContext';
import { gql, useMutation } from '@apollo/client';

const useStyles = makeStyles((theme: Theme) => ({
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));

const REBOOT = gql`
  mutation Reboot {
    reboot
  }
`;

const SHUTDOWN = gql`
  mutation Shutdown {
    shutdown
  }
`;

export default function QuickMenu() {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const { brightness, setBrightness } = useDisplayContext();
    const [reboot] = useMutation(REBOOT);
    const [shutdown] = useMutation(SHUTDOWN);

    function handleReload() {
        window.location.reload();
    }

    function handleReboot() {
        reboot();
    }

    function handleShutdown() {
        shutdown();
    }

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={styles.speedDial}
            icon={<SettingsIcon />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="up"
        >
            <SpeedDialAction
                icon={<PowerSettingsNewIcon />}
                tooltipTitle="Shutdown"
                color="secondary"
                onClick={handleShutdown}
            />
            <SpeedDialAction
                icon={<RestartAltIcon />}
                tooltipTitle="Reboot"
                color="secondary"
                onClick={handleReboot}
            />
            {brightness === 'on' ?
                <SpeedDialAction
                    icon={<DisplayOffIcon />}
                    tooltipTitle="Turn Off Display"
                    onClick={() => setBrightness('off')}
                /> :
                <SpeedDialAction
                    icon={<DisplayOnIcon />}
                    tooltipTitle="Turn On Display"
                    onClick={() => setBrightness('on')}
                />}
            <SpeedDialAction
                icon={<CachedIcon />}
                tooltipTitle="Reload"
                onClick={handleReload}
            />
        </SpeedDial>
    )
}