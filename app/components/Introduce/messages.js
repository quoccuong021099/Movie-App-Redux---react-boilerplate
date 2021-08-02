/*
 * Introduce Messages
 *
 * This contains all the text for the Introduce component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Introduce';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Introduce component!',
  },
});
