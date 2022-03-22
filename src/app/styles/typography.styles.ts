import { CSSObject } from '@emotion/react'

import { CSSObjectType } from '~/app/lib/constants'

export const fontStyles = (fontSize: number, lineHeight: number) => ({
  fontSize: `${fontSize / 10}rem`,
  lineHeight: lineHeight / fontSize,
})

export const typographyStyles: {
  [name: string]: CSSObjectType
} = {
  primaryHeadline: {
    base: {
      ...fontStyles(25, 30),
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
  },
  secondaryHeadline: {
    base: {
      ...fontStyles(20, 25),
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
  },
  tertiaryHeadline: {
    base: {
      ...fontStyles(14, 25.2),
      fontWeight: 'bold',
      letterSpacing: '-0.01em',
    },
  },
}

export const typography: { [className: string]: CSSObject[] } = {
  bodyCopy: [
    fontStyles(15, 22),
    {
      fontWeight: 'normal',
      letterSpacing: '-0.01em',
    },
  ],
  bodyCopyTight: [
    fontStyles(15, 20),
    {
      fontWeight: 'normal',
      letterSpacing: '-0.01em',
    },
  ],
  eyebrow: [
    fontStyles(12, 15),
    {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  ],
  filterItemLabel: [
    fontStyles(20, 25),
    {
      fontWeight: 'bold',
    },
  ],
  jumboHeadline: [
    fontStyles(40, 40),
    {
      fontWeight: 'bold',
      letterSpacing: '-0.03em',
    },
  ],
  labelCopy: [
    fontStyles(12, 20),
    {
      fontWeight: 'normal',
    },
  ],
  labelCopyTight: [
    fontStyles(12, 15),
    {
      fontWeight: 'normal',
    },
  ],
  labelHeadline: [
    fontStyles(12, 15),
    {
      fontWeight: 'bold',
    },
  ],
  labelHeadlineLarge: [
    fontStyles(25, 30),
    {
      fontWeight: 'bold',
    },
  ],
  labelHeadlineXLarge: [
    fontStyles(27, 32),
    {
      fontWeight: 'bold',
    },
  ],
  largeCopy: [
    fontStyles(18, 23),
    {
      fontWeight: 'normal',
    },
  ],
  primaryHeadline: [typographyStyles.primaryHeadline.base],
  primarySubhead: [
    fontStyles(15, 20),
    {
      fontWeight: 'bold',
      letterSpacing: '-0.01em',
    },
  ],
  secondaryHeadline: [typographyStyles.secondaryHeadline.base],
  secondarySubhead: [
    fontStyles(12, 15),
    {
      fontWeight: 'bold',
    },
  ],
  smallCopy: [fontStyles(12, 20), { fontWeight: 'normal' }],
  smallCopyTight: [fontStyles(12, 15), { fontWeight: 'normal' }],
  tertiaryHeadline: [typographyStyles.tertiaryHeadline.base],
  topPicksPrice: [
    fontStyles(20, 20),
    {
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
  ],
  topPicksSubcopy: [
    fontStyles(12, 15),
    {
      fontWeight: 'normal',
    },
  ],
}
