import React, {useState} from 'react'
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from "./styles";


const Layout = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function openDrawer() {
        setIsDrawerOpen(true)
    }

    function closeDrawer() {
        setIsDrawerOpen(false)
    }

    return <Box>
        <Box className={classes.root}>
            <AppBar position="static"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isDrawerOpen,
                    })}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuButton, isDrawerOpen && classes.hide)}
                        color="inherit"
                        onClick={openDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Schedulator
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={closeDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Container maxWidth={'md'} className={classes.container}>
                {props.children}
            </Container>
        </Box>
    </Box>;
};


export default Layout;

