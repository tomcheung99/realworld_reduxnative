import React, {Component} from 'react';

export const SIZE = {
    title: 20,
    header: 18,
    body: 16,
    content: 14,
    small: 12,
}

export const COLORS = {
    green: '#5CB85B',
    darkwhite:'#F3F3F3',
    white: '#ffffff',
    black: '#000000',
    darkgray: '#333333',
    gray: '#818A91',
    lightgray: 'rgba(0, 0, 0, 0.3)',
    lightgray2: '#bbbbbb',
}

export const FONTS ={
    title: {fontSize:SIZE.title, fontWeight:'600', color:COLORS.black},
    body: {fontSize:SIZE.body, fontWeight:'400', color:COLORS.gray},
    content: {fontSize:SIZE.content, fontWeight:'300', color:COLORS.gray},
    small: {fontSize:SIZE.small, fontWeight:'300', color:COLORS.gray},
}

const themeAPP = {SIZE,COLORS,FONTS}

export default themeAPP