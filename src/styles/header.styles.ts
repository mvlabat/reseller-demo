import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    zIndex: 1301,
    position: 'fixed',
    height: 72
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
    // justifyContent: 'space-between',
    padding: `0 ${theme.spacing(3)}px`
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center'
  },
  logoDiv: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerTrigger: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 151
  },
  drawerPaper: {
    paddingTop: 72 + theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: 'inherit',
    border: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  link: {
    display: 'flex',
    alignItems: 'center'
  },
  docsIcon: {
    marginRight: theme.spacing(1)
  },
  buttonText: {
    cursor: 'pointer',
    color: theme.palette.primary.main
  },
  buttonTextToggle: {
    cursor: 'pointer'
  },
  sideBarToggleDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxWrapper: {
    marginLeft: -theme.spacing(1.5)
  },
  // SideBar
  paper: {
    width: '100%',
    maxWidth: 320,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  bold: {
    fontWeight: 'bold'
  },
  text: {
    marginTop: theme.spacing(2),
    fontSize: 16
  },
  checkbox: {
    fontSize: 30
  },
  checkboxDiv: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  selected: {
    // transform: 'translateX(-48px)',
    width: '4px !important',
    backgroundColor: theme.palette.success,
    marginLeft: -theme.spacing(3),
    marginRight: `calc(${theme.spacing(3)}px - 4px)`
    // marginTop: -theme.spacing(3),
    // marginBottom: -theme.spacing(3)
  },
  card: {
    display: 'flex'
  },
  helpDiv: {
    width: '100%',
    maxWidth: 320,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    borderRadius: 6,
    border: 'solid 1px rgba(186, 190, 208, 0.41)',
    marginTop: theme.spacing(2)
  }
}));
