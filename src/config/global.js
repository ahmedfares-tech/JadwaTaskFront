const direction = document.body.dir || 'ltr';
const left = direction === 'ltr' ? 'Left' : 'Right';
const right = direction === 'ltr' ? 'Right' : 'Left';
const Globals = {
    left: left,
    right: right,
    direction: direction,
    marginLeft: `margin${left}`,
    marginRight: `margin${right}`,
    paddingLeft: `padding${left}`,
    paddingRight: `padding${right}`,
    DRAWER_WIDTH: 280,
    APPBAR_MOBILE: 64,
    APPBAR_DESKTOP: 92,
    APP_BAR_MOBILE: 64,
    APP_BAR_DESKTOP: 92,
}
export const baseBackendURLImages = 'http://127.0.0.1:8000';
export default Globals;