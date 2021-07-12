import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import HomeMaxIcon from '@material-ui/icons/HomeMax';
import { Link } from "react-router-dom";
import { useRouteMatch } from 'react-router';

const useStyles = makeStyles(({
    backdrop: {
        position: 'absolute',
        // z-index: 1050 is just enough to cover the radial menu
        zIndex: 1050,
    },
    container: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column'
    },
    content: {
        flexGrow: 1,
    },
    root: {
        width: '100vw',
    },
}));

export default function Navigation() {
    const styles = useStyles();
    const match = useRouteMatch<{ tabBar: string }>("/:tabBar");
    const [value, setValue] = React.useState(match?.params.tabBar || 'home');
    return (
        <BottomNavigation
            value={value}
            onChange={(_, value) => setValue(value)}
            showLabels
            className={styles.root}
        >
            <BottomNavigationAction
                label="Home"
                value="home"
                component={Link}
                to="/"
                icon={<HomeMaxIcon />} />
            <BottomNavigationAction
                label="Status"
                value="status"
                component={Link}
                to="/status"
                icon={<VpnLockIcon />} />
            <BottomNavigationAction
                label="Map"
                value="map"
                component={Link}
                to="/map"
                icon={<MapIcon />} />
        </BottomNavigation>
    );
}
