const myType = typeof window !== 'undefined';

export const addClass = myType ? require('wind-dom/src/class').addClass : undefined;

export const removeClass = myType ? require('wind-dom/src/class').removeClass : undefined;

export const setStyle = myType ? require('wind-dom/src/style').setStyle : undefined;

export const getStyle = myType ? require('wind-dom/src/style').getStyle : undefined;
