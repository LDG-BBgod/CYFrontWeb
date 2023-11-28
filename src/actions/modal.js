export const ISOPEN = 'ISOPEN'
export const TITLE = 'TITLE'
export const CONTENT = 'CONTENT'
export const BUTTONTEXT = 'BUTTONTEXT1'
export const BUTTONFUNC = 'BUTTONFUNC1'
export const CLOSE = 'CLOSE'

export const setIsOpen = (bool) => {
  return {
    type: ISOPEN,
    payload: bool,
  }
}
export const setTitle = (text) => {
  return {
    type: TITLE,
    payload: text,
  }
}
export const setContent = (text) => {
  return {
    type: CONTENT,
    payload: text,
  }
}
export const setButtonText = (text) => {
  return {
    type: BUTTONTEXT,
    payload: text,
  }
}
export const setButtonFunc = (func) => {
  return {
    type: BUTTONFUNC,
    payload: func,
  }
}
export const close = () => {
  return {
    type: CLOSE,
  }
}
